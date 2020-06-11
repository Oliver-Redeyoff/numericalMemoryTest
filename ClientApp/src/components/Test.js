import React, { Component } from 'react';
import { Button, Progress } from 'reactstrap';


class Test extends Component {

  constructor(props) {
    super(props)
    this.numInput = React.createRef();
    this.state = {
      data: [-1],
      loading: true,
      allowInput: "disabled",
      testTime: 60,
      numViewTime: 100
    }

    this.nextViewing = this.nextViewing.bind(this)
    this.endViewing = this.endViewing.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.validateChoice = this.validateChoice.bind(this)
  }

  message = "Loading..."
  // numViewTime = 3
  currentNumber = ""
  index = 0
  currentResponseTime = 0
  score = 0

  componentDidMount() {
    this.populateNumbersData();
  }

  startTest() {
    console.log("starting test");

    this.testTimer = setInterval(() => {
      this.setState({
        ...this.state,
        testTime: this.state.testTime-1
      })
      if(this.state.testTime == 0) {
        clearInterval(this.testTimer);
        this.props.validate();
      }
    }, 1000)

    // set up the first number to display
    this.currentNumber = this.state.data[this.index];
    this.message = this.currentNumber

    this.setState({
      ...this.state,
      allowInput: "disabled",
      numViewTime: 100
    });
    this.viewTimer = setInterval(() => {
      this.setState({
        ...this.state,
        numViewTime: this.state.numViewTime-1/3
      });
      console.log(this.state.numViewTime)
      if(this.state.numViewTime <= 0){
        clearInterval(this.viewTimer);
        this.endViewing();
      }
    }, 10)

  }


  nextViewing() {
    // First check that the inputed number is correct
    var nInput = document.getElementById("numInput")
    console.log(nInput.value)
    console.log(this.currentNumber)
    if(nInput.value == this.currentNumber){
      console.log("You got the number right!");
      this.score += 10
      this.props.increaseScore()
    }
    nInput.value = ""

    this.numInput.current.focus();

    this.index += 1
    this.currentNumber = this.state.data[this.index]
    this.message = this.currentNumber

    this.setState({
      ...this.state,
      allowInput: "disabled",
      numViewTime: 100
    });
    this.viewTimer = setInterval(() => {
      this.setState({
        ...this.state,
        numViewTime: this.state.numViewTime-1/3
      });
      console.log(this.state.numViewTime)
      if(this.state.numViewTime <= 0){
        clearInterval(this.viewTimer);
        this.endViewing();
      }
    }, 10)

  }


  endViewing() {
    // Move on to the input state
    this.message = "What was the number?"
    this.setState({
      ... this.state,
      allowInput: ""
    })

    this.numInput.current.focus();

    this.currentResponseTime = 0
    this.responseTimer = setInterval(() => {
      this.currentResponseTime += 1
    }, 10)

  }


  validateChoice() {
    console.log(this.currentResponseTime)
    clearInterval(this.responseTimer)
    this.props.newTime(this.currentResponseTime)
    this.nextViewing()
  }


  handleKeyDown(e) {
    if (e.key === "Enter") {
      this.validateChoice()
    }
  }


  render() {

    return (
      
      <div>
        <h1 style={{
          display: "inline-block",
        }}>Time : {this.state.testTime}</h1>
        <h1 style={{
          display: "inline-block",
          float: "right"
        }}>Score : {this.score}</h1>

        <div style={{
            marginTop: "50px",
            marginBottom: "50px",
            padding: "30px 0px 0px 0px",
            textAlign: "center",
            backgroundColor: "rgb(245, 245, 245)",
            borderRadius: "10px",
            overflow: "hidden",
            color: "indianred"
          }}>
          <h2 style={{
            fontSize: "56px",
            marginBottom: "20px",
          }}>{this.message}</h2>
          <div style={{
            width: this.state.numViewTime + "%",
            height: "20px",
            backgroundColor: "rgb(23, 162, 184)"
          }}></div>
        </div>

        <div style={{
          display: "inline-block",
          marginLeft: "50%",
          transform: "translateX(-50%)"
        }}>
          <input disabled={this.state.allowInput} ref={this.numInput} id="numInput" onKeyDown={this.handleKeyDown} style={{
            textAlign: "center",
            marginRight: "20px",
            width: "200px",
            height: "50px",
            fontSize: "30px"
          }} />
          <Button disabled={this.state.allowInput} color="success" onClick={this.validateChoice} style={{
            position: "relative",
            top: "-8px",
            height: "50px"
          }}>Next number</Button>
        </div>
        
        {/* <Button onClick={this.props.validate}>Debug</Button> */}
        
      </div>
      
    );
  }

  async populateNumbersData() {
    const response = await fetch('numTest');
    const data = await response.json();
    this.setState({
      ... this.state,
      data: data
    });
    this.startTest();
    // this.validateNumber();
  }

  componentWillUnmount() {
    clearInterval(this.mainTimer)
    clearInterval(this.testTimer)
    clearInterval(this.responseTimer)
    clearInterval(this.viewTimer)
  }


};

export default Test;