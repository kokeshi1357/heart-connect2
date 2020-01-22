json.extract! message, :id, :title, :body, :image, :created_at, :updated_at
json.url message_url(message, format: :json)
