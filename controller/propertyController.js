const { Property } = require('../models/user');

// Fetch all properties
exports.getProperties = async (req, res) => {
  console.log('Log 39: Fetching all properties...');
  try {
    const properties = await Property.find();
    console.log('Log 40: Properties fetched successfully:', properties.length);
    res.status(200).json(properties);
  } catch (error) {
    console.error(`Log 41: Error fetching properties: ${error.message}`);
    res.status(500).json({ message: 'Error fetching properties', error: error.message });
  }
};

// Add a new property
exports.addProperty = async (req, res) => {
  console.log('Log 42: Adding a new property...');
  const { property, description, price } = req.body;

  try {
    const newProperty = new Property({ property, description, price });
    console.log('Log 43: Saving new property...');
    await newProperty.save();
    console.log('Log 44: Property added successfully');
    res.status(201).json(newProperty);
  } catch (error) {
    console.error(`Log 45: Error adding property: ${error.message}`);
    res.status(500).json({ message: 'Error adding property', error: error.message });
  }
};
