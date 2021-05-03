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

    movieTime(){
        const dataConsumption=this.users*5
        const dataRemaining=this.data-dataConsumption;
        return dataRemaining>=10? true : false;
    }
  }

/*  1. Add a method movieTime() to the Network class that returns true if there is enough data available to watch a movie, false if there isn’t.

Example:

const library = new Network(50, 9) 
library.movieTime() // returns false
*/

/*
A video game consists of two players floating using 100 helium balloons. The players shoot pellets at each other’s balloons and after 10 minutes the player with the most balloons left wins.

Write a game function balloonAttack that takes two Player instances, calculates the balloons left for each player after 10 minutes (using the hitsPerMinute property) 
and returns the name of the winner. If the result is a tie, return the string 'Tie'.
*/

class Player {
    constructor(name, hitsPerMinute) {
      this.name = name;
      this.hitsPerMinute = hitsPerMinute;
      this.balloonCount = 100;
    }
    status() {
      console.log(`Player: ${this.name} -- Balllons Left: ${this.balloonCount}`)
    }
  }
  