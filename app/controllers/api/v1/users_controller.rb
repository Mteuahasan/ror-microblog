class Api::V1::UsersController < Api::V1::BaseController
  def show
    user = User.find_by(pseudo: params[:pseudo])
    render json: Api::V1::UserSerializer.new(user).to_json
  end

  def user_posts
    authenticate_request!
    id = params[:id]
    offset = params[:offset] || 0
    user = User.find_by(id: id)
    posts = Post.all.where(user_id: @current_user.id).order('created_at DESC').limit(20).offset(offset)
    user.reposts.all.limit(20).order('created_at DESC').offset(offset).each { |post|
      puts post.user_id
      posts << post
    }
    posts = posts.map { |post|
      Api::V1::PostSerializer.new(post)
    }
    render(json: posts.to_json)
  end

  def user_likes
    authenticate_request!
    user_id = params[:id]
    offset = params[:offset] || 0
    user = User.find_by(id: user_id)
    likes = user.likes.all.order('created_at DESC').limit(20).offset(offset)
    likes = likes.map { |like|
      Api::V1::PostSerializer.new(like)
    }
    render(json: likes.to_json)
  end

  def following?
    authenticate_request!
    user2 = params[:id]
    render json: User.following?(@current_user.id, user2)
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
      render :nothing => true, :status => :no_content
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
    params.require(:user).permit(:pseudo, :first_name, :last_name, :email, :password, :description, :img_url)
  end

  def authentication_payload(user)
    return nil unless user && user.id
    {
      auth_token: AuthToken.encode({ user_id: user.id }),
      user: { id: user.id, pseudo: user.pseudo, admin: user.admin }
    }
  end
end
