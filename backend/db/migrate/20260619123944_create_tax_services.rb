class CreateTaxServices < ActiveRecord::Migration[8.1]
  def change
    create_table :tax_services do |t|
      t.string :name
      t.text :description
      t.string :status

      t.timestamps
    end
  end
end