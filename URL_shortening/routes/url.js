// ROUTE TO CREATE A SHORT URL AND INSERT IT IN THE DATABASE
import { Router as _Router } from 'express';
const router = _Router();

import { isUri } from 'valid-url';
import { generate } from 'shortID';
import {get } from 'config';

import url from '../models/url';


// Take long URL
router.post('/shorten', async(req, res) => {
    const { longURL } = req.body; // take long URL from input
    const baseURL = get('baseURL'); // from config JSON file (here set to localhost)

    // Check base URL validity
    if (!isUri(baseURL)) {
        return res.status(404).json('Invalid base URL')
    }

    // Create URL key
    const n = 7; // key length
    const URLkey = generate('SHA256').slice(0, n); // can be replaced by any algorithm of choice
    /* This generates an hash using the algorithm you choose, does it make sense to
    directly use the first characters of a generated alfanumeric hash as URL key.
    Why don't most people set a key length?*/

    // TODO: CHECK INTO KEY GENERATION METHODS!


    // Check long URL validity
    if (isUri(longURL)) {
        try {
            let url = await url.findOne({ longURL: longURL }); // Mongoose method to find one record from the database

            if (url) {
                res.json(url); // If the URL is already in database
            } else {
                // Create short URL
                const shortURL = baseURL + '/' + URLkey;

                url = new url({
                    URLkey,
                    longURL,
                    shortURL,
                    date: new Date(),
                });

                await url.save();

                res.json(url);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json('Server error');
        }
    } else {
        res.status(401).json('Invalid URL input');
    }
})


export default router;
