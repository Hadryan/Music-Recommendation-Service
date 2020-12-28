import React from "react";
import "../style/Songs.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PageNavbar from "./PageNavbar";
import HitSongRows from "./HitSongRows";
import Axios from "axios";

export default class Underrated extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startYear: 0,
      endYear: 0,
      songRows: [], // the row of songs
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeStartYear = this.handleChangeStartYear.bind(this);
    this.handleChangeEndYear = this.handleChangeEndYear.bind(this);
  }

  // set the song rows
  showSongs() {
    if (this.state.startYear < 1999 || this.state.endYear > 2019) {
      alert("Please input years in range from 1999 to 2019");
      return;
    } else if (this.state.startYear >= this.state.endYear) {
      alert("Please input valid years");
      return;
    }
    Axios(
      `http://54.90.75.139:8080/api/song/spotify?startYear=${this.state.startYear}&endYear=${this.state.endYear}`,
      {
        method: "GET", // The type of HTTP request.
      }
    )
      .then((res) => res.data) // Convert the response data to a JSON.
      .then((list) => {
        let temp = list.map((song, i) => {
          return [song.songName, song.artists, song.genre];
        });
        let hitSongs = temp.map((song, i) => (
          <HitSongRows name={song[0]} artists={song[1]} genre={song[2]} />
        ));
        console.log(hitSongs);
        this.setState({
          songRows: hitSongs,
        });
      });
  }

  handleSubmit() {
    this.showSongs();
  }

  handleChangeStartYear(e) {
    this.setState({
      startYear: e.target.value,
    });
  }

  handleChangeEndYear(e) {
    this.setState({
      endYear: e.target.value,
    });
  }

  render() {
    return (
      <div className="Dashboard">
        <PageNavbar active="hidden_gems"/>

        <br></br>
        <div className="container head-container">
          <div className="h5">
            {" "}
            <h3 style={{textAlign: 'center'}}>Hidden Gems </h3>
          </div>

          <br></br>
          <div className="input-container">
            <ul>
              <li> <label>
              From
              <input
                type="text"
                placeholder="Try somthing like 2015"
                onChange={this.handleChangeStartYear}
              />
            </label>
          
            <label>
              ~
              <input
                type="text"
                placeholder="Try somthing like 2016"
                onChange={this.handleChangeEndYear}
              />
            </label></li>
            <li >
            <br></br>
            <div style={{ textAlign: "center" }} ><input type="submit" value="Submit" onClick={this.handleSubmit}  /></div>
            </li>
            </ul>
           
            <br></br>
            
          </div>
          <br></br>
        </div>

        <div>
          <div className="song-container"></div>
          <div className="song-header">
            <div className="header-lg">
              <strong>Song</strong>
            </div>
            <div className="header">
              <strong>Artist</strong>
            </div>
            <div className="header">
              <strong>Genre</strong>
            </div>
          </div>

          <div className="songs-container">
            <div className="song-rows" id="results">
              {this.state.songRows}
            </div>
          </div>
        </div>
      </div>
    );
  }
}