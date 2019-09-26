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

  async getCroppedImg(image, crop, fileName) { // cropping image depending the x, y, width, height // will return the url of image
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
    this.props.receiveFile(files[0]); // call the receiveFile in the parent
    this.setState({ isDragEnter: false });
  };
   onImgLoad = async ({target : img}) => {
    /*const originalWidth = 472; // The frame width
    const originalHeight = 836; // The frame height 
    this.setState({width: img.offsetWidth, height: img.offsetHeight}); // set the width and height as displayed image's width and height
    const smallWidth = (originalWidth - img.offsetWidth); // The width of space
    const smallHeight = (originalHeight - img.offsetHeight); // THe height of space
    if(smallWidth === 0) { // If the space is in the bottom
      let rightImageUrl;
      try{
        rightImageUrl = await this.getCroppedImg(img, {unit:'px',x:0,y:originalHeight-smallHeight*2,width:originalWidth,height:smallHeight}, "right.jpg") // get the cropped image
      } catch(e) {
      }
      this.setState({imgContainerDirection: 'column', calcWidth: originalWidth, calcHeight: smallHeight, rightImage: rightImageUrl}) // set values in the state and will rerender
    } else { // If the space is in the right
      let rightImageUrl;
      try{
        rightImageUrl = await this.getCroppedImg(img, {unit:'px',x:originalWidth-smallWidth*2,y:0,width:smallWidth,height:originalHeight}, "right.jpg")
      } catch(e) {
      }
      this.setState({imgContainerDirection: 'row', calcWidth: smallWidth, calcHeight: originalHeight, rightImage: rightImageUrl})
    }*/
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
            : <div 
                {...getRootProps()} 
                className = "imgDiv" 
                style = {{flexDirection: this.state.imgContainerDirection}}
              >
                <input {...getInputProps()} />
                <div className = "center">
                  <img 
                    alt="" 
                    onLoad={this.onImgLoad}  
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
