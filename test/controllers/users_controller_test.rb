require 'test_helper'

class UsersControllerTest < ActionController::TestCase
  def setup
    @controller = Api::V1::UsersController.new
  end

  test "should route to create user" do
    assert_routing({ method: 'post', path: '/api/v1/users' }, { controller: "api/v1/users", action: "create" })
  end

  test "should create an user" do
    create_user
    assert_response :success
  end

  test "should not create duplicate user" do
    create_user
    create_user
    assert_response :bad_request
  end

  test "should not provide authentication token" do
    authenticate password: "wrong_password"
    assert_response :unauthorized
  end

  test "should provide authentication token with email" do
    authenticate
    body = JSON.parse response.body
    assert_not_empty body["auth_token"]
    assert_equal body["auth_token"].length, 132
    assert_equal "Mteuahasan", body["user"]["pseudo"]
    assert_response :success
  end

  test "should provide authentication token with pseudo" do
    authenticate email: "Mteuahasan"
    body = JSON.parse response.body
    assert_not_empty body["auth_token"]
    assert_equal body["auth_token"].length, 132
    assert_equal "Mteuahasan", body["user"]["pseudo"]
    assert_response :success
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
