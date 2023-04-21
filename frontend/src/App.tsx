import { useState, useEffect } from 'react'
import React from 'react';
// import { socket } from './socket';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import './App.css';

import { io, Socket } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {

  const [message, setMessage] = useState("");
  const socket = io('http://localhost:5000');

  useEffect(() => {
    console.log('Attempting to connect to server');
    
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("message", (data: string) => {
      console.log(`Received message: ${data}`);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  function sendMessage() {
    console.log(`Sending message: ${message}`);
    socket.emit("message", message);
  }
  
  // interface FooEvent {
  //   value: string;
  //   }

  // const [isConnected, setIsConnected] = useState(socket.connected);
  // const [fooEvents, setFooEvents] =  useState<FooEvent[]>([]);

  // useEffect(() => {
  //   function onConnect() {
  //     setIsConnected(true);
  //   }

  //   function onDisconnect() {
  //     setIsConnected(false);
  //   }

  //   function onFooEvent(event: FooEvent) {
  //     setFooEvents(previous => [...previous, event]);
  //   }

  //   socket.on('connect', onConnect);
  //   socket.on('disconnect', onDisconnect);
  //   socket.on('foo', onFooEvent);

  //   return () => {
  //     socket.off('connect', onConnect);
  //     socket.off('disconnect', onDisconnect);
  //     socket.off('foo', onFooEvent);
  //   };
  // }, []);



  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Select A View</h1> 
        </header>
        <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={() => {
        console.log("Send button clicked");
        sendMessage();
      }}>Send</button>
    </div>
        <div className="App-body">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Customer</Card.Title>
              <Card.Text>
                View the customer page.
              </Card.Text>
              <Link to="/customer">
                <Button variant="primary">Customer</Button>
              </Link>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Management</Card.Title>
              <Card.Text>
                View the management page.
              </Card.Text>
              <Link to="/management">
                <Button variant="primary">Management</Button>
              </Link>
            </Card.Body>
          </Card>
      </div>
    </div>
    </>
  );
}

export default App;

