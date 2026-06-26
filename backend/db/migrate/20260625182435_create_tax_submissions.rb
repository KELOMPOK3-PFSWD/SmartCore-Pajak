class CreateTaxSubmissions < ActiveRecord::Migration[8.1]
  def change
    create_table :tax_submissions do |t|
      t.references :tax_service, null: false, foreign_key: true
      t.string :taxpayer_name
      t.string :npwp
      t.string :tax_type
      t.integer :fiscal_year
      t.decimal :amount
      t.text :notes
      t.string :status

      t.timestamps
    end
  end
end
