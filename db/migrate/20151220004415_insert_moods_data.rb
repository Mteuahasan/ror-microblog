class InsertMoodsData < ActiveRecord::Migration
  def self.up
    Mood.create(:name => "Love", :img_url => "love", :value => "9")
    Mood.create(:name => "Excited", :img_url => "excited", :value => "8")
    Mood.create(:name => "Funny", :img_url => "funny", :value => "7")
    Mood.create(:name => "Cool", :img_url => "cool", :value => "6")
    Mood.create(:name => "Happy", :img_url => "happy", :value => "5")
    Mood.create(:name => "Pirate", :img_url => "pirate", :value => "4")
    Mood.create(:name => "Tired", :img_url => "tired", :value => "3")
    Mood.create(:name => "Shocked", :img_url => "shocked", :value => "2")
    Mood.create(:name => "Nervous", :img_url => "nervous", :value => "1")
    Mood.create(:name => "Sad", :img_url => "sad", :value => "0")
  end
end
