import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
const emoji = require("emoji-dictionary");

export default class HitSongRows extends React.Component {
	constructor(props) {
		super(props);
	}


	render() {
		return (	

			<div className="song-row">
				<div className="song-name">{emoji.getUnicode("headphones")} <a href={`https://www.youtube.com/results?search_query=${this.props.name}`}  target="_blank"> {this.props.name} </a></div>
				<div className="artist">{emoji.getUnicode("studio_microphone")} <a href={`https://www.youtube.com/results?search_query=${this.props.artists}`}  target="_blank">{this.props.artists}</a></div>
				<div className="genre">{this.props.genre}</div>
			</div>

		);
	}
}
