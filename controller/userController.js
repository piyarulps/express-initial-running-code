const { User } = require('../models/user');

// Get all users
exports.getUsers = async (req, res) => {
  console.log('Log 3: Fetching all users...');
  try {
    const users = await User.find(); // Fetch all users
    console.log(`Log 4: Users fetched: ${users.length}`);
    res.status(200).json(users);
  } catch (error) {
    console.error(`Log 5: Error fetching users: ${error.message}`);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  console.log('Log 6: Creating a new user...');
  const { name, email, password } = req.body;

  try {
    console.log(`Log 7: Request body: name=${name}, email=${email}`);
    
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Log 8: User already exists');
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    console.log('Log 9: Hashing the password...');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword });
    console.log('Log 10: Saving the user to MongoDB...');
    await newUser.save();
    console.log('Log 11: User saved successfully');
    
    res.status(201).json(newUser);
  } catch (error) {
    console.error(`Log 12: Error creating user: ${error.message}`);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  console.log('Log 13: Deleting user with ID:', req.params.id);
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      console.log('Log 14: User not found');
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('Log 15: User deleted successfully');
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(`Log 16: Error deleting user: ${error.message}`);
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

// Fetch a user by ID
exports.getUserById = async (req, res) => {
  console.log('Log 31: Fetching user by ID:', req.params.id);
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      console.log('Log 32: User not found');
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('Log 33: User fetched successfully:', user);
    res.status(200).json(user);
  } catch (error) {
    console.error(`Log 34: Error fetching user: ${error.message}`);
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

// Update user by ID
exports.updateUser = async (req, res) => {
  console.log('Log 35: Updating user with ID:', req.params.id);
  const { name, email } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      console.log('Log 36: User not found');
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('Log 37: User updated successfully:', updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(`Log 38: Error updating user: ${error.message}`);
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

