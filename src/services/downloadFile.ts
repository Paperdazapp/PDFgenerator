const axios = require('axios');
const fs = require('fs');

const DownloadFile = (fileUrl: string, fileId:string) =>{
    axios.get(fileUrl, {responseType: 'blob'}).then(response => {
        var fileDir: string =`/temp/${fileId}.pdf`
        fs.writeFile(fileDir, response.data, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
            return fileDir
        });
    });
}

