class Api::V1::PostsController < Api::V1::BaseController
  def show
    post = Post.find(params[:id])
    render(json: Api::V1::PostSerializer.new(post).to_json)
  end

  def create
    authenticate_request!
    @post = Post.new(post_params)
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
    render plain: params[:id]
  end

  private

  def post_params
    params.require(:post).permit(:content, :user_id, :image_url)
  end
end
