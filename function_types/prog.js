const fs = require("fs");
const loader = require("@assemblyscript/loader");
fs.readFile("./output.wasm", (err, data) => {
  loader
    .instantiate(data.buffer, { env: { abort: process.abort } })
    .then((val) => {
      const { exports } = val;
      console.log("bool: ", exports.getBool());
      console.log("calling main: ");

      exports.main();

      console.log("bool: ", exports.getBool());

      console.log(exports.__getInt32Array(exports.numbersCollecting));

      console.log(val.exports.__getString(exports.getNext()));
      console.log(val.exports.__getString(exports.getNext()));
      console.log(val.exports.__getString(exports.getNext()));
    });
});
