const PDFDocument = require('pdfkit');
const { Base64Encode } = require('base64-stream');

exports.generate = function (event, context) {
  return new Promise(resolve => {
    const doc = new PDFDocument();
    const stream = doc.pipe(new Base64Encode());
    const reportBuilder = [];
    let report = "";

    stream.on('data', function (chunk) {
      reportBuilder.push(chunk);
    });

    stream.on('finish', function () {
      report = reportBuilder.join('');
    });

    stream.on('end', function () {
      report = reportBuilder.join('');
      resolve(report);
    });

    doc.text("Sample PDF Report");
    doc.moveDown();
    doc.text(JSON.stringify(event));
    doc.moveDown();
    doc.text(JSON.stringify(context));
    doc.end();
  });
};