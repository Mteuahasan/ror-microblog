class User < ActiveRecord::Base
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :pseudo, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }
  validates_confirmation_of :password, :if=>:password_changed?
  validates :password, presence: true

  has_many :posts, dependent: :destroy
  has_many :active_relationships, class_name: "Relationship", foreign_key: "follower_id", dependent: :destroy
  has_many :following, through: :active_relationships, source: :followed
  has_many :passive_relationships, class_name:  "Relationship", foreign_key: "followed_id", dependent:   :destroy
  has_many :followers, through: :passive_relationships, source: :follower

  has_many :repost_relationships, class_name: "RepostRelationship", foreign_key: "user_id", dependent: :destroy
  has_many :reposts, through: :repost_relationships, source: :post

  has_many :like_relationships, class_name: "LikeRelationship", foreign_key: "user_id", dependent: :destroy
  has_many :likes, through: :like_relationships, source: :post

  before_save :hash_password, :if=>:password_changed?

  def self.find_by_credentials(identifier, password)
    if user = User.find_by(pseudo: identifier) || User.find_by(email: identifier)
      if BCrypt::Password.new(user.password).is_password? password
        return user
      else
        return nil
      end
    end
    return nil
  end

  def self.following?(user1, user2_id)
    user2 = User.find_by(id: user2_id)
    User.find_by(id: user1).following.include?(user2)
  end

  def password_changed?
    !self.password.blank?
  end

  def follow(other_user)
    active_relationships.create(followed_id: other_user.id)
  end

  def unfollow(other_user)
    active_relationships.find_by(followed_id: other_user.id).destroy
  end

  private

  def hash_password
    self.password = BCrypt::Password.create(self.password)
  end
end
