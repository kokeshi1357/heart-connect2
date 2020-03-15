class DmsController < ApplicationController
  before_action :authenticate_user!, :only => [:create]

  def create
    if Entry.where(:user_id => current_user.id, :room_id => params[:dm][:room_id]).present?
      @dm = Dm.new(dm_params)
      if @dm.save
        respond_to do |format|
          format.json
        end
      else
        redirect_back(fallback_location: root_path)
      end
    else
      redirect_back(fallback_location: root_path)
    end
  end

  private

  def dm_params
    params.require(:dm).permit(:user_id, :content, :room_id).merge(:user_id => current_user.id)
  end
end

