mongoose = require 'mongoose'
mongoose.connect('mongodb://localhost/mongo_test')

kittySchema = mongoose.Schema
  name: String

kittySchema.methods =
  speak: ->
    console.log if @name then "Meow name is #{ @name }" else "I don't have a name"

Kitten = mongoose.model('Kitten', kittySchema)

simply = (err, obj) ->
  console.log 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
  return console.error err if err
  obj

log = (err, obj) ->
  console.log 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
  return console.error err if err
  console.log obj


console.log 'yay!'

silence = new Kitten(name: 'Silence')
console.log silence.name
silence.speak()

silence.save log

Kitten.find (err, objs) ->
  obj.remove() for obj in objs

  Kitten.find log

# db = mongoose.connection
#   .on 'error', console.error.bind(console, 'connection error:')

#   .once 'open', (callback) ->
#     console.log 'yay!'

#     silence = new Kitten(name: 'Silence')
#     console.log silence.name
#     silence.speak()

#     silence.save log
#     # Kitten.find log

#   .close()
