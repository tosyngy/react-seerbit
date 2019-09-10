import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class SeerbitPay extends Component {
  constructor(props) {
    super(props);
    this.paywithSeerbit = this.paywithSeerbit.bind(this);
    this.loadScript = this.loadScript.bind(this);
    this.loadscriptAndUpdateState = this.loadscriptAndUpdateState.bind(this);
    this.state = {
      ...this.props,
      scriptLoaded: null,
      class: this.props.class || this.props.className || ""
    };
  }
  base_url = "http://bc-design.surge.sh/"; //"https://checkout.seerbit.com/"; //"http://localhost:3000/";

  componentDidMount() {
    // window.document.write(this.seerbit_script);
    this.loadscriptAndUpdateState();
  }

  loadscriptAndUpdateState() {
    this.setState(
      {
        scriptLoaded: new Promise(resolve => {
          this.loadScript(() => {
            resolve();
          });
        })
      },
      () => {
        // if (this.props.embed) {
        this.paywithSeerbit();
        // }
      }
    );
  }

  loadScript(callback) {
    const script = document.createElement("script");
    script.src = `${this.base_url}api/v1/seerbit.js`;
    document.getElementsByTagName("head")[0].appendChild(script);
    if (script.readyState) {
      // IE
      script.onreadystatechange = () => {
        if (
          script.readyState === "loaded" ||
          script.readyState === "complete"
        ) {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      // Others
      script.onload = () => {
        callback();
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    for (const index in prevProps) {
      if (prevState[index] !== this.state[index]) {
        this.loadscriptAndUpdateState();
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    for (const index in nextProps) {
      if (nextProps[index] !== prevState[index]) {
        return {
          scriptLoaded: null,
          [index]: nextProps[index]
        };
      }
    }

    return null;
  }

  paywithSeerbit() {
    this.state.scriptLoaded &&
      this.state.scriptLoaded.then(() => {
        let seerbitOptions = {
          tranref: this.state.tranref,
          currency: this.state.currency,
          description: this.state.description,
          country: this.state.country,
          amount: this.state.amount,
          clientappcode: this.state.clientappcode,
          callbackurl: this.state.callbackurl,
          public_key: this.state.public_key
        };
        let callback = this.state.callback;
        let close = this.state.close;
        const handler = window.SeerbitPay(seerbitOptions, callback, close);
      });
  }

  render() {
    const CustomTag = `${this.props.tag}`;
    return (
      <Fragment>
        <div className="seerbit-pay" id="seerbit-pay">
          <CustomTag
            className={this.state.class}
            onClick={this.paywithSeerbit}
            disabled={this.state.disabled}
          >
            {this.state.text}
          </CustomTag>
        </div>
      </Fragment>
    );
  }
}

SeerbitPay.propTypes = {
  className: PropTypes.string,
  currency: PropTypes.string,
  clientappcode: PropTypes.string,
  country: PropTypes.string,
  description: PropTypes.string,
  tranref: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired, //in kobo
  public_key: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  tag: PropTypes.string
};

SeerbitPay.defaultProps = {
  text: "Make Payment",
  currency: "NGN",
  tag: "button"
};

export default SeerbitPay;
