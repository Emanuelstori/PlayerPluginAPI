import { server } from "./server/Server";

server.listen(process.env.PORT, ()=> console.log('http://localhost:'+process.env.PORT));