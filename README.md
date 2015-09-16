### Voting server

An application for organizing live votes for parties, conferences, meetings, and other gatherings of people.
It consists of two applications: a browser app using React and a server app that handles the voting logic.

This is the server app for Node that handles the voting logic. Communication between the client and server will 
be done using WebSockets.

It is going to use Redux to organize the application code both on the client and on the server. 
For holding the state it will use Immutable data structures.