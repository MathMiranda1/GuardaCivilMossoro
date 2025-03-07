class AuthenticationController < ApplicationController
    # POST /login
    def login
      user = User.find_by(email: params[:email])
      if user && user.authenticate(params[:password])
        token = encode_token({ user_id: user.id })
        render json: { user: user, token: token }
      else
        render json: { error: "Email ou senha inválidos" }, status: :unauthorized
      end
    end
  
    private
  
    def encode_token(payload)
      # Use a secret_key_base do Rails para assinar o token
      JWT.encode(payload, Rails.application.secret_key_base)
    end
  end
  