class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :pseudo
      t.string :first_name
      t.string :last_name
      t.string :img_url
      t.string :email
      t.string :password
      t.string :description
      t.boolean :admin, :default => false
      t.boolean :active, :default => true
      t.timestamps null: false
    end
  end
end
