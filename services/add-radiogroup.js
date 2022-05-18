const { PDFDocument } = require('pdf-lib');
const fetch = require("node-fetch");


const add_radio_group =async( form, field_name, value)=>{
  try{
    form.getRadioGroup(field_name).select(value);
  }catch(err){
      throw new Error (`couldn't get text field ${field_name}`)
  }
} 

module.exports = add_radio_group