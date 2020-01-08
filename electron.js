const fs = require('fs');
const convertFactory = require('electron-html-to');
//for the path option

fs.readFile('index.html', 'utf8', (err, htmlString) => {
  // add local path in case your HTML has relative paths
  htmlString = htmlString.replace(/href="|src="/g, match => {
    return match + 'file:///Users/alexisbounds/Documents/MyClassRepo/profile-generator/index.html';
  });
  const conversion = convertFactory({
    converterPath: convertFactory.converters.PDF,
    allowLocalFilesAccess: true
  });
  conversion({ html: htmlString }, (err, result) => {
    if (err) return console.error(err);
    result.stream.pipe(fs.createWriteStream('wild.pdf'));
    conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
  });
});// taken from example on electron-html-

// var conversion = convertFactory({
//   converterPath: convertFactory.converters.PDF
// });




/// for the html option


// var conversion = convertFactory({
//   converterPath: convertFactory.converters.PDF
// });
//  var html = '<h1>Hello World</h1>';
// conversion(html, function(err, result) {
//   if (err) {
//     return console.error(err);
//   }
//   console.log(result.numberOfPages);
//   console.log(result.logs);
//   result.stream.pipe(fs.createWriteStream('anywhere.pdf'));
//   conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
// });