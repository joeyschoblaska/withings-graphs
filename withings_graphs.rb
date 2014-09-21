class WithingsGraphs < Sinatra::Base
  use Rack::Session::Cookie

  use OmniAuth::Builder do
    provider :withings, ENV["WITHINGS_KEY"], ENV["WITHINGS_SECRET"]
  end

  get "/" do
    "Hello!"
  end

  get "/auth/:name/callback" do
    "Done"
  end
end
