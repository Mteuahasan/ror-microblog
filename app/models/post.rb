class Post < ActiveRecord::Base
  belongs_to :mood
  belongs_to :user
  validates :mood, presence: true

  has_many :like_relationships, class_name: "LikeRelationship", foreign_key: "post_id", dependent: :destroy
  has_many :likes, through: :like_relationships, source: :user

  def like(user_id)
    like_relationships.create(user_id: user_id)
  end

  def unlike(user_id)
    like_relationships.find_by(user_id: user_id).destroy
  end
end
