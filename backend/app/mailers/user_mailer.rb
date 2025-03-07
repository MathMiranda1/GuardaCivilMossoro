class UserMailer < ApplicationMailer
  default from: 'no-reply@seusistema.com'

  def password_reset(user, password)
    @user = user
    @password = password
    mail(to: @user.email, subject: "Sua senha") do |format|
      format.text do
        render plain: "Olá, #{@user.name}!\n\nSua senha é: #{@password}\nUtilize essa senha para acessar o sistema e, se necessário, redefina-a para garantir a segurança da sua conta."
      end
    end
  end
end
