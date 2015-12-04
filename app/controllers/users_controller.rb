class UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      render :nothing => true, :status => :created
    else
      render :json => { :errors => @user.errors.full_messages }
    end
  end

  private
    def user_params
      params.require(:user).permit(:pseudo, :first_name, :last_name, :email, :password)
    end

end
