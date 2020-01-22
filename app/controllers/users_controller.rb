class UsersController < ApplicationController
 
 def create
  redirect_to posts_path
 end
 
 def edit
 end

 def update
   if current_user.update(user_params)
     redirect_to root_path
   else
     render :edit
   end
 end

 private

 def user_params
   params.require(:user).permit(:name, :character,:email)
 end
end
 