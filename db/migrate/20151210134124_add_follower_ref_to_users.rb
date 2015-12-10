class AddFollowerRefToUsers < ActiveRecord::Migration
  def change
    add_reference :users, :followed, index: true
  end
end
