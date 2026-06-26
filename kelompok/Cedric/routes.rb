Rails.application.routes.draw do
  resources :officers
  resources :users, defaults: { format: 'json' }
  resources :tax_services,  defaults: { format: 'json' }
  resources :tax_submissions
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # auth
  post "/register", to: "users#create", defaults: { format: 'json' }
  post "/login", to: "sessions#create", defaults: { format: 'json' }

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
