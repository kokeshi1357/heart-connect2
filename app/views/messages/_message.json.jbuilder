json.message do
  json.extract! @message, :id, :body
end

json.array! @images do |image|
  json.id image.id
  json.img_src image.img_src
end

# json.url message_url(@message, format: :json)
