const { PDFDocument } = require('pdf-lib');
const fetch = require("node-fetch");


const add_checkbox =async( form, field_name, isChecked)=>{
  try{
    if(isChecked){
      form.getCheckBox(field_name).check();
    }else{
      form.getCheckBox(field_name).uncheck();
    }
  }catch(err){
      throw new Error ("couldn't get pdf from the web")
  }
} 

module.exports = add_checkbox