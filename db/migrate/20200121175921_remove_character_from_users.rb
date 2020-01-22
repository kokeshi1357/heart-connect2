class RemoveCharacterFromUsers < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :character, :string
  end
end
