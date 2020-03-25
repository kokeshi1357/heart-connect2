class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  mount_uploader :user_image, ImageUploader

  validates :name,    presence: true, length: {maximum: 25 }
  validates :character,   presence: true
  validates :email,   presence: true
  # validates :password, presence: true, length: {minimum: 8 }

  has_many :message, dependent: :destroy
  has_many :dms, dependent: :destroy
  has_many :entries, dependent: :destroy
  has_many :comments, dependent: :destroy
end
