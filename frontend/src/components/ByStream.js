import React from "react";
import "../style/Spotify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PageNavbar from "./PageNavbar";
import SpotifyRows from "./SpotifyRows";
import Axios from "axios";

export default class ByStream extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      genre: "",
      songRows: [], // the row of songs
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeGenre = this.handleChangeGenre.bind(this);
  }

  // React function that is called when the page load.
  componentDidMount() {}

  // set the song rows
  showSongs() {
    Axios(
      `http://54.90.75.139:8080/api/song/recommendation?genre=${this.state.genre}`,
      {
        method: "GET", // The type of HTTP request.
      }
    )
      .then((res) => res.data) // Convert the response data to a JSON.
      .then((list) => {
        let temp = list.map((song, i) => {
          return [song.song, song.artist];
        });
        let hitSongs = temp.map((song, i) => (
          <SpotifyRows  name={song[0]} artists={song[1]} />
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


  handleChangeGenre(e) {
    this.setState({
        genre: e.target.value,
    });
  }

  render() {
    return (
      <div className="Dashboard">
        <PageNavbar active="byStreams" />

        <br></br>
        <div className="container head-container">
          <div className="h5">
            {" "}
            <h3 style={{textAlign: 'center'}}> Highest Streaming Songs </h3>
          </div>

          <br></br>
          <div className="input-container">
            <ul>
              <li> <label>
                  Choose a Genre: 
              <input
                type="text"
                placeholder="Try somthing like rap"
                onChange={this.handleChangeGenre}
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