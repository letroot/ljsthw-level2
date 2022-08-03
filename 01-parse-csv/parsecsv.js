import spectrum from "csv-spectrum";
import csv from "neat-csv";
import fs from "fs";
const TEST_FILE = "./test.js"

const writeTestFile = async (samples, path) => {
  let result = [];

  for (let sample of samples) {
    let row = {};
    row.name = sample.name;
    
    let csvString = sample.csv.toString()
    let csvSplit = csvString.split("\n");

    row.header = csvSplit[0];
    row.data = csvSplit[1];
    let correct = await csv(csvString)
    row.correct = correct[0]

    result.push(row);
  }
  await fs.writeFile(path, JSON.stringify(result), null, (err) => {
    console.log(err);
  });
};

spectrum(async (err, samples) => {
  // writeTestFile(samples, TEST_FILE)

  for (let sample of samples) {
    const raw_csv = sample.csv.toString();
    console.log("RAW CSV:\n", raw_csv);

    const parsed = await csv(raw_csv);
    // const parsed = await simple_parse(raw_csv);
    console.log("PARSED:\n", parsed);
  }
});

// TODO: design notes
// CASES to plan for

// Case: comma_in_quotes
// Case: empty
// Case: empty_crlf
// Case: escaped_quotes
// Case: json
// Case: newlines
// Case: newlines_crlf
// Case: quotes_and_newlines
// Case: simple
// Case: simple_crlf
// Case: utf8

// const simple_parse = (raw_csv) => {
//   const rows = raw_csv.split("\n");
//   const header = rows[0];
//   console.log("====", "Header:", header, "====");

//   const result = [];

//   for (let row of rows) {
//     result.push(row.split(","));
//   }

//   return result;
// };
