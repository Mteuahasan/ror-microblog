class Post < ActiveRecord::Base
  belongs_to :mood
  belongs_to :user
  validates :mood_id, presence: true
  validates_length_of :content, :minimum => 5, :maximum => 280

  has_many :like_relationships, class_name: "LikeRelationship", foreign_key: "post_id", dependent: :destroy
  has_many :likes, through: :like_relationships, source: :user

  has_many :repost_relationships, class_name: "RepostRelationship", foreign_key: "post_id", dependent: :destroy
  has_many :reposts, through: :repost_relationships, source: :post
  has_many :reposters, through: :repost_relationships, source: :user

  def self.like?(user_id, post_id)
    user = User.find_by(id: user_id)
    Post.find_by(id: post_id).likes.include?(user)
  end

  def like(user_id)
    like_relationships.create(user_id: user_id)
  end

  def unlike(user_id)
    like_relationships.find_by(user_id: user_id).destroy
  end

  def repost(user_id)
    repost_relationships.create(user_id: user_id)
  end

  def unrepost(user_id)
    repost_relationships.find_by(user_id: user_id).destroy
  end
end
