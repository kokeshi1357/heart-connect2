class Message < ApplicationRecord
  has_many :comments, dependent: :destroy
  has_many :msg_categories
  has_many :categories, through: :msg_categories

  has_many :images, dependent: :destroy
  accepts_nested_attributes_for :images, allow_destroy: true

  belongs_to :user
end
