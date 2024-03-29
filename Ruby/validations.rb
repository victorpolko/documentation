# 1. Helpers:
  # 1)  # Accept license
    validates :license, acceptance: true
  # 2)  # Validate all associated models
    has_many  :books
    validates_associated  :books #  Do not set this in all associated models to prevent infinite loops
  # 3)  # Several fields with exactly same content (not null)
    # <%= text_field :person, :email %>
    # <%= text_field :person, :email_confirmation %>
    validates :email, confirmation: true
    validates :email_confirmation, presence: true
  # 4)  # If the value IS NOT in the given set of values
    validates :subdomain, exclusion: {
      in: %w(www us ca jp), # 'in'  is an alias for 'within'
      message: "Subdomain %{value} is reserved."
    }
  # 5)  # Format checking
    validates :legacy_code, format: {
      with: /\A[a-zA-Z]+\z/,
      message: "Only letters allowed"
    }
  # 6)  # If the value IS in the given set of values
    validates :size, inclusion: {
      in: %w(small medium large),
      message: "%{value} is not a valid size"
    }
  # 7)  # Value length. 'length'  is an alias for 'size'
    validates :name, length: {
      minimum: 2,
      too_long: "%{count} characters is the minimum allowed"
    }
    validates :bio, length: {
      maximum: 500,
      too_long: "%{count} characters is the maximum allowed"
    }
    validates :password, length: { in: 6..20 }
    validates :registration_number, length: { is: 6 }
  # 8)  # Value is numerical
    validates :games_played, numericality: {
      only_integer: true,
      greater_than: 2,
      greater_than_or_equal_to: 1,
      less_than: 2,
      less_than_or_equal_to:  1,
      odd:  true,
      even: false
    }
  # 9)  # Presence
    validates :name, :login, :email, presence: true
  # 10) # Absence
    validates :name, :login, :email, absence: true
  # 11) # Uniqueness
    # The validation happens by performing an SQL query into the model's table, searching for an existing record with the same value in that attribute.
    validates :email, uniqueness: { # or 'true'
      scope:      :year,
      case_sensitive: false,
      message:    "should happen once per year"
    }
  # 12) # Validate with other class
    class Person < ActiveRecord::Base
      validates_with GoodnessValidator
    end
    class GoodnessValidator < ActiveModel::Validator
      def validate(record)
        if record.first_name == "Evil"
          record.errors[:base] << "This person is evil"
        end
      end
    end
  # 13) # Validate by own method
    validates_each :name, :surname do |record, attr, value|
      record.errors.add(attr, 'must start with upper case') if value =~ /\A[a-z]/
    end


# 2. Validation options:
  # 1)  # Skip the validation when the value being validated is nil
    validates :size, inclusion: {
      in: %w(small medium large),
      message: "%{value} is not a valid size"
    }, allow_nil: true
  # 2)  # Skip the validation when the value being validated is nil or empty string
    validates :title, length: {
      is: 5
    }, allow_blank: true
  # 3)  # Define when the validation should take place
    # it will be possible to update email with a duplicated value
    validates :email, uniqueness: true, on: :create
    # it will be possible to create the record with a non-numerical age
    validates :age, numericality: true, on: :update
    # the default (validates on both create and update)
    validates :name, presence: true, on: :save
  # 4)  # Use own validation method
    validates :password, confirmation: true, unless: Proc.new { |a| a.password.blank? }
  # 5)  # Validations grouping
    with_options if: :is_admin? do |admin|
      admin.validates :password, length: {
        minimum: 10
      }
      admin.validates :email, presence: true
    end
  # 6)  # Validations combination
    validates :mouse, presence: true,
      if: ["market.retail?", :desktop?]
      unless: Proc.new { |c| c.trackpad.present? }

# 3. Custom validators:
  # Must define {validate} method
  class MyValidator < ActiveModel::Validator
    def validate(record)
      unless record.name.starts_with? 'X'
        record.errors[:name] << 'Need a name starting with X please!'
      end
    end
  end
  class Person
    include ActiveModel::Validations
    validates_with MyValidator
  end


# 4. Custom methods:
  class Invoice < ActiveRecord::Base
    validate :expiration_date_cannot_be_in_the_past,
      :discount_cannot_be_greater_than_total_value
    def expiration_date_cannot_be_in_the_past
      if expiration_date.present? && expiration_date < Date.today
        errors.add(:expiration_date, "can't be in the past")
      end
    end
    def discount_cannot_be_greater_than_total_value
      if discount > total_value
        errors.add(:discount, "can't be greater than total value")
      end
    end
  end

# 5. Errors methods:
  # 1)  # Return an instance of the class ActiveModel::Errors containing all errors. Each key is the attribute name and the value is an array of strings with all errors.
    class Person < ActiveRecord::Base
      validates :name, presence: true, length: { minimum: 3 }
    end

    person  = Person.new
    person.valid?       # => false
    person.errors       # => {:name=>["can't be blank", "is too short (minimum is 2 characters)"]}    (same as:)
    person.errors[:name]    # => {:name=>["can't be blank", "is too short (minimum is 2 characters)"]}

    person  = Person.new(name: "John Doe")
    person.valid?       # => true
    person.errors       # => []
    person.errors[:name]    # => []
