class WithingsGraphs < Sinatra::Base
  require "./lib/helpers"

  helpers WithingsGraphs::Helpers

  use Rack::Session::Cookie, expire_after: 60 * 60 * 24 * 365,
                             secret: ENV["SESSION_SECRET"]

  use OmniAuth::Builder do
    provider :withings, ENV["WITHINGS_KEY"], ENV["WITHINGS_SECRET"]
  end

  get "/" do
    "Hello!"
  end

  get "/auth/:name/callback" do
    session[:user_id] = env["omniauth.auth"]["uid"]
    session[:oauth_token] = env["omniauth.auth"]["credentials"]["token"]
    session[:oauth_secret] = env["omniauth.auth"]["credentials"]["secret"]
  end
end
