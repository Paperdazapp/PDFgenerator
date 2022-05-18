const get_pdf_from_web = require("../services/get-pdf-from-web")


const fillFormx =async(req, res, next) =>{
    try {
        const pdf = await get_pdf_from_web("https://paperdazfile.nyc3.digitaloceanspaces.com/users_document/sample_pdf.pdf1643914976564")
        console.log(pdf.getPages())
        res.end(1000)
    } catch (error) {
        res.send("an error occurred")
    }

}

module.exports = {
    fillFormx
}