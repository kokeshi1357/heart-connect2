class AddCharacterToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :character, :string
  end
end
