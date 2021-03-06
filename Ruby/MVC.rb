# Ruby uses Model-View-Controller architecture with these types automatical generation

# 1. Create a controller
# To create a new controller

    $ cd [pathToProject]
    $ rails generate controller [controllerName]

# From now on there is a [controllerName]_controller in /[pathToProject]/app/controllers/

# 2. Define an action
# To define a new action within it
    def [actionName]
        [someActions]
    end

# 3. Create a view
# Then it is necessary to create a view in /[pathToProject]/app/views/[controllerName]/ with name=[actionName] and any content
# This content is included within <body> tag by default, or instead of <%= yield %> in layout-file. (application.html.erb by default)

# 4. Add a route to this view
# It is necessary to write a route to view in /[pathToProject]/config/routes.rb
# The main page is defined with
    root '[controllerName]#[actionName]'

# Any other view is added withinh a GET-request to a necessary view
    get '[controllerName]/[actionName]'

# It is possible to create an alias for any controller/action pair like this
    get '[pathInBrowser]' => '[controllerName]#[actionName]'
# From now on we have a path like http://0.0.0:3000/pathInBrowser for this controller/action pair

# 5. Model is a template for database records. To create a model
    $ rails g Category  #   in singular!!
# After that two important files appear in project:
    # /models/category.rb/
    # /db/migrate/create_categories

# 6. Migrations are manually pre-created changes in database.
  # All migrations are in /app/db/migrate folder
    class CreateMembers < ActiveRecord::Migration
      def change
        create_table :members do |t|
          t.string  :name
          t.string  :position
          t.string  :age
          t.timestamps
        end
      end
    end

  # They contain a list of changes to database which should be called upon it when we say
    $ rake db:migrate

  # Most of actions are rollbackable, except some which are strange: change_column, rename_column..
  # For these guys it is necessary to define 2 Methods: up and down. Up is called when migrate, down is called when rollback
    class ChangeDescriptionTypeInPost < ActiveRecord::Migration
      def up
        change_column :posts, :description, :text, limit: 1024*100
      end

      def down
        change_column :posts, :description, :string
      end
    end

  # After a model was created it is necessary to run migrations, because otherwise model will link to nowhere
  # Migration may be rolled back
    $ rake db:rollback

# 7. Controller for newly created model should be generated
    $ rails g controller Categories #   in plural!!

  # Actions inside this controller will manage our model

  # Ruby defines 7 names for stadard operations
    index       #   show all records
    new         #   create a record
    create      #   create a record and save it to DB
    edit        #   edit a record
    update      #   refresh a record
    show        #   show certain record
    destroy     #   delete a record

  # For example, index action:
    def index
        @category   =   Category.all
        # @ means that this variable is seen inside corresponding view (index.html.erb)
        # Category.all shows all records (as with the console)
    end

    # In index.html.erb (no comments)
    #   <h1>Categories</h1>
    #
    #   <table class="table">
    #       <%  @categories.each do |category|  %>
    #           <tr>
    #               <td><%= category.name   %></td>
    #           </tr>
    #       <%  end %>
    #   </table>
    #
    #   <%= link_to 'Create a new category', new_category_path, class: 'btn btn-#primary'   %>

  # It is possible to automatically generate all necessary routes from a controller for seven standard actions:
    #   index
    #   new
    #   create
    #   edit
    #   update
    #   destroy
    #   show
    resources :categories

    # This will automatically create all necessary paths
    #   Prefix  Verb    URI     Pattern                         Controller#Action
    #           root    GET     /                               welcome#index
    #           about   GET     /about(.:format)                welcome#about
    #       contacts    GET     /contacts(.:format)             about#contacts
    #           team    GET     /team(.:format)                 about#team
    #       products    GET     /products(.:format)             about#products
    #       categories  GET     /categories(.:format)           categories#index
    #                   POST    /categories(.:format)           categories#create
    #   new_category    GET     /categories/new(.:format)       categories#new
    #   edit_category   GET     /categories/:id/edit(.:format)  categories#edit
    #       category    GET     /categories/:id(.:format)       categories#show
    #                   PATCH   /categories/:id(.:format)       categories#update
    #                   PUT     /categories/:id(.:format)       categories#update
    #                   DELETE  /categories/:id(.:format)       categories#destroy

# 8. Scaffold is something we can call 'template'
    $ rails g controller Category name:string description:text price:float renewed_at:datetime  #   in singular!!

  # This magic will generate
    1)  A model Category
    2)  A migration with all those fields in it
    3)  A categories_controller with all standard predefined actions
    4)  All views for controller
    5)  All tests
    6)  A new record in routes.rb
    7)  JSON-builders
    8)  A stylesheet scaffolds.css.scss, which should be deleted when using Bootstrap

# 9. Associations
  # Associations create bindings between different models
  # it is usable e.g. when a User model can have many Comment models, here a Comment model can belong to only one User model
  # Such associations are defined within Model itself with keywords has_many and belongs_to
  class Item < ActiveRecord::Base
    belongs_to  :category
    has_many    :comments, dependent: :destroy
  end

  class Comment < ActiveRecord::Base
    belongs_to :item
  end

  # Second option for has_many association defines what Rails should do when Item instance is deleted, but bindings still exist, which is no good
  # Here we tell it to destroy all dependent instances when an Item is deleted. Other option is to :nullify associations so that dependent instances continue to exist without parent instance.
