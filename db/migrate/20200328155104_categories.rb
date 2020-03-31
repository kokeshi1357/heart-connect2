class Categories < ActiveRecord::Migration[5.2]
  def change
    create_table :categories do |t|
      t.string :name, null:false, unique: true, default: ""
      t.string :ancestry, index: true
    end
  end
end
