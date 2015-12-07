class Api::V1::UserSerializer < Api::V1::BaseSerializer
  attributes :id, :email, :first_name, :last_name, :pseudo, :img_url, :active, :admin, :created_at, :updated_at
  has_many :posts
end
