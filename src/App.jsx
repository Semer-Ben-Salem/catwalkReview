import React from "react";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";

import token from "./config.js";
import Review from "./components/displayReview.jsx";
// import Form from "./components/formReview.jsx";
// import Statistics from "./components/displayStatistics.jsx";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      data2: [],
      sort: "relevant",
    };
    this.renderSort = this.renderSort.bind(this);
  }

  renderSort(sort) {
    this.setState({ sort: sort });
  }

  componentDidMount() {
    // let a = new Date().getMilliseconds();

    // data for review
    axios
      .get("https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews?product_id=11005&count=4&sort=relevant", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json",
          Authorization: token,
        },
      })
      .then(({ data }) => {
        this.setState({ data: data }, () => {
          // console.log("data in app component", this.state.data);
        });
      })
      .catch((error) => {
        console.warn("Not good man :(");
      });

    // data for statistics
    axios
      .get("https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews/meta?product_id=11005&sort=helpful", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json",
          Authorization: token,
        },
      })
      .then(({ data }) => {
        this.setState({ data2: data }, () => {});
      })
      .catch((error) => {
        console.warn("Not good man :(");
      });
  }
  render() {
    // {
    console.log("data review component", this.state.data);
    //   console.log(this.state.data2);
    // }
    return (
      <div>
        <Review renderSort={this.renderSort} data={this.state.data} />
        {/* <Statistics data={this.state.data} /> */}
        {/* <Form /> */}
      </div>
    );
  }
}
