/* Challenge #1. Use the following Network class to track how much total data and how many users each network has:

The properties of the Network class are:

data: Total units of data supplied by the network
users: Total numbers of users currently on the network
Each user on average deducts 5 units from the network’s total data. To watch a movie you must connect to a network that has at least 10 remaining units of data.


Add a method movieTime() to the Network class that returns true if there is enough data available to watch a movie, false if there isn’t.

Example:

const library = new Network(50, 9) 
library.movieTime() // returns false

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

/* challenge#2.  A video game consists of two players floating using 100 helium balloons. The players shoot pellets at each other’s balloons and after 10 minutes the player with the most balloons left wins.

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

function balloonAttack(player1, player2){
    
    const player1Remaining=player1.balloonCount-10*player2.hitsPerMinute; 
    /* remaining balloons can't be a negative number. 0 minimum. might think to use Math.max(0,x) but this allows someone with no balloons to keep shooting 
    the other one! Remaining balloons has to be allowed to be negative to enable the comparison with the other player.*/
    
    const player2Remaining=player2.balloonCount-10*player1.hitsPerMinute; // player i's remaining balloons depends on how fast player j shoots down baloons! .hitsPerMinute.
    
    const diff = player1Remaining-player2Remaining;
    if (diff===0){
        return 'Tie';
    }else if(diff>0){
        return `${player1.name}`;
    }else{
        return `${player2.name}`;
    };
};

// test code for challenge #2

const p1 = new Player('p1', 5);
const p2 = new Player('p2', 2);
const winner = balloonAttack(p1, p2);
console.log(winner);