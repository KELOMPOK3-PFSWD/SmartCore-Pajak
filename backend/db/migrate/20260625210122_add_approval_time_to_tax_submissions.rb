class AddApprovalTimeToTaxSubmissions < ActiveRecord::Migration[8.1]
  def change
    add_column :tax_submissions, :approved_at, :datetime
    add_column :tax_submissions, :rejected_at, :datetime
  end
end
