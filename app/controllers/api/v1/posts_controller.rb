class Api::V1::PostsController < Api::V1::BaseController
  def index
    authenticate_request!
    offset = params[:offset] || 0
    posts = Post.where(user: @current_user.following).order('created_at DESC').limit(20).offset(offset)
    last_date = posts[-1].created_at
    first_date = posts[0].created_at
    @current_user.following.each { |user|
      user.reposts.where(created_at: last_date..first_date).each { |post|
        posts << post
      }
    }
    posts = posts.map { |post|
      Api::V1::PostSerializer.new(post)
    }
    render(json: posts.to_json)
  end

  def my_likes
    authenticate_request!
    offset = params[:offset] || 0
    user = User.find_by(id: @current_user.id)
    puts user.likes.all.order('created_at DESC').limit(20).offset(offset)
    render nothing: true
  end

  def find
    search = params[:content]
    posts = Post.all.where("content LIKE :query", query: "%#{search}%")
    posts = posts.map { |post|
      Api::V1::PostSerializer.new(post)
    }
    render(json: posts.to_json)
  end

  def show
    post = Post.find(params[:id])
    render(json: Api::V1::PostSerializer.new(post).to_json)
  end

  def create
    authenticate_request!
    params = post_params
    puts "%"*100
    puts @current_user.id
    params["user_id"] = @current_user.id
    @post = Post.new(params)
    if @post.save
      render :nothing => true, :status => :created
    else
      render :json => { :errors => @post.errors.messages }, :status => :bad_request
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

  def repost
    authenticate_request!
    user_id = @current_user.id
    render plain: params[:id]
  end

  private

  def post_params
    params.require(:post).permit(:content, :image_url, :mood_id)
  end
end
