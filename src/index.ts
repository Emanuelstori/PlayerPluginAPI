import { server } from "./server/Server";

server.listen(process.env.PORT || 3000, ()=> console.log('http://191.101.18.52:'+ (process.env.PORT || 3000)));