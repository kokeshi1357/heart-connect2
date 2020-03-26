class UsersController < ApplicationController
 before_action :set_user, only: [:show, :edit]
 def show
  if user_signed_in?
    @messages = Message.where(user_id: current_user.id, trash_status: nil).order(created_at: "DESC")
    @messagess = Message.where(user_id: current_user.id, trash_status: 1).order(created_at: "DESC")
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
  else
    redirect_to root_path, notice: 'ログイン/新規登録が必要です'
  end
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

 def get_user_info
 end

 def get_user_message
  @message =  Message.find(params[:message_id])
  @images = Image.where(message_id: @message.id)
 end

 def msg_history_show
   if params[:status] == "current"
    @messages = Message.where(user_id: current_user.id, trash_status: nil).order(created_at: "DESC")
   elsif params[:status] == "trash"
    @messages = Message.where(user_id: current_user.id, trash_status: 1).order(created_at: "DESC")
   end
 end

 def partial_update
   if params[:id] 
     @message = Message.find(params[:id])
     @message.update(trash_status: nil)
   end
 end

  def get_history_info
    @messages = Message.where(user_id: current_user.id, trash_status: nil).order(created_at: "DESC")
  end

 private

 def user_params
   params.require(:user).permit(:name, :email,:password,:password_confirmation,:character,:user_image,:detail)
 end

 def set_user
  @user = User.find(params[:id])
 end

end
 