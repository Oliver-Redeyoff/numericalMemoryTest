import React, { Component } from 'react';
import { Button } from 'reactstrap';


const Home = props => {

  return (
    <div>
      <h1 style={{
        marginBottom: "40px"
      }}>Instructions</h1>
      <p>The following is a test to see how you perform with memorising numbers of increasing complexity.</p>
      <p>The assesement will last <code>60 seconds</code>. A number will appear for <code>3 seconds</code>, 
        after which it will disappear and you will have to input the number that you 
        remember. After validating your answer, a new number will appear and the process 
        will repeat.</p>
      <p>You will receive <code>10 points</code> for a valid answer, and no points if your inputed 
        number is different from the one that appeared.</p>
      <Button color="primary" size="lg" onClick={props.validate} style={{
        display: "inline-block",
        marginLeft: "50%",
        transform: "translateX(-50%)",
        marginTop: "20px"
      }}>Start</Button>
    </div>
  );
}

export default Home;
