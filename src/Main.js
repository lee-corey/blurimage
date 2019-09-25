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
    receiveFile = file => { // if the user drop
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function (e) {
            this.setState({
                imgSrc: reader.result // get the base64 from the File object
            })
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