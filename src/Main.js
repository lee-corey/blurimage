import React from "react";
import MyDropzone from './MyDropZone'
import './main.css'
export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc : '',
            realWidth: 0,
            realHeight: 0,
            width: 0,
            height: 0
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentDidMount() {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
    }
    
    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions);
    }
    
    updateWindowDimensions() {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
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
        console.log(parseFloat(this.state.height * 0.8) )
        return (
            <div style = {{height: parseFloat(this.state.height*0.8), width: 472 * parseFloat(parseFloat(this.state.height) * 0.8 / 836)}}>
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