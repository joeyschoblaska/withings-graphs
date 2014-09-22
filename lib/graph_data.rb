Withings.consumer_key = ENV["WITHINGS_KEY"]
Withings.consumer_secret = ENV["WITHINGS_SECRET"]

class WithingsGraphs::GraphData
  attr_accessor :user

  def initialize(user_id, token, secret)
    @user = Withings::User.authenticate(user_id, token, secret)
  end

  def measurements
    user.measurement_groups
  end
end
