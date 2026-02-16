## Main WebSocket function : 
### Install :
```js
npm install @nestjs/websockets @nestjs/platform-socket.io
npm install -D @types/socket.io
```

## 1️⃣ server.on
```js
 server.on("connection", () => { ... })
```
- the function Listens for a new client connection.

- Every time a client connects, the function inside (client) => { ... } is called.

## 2️⃣ Broadcast Messages (Everyone):
**- Sending messages to any one how is connected to the server & listening to the same event.**
 
```js
this.server.emit("broadcast", msg)
```
- Sends a message to all connected clients.

- "broadcast" is the event name to send messages to.

- Every client that is listening for "broadcast" will receive msg

## 3️⃣ Private Messages :
**Sending private messages to specific user by id .**
```js
this.server.to(reciverClient).emit("eventName")
```
- Send a message to a specific room or client, not everyone.

- specified client must listen to the same event

## 3️⃣ Room Messages :
### Room joining
```js
 client.join(roomName)
```

### Send Message to Room.

```js
this.server.to(roomName).emit("send_room", msg)
```

- Sends data.msg only to clients in the specified room.

- Clients outside the room will not receive the message
