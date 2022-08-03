[
  {
    name: "comma_in_quotes",
    header: "first,last,address,city,zip",
    data: 'John,Doe,120 any st.,"Anytown, WW",08123',
    correct: {
      first: "John",
      last: "Doe",
      address: "120 any st.",
      city: "Anytown, WW",
      zip: "08123",
    },
  },
  {
    name: "empty",
    header: "a,b,c",
    data: '1,"",""',
    correct: { a: "1", b: "", c: "" },
  },
  {
    name: "empty_crlf",
    header: "a,b,c\r",
    data: '1,"",""\r',
    correct: { a: "1", b: "", c: "" },
  },
  {
    name: "escaped_quotes",
    header: "a,b",
    data: '1,"ha ""ha"" ha"',
    correct: { a: "1", b: 'ha "ha" ha' },
  },
  {
    name: "json",
    header: "key,val",
    data: '1,"{""type"": ""Point"", ""coordinates"": [102.0, 0.5]}"',
    correct: {
      key: "1",
      val: '{"type": "Point", "coordinates": [102.0, 0.5]}',
    },
  },
  {
    name: "newlines",
    header: "a,b,c",
    data: "1,2,3",
    correct: { a: "1", b: "2", c: "3" },
  },
  {
    name: "newlines_crlf",
    header: "a,b,c\r",
    data: "1,2,3\r",
    correct: { a: "1", b: "2", c: "3" },
  },
  {
    name: "quotes_and_newlines",
    header: "a,b",
    data: '1,"ha ',
    correct: { a: "1", b: 'ha \n"ha" \nha' },
  },
  {
    name: "simple",
    header: "a,b,c",
    data: "1,2,3",
    correct: { a: "1", b: "2", c: "3" },
  },
  {
    name: "simple_crlf",
    header: "a,b,c\r",
    data: "1,2,3\r",
    correct: { a: "1", b: "2", c: "3" },
  },
  {
    name: "utf8",
    header: "a,b,c",
    data: "1,2,3",
    correct: { a: "1", b: "2", c: "3" },
  },
];
