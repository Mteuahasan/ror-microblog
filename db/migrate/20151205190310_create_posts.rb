class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :content
      t.string :image_url
      t.integer :user_id
      t.timestamps null: false
    end
  end
end
