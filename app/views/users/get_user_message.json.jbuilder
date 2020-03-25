json.message do
  json.merge! @message.attributes
end

json.images do
 json.array! @images, :id, :img_src
end