[
  {
    name: "comma_in_quotes",
    data: 'first,last,address,city,zip\nJohn,Doe,120 any st.,"Anytown, WW",08123',
    correct: [
      {
        first: "John",
        last: "Doe",
        address: "120 any st.",
        city: "Anytown, WW",
        zip: "08123",
      },
    ],
  },
  {
    name: "empty",
    data: 'a,b,c\n1,"",""\n2,3,4',
    correct: [
      { a: "1", b: "", c: "" },
      { a: "2", b: "3", c: "4" },
    ],
  },
  {
    name: "empty_crlf",
    data: 'a,b,c\r\n1,"",""\r\n2,3,4',
    correct: [
      { a: "1", b: "", c: "" },
      { a: "2", b: "3", c: "4" },
    ],
  },
  {
    name: "escaped_quotes",
    data: 'a,b\n1,"ha ""ha"" ha"\n3,4\n',
    correct: [
      { a: "1", b: 'ha "ha" ha' },
      { a: "3", b: "4" },
    ],
  },
  {
    name: "json",
    data: 'key,val\n1,"{""type"": ""Point"", ""coordinates"": [102.0, 0.5]}"\n',
    correct: [
      { key: "1", val: '{"type": "Point", "coordinates": [102.0, 0.5]}' },
    ],
  },
  {
    name: "newlines",
    data: 'a,b,c\n1,2,3\n"Once upon \na time",5,6\n7,8,9\n',
    correct: [
      { a: "1", b: "2", c: "3" },
      { a: "Once upon \na time", b: "5", c: "6" },
      { a: "7", b: "8", c: "9" },
    ],
  },
  {
    name: "newlines_crlf",
    data: 'a,b,c\r\n1,2,3\r\n"Once upon \r\na time",5,6\r\n7,8,9\r\n',
    correct: [
      { a: "1", b: "2", c: "3" },
      { a: "Once upon \r\na time", b: "5", c: "6" },
      { a: "7", b: "8", c: "9" },
    ],
  },
  {
    name: "quotes_and_newlines",
    data: 'a,b\n1,"ha \n""ha"" \nha"\n3,4\n',
    correct: [
      { a: "1", b: 'ha \n"ha" \nha' },
      { a: "3", b: "4" },
    ],
  },
  {
    name: "simple",
    data: "a,b,c\n1,2,3\n",
    correct: [{ a: "1", b: "2", c: "3" }],
  },
  {
    name: "simple_crlf",
    data: "a,b,c\r\n1,2,3\r\n",
    correct: [{ a: "1", b: "2", c: "3" }],
  },
  {
    name: "utf8",
    data: "a,b,c\n1,2,3\n4,5,ʤ",
    correct: [
      { a: "1", b: "2", c: "3" },
      { a: "4", b: "5", c: "ʤ" },
    ],
  },
];
