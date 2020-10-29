import React, { Component } from "react";
import "./file.css";
import Display from "../ImageDisplay/Display";
import { listObjectsV2, upload } from "../../s3/s3";
import { createId } from "../../utils/createId";
import { AWS_URL } from "../../s3/Keys";

class File extends Component {
  state = {
    images: [],
    name: null,
    objectURL: null,
    loading: false,
  };

  componentDidMount = async () => {
    let rootPath = AWS_URL;
    let { images } = this.state;
    try {
      let params = {
        Bucket: "uframe",
        Prefix: "images/",
      };
      let s3Images = await listObjectsV2(params);
      s3Images.Contents.sort(function (a, b) {
        return new Date(b.LastModified) - new Date(a.LastModified);
      }).forEach((s3Image) => {
        if (s3Image.Size > 0) {
          images.push({
            url: rootPath + s3Image.Key,
          });
        }
      });
      console.log({ s3Images, images });
      this.setState({ images });
    } catch (error) {
      console.log("error", error);
    }
  };

  submitPhoto = (event) => {
    this.setState({ loading: true });
    var file = event.target.files[0];
    if (!file) return;
    let { images } = this.state;
    let id = createId();
    let s = event.target.files[0].name;
    let fileName =
      s.substring(0, s.lastIndexOf(".")) +
      "_" +
      id +
      s.substring(s.lastIndexOf("."));
    console.log({ id, fileName });
    images.unshift({
      objectURL: URL.createObjectURL(file),
      name: fileName,
    });
    this.setState({ images });
    this.uploadToS3(file, fileName);
  };

  uploadToS3 = async (file, fileName) => {
    try {
      let params = {
        Bucket: "uframe",
        Key: "images/" + fileName,
        ACL: "public-read",
        Body: file,
      };
      let result = await upload(params);
      console.log({ result });
      this.setState({ loading: false });
    } catch (error) {
      console.log("uploadToS3 error", error);
    }
  };

  render() {
    return (
      <div className="container">
        <div className="file-container">
          <div className="file-input">
            <label htmlFor="file-upload" className="custom-file-upload">
              <i className="fas fa-cloud"></i> Upload
            </label>
            <input
              type="file"
              id="file-upload"
              accept="image/*"
              onChange={(e) => this.submitPhoto(e)}
            />
            <p
              style={{
                marginTop: "1rem",
                textTransform: "capitalize",
              }}
            >
              {this.state.loading ? "Image Uploading to Database" : null}
            </p>
          </div>
        </div>
        <Display images={this.state.images} />
      </div>
    );
  }
}

export default File;
