class Api::V1::UsersController < Api::V1::BaseController
  def show
    user = User.find(params[:id])
    render(json: Api::V1::UserSerializer.new(user).to_json)
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render :nothing => true, :status => :created
    else
      render :json => { :errors => @user.errors.messages }, :status => :bad_request
    end
  end

  def update
    @user = User.update(params[:id], user_params)
    if @user.save
      render :nothing => true, :status => :created
    else
      render :json => { :errors => @user.errors.messages }, :status => :bad_request
    end
  end

  private
  def user_params
    params.require(:user).permit(:pseudo, :first_name, :last_name, :email, :password)
  end
end