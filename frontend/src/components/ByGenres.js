import React from "react";
import "../style/Genres.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PageNavbar from "./PageNavbar";
import HitSongRows from "./HitSongRows";
import Toggle from "react-toggle";
import "react-toggle/style.css"
import Axios from "axios";

export default class ByGenres extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      year: 0,
      ifOrder: false,
      genre: "",
      songRows: [], // the row of songs
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeYear = this.handleChangeYear.bind(this);
    this.handleChangeGenre = this.handleChangeGenre.bind(this);
    this.handleBiscuitChange = this.handleBiscuitChange.bind(this);
  }

  // set the song rows
  showSongs() {
    Axios(
      `
      http://54.90.75.139:8080/api/song/top_genre?year=${this.state.year}&genre=${this.state.genre}&orderby=${this.state.ifOrder}`,
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

  handleChangeYear(e) {
    this.setState({
      year: e.target.value,
    });
  }

  handleChangeGenre(e) {
    this.setState({
        genre: e.target.value,
    });
  }

  handleBiscuitChange(e) {
      
    this.setState({
        ifOrder: e.target.value == "on"? true : false,
      });
  }

  render() {
    return (
      <div className="Dashboard">
        <PageNavbar active="byGenre" />

        <br></br>
        <div className="container head-container">
          <div className="h5">
            {" "}
            <h3 style={{ textAlign: "center" }}>Search by Genre </h3>
          </div>

          <br></br>
          <div className="input-container">
              <ul>
                <li>
                <label>
              Year:
              <input
                type="text"
                placeholder="Try something like 2018"
                onChange={this.handleChangeYear}
              />
            </label> <label>
              Genre: 
              <input
                type="text"
                placeholder="Try something like trap"
                maxLength={20}
                onChange={this.handleChangeGenre}
              />
            </label></li>

            <li> 
            <br></br>
                <div style={{ textAlign: "center" }} ><span id="biscuit-label">Ordered Or Not: </span><Toggle
              id="biscuit-status"
              defaultChecked={false}
              aria-labelledby="biscuit-label"
              onChange={this.handleBiscuitChange}
            /> </div></li>
            
            <li >
            <br></br>
            <div style={{ textAlign: "center" }} ><input type="submit" value="Submit" onClick={this.handleSubmit}  /></div>
            </li>
              </ul>
 
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
            <div className="song-rows">
              {this.state.songRows}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
