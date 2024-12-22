const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

console.log('Log 17: Loading Mongoose schemas...');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const PropertySchema = new mongoose.Schema({
  property: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const User = mongoose.model('User', UserSchema);
const Property = mongoose.model('Property', PropertySchema);

console.log('Log 18: Schemas loaded successfully');

module.exports = { User, Property };
