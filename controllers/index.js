
const { PDFDocument } = require('pdf-lib');
const fetch = require("node-fetch");
const { readFile, writeFile, fs } = require('fs/promises');
const FormData  = require('form-data');
const axios = require('axios');
// const fs = require("fs")
var svg_to_png = require('svg-to-png');


require("dotenv").config();  
// const UPLOAD_URL= "https://backend.paperdaz.com/files"
const UPLOAD_URL= "http://localhost:3030/files"

const fillForm =async(req, res, next)=>{
       const {pdf_url, data} = req.body

        const pdf = await fetch(pdf_url).then(res => res.arrayBuffer()) 
        const pdfDoc = await PDFDocument.load(pdf)
        const numPages = pdfDoc.getPages.length
        console.log("number of pages ="+(parseInt(numPages)+1)) 

        const form = pdfDoc.getForm()
        const fields = form.getFields()
        console.log(`${fields.length} fields found`)
        try {    
          fields.forEach(async field => {
            const type = field.constructor.name
            const name = field.getName()
            // console.log(`${type}: ${name}`)
      
            data.map(async el => {
              //if text
              if(el.type == "PDFTextField"){
                if(el.fieldName == name){
                  await form.getTextField(name).setText(el.value);
                  console.log(`${type}: ${name}`)
                }
              } 
              else if(el.type == "PDFDropdown"){
                if(el.fieldName == name){
                  form.getDropdown(name).select(el.value); 
                } 
              } 
              else if(el.type == "PDFCheckBox"){
                if(el.fieldName == name){
                  if(el.isCheck){
                    form.getCheckBox(name).check();
                  }
                }
              }
              else if(el.type == "PDFRadioGroup"){
                if(el.fieldName == name){
                 form.getRadioGroup(name).select(el.value) 
                } 
              }
              else if(el.type == "Annotation"){
                let _page = pdfDoc.getPages()[el.page_number];
                _page.drawSvgPath(el.svgPath, {x:el.x, y: (_page.getHeight() - el.y), borderWidth: 1,})
              }
              else if(el.type == "Image"){
                let _page = pdfDoc.getPages()[el.page_number];
                const pngImage = pdfDoc.embedPng(el.base64)
                _page.drawImage(pngImage, {x:el.x, y: (_page.getHeight() - el.y), borderWidth: 1,})
              }
              else if(el.type == "DrawText"){
                let _page = pdfDoc.getPages()[el.page_number];
                _page.drawText(el.text, {x:el.x, y: (_page.getHeight() - el.y)})
              } 
       
            }) 
      
          }) 

          const pdfBytes = await pdfDoc.save();
          await writeFile("output.pdf", pdfBytes);
          console.log('PDF created!');
         
        const FormData = require('form-data');
 
        const formFile = new FormData();
        formFile.append('upload', fs.createReadStream('././output.pdf'));
        formFile.append("type", "pdf");
        console.log('PDF updloaded!');

        await axios.post(UPLOAD_URL, formFile, { headers: formFile.getHeaders() })
        .then(function (response) {
          console.log("yes")
          console.log(response)
          res.status(201).json(response.data)
        })
        .catch(function (err) {
          console.log("no")
          console.log(err)
          res.status(400).json(err)
        });

      }catch(err){
        console.log("nope")
        res.status(400).json(err)
      }

}  

 
module.exports = {
    fillForm
}