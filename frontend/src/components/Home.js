import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PageNavbar from "./PageNavbar";
import PlayerPage from "./video/PlayerPage";
import "../style/Home.css";
export default class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <PageNavbar active="home" />

        <div style={{ textAlign: "center", top: "50%" }}>
          <div className='container'>
            {" "}
            <div className="head">
              <h1
                style={{
                  textAlign: "center",
                  color: "whitesmoke",
                  fontSize: "700%",
                }}
              >
                mUsic
              </h1>
            </div>
          </div>

          <br />
          <hr
          />
        </div>
        <PlayerPage />
      </div>
    );
  }
}
