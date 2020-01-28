class DmController < ApplicationController
 before_action :authenticate_user!, :only => [:create]

 def create
   if Entry.where(:user_id => current_user.id, :room_id => params[:dm][:room_id]).present?
     @dm = Message.create(params.require(:dm).permit(:user_id, :content, :room_id).merge(:user_id => current_user.id))
     redirect_to "/rooms/#{@dm.room_id}"
   else
     redirect_back(fallback_location: root_path)
   end
 end
end
