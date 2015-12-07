require 'test_helper'

class UsersControllerTest < ActionController::TestCase
  def setup
    @controller = Api::V1::UsersController.new
  end

  test "should route to create user" do
    assert_routing({ method: 'post', path: '/api/v1/users' }, { controller: "api/v1/users", action: "create" })
  end

  test "should create an user" do
    post :create, user: {pseudo: "Mteuahasan", first_name: "Matthieu", last_name:"Lachassagne", email: "hello@matthieulachassagne.com", password: "password1"}
    assert_response :success
  end
end
