const mongoose = require("mongoose");
//mongoose.Promise = global.Promise;
//require('dotenv').config();
// Mongodb Atlas
console.log('MONGO_URI', process.env.MONGO_URI)
mongoose.Promise = global.Promise;
const connection = async () => {
  try {
    return await mongoose.connect(
      process.env.MONGO_URI,
      {
          useNewUrlParser: true,
          //useUnifiedTopology: true,
          //ssl: true,
        },
      );
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
//Local connection (be carefull with mongodb and mongodb+srv)
/*mongoose.connect("mongodb://xxxxx:xxxxx@127.0.0.1:27017/",
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
},
)*/ 
module.exports = connection();
