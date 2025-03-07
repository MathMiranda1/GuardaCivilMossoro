class AddPlaintextPasswordToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :plaintext_password, :string
  end
end
