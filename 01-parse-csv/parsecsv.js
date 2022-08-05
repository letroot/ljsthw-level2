import spectrum from "csv-spectrum";
import csv from "neat-csv";
import fs from "fs";
// import testObject from "./test.js";
import equal from "deep-equal";

const TEST_FILE = "./test.js";

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
    console.log(err);
  });
};

spectrum(async (err, samples) => {
  // writeTestFile(samples, TEST_FILE);

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
    // // const parsed = await simple_parse(raw_csv);
    // console.log("PARSED:\n", parsed);
  }
});

// const roughStuff = () => {
//    console.log(testObject)
//   let first = testObject[0];

// };

// roughStuff();

const simpleParse = (raw_csv) => {
  const DELIMITERS = { newline: "\n", carriage: "\r\n" };

  let header = raw_csv.split(DELIMITERS.newline)[0].split(',');
  let parsed = {};
  header.map(item => parsed[item.trim()] = "");
  return parsed;
};
