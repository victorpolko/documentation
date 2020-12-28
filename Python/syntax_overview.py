# One-line comments are like this
''' Multi-line comments
are like this
but that works a little differently
at the start of the functions
'''

### Strings
print('\n\n### Strings')
print("same" == 'same') # Naming
print('something \'important\'') # Escaping

## Multiline Strings
print('\n## Multiline Strings')
print('Something\nand something')
print('''Hekki
Wha\na
No!''')
print(len('length'))

# User input
# name = input('Tell me your name: ')
# print('Your name is ' + name)

## Multitext
print('\n## Multitext')
print('Many ' * 11) # Integers only
print(('Many ' * 2) == (2 * 'Many ') == 'Many Many ')

## Formatting
print('\n# Formatting')
name = 'Jessy'
age = 29
print('Hi, ' + name + '!\nYou are ' + str(age) + ' years old!')

# %
# %s - String placeholder
# %d, %i, %u - Integer placeholder
# %f, %F - Float placeholder
print('Hi, %s!\nYou are %d years old!' % (name, age))

# .format()
print('Hi, {}!\nYou are {} years old!'.format(name, age))
print('{0}{1}{0}!'.format('abra', 'cad')) # Using indices
print('Hi, {name}!\nYou are {age} years old!'.format(name = 'Jessica', age = 30)) # Using named placeholders
person = { 'name': 'Sam', 'age': 34 }
print('Hi, {user[name]}!\nYou are {user[age]} years old!'.format(user = person)) # Using object keys
# Filling in with symbols: {argument:symbol=' '|position|length}
print('{0:*<11}'.format(name)) # Jessy******
print('{0:*>11}'.format(name)) # ******Jessy
print('{0:*^11}'.format(name)) # ***Jessy***
print('{0:*^12}'.format(name)) # ***Jessy****
print('{0:_<11}'.format(name)) # Jessy______
print('{0:_>11}'.format(name)) # ______Jessy
print('{0:_^11}'.format(name)) # ___Jessy___
print('{0:_^12}'.format(name)) # ___Jessy____
print('{0:_^4}'.format(name)) # Jessy - too short to fill, less than the argument length

## String functions
# split, join, replace, startswith, endswith, lower, upper
print('\n# String functions')
items = ['Lemon', 'Apple', 'Pinguin', 'Tesla']
joined = ', '.join(items) # Upside down, nuts!
print(joined)
print(joined.split(', ')) # split(sep, maxsplit = -1)
print(joined.split(', ') == items)
print(joined.split(', ', 1)) # => ['Lemon', 'Apple, Pinguin, Tesla']
print(joined.split(', ', 2)) # => ['Lemon', 'Apple', 'Pinguin, Tesla']

print('Hi, Man!'.replace('Man', 'Woman')) # replace(string_to_change, replacing_string)

print('Hi, Man!'.startswith('Hi')) # startswith(string, start_index = 0, end_index = -1) => True
print('Hi, Man!'.startswith('Man', 2, 4)) # => False
print('Hi, Man!'.startswith('Man', 3)) # => False
print('Hi, Man!'.startswith('Man', 4)) # => True
print('Hi, Man!'.startswith('Man', 4, 8)) # => True
print('Hi, Man!'.startswith('Man', 4, -1)) # => True

print('Hi, Man!'.endswith('!')) # => True
print('Hi, Man!'.endswith('Man!', 4)) # => True
print('Hi, Man!'.endswith('Man!', 5)) # => False
print('Hi, Man!'.endswith('Man', 4)) # => False
print('Hi, Man!'.endswith('Man', 4, -1)) # => True

print('Hi, Man!'.lower()) # => 'hi, man!'
print('Hi, Man!'.lower().upper()) # => 'HI, MAN!'
print('Hi, Man!'.lower().capitalize()) # => 'Hi, man!'


### Numbers
print('\n\n### Numbers')
print(1)
print(2.0)

## Number Functions
# min, max, abs, sum + math module
print(min(1, 2, 3, 4))
print(min(range(2, 100)))
print(min(list(range(3, 100))))

print(max(1, 2, 3, 4))
print(max(range(2, 99)))
print(max(list(range(3, 98))))

print(abs(200)) # => 200
print(abs(-200)) # => 200

# sum(list, initial = 0)
print(sum(range(1, 10))) # => 45
print(sum(range(1, 10), 5)) # => 50
print(sum(list(range(1, 100))))


### Variables r(^[a-zA-Z_]+[a-zA-Z0-9_]*$)
print('\n\n### Variables')
# Naming
# regexp(^[a-zA-Z_]+[a-zA-Z0-9_]*$)
#   1test # SyntaxError: invalid syntax
#   test$ = 2 # SyntaxError: invalid syntax
test1 = 1
test_ = 2
test_3 = '3 threeS'
print(test_3[-1]) # prints 'S'
# delete variable
del test1
# print(test1) # fails after deletion

# Data Types
# Integer String Boolean(True False)

# Type Casting
# '2' + 2 # TypeError: unsupported operand type(s) for +: 'int' and 'str'
print('\n# Type Casting')
print(('2' + '2') == '22')
print(int('2') == 2)
print(float('2') == 2.0)
print(float(2) == 2.0)
print(str(2) == '2')
# e.g.
print(int('3' + '4') == 34)
print(float('210' * int('2')) == 210210.0)

# Metasyntax vars ?
# print(foo)
# print(bar)

# Basic Operations
# + - * / ** %
print('\nBasic Operations')
print(5//2 == 2) # (anti-modulo)
# 5/0 # ZeroDivisionError: division by zero

# Operations Priority
# 1. ()
# 2. **
# 3. * /
# 4. + -

# In-place operands (+=, -=, *=, /=, %=, **=, //=)
print('\nIn-place operands')
test = 10
test *= 10
print(test == 100)

# Increment/Decrement doesn't exist!
# test++; test-- # SyntaxError: invalid syntax

# Comparisons (== != < <= > >=)
# Lexical text comparison
print('\nLexical text comparison')
print('Test' > 'Tesb')
print('test' > 'Tesb')

# and or not
print('\nand or not')
print(True and True)
print(False or True)
print(not False and True)
print(True and 'Yes')
print(False or 'Yes')
print(not False or 'Yes')


### Conditionals (if-elif-else)
print('\nConditionals')

if test > 100:
  print('test is more than 100')
elif test == 100:
  print('test is 100')
else:
  print('test is less than 100')

### Arrays
print('\nArrays')
arr = [1, 2, 3, 4, 5, [6, 7, 8]]
print('arr contains ' + str(len(arr)) + ' elements') # Array size
print(arr * 2) # Adds same elements to the same array
print(arr)
print(arr[0])
print(arr[-1][-1])
# print(arr[9]) # IndexError: list index out of range

if 5 in arr:
  print('5 is in the array')

if 9 not in arr:
  print('9 isn\'t in the array')

arr = [2]
arr.append(3) # append(element) at the end
print(arr)
print(max(arr))
print(min(arr))
arr.append(2)
print('there are ' + str(arr.count(2)) + ' numbers 2')
arr.insert(0, 1) # insert(index, element) inserts at the given index
arr.pop() # pop() mutates array, returns last element
arr.remove(2) # remove(element) removes the needed element, not by index
print(arr)
arr = [1, 2, 3]
barr = arr.reverse() # reverse() mutates array, doesn't return anything
print(arr)
print(barr) # None
','.join(['1','2']) # => '1,2'

# Ranges
# range(start_from = 0, end_at, step = 1)
print('Ranges')
range(10) # => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] for Python 2.*
print(list(range(10))) # => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] for Python 3.*
range(1, 10) # => [1, 2, 3, 4, 5, 6, 7, 8, 9]
range(1, 10, 3) # => [1, 4, 7]

# Iterating an Array
print('Iterating an Array')
# Basic way
rng = list(range(5))
i = 0
length = len(rng) - 1
while i <= length:
  print(str(rng[i]) + '!')
  i += 1
del i
del length
del rng
# Nice way
for i in range(5): # No need to translate into list(), just range (python3)
  print(str(i) + ' !')


### Loops
print('\nLoops')
# For
for test in range(5):
  print('Five times')

# While
while test > 95:
  print(test)
  test -= 1

while True: # infinite loop
  test += 1

  if test % 2 == 0:
    continue

  print(test)

  if test > 120:
    break

### Functions
print('\nFunctions')

def print_spam(): # Define
  for _i in range(3):
    print('spam')

print_spam() # Call

# Required arguments should go first
# def funct(default_argument = 2, required_argument) # SyntaxError: non-default argument follows default argument

# Non-default arguments are required
def funct(required_argument, default_argument = 2):
  print(default_argument * 2)

funct(2) # => 4
# funct() # TypeError: funct() missing 1 required positional argument: 'required_argument'

# Return from a function
def max(x, y):
  if x > y:
    return x
    print(asd) # Never happens, even though there's no such variable
  else:
    return y
print(max(10, 5))

# pass
def empty_function():
  # To avoid indentation error, or the next lines would be considered misindented
  # Synonym of void()
  pass

# Docstring ('''Anything here''')
def commented_func():
  '''To know something you need there is, young Jedi'''
  pass
print(commented_func.__doc__) # .__doc__ to read docs

# Pass functions as arguments (JS?)
def caller(func):
  ''' A function that calls another function '''
  ''' That means you can delay functions this way '''
  return func()
caller(print_spam)


### Modules
print('\nModules')
# Simple way
import random # random is now an object containing everyhting from that `random` module
for i in range(10):
  print(random.randint(1, 100))
print()

# Call it anything you want
import random as rand
print(rand.randint(1, 20))
print()

# Import certain stuff
from math import sqrt
print(sqrt(9))
print()

from math import sqrt, cos
print(cos(1))

# Call certain stuff anything you want
from math import sqrt as squared
print(squared(9))
print()

# Import all as separate links
from math import *
print(pi)
print(sin(0))
print()

# STL (standard libraries) # https://docs.python.org/3/library/
# random, math, reg, time, os, email, json, sys, pil...

# PyPi (Pyhton Package Index) – local rubygems # https://pypi.org/
# pip # bash binary
# pip install <package name>
# import <package name>

# e.g.
# pyowm – weather from OpenWeatherMap.org
#
# import pyowm
# from pyowm.utils import timestamps
# from pyowm.utils.config import get_default_config
# config_dict = get_default_config()
# config_dict['language'] = 'ru'

# owm = pyowm.OWM('6d00d1d4e704068d70191bad2673e0cc', config_dict) # API key from `Howdy Ho!`
# mgr = owm.weather_manager()

# city = 'Санкт Петербург,RU'
# now = mgr.weather_at_place(city).weather
# forecast = mgr.forecast_at_place(city, 'daily')
# next3 = forecast.get_weather_at(timestamps.next_three_hours())
# tomorrow = forecast.get_weather_at(timestamps.tomorrow())

# print('Сейчас в ' + city.split(',')[0] + ' ' + str(now.temperature('celsius')['temp']) + '°C, ' + now.detailed_status)
# print('В следующие три часа будет ' + str(next3.temperature('celsius')['day']) + '°C, ' + next3.detailed_status)
# print('Завтра будет ' + str(tomorrow.temperature('celsius')['day']) + '°C, ' + tomorrow.detailed_status)


### Exceptions
# SyntaxError - wrong syntax: 1test = 2 ! Cannot be caught !
# IndentationError - wrong or absent indentation ! Hard to catch !
# NameError - no variable of that name
# ImportError - wrong importing
# IndexError - non-existing index
# ZeroDivisionError - don't divide by 0: 7/0
# TypeError - types don't work together (2 + '2')
# ValueError - ?
# AssertionError – asserted criteria are not met
print('\nExceptions')

# Catching
try:
  # eval('(7/4)a') # SyntaxError, the only way to throw
  # non_existing_number / 4 # NameError
  # print(2 + '2') # TypeError
  # print(7/0) # ZeroDivisionError
  print('Clear!') # No errors
except SyntaxError: # cannot be caught! Except for eval
  print('Syntax error!')
except NameError: # certain exception
  print('NameError happened')
except ZeroDivisionError:
  pass # Do nothing, stub it
  print('Divided by zero?')
except AssertionError:
  print('AssertionError caught!')
except (TypeError, ValueError): # several exceptions
  print('Several exceptions!')
except Exception as e: # all other exceptions
  print('Something else is wrong: ' + str(e))
else: # in case of success of try block
  print('No errors happened!')
finally:
  print('Will fire anyway!')

# Throwing
# raise TypeError('I did it myself')
# or
try:
  print()
  raise TypeError('I did it myself')
except TypeError as e:
  print('TypeError caught: ' + str(e))

# Own Exceptions
print('\nOwn Exceptions')
class MyOwnError(Exception):
  pass

# raise MyOwnError('Thrown own exception')

### Assert
# Make sure arguments are as expected, raise and bark if not
def exclamator(text):
  assert text != '', 'This will not stand!' # check values
  print(str(text) + '!')

try:
  exclamator('Hello') # All fine
  exclamator('') # AssertionError
except AssertionError as e:
  print('AssertionError caught: ' + str(e))

### File
print('\nFile')
# def open(file_path, mode = 'r')
#   file_path(String)
#   mode(String) 'w'rite | 'r'ead | 'a'ppend | 'b'inary

# Creating
file = open('./readme.txt', 'w') # Clears existing or creates new file
file.write('Rewritten!\nDid you see that?\nCool, huh?')
# file.write(input('Type what you want:\n')) # Ask the user if you want
file.close()

## Reading
print('Reading:')
file = open('./readme.txt')
# def file.read(bytes = 'all')
content = file.read()
print(content)
print("\nTotal symbols: " + str(len(content))) # Count symbols
print(file.read()) # => Empty string, because read() moves the `caret` to the last read byte
file.seek(0) # Go to 0 byte, i.e. to the start of the file
print(file.read()) # => All file again!
file.close()
del content

# Read lines
file = open('./readme.txt')
lines = file.readlines() #  Return an array of lines
for line in lines:
  print(line)
file.close()

# `with` closes the file automatically
with open('./readme.txt') as f:
  print(f.read())
# print(f.read()) # ValueError: I/O operation on closed file.

## Appending
file = open('./readme.txt', 'a')
file.write('\nNever!')
file.close()

# # File Sandbox
# # Copying a file
# source_file = open(input('Enter the source file name: '))
# target_file = open(input('Enter the target file name: '), 'w')
# target_file.write(source_file.read())
# source_file.close()
# target_file.close()
# print('Copied!')
#
# # Backing up a file
# important_path = input('Enter the file name to backup: ')
# important_file = open(important_path, 'rb') # `b` to support binaries
# backup_file = open('backup_' + important_path, 'wb')
# backup_file.write(important_file.read())
# important_file.close()
# backup_file.close()
# print('Backed up!')

### None
print('\n# None')
no = None
print(no)

def no_return():
  print('Do not return')

no = no_return()
print(no == None) # => True, as functions return None if they don't return anything

### Dictonary
print('\n# Dictonary')

# Creating
dic = {
  'key': 'value',
  1: 2,
  2: False,
  'inset': {
    'key': list(range(1, 10))
  },
  False: '3'
}
dic[4] = '5'

# Reading
print(dic)
print(dic['key']) # 'value'
print(dic[1]) # 2
print(dic[2]) # False
print(dic['inset']['key']) # [1, 2, 3, 4, 5, 6, 7, 8, 9]
print(dic[False]) # '3'
print(dic[4]) # '5'

# print(dic[True]) # KeyError: True # Key not found on the dictonary
# get(key, default = None)
print(dic.get('inset')) # Same as dic['inset']
print(dic.get('insetto')) # Returns None if key not found
print(dic.get('insetto', '<Empty>')) # Can also return something if not found

# Check for a key
if 'inset' in dic:
  print('inset is there')
else:
  print('inset is not there')


### Tuple
# Arrays-like type of data
# Uses less memory than arrays
# Created with () or just a list of comma-separated values
# Items in a tuple can't be edited/added/removed after a tuple is created
print('\nTuple')
# Creating
names = ('John', 'James', 'Jack') # or just
names = 'John', 'James', 'Jack'

# Reading
print(names)
print(names[0])
print(names[-1])
# names[1] = 'Michael' # TypeError: 'tuple' object does not support item assignment
# names.append('aaa') # AttributeError: 'tuple' object has no attribute 'append'
# names.pop() # AttributeError: 'tuple' object has no attribute 'pop'


### List Indexing
# [index] get the item by its index
# @overload [first_index:last_index:index_step]
#   first_index: index of the first item to take
#   last_index: index of the item when to skip (non-inclusive)
#   index_step: take by
# A way to slice arrays here in Python
print('\nList Indexing')
digits = list(range(1, 10))
print(digits[4]) # 5
print(digits[:4]) # [1, 2, 3, 4]
print(digits[4:]) # [5, 6, 7, 8, 9]
print(digits[2:4]) # [3, 4]
print(digits[2:5]) # [3, 4, 5]
print(digits[::2]) # [1, 3, 5, 7, 9]
print(digits[:8:2]) # [1, 3, 5, 7]
print(digits[2::2]) # [3, 5, 7, 9]
print(digits[-5::2]) # [5, 7, 9]
print(digits[-5::-2]) # [5, 3, 1]
print(digits[::-1]) # [9, 8, 7, 6, 5, 4, 3, 2, 1], reverse synonym
