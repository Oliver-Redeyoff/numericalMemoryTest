import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


class Results extends Component {


  componentDidMount() {
    console.log("sending data to backend")
    const requestOptions = {
      method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: this.props.times })
    };
    fetch('numTest', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));
        // .then(data => this.setState({ postId: data.id }));

  }

  render() {
    return (

      <Container>
        <Row>
          <Col><h1 style={{marginBottom: "40px"}}>Results</h1></Col>
        </Row>

        <Row>
          <Col xs="12">
            <div id="cell"><h3 style={{fontSize: "34px"}}>Total score : <code>{this.props.score}</code></h3></div>
          </Col>
          <Col xs="6">
            <div id="cell"><h3>Correct : <code>{this.props.correct}</code></h3></div>
          </Col>
          <Col xs="6">
            <div id="cell"><h3>Incorrect : <code>{this.props.times.length-this.props.correct}</code></h3></div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div id="cell">
              <h3>Time taken for each answer in seconds:</h3>

              <LineChart width={730} height={250} data={this.props.times}
                margin={{ top: 30, right: 20, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {/* <Legend /> */}
                <Line type="monotone" dataKey="value" stroke="#E01A76" />
              </LineChart>
            </div>
          </Col>
        </Row>
        
      </Container>
    );
  }

};

export default Results