class AddIconAndColorToTaxServices < ActiveRecord::Migration[8.1]
  def change
    add_column :tax_services, :icon, :string
    add_column :tax_services, :color, :string
  end
end
