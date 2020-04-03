json.array! @messages do |msg|
  json.id    msg.id
  json.title msg.title
  json.date  msg.created_at.strftime('%Y/%m/%d %H:%m')
  json.image msg.images[0].img_src
  json.user_name      msg.user.name
  json.user_character msg.user.character
end