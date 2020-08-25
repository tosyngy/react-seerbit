# react-seerbit

> Seerbit react API

## Get Started

A simple way to add Seerbit Payments to your React application

[![NPM](https://img.shields.io/npm/v/react-seerbit.svg)](https://www.npmjs.com/package/react-seerbit) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-seerbit
```

## Usage

```jsx
import React, { Component } from "react";

import SeerbitPay from "react-seerbit";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      public_key: "YOUR_API_KEY",
      amount: 100,
      tranref: new Date().getTime(),
      customization: {
        theme: {
          border_color: "#000000",
          background_color: "#004C64",
          button_color: "#0084A0",
        },
        payment_method: ["card", "account", "transfer", "wallet"],
        display_fee: true, // true 
        display_type: "embed", //inline
        logo: "logo_url | base64", 
      }
    };
  }

  close = (close) => {
    console.log(close);
  };
  callback = (response) => {
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
        full_name={"John Doe"}
        email={"a@b.com"}
        mobile_no={"00000000000"}
        customization={this.state.customization}
        version={"v1"}
      />
    );
  }
}
```

Please checkout <a href='https://doc.seerbit.com'>Seerbit Documentation</a> for other available options you can add to the tag

## License

MIT © [tosyngy](https://github.com/tosyngy)
