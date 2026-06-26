require "test_helper"

class TaxServicesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @tax_service = tax_services(:one)
  end

  test "should get index" do
    get tax_services_url, as: :json
    assert_response :success
  end

  test "should create tax_service" do
    assert_difference("TaxService.count") do
      post tax_services_url, params: { tax_service: {} }, as: :json
    end

    assert_response :created
  end

  test "should show tax_service" do
    get tax_service_url(@tax_service), as: :json
    assert_response :success
  end

  test "should update tax_service" do
    patch tax_service_url(@tax_service), params: { tax_service: {} }, as: :json
    assert_response :success
  end

  test "should destroy tax_service" do
    assert_difference("TaxService.count", -1) do
      delete tax_service_url(@tax_service), as: :json
    end

    assert_response :no_content
  end
end
