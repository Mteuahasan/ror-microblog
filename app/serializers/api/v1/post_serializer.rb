class Api::V1::PostSerializer < Api::V1::BaseSerializer
  attributes :id, :content, :created_at, :updated_at
  has_one :mood, embbed: :objects
  has_one :user, embbed: :objects
end