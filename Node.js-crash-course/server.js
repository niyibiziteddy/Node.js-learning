//creating simple routing of the pages
import http from 'http';
import fs from 'fs/promises';
import url from 'url';
import path from 'path';
const PORT = process.env.PORT;

const __filename = url.fileURLToPath(import.meta.url);//This gets file url that is given from the 
//os disk specific file locatin and changes it into a file path that the app can understand and uses

//This gets the directory of the file that is being run. Here it is the server.js file
const __dirname = path.dirname(__filename)
const server = http.createServer(async (req,res) => {
    try{
        let myFile;
        if((req.url === '/' || req.url === '/home') && req.method === 'GET'){
            myFile = path.join(__dirname,'public','index.html')
            
        }
        else if((req.url === '/' || req.url === '/about') && req.method === 'GET'){
            myFile = path.join(__dirname,'public','about.html')
        }
        else{
            myFile = path.join(__dirname,'public','notfound.html')
        }
        res.setHeader('content-type','text/html');
        const data = await fs.readFile(myFile);
        res.write(data)
        res.end();

    }catch(err){
        console.log(err)
    }
})
server.listen(PORT,() => {
    console.log(`listening to the port ${PORT}`);
})