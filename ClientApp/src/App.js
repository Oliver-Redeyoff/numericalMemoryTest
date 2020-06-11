import React, { Component } from 'react';
import Home from './components/Home';
import Test from './components/Test';
import Results from './components/Results';

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      page: 0, 
      score: 0,
      correctCount: 0,
      timeList: []
    }

    this.addTime = this.addTime.bind(this)
  }

  // Callback function to allow components to trigger transition to next page
  nextPageCallback = () => {

    this.setState({
      ...this.state,
      page: this.state.page+1
    });

  }

  // Callback function to add 10 to current score value
  increaseScore = () => {
    this.setState({
      ...this.state,
      score: this.state.score+10,
      correctCount: this.state.correctCount+1
    })
  }

  // Callback function which adds a response time to the the current response time list
  addTime(time) {

    var tempList = this.state.timeList
    console.log(tempList)
    var length = tempList.length
    tempList.push({name: length, value: time/100})

    this.setState({
      ...this.state,
      timeList: tempList
    })

  }
  
  render() {
    return (
      <div>
        <h1 id="header">Memory evaluation</h1>
        <div id="container">
          {this.state.page==0 && <Home validate={this.nextPageCallback} />}
          {this.state.page==1 && <Test validate={this.nextPageCallback} increaseScore={this.increaseScore} newTime={this.addTime} />}
          {this.state.page==2 && <Results score={this.state.score} correct={this.state.correctCount} times={this.state.timeList} />}
        </div>
      </div>
    );
  }

}

export default App;