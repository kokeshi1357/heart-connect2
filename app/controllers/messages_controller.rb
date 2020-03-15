class MessagesController < ApplicationController
  before_action :set_message, except: [:index, :new, :create]
  before_action :set_message_user, only: [:show]

  def index
    @messages = Message.includes(:user).order(id: "DESC")  # .order("created_at DESC").page(params[:page]).per(5)
  end

  def show
  end

  def new
    @message = Message.new
    @message.images.new
  end

  def edit
    @message.images.build
    @images = Image.where(message_id: @message.id)
  end

  def create
    @message = Message.new(message_params)
    respond_to do |format|
      if @message.save
        format.html { redirect_to messages_path, notice: 'Message was successfully created.' }
        format.json { render :show, status: :created, location: @message }
      else
        format.html { render :new }
        format.json { render json: @message.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @message.update(message_params)
        format.html { redirect_to @message, notice: 'Message was successfully updated.' }
        format.json { render :show, status: :ok, location: @message }
      else
        format.html { render :edit }
        format.json { render json: @message.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @message.destroy
    respond_to do |format|
      format.html { redirect_to root_path, notice: 'Message was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_message
      @message = Message.find(params[:id])
    end

    def set_message_user
      @user = User.find(@message.user_id)
    end

    def message_params
      params.require(:message).permit(:title, :body, images_attributes: [:img_src, :_destroy, :id]).merge(user_id: current_user.id)
    end
end
