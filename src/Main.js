import React from "react";
import MyDropzone from './MyDropZone'
import './main.css'
export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc : ''
        }
    }
    receiveFile = file => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function (e) {
            this.setState({
                imgSrc: reader.result
            })
           /* var img = document.createElement("img")
            const originalWidth = 472;
            const originalHeight = 836;
            img.setAttribute("src", reader.result)
            setTimeout(function(){
                //console.log(img.height, img.width);
                let fitWidth = 0;
                let fitHeight = 0;
                if(originalWidth/originalHeight > img.width/img.height) {
                    fitHeight = originalHeight;
                    fitWidth = img.width / (img.height / originalHeight);
                }
                else {
                    fitWidth = originalWidth;
                    fitHeight = img.height / (img.width / originalWidth);
                }
                console.log(fitWidth, fitHeight);
            },0)*/

        }.bind(this);
    }
    render () {
        return (
            <div className = 'imageContainer'>
                <MyDropzone receiveFile={file => this.receiveFile(file)} currentFile = {this.state.imgSrc}/>
            </div>
        )
    }
}