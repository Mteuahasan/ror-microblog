require 'rails_helper'

RSpec.describe Api::V1::MoodsController, :type => :controller do
  describe "Moods" do
    it "should create a mood" do
      authenticate
      create(name: "Hello", value: 10)
      expect(response).to have_http_status(:created)
    end

    it "should not create a mood" do
      authenticate
      create(name: '', value: 9)
      expect(response).to have_http_status(:bad_request)
    end

    it "should list the moods" do
      authenticate
      create
      get :index
      body = JSON.parse response.body
      expect(response).to have_http_status(:ok)
      expect(body.length).to eq(10)
    end
  end

  private

  def create(name: "Love", value: 9)
    body = JSON.parse response.body
    request.headers["Authorization"] = body["auth_token"]

    post :create, mood: {name: name, value: value}
  end

  def authenticate(email: "hello@matthieulachassagne.com", password: "password1")
    @controller = Api::V1::UsersController.new
    post :create, user: {pseudo: "Mteuahasan", first_name: "Matthieu", last_name:"Lachassagne", email: "hello@matthieulachassagne.com", password: "password1"}
    post :authenticate, {email: email, password: password}
    @controller = Api::V1::MoodsController.new
  end
end
