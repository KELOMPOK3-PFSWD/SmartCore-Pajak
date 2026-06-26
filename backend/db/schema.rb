# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_06_25_210122) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "officers", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "department"
    t.text "description"
    t.string "email"
    t.string "name"
    t.string "phone"
    t.string "position"
    t.string "slug"
    t.string "status"
    t.datetime "updated_at", null: false
  end

  create_table "tax_services", force: :cascade do |t|
    t.string "color"
    t.datetime "created_at", null: false
    t.text "description"
    t.string "icon"
    t.string "name"
    t.string "slug"
    t.string "status"
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_tax_services_on_slug", unique: true
  end

  create_table "tax_submissions", force: :cascade do |t|
    t.decimal "amount"
    t.datetime "approved_at"
    t.datetime "created_at", null: false
    t.integer "fiscal_year"
    t.text "notes"
    t.string "npwp"
    t.datetime "rejected_at"
    t.string "status"
    t.bigint "tax_service_id", null: false
    t.string "taxpayer_name"
    t.datetime "updated_at", null: false
    t.index ["tax_service_id"], name: "index_tax_submissions_on_tax_service_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email"
    t.string "identifier_number"
    t.string "name"
    t.string "password_digest"
    t.string "phone"
    t.integer "type_id"
    t.datetime "updated_at", null: false
  end

  add_foreign_key "tax_submissions", "tax_services"
end
