import React, { Component } from "react";

import SeerbitPay from "react-seerbit";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      public_key: "cqjphzlAEl", //"************",
      amount: 100,
      tranref: "Pg5" + new Date().getTime()
    };
  }

  close = close => {
    console.log(close);
  };
  callback = response => {
    console.log(response);
  };
  render() {
    return (
      <SeerbitPay
        className="btn seerbit-btn"
        tranref={this.state.tranref}
        currency={"NGN"}
        description={"test"}
        country={"NG"}
        clientappcode="app1"
        public_key={this.state.public_key}
        callback={this.callback}
        close={this.close}
        amount={this.state.amount}
        tag={"button"}
      />
    );
  }
}
