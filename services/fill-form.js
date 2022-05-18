const { PDFDocument } = require('pdf-lib');



const fill_form =async(pdfDoc, formData)=>{
  try{
      
    const pages = pdfDoc.getPages();

    for(let i=0; i<pages.length; i++){
        console.log()
    }


  }catch(err){
      throw new Error ("couldn't fill form")
  }
} 

module.exports = fill_form