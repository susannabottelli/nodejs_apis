const express = require('express');
const jwt = require('jsonwebtoken');

const authAPI = express();
const PORT = 9000;

// Main route
authAPI.get('/main', (req, res) => {
    res.json({
        message: 'This is a demo API authentication'
    });
});


// Route to receive access token
authAPI.post('/main/login', (req, res) => {
    // Fake user
    // Otherwise connect to database
    const user = {
        id: 1,
        username: 'sus94',
        email: 'sus94@gmail.com'
    }


    //
    jwt.sign({ user: user }, 'secretkey', (err, token) => { // Here I can also set expiration time for automatic log out and other parameters
        res.json({
            token: token
        });
    });
});

// token returned as: {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6InN1czk0IiwiZW1haWwiOiJzdXM5NEBnbWFpbC5jb20ifSwiaWF0IjoxNjU0OTY0NjE0fQ.5EHeS5MgooITV8fBxxRRNyqcGbla38GZyNxhOJf15xU"}


// Route to verify the token
authAPI.post('/main/verify', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403); // Error (here 'Forbidden')
        } else {
            res.json({
                authData // {}
            });
        }
    });
});


// Verify Token
function verifyToken(req, res, next) {
    // Look for authorization value in the header
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader == 'undefined') {
        // If the token is not found in the header
        res.sendStatus(403);
    } else {
        // Extract token
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        // Request token
        req.token = bearerToken;
        next();
    }

}

// after putting the token in the header, I get my data:
// {"authData":{"user":{"id":1,"username":"sus94","email":"sus94@gmail.com"},"iat":1654964614}}


authAPI.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
