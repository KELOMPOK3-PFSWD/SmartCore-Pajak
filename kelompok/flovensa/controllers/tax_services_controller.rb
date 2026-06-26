class TaxServicesController < ApplicationController
  before_action :set_tax_service, only: %i[show update destroy]

  # GET /tax_services
  def index
    @tax_services = TaxService.all

    render json: @tax_services
  end

  # GET /tax_services/1
  def show
    render json: @tax_service
  end

  # POST /tax_services
  def create
    @tax_service = TaxService.new(tax_service_params)

    if @tax_service.save
      render json: @tax_service, status: :created, location: @tax_service
    else
      render json: @tax_service.errors, status: :unprocessable_content
    end
  end

  # PATCH/PUT /tax_services/1
  def update
    if @tax_service.update(tax_service_params)
      render json: @tax_service
    else
      render json: @tax_service.errors, status: :unprocessable_content
    end
  end

  # DELETE /tax_services/1
  def destroy
    @tax_service.destroy!
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_tax_service
    @tax_service = TaxService.find_by!(slug: params.expect(:id))
  end

  # Only allow a list of trusted parameters through.
  def tax_service_params
    params.require(:tax_service).permit(
      :name,
      :description,
      :status,
      :icon,
      :color
    )
  end
end