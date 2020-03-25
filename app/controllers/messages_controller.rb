class MessagesController < ApplicationController
  before_action :set_message, except: [:index, :new, :create]
  before_action :set_message_user, only: [:show]

  def index
    @messages = Message.where(trash_status: nil).includes(:user).order(created_at: "DESC").page(params[:page]).per(6)  # .order("created_at DESC")
  end

  def show
    @comment = Comment.new
    @comments = @message.comments.includes(:user).where(replied_num: 0)
    @replied_comments = @message.comments.where.not(replied_num: 0)
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
    # 削除される画像の処理
    if params[:delete_ids] != ""
      @ids = params[:delete_ids].split.map(&:to_i)
      @ids.each do |id|
        @image = @message.images.find(id).destroy
      end
    end
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
