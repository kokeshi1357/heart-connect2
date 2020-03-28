class Dms < ActiveRecord::Migration[5.2]
  def change
    create_table :dms do |t|
      t.references :user, foreign_key: true
      t.references :room, foreign_key: true
      t.text :content
      t.text :image

      t.timestamps
    end
  end
end
