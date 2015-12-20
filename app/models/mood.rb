class Mood < ActiveRecord::Base
  has_many :posts

  validates :value, presence: true, uniqueness: true
  validates :name, presence: true, uniqueness: true
end
