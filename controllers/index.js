
const { PDFDocument } = require('pdf-lib');
const fetch = require("node-fetch");
const { readFile, writeFile } = require('fs/promises');
const FormData  = require('form-data');
const axios = require('axios');
const fs = require("fs")


const UPLOAD_URL= "http://paperdaz-backend.herokuapp.com/api/v2/file/upload"

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
            // console.log(`${type}: ${name}`)
      
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
          // return console.log(pdfBytes)
          await writeFile("output.pdf", pdfBytes);
          console.log('PDF created!');


          const file =  fs.readFile('../output.pdf');

            // return console.log(file);
     
            let formData = new FormData();
            formData.append("upload", pdfBytes, "output.pdf");
           
            await axios.post(UPLOAD_URL, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }).then((response) => {
                response;
              }).catch((error) => {
                error;
              });
       
      
        } catch (error) {
          console.log(error)
        }
         
          //........................test
    
} 


module.exports = {
    fillForm
}