Withings.consumer_key = ENV["WITHINGS_KEY"]
Withings.consumer_secret = ENV["WITHINGS_SECRET"]

class WithingsGraphs::GraphData
  attr_accessor :user

  def initialize(user_id, token, secret)
    @user = Withings::User.authenticate(user_id, token, secret)
  end

  def measurements
    user.measurement_groups(device: Withings::SCALE).sort_by(&:taken_at)
  end

  def graph_data
    measurements.map do |m|
      { date: m.taken_at.strftime("%Y-%m-%d"), value: (m.weight * 2.204).round(2) }
    end
  end
end
