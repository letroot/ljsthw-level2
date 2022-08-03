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