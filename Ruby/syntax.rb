# 1. Variables
  new_name  = 'value' | true  | 269 | {}  | []
  counter = counter + 1
  counter +=  1     # -=, *=, /=

# 2. String methods
  'name'.length           # =>  4
  'name'.reverse          # =>  'eman'
  'name'.upcase           # =>  'NAME'
  'NAME'.downcase         # =>  'name'
  'name'.capitalize       # =>  'Name'
  'name'.reverse.upcase   # =>  'Eman'  (chaining)

# 3. Console commands
  print 'String here'   # =>  String
  puts  'String here'   # =>  String  {\n}

# 4. Comments
  # A single line comment
  =begin # only at the first line of a file
    A multi-line comment
    A multi-line comment
    A multi-line comment
  =end

# 5. Maths
  + # Sum
  - # Difference
  * # Production
  '/' # Division
  **  # Raise to a power
  % # Modulo

# 6. Comparators
  ==  # Equal to
  !=  # Not equal to
  > # Greater than
  >=  # Greater than or equal to
  < # Less than
  <=  # Less than or equal to

  # Logics:
  ||  # OR
  &&  # AND
  ! # NOT

# 7. Insert variables into strings
  1)  puts 'I am '  + name
  2)  puts 'I am #{name}'

# 8. Rewrite a variable with a method
  # If a method is called with no '!', then a copy of variable is returned
  # To avoid this and REWRITE the variable, put '!' after method
  name = 'Victor'
  puts name.upcase  # =>  'VICTOR'
  puts name         # =>  'Victor'
  puts name.upcase! # =>  'VICTOR'
  puts name         # =>  'VICTOR'

# 9. Types conversion
  42.to_s       # =>  '42'
   '42'.to_i    # =>  42
  42.to_a       # =>  [42]

# 10. IF ELSE statement
  if condition
    # if condition  ==  true
  elsif condition2
    # if condition  ==  false &&
    # if condition2 ==  true
  else
    # if condition  ==  false &&
    # if condition2 ==  false
  end

# 11.  UNLESS statement
  unless  condition
    # if condition  ==  false
  else # Bad idea!
    # if condition  ==  true
  end

# 12. The WHILE loop
  while condition
    # while condition is true
  end

# 13. The UNTIL loop
  until condition
    # while condition is false
  end

# 14. The FOR loop
  for num in  1...10      # Exclusively (because of '...')
    # do something    # To include 10, write 'in 1..10'
  end

# 15. The LOOP method
  i = 20
  loop do
    i -=  1
    next if i%2 ==  0   # Skip all odd numbers
    print i
    break if  i <= 0    # Stop the loop
  end

# 16. The EACH iterator is used for arrays  and hashes
  arr.each do |placeholder_for_elem|
    # Code here
  end

  Or (the same)

  arr.each  {
    |placeholder_for_elem|
    #code here
  }

# 17. The TIMES iterator
  5.times {print  'Hey!'}   # =>  Hey!Hey!Hey!Hey!Hey!

# 18. Get user input
  input = gets          # Get what user inputs
  input.chomp           # Stick to a single string
  if input include? 'String to check for'
    input.gsub!(/letter/,'new text')  # global substring
  else
    puts 'not found'
  end

# 19. Methods
  def method_name(args)
    # Code here
  end

  # It is possible to pass unpredicted number of args with splat arguments
  def greet(mess, *people)
    people.each { |p| puts '#{mess}, #{p}!' }
    return mess
  end
