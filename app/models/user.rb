class User < ActiveRecord::Base
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :pseudo, presence: true
  validates :email, presence: true
  validates :password, presence: true
end
