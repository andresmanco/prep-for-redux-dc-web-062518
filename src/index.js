import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import logo from "./logo.svg";
import "./App.css";
import { createStore } from "redux";

const reducer = (oldState = { count: 5 }, action) => {
  console.log("action", action, "state", oldState);
  switch (action.type) {
    case "INCREMENT":
      return { count: oldState.count + 1 };
    case "DECREMENT":
      return { count: oldState.count - 1 };
      case "INCREMENT3":
        return { count: oldState.count + 3 };
      case "DECREMENT5":
        return { count: oldState.count - 5 };
    default:
      return oldState;
  }
};

const store = createStore(reducer);

class App extends Component {

  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate();
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Counter />
      </div>
    );
  }
}

class Header extends Component {
  renderDescription = () => {
    const remainder = store.getState().count % 5;
    const upToNext = 5 - remainder;
    return `The current count is less than ${store.getState().count +
      upToNext}`;
  };

  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
        <h3>{this.renderDescription()}</h3>
      </header>
    );
  }
}

class Counter extends Component {
  decrement = () => {
    store.dispatch({ type: "DECREMENT" });
  };

  increment = () => {
    store.dispatch({ type: "INCREMENT" });
  };

  decrement5 = () => {
    store.dispatch({ type: "DECREMENT5" });
  };

  increment3 = () => {
    store.dispatch({ type: "INCREMENT3" });
  };


  render() {
    return (
      <div className="Counter">
        <h1>{store.getState().count}</h1>
        <button onClick={this.decrement}> - </button>
        <button onClick={this.increment}> + </button>
          <button onClick={()=>{
              for (var i = 0; i < 5; i++) {
                this.decrement()
              }
            }}> -5 </button>
          <button onClick={()=>{
              for (var i = 0; i < 3; i++) {
                this.increment()
              }
            }}> +3 </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
