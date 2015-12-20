class Mood < ActiveRecord::Base
  has_many :posts
end
