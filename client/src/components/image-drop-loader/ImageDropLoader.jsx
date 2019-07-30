import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class ImageDropLoader extends Component {
  handleOnDrop = (files, rejectedFiles) => {
    console.log(files)
    console.log('rejected files are', rejectedFiles)
  }

  render() {
    return (
      <div>
        <h1>Drop and Crop</h1>
        <Dropzone onDrop={this.handleOnDrop} accept="image/*" multiple={false}>drag and drop </Dropzone>
      </div>
    );
  }
}

export default ImageDropLoader;
