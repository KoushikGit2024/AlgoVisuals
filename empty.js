// // A CommonJS dummy file to safely catch Node.js server calls in the browser

// const dummyFn = () => "";

// module.exports = {
//   // Path module mocks
//   parse: () => ({ root: "", dir: "", base: "", ext: "", name: "" }),
//   join: dummyFn,
//   resolve: dummyFn,
//   dirname: dummyFn,
//   basename: dummyFn,
//   extname: dummyFn,
  
//   // Just in case it tries to read from the dummy fs module too
//   readFileSync: dummyFn,
//   promises: {
//     readFile: async () => "",
//   }
// };