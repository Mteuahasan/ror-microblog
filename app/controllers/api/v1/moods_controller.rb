class Api::V1::MoodsController < Api::V1::BaseController
  def index
    moods = Mood.all
    moods = moods.map { |mood|
      Api::V1::MoodSerializer.new(mood)
    }
    render(json: moods.to_json)
  end

  def create
    @mood = Mood.new(mood_params)
    if @mood.save
      render :nothing => true, :status => :created
    else
      render :json => { :errors => @mood.errors.messages }, :status => :bad_request
    end
  end

  private

  def mood_params
    params.require(:mood).permit(:name, :value, :image_url)
  end
end
