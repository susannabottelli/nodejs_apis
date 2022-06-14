// ROUTE TO REDIRECT THE SHORT URLs TO THE ORIGINAL ADDRESS
import { Router } from 'express';
const router = Router();

import url from '../models/url';


// Redirect to the original URL
router.get('/:key', async(req, res) => {
    try {
        const url = await url.findOne({ URLkey: req.params.key }); // find the URL key of the generated URL

        if (url) {
            return res.redirect(url.longURL); // redirect to the original address
        } else {
            return res.status(404).json('No url found')
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
});




export default router;
