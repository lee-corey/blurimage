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
            var formData = {};
            formData["image"] = reader.result;
            fetch(`//3.88.139.82:9000/blurImage`,
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            }).then(response => response.json())
              .then(response => {
                console.log(response.status);
                console.log(response.data);
                temp.setState({imgSrc: response.data})
              });
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