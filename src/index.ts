import {app} from './app'
import {DBConnection} from './utils/database'
const PORT = process.env.PORT || 5000;

//connect to database
DBConnection()

//Now listen to this port 
if (app.listen(PORT)) {
  console.log("Node is listening to Port " + process.env.PORT);
}
else {
  console.log("An error occured");
}
