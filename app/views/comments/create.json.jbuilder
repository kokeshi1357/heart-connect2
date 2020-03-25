# json.comment do
 
# end

# json.reply do
 
# end
if @comment.replied_num != 0
  json.text  @comment.text
  json.user_id  @comment.user_id
  json.user_name  @comment.user.name
  json.created_at @comment.created_at
  json.image @comment.user.user_image.url
  json.comment_num @comment.comment_num
  json.replied_num @comment.replied_num
else
  json.text  @comment.text
  json.user_id  @comment.user_id
  json.user_name  @comment.user.name
  json.created_at @comment.created_at
  json.image @comment.user.user_image.url
  json.comment_num @comment.comment_num
end