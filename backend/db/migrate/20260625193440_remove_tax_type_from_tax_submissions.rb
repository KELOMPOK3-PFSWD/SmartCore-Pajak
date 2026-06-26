class RemoveTaxTypeFromTaxSubmissions < ActiveRecord::Migration[8.1]
  def change
    remove_column :tax_submissions, :tax_type, :string
  end
end
