
const { PDFDocument } = require('pdf-lib');
const fetch = require("node-fetch");
const { readFile, writeFile } = require('fs/promises');
const FormData  = require('form-data');
const axios = require('axios');
const fs = require("fs")

require("dotenv").config();  
const UPLOAD_URL= "https://paperdaz-be.herokuapp.com/api/v2/file/upload_pdf"

const fillForm =async(req, res, next)=>{
       const {pdf_url, data} = req.body

        const pdf = await fetch(pdf_url).then(res => res.arrayBuffer()) 
        const pdfDoc = await PDFDocument.load(pdf)
        const numPages = pdfDoc.getPages.length
        console.log("number of pages ="+(parseInt(numPages)+1)) 

        try {    
          const form = pdfDoc.getForm()
          const fields = form.getFields()
          console.log(`${fields.length} fields found`)
          fields.forEach(field => {
            const type = field.constructor.name
            const name = field.getName()
            console.log(`${type}: ${name}`)
      
            data.map(el => {
              //if text
              if(el.type == "PDFTextField"){
                if(el.fieldName == name){
                  form.getTextField(name).setText(el.value);
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
      
            })
      
          })

          const pdfBytes = await pdfDoc.save();
          await writeFile("output.pdf", pdfBytes);
          console.log('PDF created!');


        const FormData = require('form-data');
 
        const formFile = new FormData();
        formFile.append('upload', fs.createReadStream('././output.pdf'));
 
        await axios.post(UPLOAD_URL, formFile, { headers: formFile.getHeaders() })
        .then(function (response) {
          console.log("yes", response)
          res.status(201).json(response.data)
        })
        .catch(function (err) {
          console.log(err)
          res.status(400).json(err)
        });

      }catch(err){
        res.status(400).json(err)
      }



}  

 
module.exports = {
    fillForm
}