class AddDepartmentAndDescriptionToOfficers < ActiveRecord::Migration[8.1]
  def change
    add_column :officers, :department, :string
    add_column :officers, :description, :text
  end
end
