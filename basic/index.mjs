import { FileProcessor } from "./file-processor.mjs";

const fileReader = new FileProcessor();

const formattedCities = await fileReader.readLineByLine('../cities.txt');

console.table(formattedCities);
