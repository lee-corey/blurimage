import React from "react";
import Dropzone from "react-dropzone";
import "./MyDropZone.css";
import Blur from "react-blur";

export default class MyDropzone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragEnter: false,
      width: 0,
      height: 0,
      imgContainerDirection: 'row',
      calcWidth: 0,
      calcHeight: 0,
      leftImage:'',
      rightImage:''
    };
  }

  async getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    await ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }

  onDrop = files => {
    /* if (files.length === 0 || files[0].type.indexOf("image") < 0)
      window.alert(
        "This file is not a image file or you have uploaded more than 1 files"
      );
    else {*/
    this.props.receiveFile(files[0]);
    // }
    this.setState({ isDragEnter: false });
  };
   onImgLoad = async ({target : img}) => {
    const originalWidth = 472;
    const originalHeight = 836;
    this.setState({width: img.offsetWidth, height: img.offsetHeight});
    const smallWidth = (originalWidth - img.offsetWidth);
    const smallHeight = (originalHeight - img.offsetHeight);
    if(smallWidth === 0) {
      //const leftImageUrl = await this.getCroppedImg(img, {unit:'px',x:0,y:0,width:originalWidth,height:smallHeight}, "left.jpg")
      //console.log(originalHeight-smallHeight)
      const rightImageUrl = await this.getCroppedImg(img, {unit:'px',x:0,y:originalHeight-smallHeight*2,width:originalWidth,height:smallHeight}, "right.jpg")
      this.setState({imgContainerDirection: 'column', calcWidth: originalWidth, calcHeight: smallHeight, rightImage: rightImageUrl})
    } else {
      const rightImageUrl = await this.getCroppedImg(img, {unit:'px',x:originalWidth-smallWidth*2,y:0,width:smallWidth,height:originalHeight}, "right.jpg")
      this.setState({imgContainerDirection: 'row', calcWidth: smallWidth, calcHeight: originalHeight, rightImage: rightImageUrl})
    }
  }
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
            : <div {...getRootProps()} className = "imgDiv" style = {{flexDirection: this.state.imgContainerDirection}}>
                <input {...getInputProps()} />
                {/*
                <div className = "left" style = {{width: this.state.calcWidth, height: this.state.calcHeight}}>
                  {
                    this.state.leftImage && <img alt='' src={this.state.leftImage}/>
                  }
                </div>*/
                }
                <div className = "center">
                  <img alt="1" onLoad={this.onImgLoad} className = "imgStyle" src={this.props.currentFile} />
                </div>
                <div className = "right" style = {{width: this.state.calcWidth, height: this.state.calcHeight}}>
                  {
                    this.state.rightImage && <Blur img={this.state.rightImage} blurRadius = {50} style = {{position: "relative", width: this.state.calcWidth, height: this.state.calcHeight}} enableStyles/>
                  }
                </div>
              </div>
          )}
        </Dropzone>
      </div>
    );
  }
}
