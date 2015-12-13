class CreateRepostRelationships < ActiveRecord::Migration
  def change
    create_table :repost_relationships do |t|
      t.integer :user_id
      t.integer :post_id
      t.timestamps null: false
    end
    add_index :repost_relationships, :user_id
    add_index :repost_relationships, :post_id
    add_index :repost_relationships, [:user_id, :post_id], unique: true
  end
end
