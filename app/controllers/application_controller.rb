class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  layout :layout_by_resource

  before_action :configure_permitted_parameters, if: :devise_controller?

  def layout_by_resource
    if devise_controller?
      "landing"
    else
      "application"
    end
  end

  def authorize_admin!
    if !current_user.admin?
      flash[:error] = "Unauthorized"
      redirect_to root_path
    end
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_in, keys: [:login, :username, :email, :password, :first_name, :last_name])
    devise_parameter_sanitizer.permit(:sign_up, keys: [:login, :username, :email, :password, :first_name, :last_name])
  end
end
