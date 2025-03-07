Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  post '/users', to: 'users#create'
  get '/users', to: 'users#index'
  put '/users/:id/update_password', to: 'users#update_password'
  post '/login', to: 'authentication#login'
  post '/password_resets', to: 'password_resets#create'
  get '/up', to: 'health#show'

  # Rotas do CRUD de Unidades
  resources :unidades, only: [:index, :show, :create, :update, :destroy]
  resources :equipes, only: [:index, :show, :create, :update, :destroy]
  resources :armas, only: [:index, :show, :create, :update, :destroy]
  resources :guardas, only: [:index, :show, :create, :update, :destroy]
  resources :movimentacoes, only: [:index, :show, :create, :update, :destroy]

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  
  # Defines the root path route ("/")
  # root "posts#index"
end
