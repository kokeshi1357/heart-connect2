class Comments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.text :text, null: false
      t.integer :user_id, null: false
      t.integer :message_id, null: false
      t.integer :comment_num
      t.integer :replied_num
      t.timestamps
    end
  end
end
