class TaxSubmission < ApplicationRecord
  belongs_to :tax_service

  validates :taxpayer_name, presence: true
  validates :npwp, presence: true
  validates :fiscal_year, presence: true
  validates :amount, presence: true
  validates :status, presence: true
end