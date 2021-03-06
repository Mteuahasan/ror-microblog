Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'search' => "posts#find", as: 'search'

      get 'users/me' => 'users#me', as: 'user_me'
      get "users/following/:id" => "users#following?", as: 'user_following'
      post 'users/authenticate' => 'users#authenticate'
      get "users/:pseudo" => "users#show", as: 'user_show'
      post "users/:id/follow" => "users#follow", as: 'user_follow'
      post "users/:id/unfollow" => "users#unfollow", as: 'user_unfollow'
      get "users/:id/likes" => "users#user_likes", as: 'user_liked_posts'
      get "users/:id/posts" => "users#user_posts", as: 'user_post'
      resources :users, only: [:index, :create, :update, :destroy]

      get "posts/:id/liked" => "posts#liked", as: 'liked_post'
      get "posts/:id/reposted" => "posts#reposted", as: 'reposted_post'
      post "posts/:id/like" => "posts#like", as: 'like_posts'
      post "posts/:id/unlike" => "posts#unlike", as: 'unlike_posts'
      post "posts/:id/repost" => "posts#repost", as: 'posts_repost'
      post "posts/:id/unrepost" => "posts#unrepost", as: 'posts_unrepost'
      resources :posts, only: [:index, :create, :show, :update, :destroy]

      resources :moods, only: [:index, :create, :show, :update, :destroy]
    end
  end

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
