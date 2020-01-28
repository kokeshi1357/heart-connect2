Rails.application.routes.draw do
  devise_for :users
  resources :users, only: [:edit, :update,:show]
  root 'tops#index'
  resources :messages
  resources :dm, only: [:create]
  resources :rooms, only: [:create, :show, :index]
end
