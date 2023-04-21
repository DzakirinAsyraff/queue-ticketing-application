// import React from 'react';
import { useState, useEffect } from 'react'
import { Counter, Queue, Ticket } from './types';
import {Container, Row, Col, Button, Card} from 'react-bootstrap';
import axios from 'axios';
import './custom.css';
import { io, Socket } from "socket.io-client";
import { socket } from './socket';

function Customer() {

    //array of counters (size of 4)
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
        console.log("outside")
        axios.get('http://localhost:5000/api/queue/get')
            .then((response) => {
                setQueue(response.data);
                console.log("q", response.data)
            })
            .catch((error) => {
                console.log(error);
            });
        console.log("first")
        axios.get('http://localhost:5000/api/counter/get')
            .then((response) => {
                setCounters(response.data);
                console.log("c", response.data)
            })
            .catch((error) => {
                console.log(error);
            });
        console.log("2nd")
    }, []);

    useEffect(()=>{
        axios.get('http://localhost:5000/api/counter/get')
            .then((response) => {
                setCounters(response.data);
                // setLsn(response.data.currentNumber);
                // setLin(response.data.currentNumber);
            })
            .catch((error) => {
                console.log(error);
            });
    },[updateStatus])

    //take a new number function
    const enqueue = () => {
        axios.get('http://localhost:5000/api/queue/enqueue')
            .then((response) => {
                setQueue(response.data);
                console.log("queue",response.data)
                socket.emit("updateQueue", response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }



  return (
    <>
        <div>
            <h1>Customer View</h1>
        </div>
        <div>
            <Card className='custom-card'>
                <Card.Body>
                    <Card.Text>
                        Now Serving: {queue?.front?.number ?? "none"}
                    </Card.Text>
                    <Card.Text>
                        Last Number: {queue?.rear?.number ?? "none"}
                    </Card.Text>
                    <Card.Text>
                        <Button variant="primary" onClick={enqueue}>Take a Number</Button>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Container>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                    {counters.map((counter) => (
                            <Card className={`custom-card${counter.status === 'offline' ? ' closed-card' : ''}`}>
                                <div style={{position: 'relative'}}>
                                <div className={`${counter.status === 'serving' ? 'dot-serving' : counter.status === 'offline' ? 'dot-offline' : 'dot'}`}></div>
                                <Card.Body>
                                    <Card.Text>
                                       Counter {counter?.ind}
                                    </Card.Text>
                                    <Card.Text>
                                        {counter?.status === "offline" ? "Offline" : counter?.currentNumber?.number}
                                    </Card.Text>
                                    <Card.Text>
                                        {/* {counter?.status} */}
                                    </Card.Text>
                                </Card.Body>
                                </div>
                            </Card>
                    ))
                    }
                    </div>
            </Container>

        </div>
    </>
  );
}

export default Customer;
