// import React from 'react';
import { useState, useEffect } from 'react'
import { Counter, Queue, Ticket } from './types';
import {Container, Row, Col, Button, Card, Alert} from 'react-bootstrap';
import axios from 'axios';
import './custom.css';
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function Management() {


  // const socket = io.connect("http://localhost:5000");

const [counters, setCounters] = useState<Counter[]>([]);

const [queue, setQueue] = useState<Queue>();

const [updateStatus, setUpdateStatus] = useState(false);

useEffect(()=>{
  socket.on("receiveStatus", (data: Counter) => {
    console.log(`Received message: ${data}`);
    // setUpdateStatus(!updateStatus);
    setCounters((prevCounters)=> {
      const index = prevCounters.findIndex((counter) => counter.ind === data.ind);
      const updatedCounters = [...prevCounters];
      updatedCounters[index] = data;
      return updatedCounters;
    })
  });
  socket.on("receiveNext", (data: Counter) => {
    console.log(`Received message: ${data}`);
    // setUpdateStatus(!updateStatus);
    setCounters((prevCounters)=> {
      const index = prevCounters.findIndex((counter) => counter.ind === data.ind);
      const updatedCounters = [...prevCounters];
      updatedCounters[index] = data;
      return updatedCounters;
    })
    // update the queue
    axios.get('http://localhost:5000/api/queue/get')
    .then((response) => {
        setQueue(response.data);
        console.log("q", response.data)
    })
  });

  socket.on("receiveQueue", (data: Queue) => {
    console.log(`Received message: ${data}`);
    // setUpdateStatus(!updateStatus);
    setQueue(data);
  });

  socket.on("receiveComplete", (data: Counter) => {
    console.log(`Received message: ${data}`);
    // setUpdateStatus(!updateStatus);
    setCounters((prevCounters)=> {
      const index = prevCounters.findIndex((counter) => counter.ind === data.ind);
      const updatedCounters = [...prevCounters];
      updatedCounters[index] = data;
      return updatedCounters;
    })
  });
}, [socket])



useEffect(() => {
  axios.get('http://localhost:5000/api/queue/get')
            .then((response) => {
                setQueue(response.data);
                console.log("q", response.data)
            })
            .catch((error) => {
                console.log(error);
            });
  axios.get('http://localhost:5000/api/counter/get')
      .then((response) => {
          setCounters(response.data);
      })
      .catch((error) => {
          console.log(error);
      });
}, []);

//toggle status by calling api
const toggleStatus = (ind: number) => {
  axios.put(`http://localhost:5000/api/counter/toggle/${ind}`)
      .then((response) => {
          // set counter of that specific counter
          // toggleOffline(ind);
          // response.data only returns the specific counter, hence setCounter the specific counter instead of all
          setCounters((prevCounters)=>{
            const index = prevCounters.findIndex((counter) => counter.ind === response.data.ind);
            const updatedCounters = [...prevCounters];
            updatedCounters[index] = {
              ...prevCounters[index],
              status: response.data.status
            };
            socket.emit("updateStatus", updatedCounters[index]);
            return updatedCounters;
          })
      })
      .catch((error) => {
          console.log(error);
      });
}

//complete current
const completeCurrent = (ind: number) => {
  axios.put(`http://localhost:5000/api/counter/complete/${ind}`)
  .then((response) => {
    console.log("aft complete", response.data)
    setCounters((prevCounters)=>{
      const index = prevCounters.findIndex((counter) => counter.ind === response.data.ind);
      const updatedCounters = [...prevCounters];
      updatedCounters[index] = response.data;
      socket.emit("updateComplete", updatedCounters[index],);
      return updatedCounters;
    })
})
.catch((error) => {
    console.log(error);
});
}

// call next
const callNext = (ind: number) => {

  // update the queue in client without calling api
  setQueue(prevQueue => {
    if (!prevQueue) return prevQueue; // return the current state if it's undefined
  
    const updatedTickets = prevQueue.tickets.slice(1);
    const updatedFront = updatedTickets.length > 0 ? updatedTickets[0] : null;
    const updatedRear = updatedTickets.length > 0 ? updatedTickets[updatedTickets.length - 1] : null;
  
    return {
      ...prevQueue,
      tickets: updatedTickets,
      front: updatedFront,
      rear: updatedRear
    };
  });

  axios.put(`http://localhost:5000/api/counter/call/${ind}`)
    .then((response) => {
      setCounters((prevCounters)=>{
        const index = prevCounters.findIndex((counter) => counter.ind === response.data.ind);
        const updatedCounters = [...prevCounters];
        updatedCounters[index] = response.data;
        socket.emit("callNext", updatedCounters[index]);
        return updatedCounters;
      })
  })
  .catch((error) => {
      console.log(error);
  });
}


return (
<>
    <div>
        <h1>Counter Management</h1>
    </div>
    {queue?.tickets && queue.tickets.length < 1 && (
      <Alert variant="error">
        <Alert.Heading>No tickets in the waiting queue</Alert.Heading>
      </Alert>
    )}
    <div>
    <Card className='custom-card'>
                <Card.Body>
                    <Card.Text>
                        Now Serving: {queue?.front?.number ?? "none"}
                    </Card.Text>
                    <Card.Text>
                        Last Number: {queue?.rear?.number ?? "none"}
                    </Card.Text>
                </Card.Body>
            </Card>
        <Container>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                {counters.map((counter, index) => (
                        <Card 
                          className={`custom-card${counter.status === 'offline' ? ' closed-card' : ''}`} 
                          key={counter.ind}
                        >
                            <Card.Body>
                                <Card.Text>
                                   Counter {counter.ind}
                                </Card.Text>
                                <Card.Text>
                                  {
                                    counter.status === "offline" ? "Closed" : counter.status === "online" ? "Open" : `Serving Ticket ${counter.currentNumber?.number}`
                                  }
                                </Card.Text>
                                <Card.Text>
                                    <Button 
                                    variant="primary" 
                                    disabled={counter.status === "serving"}
                                    onClick={() => toggleStatus(counter.ind)}>
                                      Go {counter.status === "offline" ? "Online" : "Offline"}
                                    </Button>
                                </Card.Text>
                                <Card.Text>
                                  {/* button for complete current */}
                                    <Button 
                                    variant="primary" 
                                    disabled={counter.status !== "serving"}
                                    onClick={()=> completeCurrent(counter.ind)}>
                                      Complete Current
                                    </Button>
                                </Card.Text>
                                <Card.Text>
                                    <Button 
                                    variant="primary" 
                                    disabled={counter.status !== "online" || queue?.tickets && queue?.tickets.length < 1 }
                                    onClick={()=> callNext(counter.ind)}>
                                      Call Next
                                    </Button>
                                </Card.Text>
                            </Card.Body>
                            
                        </Card>
                ))
                }
                </div>
        </Container>

    </div>
</>
  );
}

export default Management;