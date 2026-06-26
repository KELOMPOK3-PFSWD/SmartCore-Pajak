class User < ApplicationRecord
  has_secure_password

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :phone, presence: true
  validates :identifier_number, presence: true, uniqueness: true
  validates :password, length: { minimum: 6 }, if: -> { password.present? }

  USER_TYPE = {
    0 => "User",
    1 => "Admin"
  }

  def user_type_caption
    USER_TYPE[type_id.to_i]
  end
end