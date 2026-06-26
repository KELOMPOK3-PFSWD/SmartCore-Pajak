class SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      render json: {
        message: "Login berhasil",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          type_id: user.type_id
        }
      }, status: :ok
    else
      render json: {
        error: "Email atau password salah"
      }, status: :unauthorized
    end
  end
end