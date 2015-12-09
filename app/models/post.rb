class Post < ActiveRecord::Base
  has_one :mood
  belongs_to :user
  validates :mood_id, presence: true
end
