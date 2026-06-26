class Officer < ApplicationRecord
  before_validation :generate_slug

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :phone, presence: true
  validates :position, presence: true
  validates :department, presence: true
  validates :description, presence: true
  validates :status, presence: true
  validates :slug, uniqueness: true

  private

  def generate_slug
    self.slug = name.parameterize if slug.blank?
  end
end 