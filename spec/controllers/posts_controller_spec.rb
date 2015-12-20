require 'rails_helper'

RSpec.describe Api::V1::PostsController, :type => :controller do
  describe "POST post" do
    it "should create a post" do
      authenticate
      create_post
      expect(response).to have_http_status(:created)
    end
  end

  private

  def create_post
    post :create, post: {content: "Hello world!", mood_id: 1}
  end

  def authenticate(email: "hello@matthieulachassagne.com", password: "password1")
    Api::V1::UsersController.authenticate(email: email, password: password)
  end
end