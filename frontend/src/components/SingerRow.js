import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
const emoji = require("emoji-dictionary");

export default class SingerRow extends React.Component {
	constructor(props) {
		super(props);
	}


	render() {
		return (	
            <div className="singer-row" >
            <div className="singer"> {emoji.getUnicode("studio_microphone")} <a href={`https://www.youtube.com/results?search_query=${this.props.artist}+grammy`} target="_blank"> {this.props.artist} </a></div>
            <div className="award">{this.props.value} {emoji.getUnicode("trophy")}</div>
            </div>	

		);
	}
}
