require 'rails_helper'

RSpec.describe Api::V1::PostsController, :type => :controller do
  describe "Posts" do
    it "should return unahthorized" do
      post :create, post: {content: "Hello world", mood_id: 1}
      expect(response).to have_http_status(:unauthorized)
    end

    it "should create post" do
      authenticate
      body = JSON.parse response.body
      request.headers["Authorization"] = body["auth_token"]

      post :create, post: {content: "Hello world", mood_id: 1}
      expect(response).to have_http_status(:created)
    end

    it "should find a post" do
      create_post
      post :find, content: "Hello"
      body = JSON.parse response.body
      expect(body.length).to eq(1)
    end

    it "should show a post" do
      create_post
      post :show, id: create_post
      expect(response).to have_http_status(:ok)
    end

    it "should like a post" do
      create_post
      post :like, id: create_post
      expect(response).to have_http_status(:ok)
    end

    it "should repost a post" do
      create_post
      post :repost, id: create_post
      expect(response).to have_http_status(:ok)
    end
  end

  private

  def create_post
    authenticate
    body = JSON.parse response.body
    request.headers["Authorization"] = body["auth_token"]
    post :create, post: {content: "Hello world", mood_id: 1}
    body = JSON.parse response.body
    body["post"]["id"]
  end

  def authenticate(email: "hello@matthieulachassagne.com", password: "password1")
    @controller = Api::V1::UsersController.new
    post :create, user: {pseudo: "Mteuahasan", first_name: "Matthieu", last_name:"Lachassagne", email: "hello@matthieulachassagne.com", password: "password1"}
    post :authenticate, {email: email, password: password}
    @controller = Api::V1::PostsController.new
  end
end
