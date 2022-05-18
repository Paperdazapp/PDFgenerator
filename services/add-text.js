const { PDFDocument } = require('pdf-lib');
const fetch = require("node-fetch");


const add_text =async( form, field_name, value)=>{
  try{
     form.getTextField(field_name).setText(value);
  }catch(err){
      throw new Error (`couldn't get text field ${field_name}`)
  }
} 

module.exports = add_text