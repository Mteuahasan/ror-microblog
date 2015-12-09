class Api::V1::UsersController < Api::V1::BaseController
  def show
    user = User.find(params[:id])
    render json: user.to_json
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render :json => @user.to_json, :status => :created
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

  def authenticate
    if user = User.find_by_credentials(params[:email], params[:password])
      render json: authentication_payload(user)
    else
      render json: { errors: ['Invalid username or password'] }, status: :unauthorized
    end
  end

  def me
    authenticate_request!
    render json: @current_user
  end

  private

  def user_params
    params.require(:user).permit(:pseudo, :first_name, :last_name, :email, :password)
  end

  def authentication_payload(user)
    return nil unless user && user.id
    {
      auth_token: AuthToken.encode({ user_id: user.id }),
      user: { id: user.id, pseudo: user.pseudo, admin: user.admin }
    }
  end
end
