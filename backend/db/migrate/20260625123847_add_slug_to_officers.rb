class AddSlugToOfficers < ActiveRecord::Migration[8.0]
  def change
    add_column :officers, :slug, :string
  end
end