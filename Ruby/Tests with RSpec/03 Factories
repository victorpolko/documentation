# Factory is a fast way to create a model instance
# Following convention, factories are named as "#{model}s"
# e.g. spec/factories/contacts.rb

FactoryGirl.define do
  factory :contact do
    name    'Victor'
    address '195274, Россия, Санкт-Петербург, улица Такая-то, дом Такой-то, корпус 9'
    website 'www.science.ru'
    sequence(:email) { |n| "victor_finger#{n}@was.here" }
    sequence(:phone) { |n| "+7921555#{n+1}#{n-1}#{n}9" }
  end
end

# With that in mind it is possible to rewrite our contact_spec.rb:
require 'spec_helper'

describe Contact do
  it 'has a valid Factory' do
    expect(FactoryGirl.build(:contact)).to be_valid
  end

  context 'presence validation' do
    it 'is invalid without name' do
      expect(FactoryGirl.build(:contact, name: nil)).to have(2).errors_on(:name)
    end

    it 'is invalid without phone' do
      expect(FactoryGirl.build(:contact, phone: nil)).to have(2).errors_on(:phone)
    end

    it 'is invalid without email address' do
      expect(FactoryGirl.build(:contact, email: nil)).to have(1).errors_on(:email)
    end
  end

  it 'is invalid with    a duplicate email address' do
    FactoryGirl.create(:contact, email: 'victor@nodogs.here')
    expect(FactoryGirl.build(:contact, email: 'victor@nodogs.here')).to have(1).errors_on(:email)
  end

  context 'name validation' do
    it 'is invalid with    wrong name symbols' do
      expect(FactoryGirl.build(:contact, name: 'I am here, мистер 9!')).to have(1).errors_on(:name)
    end

    it 'is invalid with    too short name' do
      expect(FactoryGirl.build(:contact, name: 'I')).to have(1).errors_on(:name)
    end
  end

  context 'address validation' do
    it 'is invalid with    too short address' do
      expect(FactoryGirl.build(:contact, address: 'S')).to     have(1).errors_on(:address)
    end

    it 'is invalid with    wrong address symbols' do
      expect(FactoryGirl.build(:contact, address: '#$%#$')).to have(1).errors_on(:address)
    end
  end

  context 'phone validation' do
    it 'is invalid with    too short phone' do
      expect(FactoryGirl.build(:contact, phone: '81321')).to    have(1).errors_on(:phone)
    end

    it 'is invalid with    alpha phone' do
      expect(FactoryGirl.build(:contact, phone: 'adasdasd')).to have(1).errors_on(:phone)
    end
  end

  context 'website validation' do
    it 'is invalid with    russian website symbols' do
      expect(FactoryGirl.build(:contact, website: 'фвывфы')).to      have(1).errors_on(:website)
    end

    it 'is invalid with    wrong website format' do
      expect(FactoryGirl.build(:contact, website: 'a.a.a')).to       have(1).errors_on(:website)
    end
  end

  it 'returns            contact name - email correctly' do
    contact = FactoryGirl.build(:contact, name: 'Victor', email: 'polko@are.here', phone: '+7123456789')
    expect(contact.to_s).to eq 'Victor - Polko'
  end

  describe 'filter attribute by letter' do
    before :each do
      [ { email: 'horse@dies.here'     },
        { email: 'creatures@lie.there' },
        { email: 'common@man.here'     }
      ].each do |cont|
        instance_variable_set("@#{cont[:email].split('@')[0]}", Contact.create(
          name:  cont[:email].split('@')[0].capitalize,
          email: cont[:email],
          phone: '+7123456789')
        )
      end
    end

    context 'matching letters' do
      it 'returns sorted array of results that match letter' do
        expect(Contact.by_letter(:name, 'c')).to eq [@common, @creatures]
      end
    end

    context 'non-matching letters' do
      it 'returns sorted array of results that match letter' do
        expect(Contact.by_letter(:name, 'c')).to_not include @horse
      end
    end
  end

end

# There is also syntax sugar for FactoryGirl
# In spec_helper:
RSpec.configure do |config|
  ..
  # Include Factory Girl syntax to simplify calls to factories
  config.include FactoryGirl::Syntax::Methods
  ..
end

# And now we can simply write build(:contact) instead of FactoryGirl.build(:contact)
..
it 'is invalid with    a duplicate email address' do
  create(:contact, email: 'victor@nodogs.here')
  expect(build(:contact, email: 'victor@nodogs.here')).to have(1).errors_on(:email)
end
..


# Factories also allow us create inherited resources like
FactoryGirl.define do
  factory :contact do
    name    'Victor'
    address '195274, Россия, Санкт-Петербург, улица Такая-то, дом Такой-то, корпус 9'
    website 'www.science.ru'
    sequence(:email) { |n| "victor_finger#{n}@was.here" }
    sequence(:phone) { |n| "+7921555#{n+1}#{n-1}#{n}9" }

    factory :personal_contact do
      type 'personal'
    end
  end
end

# Thus it is possible to create different types of contact with one directive


# Factories have tools to work with models' associations
# Once this contact model has phone model , which belongs to contact:
FactoryGirl.define do
  factory :phone do
    association :contact
    # This tells FactoryGirl to create new contact for this phone instance to belong to, if one wasn't passed into build(create) method:
    phone '+79898798722'

    # e.g. we want several types of phones
    factory :home_phone do
      type 'home'
    end
    # From now on if we call create(or)build(:home_phone) it will create a contact and a phone with type = 'home'
  end
end

# Faker
# Factories use Faker gem to retrieve random real-like data
# There are a lot of different Faker classes methods
# https://github.com/stympy/faker/blob/master/lib/faker
require 'faker'

FactoryGirl.define do
  factory :contact do
    name    { Faker::Name.name}
    address { [Faker::Address.zip_code, Faker::Address.country, Faker::Address.city, Faker::Address.street_address].join(', ') }
    website { Faker::Internet.domain_name }
    email   { Faker::Internet.email }
    phone   { Faker::PhoneNumber.phone_number }
  end
end

# Callbacks
# Factories allow callbacks:
require 'faker'

FactoryGirl.define do
  factory :contact do
    name    { Faker::Name.name}
    address { [Faker::Address.zip_code, Faker::Address.country, Faker::Address.city, Faker::Address.street_address].join(', ') }
    website { Faker::Internet.domain_name }
    email   { Faker::Internet.email }
    phone   { Faker::PhoneNumber.phone_number }

    before(:build) do |contact|
      # do anything
    end

    before(:create) do |contact|
      # do anything
    end

    after(:build) do |contact|
      # do anything
    end

    after(:create) do |contact|
      # do anything
    end
  end
end
