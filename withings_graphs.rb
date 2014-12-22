class WithingsGraphs < Sinatra::Base
  require "./lib/helpers"
  require "./lib/graph_data"

  helpers WithingsGraphs::Helpers

  use Rack::Session::Cookie, expire_after: 60 * 60 * 24 * 365,
                             secret: ENV["SESSION_SECRET"]

  use OmniAuth::Builder do
    provider :withings, ENV["WITHINGS_KEY"], ENV["WITHINGS_SECRET"]
  end

  get "/" do
    template = connected? ? :connected : :not_connected
    haml template, layout: :layout
  end

  get "/auth/:name/callback" do
    session[:user_id] = env["omniauth.auth"]["uid"]
    session[:oauth_token] = env["omniauth.auth"]["credentials"]["token"]
    session[:oauth_secret] = env["omniauth.auth"]["credentials"]["secret"]

    redirect to("/")
  end

  get "/graph_data" do
    client = GraphData.new(session[:user_id], session[:oauth_token], session[:oauth_secret])
  end
end
