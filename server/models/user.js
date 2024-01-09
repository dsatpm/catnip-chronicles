const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },

=======
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },

    password: {
        type: String,
        required: true,
        trim: true,
    },
    userscore: {
        type: Number,
        default: 0,
    }

},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);
=======
});



const User = model('User', UserSchema);

module.exports = User;

