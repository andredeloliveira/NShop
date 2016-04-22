if (typeof Schema === 'undefined') {
	Schema = function Schema() {}
}
Schema.UserLocation = new SimpleSchema({
	city: {
		type: String,
		optional: true
	},
	state: {
		type: String,
		optional: true
	},
	zipcode: {
		type: String,
		regEx: /^[0-9]{5}$/,
		optional: true
	},
	country: {
		type: String,
		optional: true
	}
});

Schema.UserProfile = new SimpleSchema({
	firstName: {
		type: String,
		optional: true
	},
	lastName: {
		type: String,
		optional: true
	},
	gender: {
		type: String,
		allowedValues: ['Male', 'Female'],
		optional: true
	},
	organization: {
		type: String,
		optional: true
	},
	website: {
		type: String,
		regEx: SimpleSchema.RegEx.Url,
		optional: true
	},
	location: {
		type: Schema.UserLocation,
		defaultValue: {},
	},
	isPasswordSet: {
		type: Boolean,
		optional: true
	},
	photo: {
		type: Object,
		optional: true
	},
	'photo.public_id': {
		type: String
	},
});

Schema.User = new SimpleSchema({
	username: {
		type: String,
		optional: true
	},
	createdAt: {
		type: Date
	},
});

Meteor.users.attachSchema(Schema.User);

Meteor.users.helpers({
  fullName: function() {
    return this.profile.firstName + ' ' + this.profile.lastName;
  },
});
