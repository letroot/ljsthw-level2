import spectrum from "csv-spectrum";
import csv from "neat-csv";

spectrum(async (err, samples) => {
  // console.log(samples)
  for(let sample of samples) {
    const raw_csv = sample.csv.toString();
    console.log("RAW CSV:\n", raw_csv);

    const parsed = await csv(raw_csv);
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