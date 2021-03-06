# 1. Add dependencies to the Gemfile
  group :development, :test do
    gem "rspec-rails", "~> 2.14.0"
    gem "factory_girl_rails", "~> 4.2.1"
  end

  group :test do
    gem "faker", "~> 1.1.2"
    gem "capybara", "~> 2.1.0"
    gem "database_cleaner", "~> 1.0.1"
    gem "launchy", "~> 2.3.0"
    gem "selenium-webdriver", "~> 2.35.1"
  end

# 2. Configure database (database.yml)
  test:
    adapter: postgresql
    encoding: unicode
    database: ruby_shop_test
    pool: 5
    username:
    password:

# 3. Configure RSpec
  $ bundle exec rails generate rspec:install

  Output to look better (.rspec)
    --format documentation

# 4. Configure Spec Generators (application.rb)
  class Application < Rails::Application
    ..
    config.generators do |g|
      g.test_framework :rspec,
        fixtures:         true,   # specifies to generate a fixture for each model (using a Factory Girl factory, instead of an actual fixture)
        view_specs:       false,  # skip generating view specs. Instead we’ll use feature specs to test interface elements.
        helper_specs:     false,  # skips generating specs for the helper files Rails generates with each controller.
        routing_specs:    false,  # omits a spec file for config/routes.rb
        controller_specs: true,   # specifies to generate a fixture for each controller (using a Factory Girl factory, instead of an actual fixture)
        request_specs:    false   # skips RSpec’s defaults for adding integration-level specs in spec/requests.
      g.fixture_replacement :factory_girl, dir: "spec/factories" # tells Rails to generate factories instead of fixtures, and to save them in the spec/factories directory
    end
    ..
  end

# 5. Clone development database schema to test database
  $ rake db:test:clone

# 6. Run tests
  $ rspec
  or
  $ bundle exec rspec
