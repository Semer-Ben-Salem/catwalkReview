import React from "react";
import axios from "axios";

import "../style/displayReview.css";
import { Rating, Image, Statistic, Button } from "semantic-ui-react";
import { TiTick } from "react-icons/ti";
import token from "../config.js";
import Form from "./formReview.jsx";

export default class DisplayReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      conter: 0,
      view: "state",
    };
    this.changePage = this.changePage.bind(this);
  }
  componentDidMount() {
    if (this.props.data.results) {
      this.setState({ data: this.props.data });
    } else {
      setTimeout(() => {
        this.componentDidMount();
      }, 2000);
    }
  }

  // number of review and the sort
  numberReview() {
    if (this.state.data.results) {
      return (
        <Statistic>
          <Statistic.Value> {this.state.data.results.length}</Statistic.Value>
          <Statistic.Label>
            reviews, sorted by <a href="www.fb.com/semer1994">relevance</a>
          </Statistic.Label>
        </Statistic>
      );
    } else {
      return <div>fetching data ...</div>;
    }
  }

  // maping and rendering reviews
  renderReview() {
    if (this.state.data.results) {
      return this.state.data.results.map((review, index) => {
        return (
          <div key={index}>
            <br />
            <div className="stars">{this.ratingStars(review.rating)}</div>
            <div>{this.provedUser(review.reviewer_name)}</div>
            <div>{this.renderSummary(review.summary)}</div>
            <div>{this.renderBody(review.body)}</div>
            <div>{this.renderImages(review.photos)}</div>
            <div>{this.renderResponse(review.response)}</div>
            <div className="rcm">{this.renderRecommend(review.recommend)}</div>
            <br />
            <div>{this.renderHelpful(review.helpfulness, review.review_id, index)}</div>
            <br />
            <div className="line"></div>
          </div>
        );
      });
    } else {
      return <div className="numRev">fetching data ...</div>;
    }
  }

  // star rating blocked
  ratingStars(stars) {
    if (this.state.data.count) {
      return (
        <div>
          <Rating defaultRating={stars} maxRating={5} disabled />
        </div>
      );
    }
  }

  //   if user proved show a tick
  provedUser(check) {
    if (check) {
      return (
        <div>
          <TiTick /> {check}
        </div>
      );
    } else {
      return <div>not checked</div>;
    }
  }

  // check if ther is summary and render it
  renderSummary(summary) {
    if (summary) {
      return <div className="numRev">{summary}</div>;
    }
  }

  // render body of review
  renderBody(text) {
    if (text) {
      return <div>{text}</div>;
    } else {
      return <div className="numRev">fetching review ...</div>;
    }
  }

  // check if there is images and render them
  renderImages(urls) {
    if (urls.length) {
      urls.map((url, index) => {
        return (
          <div key={index}>
            <Image src={url} size="small" />
          </div>
        );
      });
    }
  }

  // check if there is a response and render it
  renderResponse(response) {
    if (response !== null) {
      return (
        <div className="response">
          <span className="numRev">Response</span>
          <p>{response}</p>
        </div>
      );
    }
  }

  // check if the user recommender show tick else show button to recommend
  renderRecommend(bool) {
    if (bool) {
      return (
        <div>
          <TiTick /> I recommend this product
        </div>
      );
    }
  }

  renderHelpful(help, id, index) {
    return (
      <div>
        was this review helpfull?{" "}
        <span
          className="click"
          onClick={(e) => {
            if (e.target.className === "click") {
              this.addHelpful(help + 1, id, index);
              e.target.className = "false";
              console.log(e.target.className);
            }
          }}>
          yes
        </span>{" "}
        ({help}) | <span onClick={() => this.reportReview(id, index)}>Report</span>
      </div>
    );
  }

  // function to report a review
  reportReview(id, index) {
    axios
      .put(
        `https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews/${id}/report`,
        {},
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "Application/json",
            Authorization: token,
          },
        }
      )
      .then(() => {
        console.log("element reported");
      })
      .catch((error) => {
        console.warn("Not good man :(");
      });
  }

  // function to add 1help when the user trigger a click on it was helpfull
  addHelpful(help, id, index) {
    this.props.renderSort("helpful");
    // if (indexof ()) {
    axios
      .put(
        `https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews/${id}/helpful`,
        { helpfulness: help },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "Application/json",
            Authorization: token,
          },
        }
      )
      .then(() => {
        var tab = this.state.data;
        tab.results[index].helpfulness = help;
        this.setState({ data: tab, counter: 1 });
      })
      .catch((error) => {
        console.warn("Not good man :(");
      });
  }

  // changing th view
  changePage() {
    this.setState({ view: "post" });
  }

  changeView() {
    if (this.state.view === "post") {
      return (
        <div>
          <Form renderSort={this.props.renderSort} data={this.state.data} />
        </div>
      );
    } else {
      return (
        <div>
          <div className="container">
            <div className="numRev">{this.numberReview()}</div>
            <br />
            <div>{this.renderReview()}</div>
            {
              <div className="btn-container">
                <Button content="MORE REVIEWS" primary />
                <Button content="ADD A REVIEW" secondary onClick={this.changePage} />
              </div>
            }
          </div>
        </div>
      );
    }
  }
  ///////////////////////////////////////////// RENDER \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  render() {
    return <div>{this.changeView()}</div>;
  }
}
