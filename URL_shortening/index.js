import express, { json } from 'express';
import connectDB from './config/database'; // file with database connection
import sanitize from 'mongo-sanitize'; // TO SOLVE DEPENDENCY VULNERABILITY
const PORT = 3000;
const app = express();

// Connect to database (here MongoDB)
connectDB();

// PROTECT FROM POSSIBLE INJECTION
/* FROM STACK OVERFLOW: The sanitize function will strip out any keys that start
with '$' in the input, so you can pass it to MongoDB without worrying about malicious
users overwriting query selectors. */
var clean = sanitize(req.params.username);


// Accept JSON data in the API when a request to create a URL is made
/* Some use app.use(json({ extended: false }) but I did not find documentation for an 'extended' option for .json(),
while it is largely used for body-parser.urlencoded()
so I presume it is not essential in this case */

app.use(json());


// Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));



app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
