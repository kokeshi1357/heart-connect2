class Category < ApplicationRecord
  has_many :msg_categories
  has_many :messages, through: :msg_categories
  has_ancestry
end
