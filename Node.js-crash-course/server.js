import http from 'http';

const server =http.createServer((req,res) => {

    res.end('hello world')
})
server.listen(2000,() => {
    console.log("listening to this server at port: 2000")
})