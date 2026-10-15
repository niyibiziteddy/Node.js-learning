//simple api
import {createServer} from 'http';
const PORT = process.env.PORT;

const users = [
    {id:1 , name:'Niyibizi Teddy'},
    {id:2 , name:'Mark Zuckerberg'},
    {id:3 , name:'Bill Gates'}
]

//Loger middleware 
const logger = ((req,res,next) => {
    console.log(`${req.url}  ${req.method}`);
    next()
})

//getusers handler
const getUsersHandler = (res,req) => {
    res.writeHead(200,({"content-type":"application/json"}))
    res.write(JSON.stringify(users))
}
//get user by id Handler
const getUserByIdHandler = (res,req,id) => {
    res.writeHead(200,{"content-type":"application/json"})
    let user = users.find(item => item.id === Number(id[3]))
    if(user){
        res.write(JSON.stringify(user))
    }else{
        res.writeHead(404,{"content-type":"application/json"})
        res.write(JSON.stringify({message: 'The user not found'}))
    }
}

//Error handler 
const errorHandler = (res,req) => {
    res.writeHead(404,{"content-type":"application/json"})
    res.write(JSON.stringify({message: 'The router not found'}));
}

const server = createServer((req,res) => {

    logger(req,res,() => {
        const id = req.url.split('/')
        try{
            if(req.url === '/api/users' && req.method === 'GET'){
                getUsersHandler(res,req)
            }
            else if(!Number.isNaN(Number(id[3]))){
                getUserByIdHandler(res,req,id)
            }  
            else if(req.url === '/api/users' && req.method === 'POST'){
                let data = '';
                req.on('data',chunk => {
                    data += chunk.toString();
                })
                req.on('end',() => {
                    users.push(JSON.parse(data))
                })
            }
            else{
                errorHandler(res,req);
            }
            res.end();
        }catch(err){
            console.log("Here is the error: "+ err)
        }
    })

    
})
server.listen(PORT,'0.0.0.0',() => {
    console.log(`listening to the port ${PORT}`);
})