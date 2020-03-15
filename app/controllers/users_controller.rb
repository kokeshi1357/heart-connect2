class UsersController < ApplicationController
 before_action :set_user, only: [:show, :edit]
#  protect_from_forgery :except => ["update","show"]

 def show
  if user_signed_in?
    @currentUserEntry=Entry.where(user_id: current_user.id)
    @userEntry=Entry.where(user_id: @user.id)
    if @user.id == current_user.id
    else
      @currentUserEntry.each do |cu|
        @userEntry.each do |u|
          if cu.room_id == u.room_id then
            @isRoom = true
            @roomId = cu.room_id
          end
        end
      end
      if @isRoom
      else
        @room = Room.new
        @entry = Entry.new
      end
    end
  end
 end

 def get_user_info
 end

 def update
  if current_user.update(user_params)
    respond_to do |format|
      format.html {redirect_to "/users/#{current_user.id}"}
      format.json
    end
  else
    redirect_to "/users/#{current_user.id}"
  end
 end

 private

 def user_params
   params.require(:user).permit(:name, :email,:password,:password_confirmation,:character,:user_image,:detail)
 end

 def set_user
  @user = User.find(params[:id])
 end

end
 