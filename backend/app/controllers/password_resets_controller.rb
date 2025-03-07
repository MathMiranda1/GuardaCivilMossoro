class PasswordResetsController < ApplicationController
  # POST /password_resets
  def create
    user = User.find_by(email: params[:email])
    if user
      # Se o usuário já redefiniu sua senha, enviamos a senha redefinida (plaintext_password).
      # Caso contrário, enviamos a senha provisória (temporary_password).
      password_to_send = user.plaintext_password.presence || user.temporary_password
      if password_to_send.present?
        UserMailer.password_reset(user, password_to_send).deliver_now
        render json: { message: "Sua senha foi enviada para #{user.email}" }
      else
        render json: { error: "Senha não definida. Por favor, contate o suporte." }, status: :unprocessable_entity
      end
    else
      render json: { error: "Email não encontrado" }, status: :not_found
    end
  end
end
