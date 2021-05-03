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
/*
const p1 = new Player('p1', 5);
const p2 = new Player('p2', 2);
const winner = balloonAttack(p1, p2);
console.log(winner);
*/

/* 
Challenge #3. A shift cipher takes a plain text message and shifts each letter forward in the alphabet by a given number. For example, a shift cipher with a shift of 1 
would turn the string 'hello' to 'ifmmp'.

Create a class ShiftCipher that takes the numerical value of the shift as a constructor parameter. The class should have two methods:

encrypt: takes a plain text string and returns a capitalized string with each letter shifted forward in the alphabet based on the set shift value.
decrypt: takes an encrypted message and returns a lower case string with each letter shifted back in the alphabet based on the set shift value.
In both methods, any character outside the alphabet should remain the same.
But if a character is shifted outside the alphabet in either direction it should be wrapped around to the other side. For example, 
encrypting a y with a shift of 4 results in C and decrypting an A with a shift of 1 result in z.
Example:
const cipher = new ShiftCipher(2);
cipher.encrypt('I love to code!'); // returns 'K NQXG VQ EQFG!'
cipher.decrypt('K <3 OA RWRRA'); // returns 'i <3 my puppy'

Feel free to reference the Unicode Table as well as the JavaScript String methods including: toUpperCase(), toLowerCase(), charCodeAt() and fromCharCode()

someStr.charCodeAt(index) returns the charCode at index of the string. the charCode is an integer between 0 and 65535 representing the UTF-16 code unit. 
The UTF-16 code unit matches the Unicode code point for code points which can be represented in a single UTF-16 code unit.
The first 128 Unicode code points are a direct match of the ASCII character encoding.
in ASCII printable characters, decimals
A-Z (65 to 90, includes 90) - for encrypt()
a - z (97 - 122, includes 122) - for decrypt()
return value - A number representing the UTF-16 code unit value of the character at the given index. If index is out of range, charCodeAt() returns NaN.

*/

class ShiftCipher{
    constructor(shift){
        this.shift=shift;
    }

    encrypt(message){
        //takes a plain text string and returns a capitalized string with each letter shifted forward in the alphabet based on the set shift value.
        //any character outside the alphabet should remain the same. But if a character is shifted outside the alphabet in either direction it should be wrapped around to the other side.
        //e.g. encrypting with shift=4, y to C, decrypting with shift=1, A to z
        if (this.shift===undefined || typeof this.shift !== 'number'){
            return 'please input a number for the second argument!'
        }

        message=message.toUpperCase()
        
        let symbolsArray = message.split('');
        
        const charCodesArray= symbolsArray.map(symbol=>{
            //console.log(symbol.charCodeAt(0))
            return symbol.charCodeAt(0);
        });
        //console.log(`before - ${charCodesArray}`);
        /* wrap around is complicated by the need to pass both capitalized and lower case letters in the message argument. However, I won't have to deal with two encoding ranges
        if i just turned every character to either upper case first. as I'd need to turn everything to uppercase in the end anyway.  */
        // one. limit the impact of this.shift
        let adjustedShift;
        if(this.shift>26 ){
            adjustedShift=this.shift%26;// the remainder has to be smaller than 26, as the shift has to be smaller than 26. 
        }else if (this.shift<-26){
            adjustedShift=26-(Math.abs(this.shift%-26)); //this is the wrap around for shifts more negative than -26. convert to a positive shift, adjusted with 26-x. Math.abs() is used because modulo -x%-y returns a negative number!
        }else if (this.shift<0){
             adjustedShift=this.shift+26;
        }else{
            adjustedShift=this.shift;
        };

        const encryptedCharCodesArray= charCodesArray.map(charCode=>{
            const charMin=65;
            const charMax=90

            if(charCode < charMin || charCode> charMax){
                return charCode // if char code not within this range, return charCode unchanged. 
            }else if(charCode+adjustedShift> charMax){
                const charCodeShifted=(charCode+adjustedShift)%charMax + charMin-1; //implementation of the wraparound, if the adjustment takes charCode over its max value, it has to wraparound. 
                return charCodeShifted;
            }
            else{
                const charCodeShifted=charCode+this.shift;
                return charCodeShifted;
            }
        })
        //console.log(`after - ${encryptedCharCodesArray}`);

        const encryptedArray=encryptedCharCodesArray.map(charCode=>{
            return String.fromCharCode(charCode); // convert charCode to UTF-16 character. 
        })
        return encryptedArray.join(''); // join the converted array of string elements to one string. 
    }
    decrypt(message){
        //takes an encrypted message and returns a lower case string with each letter shifted back in the alphabet based on the set shift value.
        //any character outside the alphabet should remain the same. But if a character is shifted outside the alphabet in either direction it should be wrapped around to the other side.
        //e.g. encrypting with shift=4, y to C, decrypting with shift=1, A to z
        if (this.shift===undefined || typeof this.shift !== 'number'){
            return 'please input a number for the second argument!'
        }
        message=message.toLowerCase();
        
        // convert message to an array of charCodes, manipulates charCodes, return an array of decrypted charCodes, then of decrypted chars. lastly return just one string 
        const charSymbolsArray=message.split('');
        const charCodesArray=charSymbolsArray.map(symbol => symbol.charCodeAt(0));
        //console.log(charCodesArray);

        const charMin=97;
        const charMax=122;
        
        let adjustedShift;
        if(this.shift>26 ){
            adjustedShift=this.shift%26;// the remainder has to be smaller than 26, as the shift has to be smaller than 26. 
        }else if (this.shift<-26){
            adjustedShift=26-(Math.abs(this.shift%-26)); //this is the wrap around for shifts more negative than -26. convert to a positive shift, adjusted with 26-x. Math.abs() is used because modulo -x%-y returns a negative number!
        }else if (this.shift<0){
             adjustedShift=this.shift+26;
        }else{
            adjustedShift=this.shift;
        };

        const decryptedCharCodesArray=charCodesArray.map(charCode=>{
            if(charCode < charMin || charCode> charMax){
                return charCode // if char code not within this range, return charCode unchanged. 
            }else if(charCode-adjustedShift< charMin){ // charMin+djustedShit>charCode
                const charCodeShifted=charMax-(charMin+adjustedShift)%charCode+1; //implementation of the wraparound, if the adjustment takes charCode over its min value, it has to wraparound. 
                return charCodeShifted;
            }else{
                const charCodeShifted=charCode-this.shift;
                return charCodeShifted;
            }
        });
        const decryptedArray=decryptedCharCodesArray.map(charCode=>{
            return String.fromCharCode(charCode);
        });
        return decryptedArray.join('');



    }
}

//test code for challenge #3 
//encrypt test
const cipher=new ShiftCipher(1);
const encrypt3=new ShiftCipher(5); // for z, char=charMax=90, charMin=60 , charCode+this.shift-charMax+charMin=60+5 = 65, that's 6 chars on from 60!. 
const encrypt4=new ShiftCipher(31);
const encrypt5=new ShiftCipher(57); 
const encrypt6=new ShiftCipher(-47);
//console.log(encrypt1.encrypt()); //expect IFMMP
//console.log(encrypt2.encrypt()); //expect IFMM0!£@
console.log(encrypt3.encrypt('wxyz')); //expect BCDE
console.log(encrypt4.encrypt('wxyz')); //expect BCDE
console.log(encrypt5.encrypt('wxyz')); //expect BCDE
console.log(encrypt6.encrypt('wxyz')); //expect BCDE
console.log(cipher.encrypt('z')); //expect 'A'

// decrypt test
const decrypt0=new ShiftCipher(1)
const decrypt1=new ShiftCipher(5)
const decrypt3=new ShiftCipher(57)
const decrypt4=new ShiftCipher(-21)
const decrypt5=new ShiftCipher(-47)
console.log(decrypt0.decrypt('IFMMP')); // expect hello
console.log(decrypt1.decrypt('BCDE')); // expect wxyz
console.log(decrypt3.decrypt('BCDE')); // expect wxyz
console.log(decrypt4.decrypt('BCDE')); // expect wxyz
console.log(decrypt5.decrypt('BCDE')); // expect wxyz