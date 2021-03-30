import React from "react";

import "../style/displayStatistics.css";
import { Rating, Statistic, Progress, Segment, Label } from "semantic-ui-react";

export default class DisplayStatistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // claculate the rating average and render it
  ratingAverage() {
    if (this.props.data.results) {
      var average = 0;
      var counter = 0;
      this.props.data.results.map((rate, index) => {
        average += rate.rating;
        counter++;
      });
      average = Math.ceil(average / counter);
      return (
        <div className="average">
          {average}
          <Rating defaultRating={average} maxRating={5} disabled />
        </div>
      );
    }
  }

  recommendAverage() {
    if (this.props.data.results) {
      var counter = 0;
      this.props.data.results.map((review, index) => {
        if (review.recommend) {
          counter++;
        }
      });
      var average = Math.ceil((counter * 100) / this.props.data.results.length);
      return (
        <div className="percent">
          <Statistic>
            <Statistic.Value>{average}</Statistic.Value>
            <Statistic.Label>% of reviews recommend this product</Statistic.Label>
          </Statistic>
        </div>
      );
    }
  }

  progressAverage() {
    /// variables to change
    return (
      <Segment inverted>
        5 stars <Progress percent={32} inverted color="red" progress />
        4 stars
        <Progress percent={59} inverted color="orange" progress />
        3 stars
        <Progress percent={13} inverted color="yellow" progress />
        2 stars
        <Progress percent={36} inverted color="grey" progress />
        1 star <Progress percent={72} inverted color="black" progress />
      </Segment>
    );
  }

  statsAverage() {
    return (
      <div>
        <div>Rating: {2}</div>
        <input type="range" min={0} max={5} value={2} onChange={this.handleChange} />
        <br />
        <Rating rating={this.state.rating} maxRating={5} />
        <Label as="a" image>
          <Progress percent={11} />
        </Label>
        <Label as="a" image>
          <Progress percent={11} />
        </Label>
        <Label as="a" image>
          <Progress percent={11} />
        </Label>
      </div>
    );
  }

  render() {
    return (
      <div>
        {console.log(this.props.data)}
        <div className="title">Rating & reviews</div>
        <div className="ratingContainer">{this.ratingAverage()}</div>
        <div className="recommend">{this.recommendAverage()}</div>
        <div>{this.progressAverage()}</div>
        <div>{this.statsAverage()}</div>
      </div>
    );
  }
}
