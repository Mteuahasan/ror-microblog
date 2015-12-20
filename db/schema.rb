# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151220004415) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "like_relationships", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "post_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "like_relationships", ["post_id"], name: "index_like_relationships_on_post_id", using: :btree
  add_index "like_relationships", ["user_id", "post_id"], name: "index_like_relationships_on_user_id_and_post_id", unique: true, using: :btree
  add_index "like_relationships", ["user_id"], name: "index_like_relationships_on_user_id", using: :btree

  create_table "moods", force: :cascade do |t|
    t.string   "name"
    t.string   "img_url"
    t.integer  "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "posts", force: :cascade do |t|
    t.string   "content"
    t.string   "image_url"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "mood_id"
  end

  create_table "relationships", force: :cascade do |t|
    t.integer  "follower_id"
    t.integer  "followed_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "relationships", ["followed_id"], name: "index_relationships_on_followed_id", using: :btree
  add_index "relationships", ["follower_id", "followed_id"], name: "index_relationships_on_follower_id_and_followed_id", unique: true, using: :btree
  add_index "relationships", ["follower_id"], name: "index_relationships_on_follower_id", using: :btree

  create_table "repost_relationships", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "post_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "repost_relationships", ["post_id"], name: "index_repost_relationships_on_post_id", using: :btree
  add_index "repost_relationships", ["user_id", "post_id"], name: "index_repost_relationships_on_user_id_and_post_id", unique: true, using: :btree
  add_index "repost_relationships", ["user_id"], name: "index_repost_relationships_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "pseudo"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "img_url"
    t.string   "email"
    t.string   "password"
    t.string   "description"
    t.boolean  "admin",       default: false
    t.boolean  "active",      default: true
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

end
