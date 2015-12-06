class AddMoodToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :mood_id, :integer
  end
end
