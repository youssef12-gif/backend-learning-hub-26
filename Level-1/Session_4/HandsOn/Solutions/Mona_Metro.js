import http from 'http';



const server = http.createServer((req , res) => {
 //====================TASK3=======================   
    console.log('request method: ' , req.method);
    console.log('request url: ' , req.url);
 //====================TASK3=======================   

 //====================TASK1=======================   
    if(req.url === '/'){
         res.writeHead(200 , {"Content_Type": "txt/plain_txt"});
        res.end("Welcome to Cairo Metro Control — Line 3");
 //====================TASK1======================= 
 
 //====================TASK2=======================   
    }else if(req.url === '/next-train'){
        res.writeHead(200 , {"Content_Type": "txt/plain_txt"});
        res.end(new Date().toLocaleDateString());
 //====================TASK2=======================   
    } 

 //====================TASK1======================= 
    else{
          res.writeHead(404 , {"Content_Type": "txt/plain_txt"});
          res.end("Platform not found");
    }     
 //====================TASK1======================= 

})

const PORT = 3000;


server.listen(PORT , () => {
    console.log(`The server is listening to port: ${PORT}`);
})