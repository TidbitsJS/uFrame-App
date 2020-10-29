import React, { Component } from "react";
import "./display.css";

export class Display extends Component {
  render() {
    let images = this.props.images.map((image, index) => {
      return (
        <div key={index}>
          <img
            className="grid-item grid-item-1"
            src={image.url || image.objectURL}
            alt="image01"
          />
          <p style={{ fontWeight: 700 }}>"Piece of Cake!"</p>
        </div>
      );
    });
    return (
      <div className="image-container">
        <div className="grid-container">{images}</div>
      </div>
    );
  }
}

export default Display;
