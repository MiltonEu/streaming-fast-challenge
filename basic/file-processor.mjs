import fs from 'node:fs';
import * as readline from 'node:readline/promises';
import 'dotenv/config'

const googleApiKey = process.env.GOOGLE_API_KEY;
const googleApiUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=";

export class FileProcessor {
    constructor() {
    }

    async readLineByLine(filePath) {
        const formatedCities = [];
        const fileStream = fs.createReadStream(filePath).on('error', (err) => {
            throw new Error(`Error reading file: ${err}`);
        });
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        }).on('error', (err) => {
            throw new Error(err);
        });

        for await (const city of rl) {
            formatedCities.push(await this.appendLocationToCity(city));
        }
        return formatedCities;
    }

    async appendLocationToCity(city) {
        const [cityName, state, code] = city.split(',');

        if (!cityName || !state || !code) {
            throw new Error(`Invalid city data: ${city}`);
        }

        const requestUrl = `${googleApiUrl}${cityName},${state},+${code}&key=${googleApiKey}`.replaceAll(' ', '');

        try {
            const response = await fetch(requestUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            return {
                cityName,
                state,
                code,
                location: data.results[0].geometry.location
            };

        } catch (error) {
            throw error;
        }
    }
}
