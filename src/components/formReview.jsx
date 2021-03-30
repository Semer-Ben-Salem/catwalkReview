import React from "react";
import { Input, Statistic, Checkbox, Rating, Button } from "semantic-ui-react";

import Feed from "./displayReview.jsx";
import "../style/formReview.css";

export default class FormReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      view: "post",
    };
    this.countCharacters = this.countCharacters.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  // counter for body
  countCharacters() {
    this.setState({ counter: this.state.counter + 1 }, () => {});
  }

  // sto counter when it reach 50
  countStop() {
    if (this.state.counter <= 50) {
      return (
        <Statistic>
          <Statistic.Value>{this.state.counter}</Statistic.Value>
          <Statistic.Label>characters</Statistic.Label>
        </Statistic>
      );
    } else {
      return (
        <Statistic>
          <Statistic.Label>Minimum reached</Statistic.Label>
        </Statistic>
      );
    }
  }
  changePage() {
    this.setState({ view: "feed" });
  }

  changeView() {
    if (this.state.view === "feed") {
      return (
        <div>
          {" "}
          <Feed renderSort={this.props.renderSort} data={this.props.data} />{" "}
        </div>
      );
    } else {
      return (
        <div>
          <div className="summary">
            <Input placeholder="Summary" maxLength="60" />
          </div>
          <div className="body">
            <Input placeholder="Your review goes here" minLength="50" maxLength="10000" onChange={this.countCharacters} required />
          </div>
          <div className="counter">{this.countStop()}</div>
          <div className="images">
            <Input placeholder="Your pictures url goes here" />
            <Input placeholder="Your pictures url goes here" />
            <Input placeholder="Your pictures url goes here" />
            <Input placeholder="Your pictures url goes here" />
            <Input placeholder="Your pictures url goes here" />
          </div>
          <div className="star" required>
            <p>Rate us</p>
            <Rating defaultRating={0} maxRating={5} />
          </div>
          <div className="checkbox">
            <p className="checkboxP">Do you recommend our product?</p>
            <Checkbox toggle required />
          </div>
          <div>
            <Button content="Post review" onClick={this.changePage} />
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.changeView()}
        {/* <div>
          <div className="summary">
            <Input placeholder="Summary" maxLength="60" />
          </div>
          <div className="body">
            <Input placeholder="Your review goes here" minLength="50" maxLength="10000" onChange={this.countCharacters} required />
          </div>
          <div className="counter">{this.countStop()}</div>
          <div className="images">
            <Input placeholder="Your pictures url goes here" />
            <Input placeholder="Your pictures url goes here" />
            <Input placeholder="Your pictures url goes here" />
            <Input placeholder="Your pictures url goes here" />
            <Input placeholder="Your pictures url goes here" />
          </div>
          <div className="star" required>
            <p>Rate us</p>
            <Rating defaultRating={0} maxRating={5} />
          </div>
          <div className="checkbox">
            <p className="checkboxP">Do you recommend our product?</p>
            <Checkbox toggle required />
          </div>
          <div>
            <Button content="Post review" />
          </div>
        </div>*/}
      </div>
    );
  }
}
