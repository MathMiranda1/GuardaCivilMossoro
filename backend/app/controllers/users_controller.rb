class UsersController < ApplicationController

    # GET /users
    def index
      users = User.all
      render json: users
    end

    # POST /users
    def create
      provisional_password = SecureRandom.alphanumeric(8)
      user = User.new(user_params.merge(
        password: provisional_password, 
        password_confirmation: provisional_password, 
        temporary_password: provisional_password
      ))
      user.first_login = true if user.first_login.nil?

      if user.save
        # Passe o provisional_password para o mailer
        UserMailer.password_reset(user, provisional_password).deliver_now
        render json: { user: user, message: "Usuário cadastrado com sucesso." }, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end

  
    # PUT /users/:id/update_password
    def update_password
      user = User.find(params[:id])
      if user.update(password: params[:password],
                     password_confirmation: params[:password],
                     first_login: false,
                     temporary_password: nil,
                     plaintext_password: params[:password])
        render json: { message: "Senha atualizada com sucesso." }
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end
    
  
    private
  
    def user_params
      # Observe que não permitimos password e password_confirmation, pois serão gerados automaticamente
      params.require(:user).permit(:name, :email, :first_login)
    end
  end