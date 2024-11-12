import fs from 'node:fs';
import * as readline from 'node:readline/promises';
import dotenv from 'dotenv';
dotenv.config();

const googleApiKey = process.env.GOOGLE_API_KEY;

const googleApiUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=";

export class FileProcessor {
    constructor() {
    }

    async readLineByLine(filePath) {
        const lines = [];
        const fileStream = fs.createReadStream(filePath).on('error', (err) => {
            throw new Error(`Error reading file: ${err}`);
        });
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        }).on('error', (err) => {
            throw new Error(err);
        });

        for await (const fileLine of rl) {
            lines.push(fileLine);
        }
        return lines;
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

    async processFile(filePath) {
        const lines = await this.readLineByLine(filePath);
        const results = []

        if(lines.length % 3 !== 0) {
            throw new Error('File must have a multiple of 3 lines');
        }

        for(let i = 0; i < lines.length; i+=3) {
            const batch = lines.slice(i, i + 3);
            const batchPromises = batch.map(city => this.appendLocationToCity(city));
            const batchResults = await Promise.all(batchPromises);
            results.push(...batchResults);       
         }
         return results;
        }
}
