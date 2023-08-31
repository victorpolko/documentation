# 1. To insert a Ruby-code into HTML (Ruby-injection)
  #<% [someActions] %>
  #<%= [someActionsToPrint] %>

# 2. To check all routes of project
  $ rake routes

# 4. image_tag Helper creates an <img> tag with some parameters
  # <%= image_tag [urlOfImage] %>

# 4. link_to Helper creates an <a> tag with some parameters
  # It is possible to generate a [linkRef] with Ruby instruments
  # This is good to check the code for errors: when some action cannot be found we'll see it in the log
  # <%= link_to '[LinkName]', '[linkRef]' %>

# 5. Ruby allows to work with project at the console mode, in which it is possible to manage all defined actions, controllers, create records, update database etc.
# To run the console
  $ rails c
# To see all DB
  > Category.all
# To create a new record inside a variable (not in DB)
  > cat = Category.new
# This now may be changed in any way
  > cat.name = 'Phones'
# After session end every change that was not saved to DB will be lost.
  > cat.save
# It's possible to create a record in DB in one line
  > Category.create name: 'Phones'
# To delete first DB record
  > Category.all.first.destroy
# To find a record by id
  > Category.find(2)

# 6. Edit something
  edit_category_path(id: category.id)
  # This is because in routes /categories/:id/edit(.:format) there is a parameter for this

# 7. Delete something
  link_to 'Delete something', @something, method: :delete, confirm: 'Sure?'

# 8. Symbol
  # Anything starting with ':' is called a symbol. It is always only 1 byte length in RAM
  :minimum => 3 # is the same as (new syntax)
  minimum: 3

# 9. Closure
  # Closure is the possibility to accept arguments from the same scope level as its caller is
  # ONLY Blocks maintain Closure
  tell = "woof woof!"
  class Puppy
    def say
      puts tell
    end
  end
  p = Puppy.new
  p.say                           # => nil

  # class is a CONSTANT which relates to Class object instance

  tell = "woof woof!"
  Puppy = Class.new do            # => Define an ANONYMOUS CLASS
    define_method(:say) do
      puts tell                     # tell is visible ONLY because is called within a BLOCK
    end
  end
  puts b.class                    # => Class
  puts("aaa")                     # => "aaa"
  p = Puppy.new                   # From now on this is class Puppy
  p.say                           # => "woof woof!"

# 10. Block
  # Block is something within {} or do-end pair
  # It is a bunch of code which can be passed to a method
  class Array
    def map2
      arr = []
      self.each do |a|
        arr << yield(a)   # => This 'yield' passes 'a' as a placeholder only (placeholder may be different) to a block-as-arg and returns its evaluation result right here
      end
      arr
    end
  end
  c = 3
  p (1..5).to_a.map2 { |b| b**2 + c } # => [4,7,12,19,28]

  # Variable 'c' was found within this block, placeholder 'b' was instead 'a'
  # Which is so terrifying for our brain!!!

# 11. Lambdas
  # The only way in Ruby to pass a function as argument is to pass it as lambda
  # lambda is alias for anonymous function or Proc, which is able to be called afterwards
  # it is the way to write a block to a variable WITH CLOSURE
  class Array
    def map2
      arr = []
      self.each do |a|
        arr << yield(a)
      end
      arr
    end
  end
  c = 3
  block_object = ->(b){ b**2 + c }    # this is lambda
  block_object = {|b| b**2 + c }      # this is lambda as well

  # Here we pass our lambda to our method as an argument
  p (1..5).to_a.map2(&block_object)   # => [4, 7, 12, 19, 28]

  c = 5   # Redefine the 'c' variable
  # Here we pass our lambda to our method as an argument
  p (1..5).to_a.map2(&block_object)   # => [6, 9, 14, 21, 30]

  # Lambdas may be passed to a method without its direct passing
  class Array
    def map2(&block)
      if block_given?                 # => special method
        arr = []
        self.each do |a|
          arr << block.call(a)
        end
        arr
      else
        "no block"
      end
    end

    def l_show(lam)
      lam.call
    end
  end

  c = 3
  # Here I won't PASS any arguments to method, but block is seen within it
  p (1..5).to_a.map2{|b| b**2 + c }   # => [4, 7, 12, 19, 28]
  p (1..5).to_a.map2                  # => "no block"

# 12. Proc
  # Proc is a block (see 10) that can be called more than once
  # Proc also has object properties while block does not
  # Proc is almost the same as lambda, but has two differences:
  # 1) proc doesn't check the number of arguments thus giving any arguments that are not stated a nil
  # 2) lambda passes control back to its caller while proc does not
  def batman_ironman_proc
    victor = Proc.new { return "Batman will win!" }
    victor.call
    "Iron Man will win!"
  end

  puts batman_ironman_proc    # => Batman will win!

  def batman_ironman_lambda
    victor = lambda { return "Batman will win!" }
    victor.call
    "Iron Man will win!"
  end

  puts batman_ironman_lambda    # => Iron Man will win!

# 13. Open GEM
  # It is often necessary to find out how a function works without going to Github
  bundle open [GEMname]
  # This will use standard text editor to open this gem
