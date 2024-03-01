# web-socket
Web Socket App


This is a sample web socket app

In this two functionalities one is for broadcast message and second for one to one chat. You can use postman websocket request type for using this. 

Postman request example:
Request Url: ws://localhost:8080/
Message Type: JSON
Message: {
  "message":"Hi",#Message for receiver required
  "receiverId":"receiverId" #Optional : If you add receiver id then this message send only to another user. if not then this message send to                             all clients(Broadcast Message)
}
For getting receiver id we are saving receiver id in map and show in console

#Run Commands
npm start

