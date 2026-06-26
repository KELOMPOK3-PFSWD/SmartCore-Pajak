class UsersController < ApplicationController
  before_action :set_user, only: %i[show update destroy]

  # GET /users
  def index
    @users = User.order(:id)
    render json: @users
  end

  # GET /users/:id
  def show
    render json: @user
  end

  # POST /register atau POST /users
  def create
    @user = User.new(user_params)

    if request.path == "/register"
      @user.type_id = 0
    end

    if @user.save
      render json: {
        message: "Registrasi berhasil",
        user: @user
      }, status: :created
    else
      render json: {
        errors: @user.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  # PATCH /users/:id
  def update
    if params[:user][:password].blank?
      params[:user].delete(:password)
      params[:user].delete(:password_confirmation)
    end

    if @user.update(user_params)
      render json: {
        message: "User berhasil diupdate",
        user: @user
      }, status: :ok
    else
      render json: {
        errors: @user.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  # DELETE /users/:id
  def destroy
    @user.destroy

    render json: {
      message: "User berhasil dihapus"
    }, status: :ok
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(
      :name,
      :email,
      :phone,
      :identifier_number,
      :password,
      :password_confirmation,
      :type_id
    )
  end
end