class CreateMsgCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :msg_categories do |t|
      t.references :message, foreign_key: true
      t.references :category, foreign_key: true
      t.timestamps
    end
  end
end
