/*Use the following Network class to track how much total data and how many users each network has:

The properties of the Network class are:

data: Total units of data supplied by the network
users: Total numbers of users currently on the network
Each user on average deducts 5 units from the network’s total data. To watch a movie you must connect to a network that has at least 10 remaining units of data.

*/

class Network {
    constructor(data, users) {
      this.data = data;
      this.users = users;
    }
  }

/*  1. Add a method movieTime() to the Network class that returns true if there is enough data available to watch a movie, false if there isn’t.

Example:

const library = new Network(50, 9) 
library.movieTime() // returns false
*/