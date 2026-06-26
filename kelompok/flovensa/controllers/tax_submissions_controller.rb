class TaxSubmissionsController < ApplicationController
  before_action :set_tax_submission, only: %i[show update destroy]

  # GET /tax_submissions
  def index
    @tax_submissions = TaxSubmission.includes(:tax_service)

    render json: @tax_submissions.as_json(
      include: {
        tax_service: {
          only: [:id, :name]
        }
      }
    )
  end

  # GET /tax_submissions/1
  def show
    render json: @tax_submission.as_json(
      include: {
        tax_service: {
          only: [:id, :name]
        }
      }
    )
  end

  # POST /tax_submissions
  def create
    @tax_submission = TaxSubmission.new(tax_submission_params)

    if @tax_submission.save
      render json: @tax_submission.as_json(
        include: {
          tax_service: {
            only: [:id, :name]
          }
        }
      ), status: :created
    else
      render json: @tax_submission.errors, status: :unprocessable_content
    end
  end

  # PATCH /tax_submissions/1
  def update
    if params[:tax_submission][:status] == "Approved"
      @tax_submission.approved_at = Time.current
      @tax_submission.rejected_at = nil
    elsif params[:tax_submission][:status] == "Rejected"
      @tax_submission.rejected_at = Time.current
      @tax_submission.approved_at = nil
    end

    if @tax_submission.update(tax_submission_params)
      render json: @tax_submission.as_json(
        include: {
          tax_service: {
            only: [:id, :name]
          }
        }
      )
    else
      render json: @tax_submission.errors, status: :unprocessable_content
    end
  end

  # DELETE /tax_submissions/1
  def destroy
    @tax_submission.destroy!
    head :no_content
  end

  private

  def set_tax_submission
    @tax_submission = TaxSubmission.includes(:tax_service).find(params[:id])
  end

  def tax_submission_params
    params.require(:tax_submission).permit(
      :tax_service_id,
      :taxpayer_name,
      :npwp,
      :fiscal_year,
      :amount,
      :notes,
      :status,
      :approved_at,
      :rejected_at
    )
  end
end