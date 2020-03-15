class ApplicationController < ActionController::Base
 # before_action :authenticate_user!
 before_action :configure_permitted_parameters, if: :devise_controller?
 # def current_user
 #  @current_user ||= User.find_by(id: session[:id])
 # end
 
 # helper_method :current_user
 
 protected
 def configure_permitted_parameters
   devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :character, :user_image])
 end

 private 
 def after_sign_in_path_for(resource)
   messages_path # ログイン後に遷移するpathを設定
 end

 def after_sign_out_path_for(resource)
   messages_path # ログアウト後に遷移するpathを設定
 end
end
