import 'dotenv/config';
import fetch from 'node-fetch';

const API_KEY = process.env.ZIPCODESTACK_API_KEY;

function normalize(zipcode) {
    const normalizedZip = zipcode.trim();
    return normalizedZip;
}

async function isValidZipcode(zipcode) {
    if (!API_KEY) {
        throw Error('Invalid API Key');
    }
    zipcode = normalize(zipcode);
    const url = `https://api.zipcodestack.com/v1/search?codes=${zipcode}&country=us`;
    const options = {
        method: 'GET',
        headers: {
            apiKey: API_KEY
        }
    }
    //notes request
    console.log(`Validating ${zipcode}`);
    return await fetch(url, options)
        .then(res => res.json())
        .then(data => Object.keys(data.results).length !== 0)
        .catch(err => {
            throw Error(err.message);
        })
}

async function validateInput (req, res) {
    if (req.query.zipcode) {
        try {
            const zipcode = req.query.zipcode;
            const isValid = await isValidZipcode(zipcode);
            const data = {
                'isValidZipcode': isValid
            }
            res.status(200).json(data);
        } catch (err) {
            res.status(500).send("Internal server error");
            throw err;
        }

    } else {
        res.status(400).send("Invalid request. Please check that the request's zipcode param");
    }
}

export { validateInput, isValidZipcode }