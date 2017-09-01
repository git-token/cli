const program = require('commander');

program
  .version('0.0.1')
  .option('-o, --option','option description')
  .option('-m, --more','we can have as many options as we want')
  .option('-i, --input [optional]','optional user input')
  .option('-I, --another-input <required>','required user input')
  .parse(process.argv); // end with parse to parse through the input
