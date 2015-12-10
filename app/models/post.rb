class Post < ActiveRecord::Base
  belongs_to :mood
  belongs_to :user
  validates :mood, presence: true
end
