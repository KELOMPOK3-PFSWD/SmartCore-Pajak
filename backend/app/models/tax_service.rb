class TaxService < ApplicationRecord
  before_validation :generate_slug
  has_many :tax_submissions, dependent: :destroy

  validates :name, presence: true
  validates :description, presence: true
  validates :status, presence: true
  validates :slug, presence: true, uniqueness: true

  private

  def generate_slug
    self.slug = name.parameterize if slug.blank?
  end
end