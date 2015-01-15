require 'routes/route'
require 'models/request'

TravisRoute = Travis.Route
Request = Travis.Request

Route = TravisRoute.extend
  needsAuth: true
  setupController: ->
    @_super.apply this, arguments

    @controllerFor('repo').activate('requests')

  model: ->
    Request.fetch repository_id: @modelFor('repo').get('id')

Travis.RequestsRoute = Route
