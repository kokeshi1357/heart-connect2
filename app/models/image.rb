class Image < ApplicationRecord
 mount_uploader :img_src, ImageUploader
 belongs_to :message
end
