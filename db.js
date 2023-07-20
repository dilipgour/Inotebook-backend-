const mongoose = require('mongoose');
const uri = "mongodb+srv://dilipgour2004:6268920689@cluster0.xr1egoc.mongodb.net/?retryWrites=true&w=majority"
const getConnection = async () => {
  try {
    await mongoose.connect(
      uri,
      {
        useNewUrlParser: true
      }
    );
    console.log('Connection to DB Successful');
  } catch (err) {
    console.log(err);
  }
};

module.exports = getConnection