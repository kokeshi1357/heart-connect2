Rails.application.routes.draw do
  devise_for :users
  root 'messages#index'
  
  # patch 'users/:id', to: 'users#update', defaults: { format: 'json' }

  resources :users, only: [:update,:show] do
    collection do
      get 'get_user_info', defaults: { format: 'json' }
    end
  end
  resources :messages
  resources :dms, :only => [:create]
  resources :rooms, only: [:create, :show] 
end
