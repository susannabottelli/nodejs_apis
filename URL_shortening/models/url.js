// !!! ALERT !!!
/*
SCHEMA IS A MONGOOSE STRUCT - I HAVE PROMPTLY REMOVED MONGOOSE AS A DEPENDENCY
BECAUSE OF HIGH VULNERABILITY.
I MOMENTARILY LEAVE THE RELATED CODE HERE TO KEEP TRACK OF CHANGES, BUT IT WON'T WORK AS IT IS
*/



// Create schema for resource url
const URLschema = new Schema({
    URLkey: String,
    longURL: String, // Original URL
    shortURL: String, // Shortened URL
    date: { type: String, default: Date.now } // Current creation date
});


export default model('url', URLschema);
