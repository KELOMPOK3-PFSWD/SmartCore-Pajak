class AddSlugToTaxServices < ActiveRecord::Migration[8.1]
  def change
    add_column :tax_services, :slug, :string
    add_index :tax_services, :slug, unique: true
  end
end