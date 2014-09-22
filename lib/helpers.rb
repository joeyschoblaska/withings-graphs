class WithingsGraphs
  module Helpers
    def connected?
      session[:user_id].present? && session[:oauth_token].present? && session[:oauth_secret].present?
    end
  end
end
