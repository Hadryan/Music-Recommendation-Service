import React, { Component } from "react";
import "../style/Singers.css";
import PageNavbar from "./PageNavbar";
import SingerRow from "./SingerRow";
import axios from "axios";

export default class Singers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singers: [],
      singerRows: [],
    };
  }

  componentDidMount() {
    axios(`http://54.90.75.139:8080/api/artist/most_prolific`, {
      method: "GET", // The type of HTTP request.
    })
      .then((res) => res.data) // Convert the response data to a JSON.
      .then((list) => {
        let temp = list.map((singer, i) => {
          return [singer.artist, singer.count];
        });

        let topSinger = temp.map((singer, i) => (
          <SingerRow artist={singer[0]} value={singer[1]} />
        ));
        console.log(topSinger);
        this.setState({
          singerRows: topSinger,
        });
      });
  }
  render() {
    return (
      <div className="singers">
        <PageNavbar active="singers" />
        <div className="container head-container">
          <div className="h5">
            {" "}
            <h3> Awarded Singers </h3>
          </div>{" "}

        </div>

        <br></br>

        <div className="singers-container">
          <div className="song-header">
            <div className="header-lg">
              <strong>Artist</strong>
            </div>
            <div className="header">
              <strong>Awards</strong>
            </div>
          </div>

          <br></br>
          <div className="singer-container">
            <div className="singer-rows">{this.state.singerRows}</div>
          </div>
        </div>
      </div>
    );
  }
}
