class User < ActiveRecord::Base
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :pseudo, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }
  validates_confirmation_of :password, :if=>:password_changed?
  validates :password, presence: true

  has_many :posts
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

  def password_changed?
    !self.password.blank?
  end

  private

  def hash_password
    self.password = BCrypt::Password.create(self.password)
  end
end
