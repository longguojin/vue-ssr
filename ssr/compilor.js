const webpack = require('webpack');

//multi compilor
const client_config = require('../build/webpack.client.config.js');
const server_config = require('../build/webpack.server.config.js');
const compiler = webpack([client_config,server_config]);

//set compilor file system
// const fs = new MemoryFS();
// compiler.outputFileSystem = fs;


//watch file changes
compiler.watch({
  // watchOptions 
  aggregateTimeout: 300,
  poll: undefined,
  ignored: /node_modules/
}, (err, stats) => {

  //stats.toJson("minimal"); 
  console.log(stats.toString({
    chunks: false, // silent output while compiling
    colors: true // show color in console output
  }));


  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }
});