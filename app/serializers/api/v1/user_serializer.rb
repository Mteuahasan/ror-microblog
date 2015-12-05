class Api::V1::UserSerializer < Api::V1::BaseSerializer
  attributes :id, :email, :first_name, :last_name, :pseudo, :active, :admin, :created_at, :img_url, :updated_at

  # For later
  # has_many :posts
  # has_many :following
  # has_many :followers
  # has_many :likes

  def created_at
    object.created_at.in_time_zone.iso8601 if object.created_at
  end

  def updated_at
    object.updated_at.in_time_zone.iso8601 if object.created_at
  end
end