const { PDFDocument , rgb} = require('pdf-lib');
const { readFile, writeFile } = require('fs/promises');



async function drawSvgPaths(input, output) {
  const svgPath = 'M 100 350 l 150 -300 M 250 50 l 150 300 M 100 350 q 150 -300 300 0 M 175 200 l 150 0'
  
  const pdfDoc = await PDFDocument.load(await readFile(input));
  console.log(pdfDoc.getPages()[0]);
  // const page = pdfDoc.addPage()
  const page = pdfDoc.getPages()[0]
  page.moveTo(10, page.getHeight() - 5) 
  
  page.moveDown(50,50)
  page.drawSvgPath(svgPath)
  
  page.moveTo(50,50) 
  page.drawSvgPath(svgPath, { borderColor: rgb(0, 1, 0), borderWidth: 16,  scale: 0.5 })
  
  // page.moveDown(200)
  // page.drawSvgPath(svgPath, { color: rgb(1, 0, 1) })
  
  page.moveDown(200)
  page.drawSvgPath(svgPath, { scale: 0.5 })
  
  const pdfBytes = await pdfDoc.save()

  await writeFile(output, pdfBytes);
}



async function createPdf(input, output) {
  try {
    const pdfDoc = await PDFDocument.load(await readFile(input));

    // Modify doc, fill out the form...
    const fieldNames = pdfDoc
      .getForm()
      .getFields()
      .map((f) => f.getName());
    console.log({ fieldNames });

    const form = pdfDoc.getForm();

    const possibleFields = Array.from({ length: 111 }, (_, i) => i);
    possibleFields.forEach((possibleField) => {
      try {
        form
          .getTextField(`Text${possibleField}`)
          .setText(possibleField.toString());
      } catch (error) {
        // console.error(error);
      }
    });

    form.get

    form.getTextField('Text2').setText('Isaac Ameh');

    form.getCheckBox('Check Box7').check();


    const pdfBytes = await pdfDoc.save();
    await writeFile("output.pdf", pdfBytes);
    console.log('PDF created!');
  } catch (err) {
    console.log(err);
  }
}

// createPdf('test.pdf', 'output.pdf');
drawSvgPaths('test2.pdf', 'output.pdf');
 