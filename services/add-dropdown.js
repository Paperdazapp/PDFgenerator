const { PDFDocument } = require('pdf-lib');
const fetch = require("node-fetch");


const add_dropdown =async( form, field_name, value)=>{
  try{
    form.getDropdown(field_name).select(value);
  }catch(err){
      throw new Error (`couldn't get dropdown ${field_name}`);
  }
} 

module.exports = add_dropdown