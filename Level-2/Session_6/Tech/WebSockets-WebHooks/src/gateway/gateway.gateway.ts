import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer , ConnectedSocket } from "@nestjs/websockets";

import {Server, Socket} from "socket.io"
@WebSocketGateway( {cors: {
    origin: "*",
  },})
export class GatewayGateway implements OnModuleInit{
  
@WebSocketServer() 
server:Server;

  onModuleInit() {
      // Listen to all new connections
    this.server.on("connection", (Client)=>{ 
      console.log(`connected to socket succefully, welcome ${Client.id}`);
      
    })
  }
@SubscribeMessage("broadcast")
  groupmessaging(@MessageBody() msg:string){
    this.server.emit("broadcast", msg) //broadcasts the message to all connected clients, including the sender
    console.log("group chatting brodcast");
    
  }

  @SubscribeMessage("privatechannel")
  privatemessaging(@MessageBody() data:{targetclientid:string , msg:string}){
    
    this.server.to(data.targetclientid).emit("privatechannel",data.msg)
  }




  @SubscribeMessage("join_room")
  handleJoinRoom(@ConnectedSocket() client: Socket,@MessageBody() data: { roomName: string }
) {
  //Adds this client to a "room" in Socket.IO
  client.join(data.roomName);

  client.emit("join_room", `You joined ${data.roomName}`); // send to the client only 
}


  @SubscribeMessage("send_to_room")
handleSendToRoom(@ConnectedSocket() client: Socket,@MessageBody() data: { roomName: string; message: string }
) {
  //selects all clients in that room
  this.server.to(data.roomName).emit("receive_message", {
    sender: client.id,
    message: data.message,
  });
}
}