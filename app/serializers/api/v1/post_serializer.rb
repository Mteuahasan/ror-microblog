class Api::V1::PostSerializer < Api::V1::BaseSerializer
  attributes :id, :content, :mood_id, :created_at, :updated_at
  has_one :user
end