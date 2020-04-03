class MessagesController < ApplicationController
  before_action :set_message, only: [:destroy, :edit, :update, :show, :trash_update, :draft_update]
  before_action :set_messages, only: [:index, :index_in, :index_out, :tag_search]
  before_action :set_message_user, only: [:show]
  before_action :set_parents, only: [:new, :edit]

  def index
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
    @categories = @message.categories
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
    if @message.update(message_params)
      if @message[:draft_status] == nil
        redirect_to message_path(@message.id)
      else
        redirect_to root_path
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

  def trash_update
    @message.update(trash_status: 1)
    redirect_to root_path
  end

  def  draft_update
    if @message.present?
      @message.update(draft_status: 1)
      redirect_to root_path
    else
      @message = Message.new(message_params)
      @message[:draft_status] = 1
      @message.save
      redirect_to root_path
    end
  end

  def tag_spread
    if params[:parent_id]
      parent = Category.find(params[:parent_id])
      @children = parent.children
    end
  end

  def tag_search
    if params[:tag_id]
      tag = Category.find(params[:tag_id])
      @messages = tag.messages.where(trash_status: nil, draft_status: nil).order(created_at: "DESC")
    end
  end
  
  def index_in
  end

  def index_out
  end

  private
    def set_message
      @message = Message.find(params[:id])
    end
    
    def set_messages
      @messages = Message.where(trash_status: nil, draft_status: nil).includes(:user).order(created_at: "DESC").page(params[:page]).per(6)  # .order("created_at DESC")
    end

    def set_parents
      @parents = Category.where(ancestry: nil)
    end

    def set_message_user
      @user = User.find(@message.user_id)
    end

    def message_params
      params.require(:message).permit(:title, :body, :draft_status,images_attributes: [:img_src, :_destroy, :id], category_ids: []).merge(user_id: current_user.id)
    end
end
