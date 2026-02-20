# WebSockets Task 💻
## Task Description:
Build a secure real-time chat system using NestJS WebSockets (Socket.IO) with JWT authentication and role-based access control for three predefined chat rooms.


## Core Requirements:

#### **1. Authentication**

-   login() :Users must login via HTTP endpoint (`POST /auth/login`) to receive a JWT token
-   JWT token contains: userId, role (admin/student), and email
-   Token is valid for 24 hours
-   No WebSocket connection allowed without valid JWT token


### **2. Room Joining & Messaging Flow:**

-   Users must explicitly join a room by name before sending messages
-   Rooms are 3 pre-defined (admin_room, student_room, general_room)
-   Users cannot create new rooms or join non-existent rooms
-  Server checks if user's role has permission to access that room

#### **WebSocket Connection Flow**

-   Client connects to WebSocket server with JWT token in handshake
-   Server validates JWT using a Guard (`WsJwtGuard`)
-   If token is invalid or missing: disconnect client immediately
-   If token is valid: take room name that user wants to join  
-  then -> check user role and make sure if he can join this room or not 
- after joining let user send messages if he can send messages to this room .




#### **Room Access & Messaging Rules**

**Admin User Can:**

-   Join: both : `admin_room`, `general_room`
-   Send messages in: `admin_room`, `general_room`
-   Cannot join: `student_room` (access denied)

**Student User Can:**

-   Join: both : `student_room`, `general_room`
-   Send messages in: `student_room` only
-   Read messages in: `general_room` (read-only, cannot send)
-   Cannot join: `admin_room` (access denied)

## Bonus 🌟

### 1. Online Users List: Show who's currently in each room 
### 2. Disconnect Users: Print a message in the chat when a user leavs a room 
### 3. Admin Broadcast to All Users : Admin sends announcement to everyone