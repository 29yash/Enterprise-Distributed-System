import React, { Component } from 'react';
import './App.css';
import CalButton from './components/Button'

class App extends Component {
  state = {
    expression: '',
    error:''
  }

  render() {
    return (
      <div className="App">
      <p>{this.state.error}</p>
      <p>{this.state.expression}</p>
      <div className="cal-row">
        <CalButton value="9" onClick={this.buttonClicked.bind(this)}></CalButton>
        <CalButton value="8" onClick={this.buttonClicked.bind(this)} ></CalButton>
        <CalButton value="7" onClick={this.buttonClicked.bind(this)}></CalButton>
        <CalButton value="/" type="operation" onClick={this.buttonClicked.bind(this)}></CalButton>
      </div>
      <div className="cal-row">
        <CalButton value="6" onClick={this.buttonClicked.bind(this)}></CalButton>
        <CalButton value="5" onClick={this.buttonClicked.bind(this)}></CalButton>
        <CalButton value="4" onClick={this.buttonClicked.bind(this)}></CalButton>
        <CalButton value="*" type="operation" onClick={this.buttonClicked.bind(this)}></CalButton>
      </div>
      <div className="cal-row">
        <CalButton value="3" onClick={this.buttonClicked.bind(this)}></CalButton>
        <CalButton value="2" onClick={this.buttonClicked.bind(this)}></CalButton>
        <CalButton value="1" onClick={this.buttonClicked.bind(this)}></CalButton>
        <CalButton value="-" type="operation" onClick={this.buttonClicked.bind(this)}></CalButton>
      </div>
      <div className="cal-row">
        <CalButton value="0" onClick={this.buttonClicked.bind(this)}></CalButton>
        <CalButton value="+" type="operation" onClick={this.buttonClicked.bind(this)}></CalButton>
        <CalButton value="Reset" type="operation" onClick={this.buttonClicked.bind(this)}></CalButton>
        <CalButton value="=" type="operation" onClick={this.buttonClicked.bind(this)}></CalButton>
      </div>
      </div>
    );
  }

  buttonClicked(name){
    this.setState({error : ''});
    if(name === '='){
        fetch('http://localhost:3001/calculate', {method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({expression: this.state.expression})})    
        .then(response => response.json())
        .then(data => {
          console.log(data);          
          if(data.result){
            this.setState({ expression : data.result })
          }
          else {
            this.setState({error : data.error, expression:''})
          }
        });
      }
    else if(name === 'Reset') {
      this.setState({expression: ""});
    }
    else{
      this.setState({expression: this.state.expression + name})
    }
  }
}

export default App;
