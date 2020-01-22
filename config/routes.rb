Rails.application.routes.draw do
  devise_for :users
  # root 'messages#index'
  root 'tops#index'
  resources :messages
  resources :users, only: [:edit, :update]
  resources :posts, only: [:index]
end
