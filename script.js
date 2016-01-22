// Backbone Model

var Contact = Backbone.Model.extend({
	defaults: {
		name: '',
		city: '',
		email: ''
	}
});

// Backbone Collection

var Contacts = Backbone.Collection.extend({});

// instantiate a Collection

var contacts = new Contacts();

// Backbone View for one blog

var ContactView = Backbone.View.extend({
	model: new Contact(),
	tagName: 'tr',
	initialize: function() {
		this.template = _.template($('.contacts-list-template').html());
	},
	events: {
		'click .edit-contact': 'edit',
		'click .update-contact': 'update',
		'click .cancel': 'cancel',
		'click .delete-contact': 'delete'
	},
	edit: function() {
		$('.edit-contact').hide();
		$('.delete-contact').hide();
		this.$('.update-contact').show();
		this.$('.cancel').show();

		var name = this.$('.name').html();
		var city = this.$('.city').html();
		var email = this.$('.email').html();

		this.$('.name').html('<input type="text" class="form-control name-update" value="' + name + '">');
		this.$('.city').html('<input type="text" class="form-control city-update" value="' + city + '">');
		this.$('.email').html('<input type="text" class="form-control email-update" value="' + email + '">');
	},
	update: function() {
		this.model.set('name', $('.name-update').val());
		this.model.set('city', $('.city-update').val());
		this.model.set('email', $('.email-update').val());
	},
	cancel: function() {
		contactsView.render();
	},
	delete: function() {
		this.model.destroy();
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

// Backbone View for all blogs

var ContactsView = Backbone.View.extend({
	model: contacts,
	el: $('.contacts-list'),
	initialize: function() {
		var self = this;
		this.model.on('add', this.render, this);
		this.model.on('change', function() {
			setTimeout(function() {
				self.render();
			}, 30);
		},this);
		this.model.on('remove', this.render, this);
	},
	render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(contact) {
			self.$el.append((new ContactView({model: contact})).render().$el);
		});
		return this;
	}
});

var contactsView = new ContactsView();

$(document).ready(function() {
	$('.add-contact').on('click', function() {
		var contact = new Contact({
			name: $('.name-input').val(),
			city: $('.city-input').val(),
			email: $('.email-input').val()
		});
		$('.name-input').val('');
		$('.city-input').val('');
		$('.email-input').val('');
		console.log(contact.toJSON());
		contacts.add(contact);
	})
})
