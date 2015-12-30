http = require 'http'
querystring = require 'querystring'

port = process.argv[2]

mongoose = require 'mongoose'
mongoose.connect('mongodb://localhost/mongo_test')

log = (err, obj) ->
  console.log 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
  return console.error err if err
  console.log obj

extraSchema = mongoose.Schema
  id:           Number
  obligatory:   Boolean
  name:         String
  canPayAtBase: Boolean
  per_q:        String
  per_time:     String
  price:        Number
  quantity:     Number

extraSchema.methods =
  saveAndLog: -> @save log

MongoExtra = mongoose.model('MongoExtra', extraSchema)

MongoExtra.find (err, objs) ->
  obj.remove() for obj in objs

http.createServer (request, response) ->
  response.setHeader 'Access-Control-Allow-Origin', '*'
  response.setHeader 'Access-Control-Request-Method', '*'
  response.setHeader 'Access-Control-Allow-Methods', 'OPTIONS, GET'
  response.setHeader 'Access-Control-Allow-Headers', '*'
  response.writeHead(200)

  fullResponseBody = ''

  request.on 'data', (chunk) ->
    fullResponseBody += chunk

  request.on 'end', ->
    body = querystring.parse(fullResponseBody)

    new MongoExtra(body).saveAndLog()

    response.write('saved.')
    response.end()

.listen(port || 8080)

console.log "Server listening on http://localhost:#{ port || 8080 }"
