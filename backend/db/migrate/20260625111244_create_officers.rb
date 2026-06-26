class CreateOfficers < ActiveRecord::Migration[8.1]
  def change
    create_table :officers do |t|
      t.string :name
      t.string :email
      t.string :phone
      t.string :position
      t.string :status

      t.timestamps
    end
  end
end
