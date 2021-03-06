class Messages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.string :title
      t.text :body
      t.integer :trash_status
      t.integer :draft_status
      t.timestamps
      t.references :user, foreign_key: true
    end
  end
end
