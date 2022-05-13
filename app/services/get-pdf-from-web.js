const { PDFDocument } = require('pdf-lib');
const fetch = require("node-fetch");


const get_pdf_from_web =async(Url)=>{
  try{

      const formPdfBytes = await fetch(Url).then(res => res.arrayBuffer()) 
      const pdfDoc = await PDFDocument.load(formPdfBytes)
      return pdfDoc;
  }catch(err){
      throw new Error ("couldn't get pdf from the web")
  }
} 

module.exports = get_pdf_from_web 