/* eslint-disable no-alert */
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import classNames from 'classnames';

import plus from '!svg-url-loader?noquotes!../../../src/assets/plus.svg';// eslint-disable-line import/no-webpack-loader-syntax

import './image-drop-loader.sass';

const imageMaxSize = 1000000000; // bytes
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif';
const acceptedFileTypesArray = acceptedFileTypes.split(',').map(item => item.trim());

export default function ImageDropLoader() {
  const verifyFile = files => {
    if (files && files.length > 0) {
      const currentFile = files[0];
      const currentFileType = currentFile.type;
      const currentFileSize = currentFile.size;
      if (currentFileSize > imageMaxSize) {
        alert(`This file is not allowed. ${currentFileSize} bytes is too large`);
        return false;
      }
      if (!acceptedFileTypesArray.includes(currentFileType)) {
        alert('This file is not allowed. Only images are allowed');
        return false;
      }
      return true;
    }
  };

  const onDrop = useCallback((files, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      verifyFile(rejectedFiles);
    }

    if (files && files.length > 0) {
      const isVerified = verifyFile(files);
      if (isVerified) {
        const currentFile = files[0];
        const myFileItemReader = new FileReader();
        console.log(currentFile);
        myFileItemReader.readAsDataURL(currentFile);
      };
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const classes = classNames(
    'dropzone',
    { dropzone_active: isDragActive },
  );

  return (
    <>
      <div {...getRootProps({ className: classes })}>
        <input
          {...getInputProps()}
          accept={acceptedFileTypes}
          multiple={false}
          maxSize={imageMaxSize}
        />
        <img src={plus} alt="Drag 'n' drop some files here, or click to select files" />
      </div>
    </>
  );
}
