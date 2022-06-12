
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

        // try {    
        //   const form = pdfDoc.getForm()
        //   const fields = form.getFields()
        //   console.log(`${fields.length} fields found`)
        //   // fields.forEach(field => {
        //   //   const type = field.constructor.name
        //   //   const name = field.getName()
        //   //   console.log(`${type}: ${name}`)
      
        //   //   data.map(el => {
        //   //     //if text
        //   //     if(el.type == "PDFTextField"){
        //   //       if(el.fieldName == name){
        //   //         form.getTextField(name).setText(el.value);
        //   //       }
        //   //     } 
        //   //     else if(el.type == "PDFDropdown"){
        //   //       if(el.fieldName == name){
        //   //         form.getDropdown(name).select(el.value);
        //   //       }
        //   //     } 
        //   //     else if(el.type == "PDFCheckBox"){
        //   //       if(el.fieldName == name){
        //   //         if(el.isCheck){
        //   //           form.getCheckBox(name).check();
        //   //         }
        //   //       }
        //   //     }
        //   //     else if(el.type == "PDFRadioGroup"){
        //   //       if(el.fieldName == name){
        //   //        form.getRadioGroup(name).select(el.value) 
        //   //       }
        //   //     }
        //   //     else if(el.type == "Annotation"){
        //   //       let _page = pdfDoc.getPages()[el.page_number];
        //   //       _page.drawSvgPath(el.svgPath, {x:el.x, y: (_page.getHeight() - el.y), borderWidth: 1,})
        //   //     }
      
        //   //   })
      
        //   // })

        //   const pdfBytes = await pdfDoc.save();

        //   // await writeFile("output.pdf", pdfBytes);
        //   console.log('PDF created!');


        //   const file =  fs.readFile('../output.pdf');

        //   console.log(file);
     
        //     let formData = new FormData();
        //     console.log(2);
        //     formData.append("upload", pdfBytes, "output.pdf");
        //     console.log(3);
            
            
        //   } catch (error) {
        //     console.log(error)
        //   }
          
        
        // const pdfBytes = await pdfDoc.save();
        // try{
        //   const file =  fs.readFile('output.pdf');
        //   console.log(file);
          
        //   let formData = new FormData();
        //   formData.append("upload", file, "output.pdf");
        //   console.log(formData);
        // }catch{e=>console.log(e)}


          // const file =  fs.readFile('./output.pdf', async(err, data)=>{
          //   if(err) return console.log(err)
          //   let formData = new FormData();
          //   formData.append("upload", data, "output.pdf");
          //   // console.log(formData);
          //   await axios.post(UPLOAD_URL, formData, {
          //       headers: {
          //         "Content-Type": "multipart/form-data",
          //       },
          //     }).then((response) => {
          //       response;
          //       res.send(response)
          //     }).catch((error) => {
          //       error;
          //     }); 
            
          // });
 
          // var axios = require('axios');
          // var FormData = require('form-data');
          // var fs = require('fs');
          // var data = new FormData();
          // var file = fs.createReadStream('././output.pdf')
        //   data.append('upload', file, "output.pdf");
     
        //   var config = {
        //     method: 'post',
        //     url: 'http://paperdaz-backend.herokuapp.com/api/v2/file/upload',
        //     headers: { 
        //       'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE1M2JmMDI2LWQxMTMtNDBmZS05MjY5LThjZWYwNmVmZGFhZiIsImVtYWlsIjoiYWRtaW5AdGVzdC5jb20iLCJpYXQiOjE2NTI5NDM3NDgsImV4cCI6MTY1MzEwOTA1MjQ5Mzh9.n3gjx2mgkwgPubFSbnQcXR0SbEru5ZZL9j6wqbiye20', 
        //       ...data.getHeaders()
        //     },
        //     data : data
        //   };
          
        //  await axios(config)
        //   .then(function (response) {
        //     console.log("worked")
        //     console.log(JSON.stringify(response.data));
        //   })
        //   .catch(function (error) {
        //     console.log("failed")
        //     console.log(error);
        //   });


        // const formData = new FormData();
        // const imagefile = document.querySelector('#file');
        // formData.append("image", file);
        // axios.post('upload', formData, {
        //     headers: {
        //       'Content-Type': 'multipart/form-data'
        //     }
        // })

        const FormData = require('form-data');
 
        const form = new FormData();
        await form.append('upload', fs.createReadStream('././output.pdf'));
 
        await axios.post(UPLOAD_URL, form, { headers: form.getHeaders() })
        .then(function (response) {
          console.log("yes", response)
          res.status(201).json(response.data)
        })
        .catch(function (err) {
          console.log(err)
          res.status(400).json(err)
        });


       

        // const uploadFile = multer({
        //  var file:any = fs.readFileSync('././output.pdf'),

          // fileFilter: (req, file, cb) => {
          //   // validate file
          //   console.log("file data", file);
          //   let isValid = false;
          //   if(file.mimetype == 'application/pdf'){
          //     isValid = true;
          //     cb(null, isValid);
          //   }else{
          //     cb(new Error("File type must be in pdf format"));
            
          //   }
          // },
        //   storage: multerS3({
        //     s3: new aws.S3({
        //       //@ts-ignore
        //       accessKeyId: process.env.DO_SPACES_KEY || null,
        //       //@ts-ignore
        //       secretAccessKey: process.env.DO_SPACES_SECRET || null,
        //       //@ts-ignore
        //       endpoint: process.env.DO_SPACES_ENDPOINT || null,
        //       signatureVersion: "v4"
        //     }),
        //     //@ts-ignore
        //     bucket: process.env.DO_SPACES_BUCKET || null,
        //     contentType: multerS3.AUTO_CONTENT_TYPE,
        //     acl: "public-read",
        //     key: (req, file, cb) => {
        //       // save file to Spaces, you can use / to add folders directory
        //       const fileName = file.originalname + Date.now().toString(); 
        //       cb(null, `users_document/${fileName}`);
        //     }
        //   })
        
        // }).array("upload", 1);

}  

 
module.exports = {
    fillForm
}