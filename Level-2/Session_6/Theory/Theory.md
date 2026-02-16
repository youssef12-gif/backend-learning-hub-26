#  WebSockets & Webhooks

---
## 📋 Table of Contents
1. [Why Real-Time Communication?](#why-real-time-communication)
2. [What Is WebSockets?](#what-is-websockets)
3. [WebSockets vs HTTP Keep-Alive](#websockets-vs-http-keep-alive)
4. [Why WebSockets Use TCP?](#why-tcp)
5. [How WebSockets Work?](#how-websockets-work-network-level)
6. [What Is Webhooks?](#what-is-webhooks)
7. [WebSockets vs Webhooks](#websockets-vs-webhooks)


# Why Real-Time Communication?

## Traditional HTTP
- Client sends request
- Server responds
- Connection closes


```js
Client  ----------- Request ----------->  Server
        <---------- Response -----------  
               🔴 Connection Closed
```

 Not good for:
- Chat apps
- Live notifications
- Payments updates
- Live dashboards

---

#  WebSockets

## What Is WebSockets?
**WebSocket is a standardized communication protocol that enables simultaneous two-way communication over a single TCP connection. It has full-duplex or bi-directional capabilities that distinguishes it from HTTP .**

```js
Client ◀═══════▶ Server (Two-way)
```

- Persistent connection
- Full-duplex (2-way communication)
- Real-time data


Important: WebSockets run over TCP, NOT UDP

---

## WebSockets vs HTTP Keep-Alive

### - HTTP Keep-Alive (Persistent Connection)
```
Client → Server: GET /api/users (Connection: keep-alive)
Server → Client: 200 OK + data

[Connection stays open]

Client → Server: GET /api/posts (Connection: keep-alive)
Server → Client: 200 OK + data

[Connection stays open for reuse]
```
What it does:
- Reuses TCP connection for multiple HTTP requests
- Avoids TCP handshake overhead
- Still follows request/response pattern
- Client must initiate every request

Benefits:
- Faster subsequent requests (no TCP handshake)
- Reduced server load
- Lower latency

---

### - WebSocket (Bidirectional Channel)
```
Client → Server: HTTP Upgrade request
Server → Client: 101 Switching Protocols

[Connection upgraded to WebSocket]

Server → Client: "New message!" (no request needed)
Client → Server: "Got it!"
Server → Client: "User joined"
Client → Server: "Send to room"

[Both can send anytime]
```
What it does:
- Upgrades HTTP connection to WebSocket protocol
- Full-duplex communication
- Either side can send without request
- Different protocol (not HTTP anymore)

---

### Key Differences

| Feature | HTTP Keep-Alive | WebSocket |
|---------|----------------|-----------|
| Protocol | HTTP/1.1 over TCP | WebSocket over TCP |
| Pattern | Request → Response | Bidirectional messages |
| Who initiates? | Always client | Either side |
| Use case | Multiple API calls | Real-time push |
| Overhead | HTTP headers each time | Minimal frame header |
| Data format | HTTP request/response | Raw frames |
| Server push? |  No (must poll) |  Yes |

### Example:

HTTP Keep-Alive:
```
Client: "Give me data" → Server: "Here's data"
Client: "Give me data" → Server: "Here's data"
Client: "Give me data" → Server: "Here's data"
(Client always asks)
```
WebSocket:
```
Client: "Hello"
Server: "Hi! Here's an update"
Client: "Thanks"
Server: "Another update for you"
Server: "And another one"
(Both can talk freely)
```
### When to Use Each?

HTTP Keep-Alive:
- REST APIs
- Sequential requests
- Traditional web browsing
- File downloads
- Most web applications

WebSocket:
- Chat applications
- Live notifications
- Real-time dashboards
- Online games
- Live sports scores
- Stock tickers

---

## Why TCP?

WebSocket uses TCP because:
- Chat messages must arrive in order
- Can't lose payment confirmations
- Reliability > Speed for most use cases

Exception - WebRTC:
- Uses UDP for video/audio
- Speed matters more than perfect delivery
- Lost video frame = minor glitch
- Lost chat message = data loss

---

## How WebSockets Work (Network Level)

### 1. Handshake (HTTP Upgrade)

Client → Server:
```
GET /chat HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
```
Server → Client:
```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```
### 2. Connection Established
- TCP connection remains open
- HTTP is no longer used
- WebSocket frames are exchanged

### 3. Bidirectional Communication
- No request/response pattern
- Both sides can send anytime
- Low latency (~1-2ms overhead)

### 4. Connection Termination
Client/Server sends Close frame (0x8)
Other side responds with Close frame
TCP connection closes

---

#  Webhooks

## What Is Webhooks?

**Event-driven method for one application to send real-time data to another via HTTP POST requests .**
* Server → Server communication
* One-time request
* Runs over HTTP/HTTPS (which uses TCP)

Protocol: Webhooks are just HTTP POST requests
- Uses TCP for reliable delivery
- Standard HTTP(S) protocol

---

## When To Use
* Payment confirmation
* GitHub push events
* Email delivery updates
* Order status updates

Used by:
* Stripe
* PayPal
* GitHub

---

# WebSockets vs Webhooks

| Feature | WebSockets | Webhooks |
|---------|-----------|----------|
| Connection | Persistent | Single request |
| Direction | 2-way | 1-way |
| Used For | Real-time apps | Event notifications |
| Type | Client ↔ Server | Server → Server |

---
# Can They Work Together?

Yes 

Example:
1. Stripe sends webhook (payment success)
2. Server processes it
3. Server sends update to users via WebSocket

Real production systems use both together.

---