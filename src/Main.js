import React from "react";
import MyDropzone from './MyDropZone'
import './main.css'
export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc : '',
            realWidth: 0,
            realHeight: 0
        }
    }
    receiveFile = file => { // if the user drop
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function (e) {
            const temp = this;
            var i = new Image(); 
            i.onload = function(){
                const imageWidth = i.width; // uploaded image width
                const imageHeight = i.height; // uploaded image height
                const frameWidth = 472; // frame width
                const frameHeight = 836; // frame height
                let realWidth = 0, realHeight = 0; // calced width and height
                if(imageWidth/imageHeight > frameWidth/frameHeight) { // means we should set the width as frameWidth
                    realWidth = frameWidth;
                    realHeight = imageHeight * parseFloat(frameWidth / imageWidth);
                } else {
                    realHeight =  frameHeight;
                    realWidth = imageWidth * parseFloat(frameHeight / imageHeight);
                }
                temp.setState({
                    imgSrc: reader.result, // get the base64 from the File object
                    realWidth,
                    realHeight
                })
            };
            i.src = reader.result; 
        }.bind(this);
    }
    render () {
        return (
            <div className = 'imageContainer'>
                <MyDropzone 
                    receiveFile={file => this.receiveFile(file)} 
                    currentFile = {this.state.imgSrc}
                    realWidth = {this.state.realWidth}
                    realHeight = {this.state.realHeight}
                />
            </div>
        )
    }
}