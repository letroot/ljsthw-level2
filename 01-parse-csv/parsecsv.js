import spectrum from "csv-spectrum";
import csv from "neat-csv";
import fs from "fs";
import equal from "deep-equal";

const TEST_FILE = "./test.js";
const SYMBOLS = { quotes: '"', comma: ",", carriage: "\r\n", newline: "\n" };
const DELIMITERS = { newline: "\n", carriage: "\r\n", simple_carriage: "\r" };

const writeTestFile = async (samples, path) => {
  let result = [];

  for (let sample of samples) {
    let row = {};
    row.name = sample.name;

    let csvString = sample.csv.toString();
    let csvSplit = csvString.split("\n");

    row.data = csvString;
    let correct = await csv(csvString);
    row.correct = correct;

    result.push(row);
  }
  await fs.writeFile(path, JSON.stringify(result), null, (err) => {
    console.log("Error", err);
  });
};

spectrum(async (err, samples) => {
  writeTestFile(samples, TEST_FILE);

  for (let sample of samples) {
    const raw_csv = sample.csv.toString();
    // console.log("RAW CSV:\n", raw_csv);

    const good = await csv(raw_csv);
    const ours = simpleParse(raw_csv);
    console.log(ours);

    // if (!equal(ours, good)) {
    //   console.error("FAIL EXPECTED", good, "\nGOT", ours);
    //   process.exit(1);
    // }
    // const parsed = await simple_parse(raw_csv);
    // console.log("PARSED:\n", parsed);
  }
});

const simpleParse = (raw_csv) => {
  let headerArray = raw_csv
    .split(DELIMITERS.newline)[0]
    .split(",")
    .map((h) => h.trim());

  let parsed = {};

  let csvBody = raw_csv.substr(headerArray.length + 1, raw_csv.length);
  let parsedBody = parseCSVBody(csvBody, headerArray);

  return parsedBody;
};

function parseCSVBody(string, header) {
  let csvString = string.trim();

  let text = [];
  let result = [];
  let isTextQuote = false;

  for (let char of csvString) {
    if (!isTextQuote && char === SYMBOLS.quotes) {
      text.push(char);
      isTextQuote = true;
    } else if (isTextQuote && char === SYMBOLS.quotes) {
      text.push(char);
      isTextQuote = false;
    } else if (isTextQuote && char === SYMBOLS.comma) {
      text.push(char);
    } else if (!isTextQuote && char === SYMBOLS.comma) {
      result.push(text);
      text = [];
    } else if (!isTextQuote && Object.values(DELIMITERS).includes(char)) {
      result.push(text);
      text = [];
    } else {
      text.push(char);
    }
  }
  result.push(text);
  result = result.map((arr) => arr.join(""));

  let parsedBody = [],
    subArr;
  parsedBody.push(header);
  while ((subArr = result.splice(0, header.length)).length)
    parsedBody.push(subArr);

  return parsedBody;
}
