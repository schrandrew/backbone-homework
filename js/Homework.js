(function($) {
	
	Person = Backbone.Model.extend({});
	
	NameUpdater = Backbone.View.extend({		
		el: $("#name"),
		events: {
			"change": "changePersonName"
		},
		changePersonName: function() {
			var newName = $(this.el).val();
			this.model.set({name: newName});
		}
	});
	
	LabelUpdater = Backbone.View.extend({
		initialize: function() {
			_.bindAll(this, 'render');
			this.model.bind('change', this.render);
		},
		
		render: function() {
			var $label = $('.update-me');
			$label.html(this.model.get('name'));
			return this;
		}
	});
	
	PersonView = Backbone.View.extend({
		initialize: function () {
			_.bindAll(this, 'render');
			this.model.bind('change', this.render)
			this.template = _.template($('#person-template').html());
		},
		
		render: function() {
			
			var renderedContent = this.template(this.model.toJSON());
			$(this.el).html(renderedContent);
			return this;
		}
	});
	
	var person = new Person();
	var nameUpdater = new NameUpdater({model: person});
	var labelUpdater = new LabelUpdater({model: person});
	var personView = new PersonView({model: person, el: $('#person-container')});
	person.set({name: 'Henry', age: 55, weight: 202});

})(jQuery);
