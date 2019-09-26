import React from "react";
import Dropzone from "react-dropzone";
import "./MyDropZone.css";
import Blur from "react-blur";

export default class MyDropzone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragEnter: false,
      imgContainerDirection: 'row', // if the space is in the right then flex will row else column
      calcWidth: 0,
      calcHeight: 0,
      rightImage:''
    };
  }

  onDrop = files => {
    this.props.receiveFile(files[0]); // call the receiveFile in the parent
    this.setState({ isDragEnter: false });
  };

  render() {
    return (
      <div className = 'dropzoneContainer'>
        <Dropzone 
          onDrop={this.onDrop.bind(this)}
          multiple={false}
          accept=""
          onDragEnter={() => this.setState({ isDragEnter: true })}
          onDragLeave={() => this.setState({ isDragEnter: false })}
        > 
          {({ getRootProps, getInputProps }) => (
            this.props.currentFile === '' ?
            <div
              {...getRootProps()}
              className={
                this.state.isDragEnter ? "fileDragEnter" : "originDrop"
              }
            >
              <input {...getInputProps()} />
              {!this.state.isDragEnter ? (
                <p>
                  Drag and drop a image here,
                  <br />
                  or click to select a image
                </p>
              ) : (
                <p>Drop that file Here</p>
              )}
            </div>
            : <div 
                {...getRootProps()} 
                className = "imgDiv" 
                style = {{flexDirection: this.state.imgContainerDirection}}
              >
                <input {...getInputProps()} />
                <div className = "fitAll">
                  <img 
                    alt="" 
                    onLoad={this.onImgLoad}
                    className = "fitAll"
                    src={'data:image/jpeg;base64,' + Buffer.from(this.props.currentFile).toString('base64')} />
                </div>
                {/*<div 
                  className = "right" 
                  style = {{width: this.state.calcWidth, height: this.state.calcHeight}}
                >
                  {
                    this.state.rightImage && 
                    <Blur 
                      img={this.state.rightImage} 
                      blurRadius = {50} 
                      style = {{
                        position: "relative", 
                        width: this.state.calcWidth, 
                        height: this.state.calcHeight
                      }} 
                      enableStyles
                    />
                    // use Blur component for blurring the image.
                  }
                </div>*/}
              </div>
          )}
        </Dropzone>
      </div>
    );
  }
}
