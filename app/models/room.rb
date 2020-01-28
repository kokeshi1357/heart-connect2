class Room < ApplicationRecord
 has_many :dm, dependent: :destroy
 has_many :entries, dependent: :destroy
end
