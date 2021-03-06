require "rails_helper"

RSpec.describe Api::V1::UsersController, :type => :controller do
  describe "Users" do
    it "should create an user" do
      create_user
      expect(response).to have_http_status(:created)
    end

    it "should not create duplicate user" do
      create_user
      create_user
      expect(response).to have_http_status(:bad_request)
    end

    it "should show user" do
      create_user
      body = JSON.parse response.body

      get :show, pseudo: "Mteuahasan"
      body = JSON.parse response.body

      expect(response).to have_http_status(:success)
    end

    it "should not provide authentication token" do
      authenticate password: "wrong_password"
      expect(response).to have_http_status(:unauthorized)
    end

    it "should provide authentication token with email" do
      authenticate
      body = JSON.parse response.body

      expect(body["auth_token"]).not_to be_empty
      expect(body["user"]["pseudo"]).to eq("Mteuahasan")
      expect(response).to have_http_status(:success)
    end

    it "should provide authentication token with pseudo" do
      authenticate email: "Mteuahasan"
      body = JSON.parse response.body

      expect(body["auth_token"]).not_to be_nil
      expect(body["user"]["pseudo"]).to eq("Mteuahasan")
      expect(response).to have_http_status(:success)
    end

    it "should return logged user" do
      authenticate
      body = JSON.parse response.body
      request.headers["Authorization"] = body["auth_token"]

      get :me
      body = JSON.parse response.body

      expect(body["auth_token"]).to be_nil
      expect(body["user"]["pseudo"]).to eq("Mteuahasan")
      expect(body["user"]["email"]).to eq("hello@matthieulachassagne.com")
      expect(response).to have_http_status(:success)
    end

    it "should return unauthorized" do
      authenticate
      get :me
      body = JSON.parse response.body

      expect(body["errors"]).to eq(["Not Authenticated"])
      expect(response).to have_http_status(:unauthorized)
    end

    it "should update the user" do
      authenticate

      body = JSON.parse response.body
      put :update, id: body["user"]["id"], user: {first_name: "Cornichon", description:"Petit concombre vinaigré"}
      get :show, pseudo: body["user"]["pseudo"]

      body = JSON.parse response.body
      expect(body["user"]["description"]).to eq("Petit concombre vinaigré")
      expect(response).to have_http_status(:ok)

      post :authenticate, {email: "hello@matthieulachassagne.com", password: "password1"}
      expect(response).to have_http_status(:success)
    end
  end

  private

  def create_user
    post :create, user: {pseudo: "Mteuahasan", first_name: "Matthieu", last_name:"Lachassagne", email: "hello@matthieulachassagne.com", password: "password1"}
  end

  def authenticate(email: "hello@matthieulachassagne.com", password: "password1")
    create_user
    post :authenticate, {email: email, password: password}
  end
end
