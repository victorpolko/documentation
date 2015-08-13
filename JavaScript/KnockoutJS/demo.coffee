# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# Introduction
#
# class DemoVM
#   constructor: ->
#     @firstName = ko.observable 'Bill'
#     @lastName  = ko.observable 'Wellington'
#     @fullName  = ko.computed =>
#       @firstName() + " " + @lastName()

# $ ->
#   ko.applyBindings new DemoVM()

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# Working With Lists And Collections
#
# class SeatReservation
#   constructor: (name, initialMeal) ->
#     @name = name
#     @meal = ko.observable initialMeal

#     @formattedPrice = ko.computed =>
#       if @meal().price then '$' + @meal().price.toFixed(2) else 'None'

# class ReservationsVM
#   constructor: () ->
#     # Non-editable catalog data - would come from the server
#     @availableMeals = [
#       { mealName: "Standard (sandwich)",    price: 0     }
#       { mealName: "Premium (lobster)",      price: 34.95 }
#       { mealName: "Ultimate (whole zebra)", price: 290   }
#     ]

#     # Editable data
#     @seats = ko.observableArray [
#       new SeatReservation 'Steve', @availableMeals[0]
#       new SeatReservation 'Bert', @availableMeals[0]
#     ]

#     @addSeat = ->
#       @seats.push new SeatReservation '', @availableMeals[0]

#     @removeSeat = (seat) =>
#       @seats.remove seat

#     @totalSurcharge = ko.computed =>
#       total = 0

#       for seat in @seats()
#         total += seat.meal().price

#       total

# $ ->
#   ko.applyBindings new ReservationsVM

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# Single page Applications
#
# class WebmailVM
#   constructor: () ->
#     self = @

#     @folders = [ 'Inbox', 'Archive', 'Sent', 'Spam' ]
#     @chosenFolderId = ko.observable()
#     @chosenFolderData = ko.observable()
#     @chosenMailData = ko.observable()

#     @goToFolder = (folder) =>
#       @chosenFolderId folder # Set chosen folder
#       @chosenMailData null # Stop showing a mail
#       $.get 'http://learn.knockoutjs.com/#/?tutorial=webmail/mail', { folder: folder }, @chosenFolderData

#     @goToMail = (mail) =>
#       @chosenFolderId mail.folder
#       @chosenFolderData null # Stop showing a folder
#       $.get 'http://learn.knockoutjs.com/#/?tutorial=webmail/mail', { mailId: mail.id }, @chosenMailData

#     # Show inbox by default
#     # @goToFolder('Inbox')

#     # Client-side routes
#     # <script src="http://learn.knockoutjs.com/#/?tutorial=webmail/scripts/lib/sammy.js" type="text/javascript"></script>
#     Sammy ->
#       @get '#:folder', ->
#         self.chosenFolderId @params.folder
#         self.chosenMailData null
#         $.get 'http://learn.knockoutjs.com/#/?tutorial=webmail/mail', { folder: @params.folder }, self.chosenFolderData

#       @get '#:folder/:mailId', ->
#         self.chosenFolderId @params.folder
#         self.chosenFolderData null
#         $.get 'http://learn.knockoutjs.com/#/?tutorial=webmail/mail', { mailId: @params.mailId }, self.chosenMailData

#       this.get '', -> { this.app.runRoute 'get', '#Inbox' }
#     .run()

# $ ->
#   ko.applyBindings new WebmailVM

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# Creating custom bindings
#
# ko.bindingHandlers.fadeVisible =
#   init: (element, koValueAccessor) ->
#     # Start visible/invisible according to initial value
#     shouldDisplay = koValueAccessor()
#     $(element).toggle shouldDisplay

#   update: (element, koValueAccessor) ->
#     # On update, fade in/out
#     shouldDisplay = koValueAccessor()
#     if shouldDisplay then $(element).fadeIn() else $(element).fadeOut()

# ko.bindingHandlers.jqButton =
#   init: (element, koValueAccessor) ->
#     $(element).button()

#   update: (element, koValueAccessor) ->
#     currentValue = koValueAccessor()
#     # Here we just update the "disabled" state, but you could update other properties too
#     $(element).button 'option', 'disabled', currentValue.enable == false

# ko.bindingHandlers.starRating =
#   init: (element, koValueAccessor) ->
#     $(element).addClass("starRating");
#     $('<span>').appendTo(element) for i in [1..5]

#     # Handle mouse events on the stars
#     $('span', element).each (index) ->
#       $(@).hover (->
#         $(@).prevAll().add(@).addClass('hoverChosen')
#       ), ->
#         $(@).prevAll().add(@).removeClass('hoverChosen')
#       .click ->
#         observable = koValueAccessor() # Get the associated observable
#         observable(index + 1)          # Write the new rating to it

#   update: (element, koValueAccessor) ->
#     observable = koValueAccessor()
#     $('span', element).each (index) ->
#       $(@).toggleClass 'chosen', index < observable()

# class Answer
#   constructor: (text) ->
#     @answerText = text
#     @koPoints = ko.observable 1

# class SurveyVM
#   constructor: (question, pointsBudget, answers) ->
#     @question = question
#     @pointsBudget = pointsBudget
#     @answers = $.map answers, (text) -> new Answer(text)
#     @save = () -> alert 'Todo'

#     @koPointsUsed = ko.computed =>
#       total = 0

#       for answer in @answers
#         total += answer.koPoints()

#       total

# $ ->
#   ko.applyBindings new SurveyVM 'Which factors affect your technology choices?', 10, [
#      'Functionality, compatibility, pricing - all that boring stuff',
#      'How often it is mentioned on Hacker News',
#      'Number of gradients/dropshadows on project homepage',
#      'Totally believable testimonials on project homepage'
#   ]

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# Loading And Saving Data
#
class Task
  constructor: (data) ->
    @koTitle = ko.observable(data.title)
    @koIsDone = ko.observable(data.isDone)

class TaskListVM
  constructor: ->
    self = @

    @koTasks = ko.observableArray []
    @koNewTaskText = ko.observable()

    # @incompleteTasks = ko.computed =>
    #   ko.utils.arrayFilter @koTasks(), (task) -> !task.koIsDone()

    @incompleteTasks = ko.computed =>
      ko.utils.arrayFilter @koTasks(), (task) -> !task.isDone() && !task._destroy

    @addTask = ->
      self.koTasks.push new Task { title: this.koNewTaskText() }
      self.koNewTaskText('')

    # @removeTask = (task) =>
    #   @koTasks.remove task # .remove is a KnockoutJS function for observable arrays

    @removeTask = (task) =>
      @tasks.destroy(task) # .destroy will mark task with ._destroy property

    @save = (task) =>
      $.ajax(
        'http://learn.knockoutjs.com/tasks'
        data: ko.toJSON { tasks: @koTasks() }
        type: 'post'
        contentType: 'application/json'

        success: (result) -> alert(result)
      )
    # Load initial state from server, convert it to Task instances, then populate self.tasks
    # $.getJSON 'http://learn.knockoutjs.com/tasks', (allData) =>
    #   mappedTasks = $.map allData, (item) -> new Task(item)
    #   @koTasks(mappedTasks)

$ ->
  ko.applyBindings new TaskListVM
