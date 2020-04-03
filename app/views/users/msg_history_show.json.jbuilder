json.array! @messages do |msg|
 json.id    msg.id
 json.title msg.title
 json.body  msg.body
 json.created_at msg.created_at.strftime('%Y/%m/%d %H:%M')
 json.images msg.images
 json.draft_status msg.draft_status
end