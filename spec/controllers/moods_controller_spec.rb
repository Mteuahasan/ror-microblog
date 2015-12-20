require 'rails_helper'

RSpec.describe Api::V1::MoodsController, :type => :controller do
  describe "Moods" do
    it "should create a mood" do
      authenticate
      body = JSON.parse response.body
      request.headers["Authorization"] = body["auth_token"]

      post :create, mood: {name: "Love", mood_id: 9}
      expect(response).to have_http_status(:created)
    end
  end

  private

  def authenticate(email: "hello@matthieulachassagne.com", password: "password1")
    @controller = Api::V1::UsersController.new
    post :create, user: {pseudo: "Mteuahasan", first_name: "Matthieu", last_name:"Lachassagne", email: "hello@matthieulachassagne.com", password: "password1"}
    post :authenticate, {email: email, password: password}
    @controller = Api::V1::PostsController.new
  end
end
