// import fs from 'fs'
import fs from 'fs/promises';


//using the callBack function to read
// fs.readFile('./text.txt','utf8',(err,data) => {
//     if(err) throw new Error
//     console.log(data)
// })

//using the sync function to read
// const data = fs.readFileSync('./text.txt','utf8');
// console.log(data)

//using the promise version to read the file
const readData = async() => {
    try {
        const data = await fs.readFile('./text.txt','utf8');
        console.log(data)
    } catch (error) {
        console.log(error)
    }
    
}

//writing into the file 
const writeFile = async() => {
    try {
        const data = await fs.writeFile('./text.txt','This is the new text to the file')
        console.log('writing into file....')
    } catch (error) {
        console.log(error)
    }
}

//appending into file
const appendFile = async() => {
    try {
        const data = await fs.appendFile('./text.txt','\nThis is the appended text to the file')
        console.log('appending into file....')
    } catch (error) {
        console.log(error)
    }
}

writeFile()
appendFile()
readData()
