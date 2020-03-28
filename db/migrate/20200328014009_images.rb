class Images < ActiveRecord::Migration[5.2]
  def change
    create_table :images do |t|
      t.text :img_src
      t.references :message, foreign_key: true
      t.timestamps
    end
  end
end
