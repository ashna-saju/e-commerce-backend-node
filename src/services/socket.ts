import { Server,Socket } from 'socket.io';
import http from 'http';

const initializeSocket=(httpServer:http.Server)=>{
    const io = new Server(httpServer, {
        cors: {
          origin: 'http://localhost:8080', // Add a colon after "http"
        },
      });
      return io;
};
export { initializeSocket };