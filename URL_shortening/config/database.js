// !!! ALERT !!!
/*
SCHEMA IS A MONGOOSE STRUCT - I HAVE PROMPTLY REMOVED MONGOOSE AS A DEPENDENCY
BECAUSE OF HIGH VULNERABILITY.
I MOMENTARILY LEAVE THE RELATED CODE HERE TO KEEP TRACK OF CHANGES, BUT IT WON'T WORK AS IT IS
*/


import {get } from 'config';
const database = get('mongoURI'); // MongoDB link to application


/*
THE FOLLOWING WOULD BE MONGOOSE RELATED FUNCTIONS,
AS I REMOVED MONGOOSE, THEY WILL NOT WORK
*/

const connectDB = async() => {
    try {
        await connect(database, {
            useNewUrlParser: true
        });
        console.log('You are connected to MongoDB');
    } catch (err) {
        console.error(err.message);
        s
        process.exit(1);
    }
}

// Run connection in the index file
export default connectDB;
