Rails.application.routes.draw do
  devise_for :users
  root 'messages#index'
  
  # patch 'users/:id', to: 'users#update', defaults: { format: 'json' }

  resources :users, only: [:update,:show] do
    collection do
      get 'get_user_info', defaults: { format: 'json' }
      get 'get_user_message', defaults: { format: 'json' }
      get 'msg_history_show', dafaults: { format: 'json'}
      patch 'partial_update', dafaults: { format: 'json'}
      get 'get_history_info', dafaults: { format: 'json'}
    end
  end

  resources :messages do
    member do
      patch 'trash_update'
      patch 'draft_update'
    end
    collection do
      get 'tag_spread', dafaults: { format: 'json'}
      get 'tag_search', dafaults: { format: 'json'}
      get 'index_in'
      get 'index_out'
    end
    resources :comments, only: :create
  end

  resources :dms, :only => [:create]
  resources :rooms, only: [:create, :show] 
end
