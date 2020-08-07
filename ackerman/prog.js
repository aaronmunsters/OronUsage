const fs = require("fs");
fs.readFile("./output.wasm", (err, data) => {
  WebAssembly.instantiate(data.buffer, { env: { abort: process.abort } }).then(
    (val) => {
      const { exports } = val.instance;
      console.log("real: ", exports.getRealCount());
      console.log("profiled: ", exports.getCount());

      console.log("result of main: ", exports.main());

      console.log("real: ", exports.getRealCount());
      console.log("profiled: ", exports.getCount());

      console.log("Zeroes: ", exports.getZeroes());
    }
  );
});
