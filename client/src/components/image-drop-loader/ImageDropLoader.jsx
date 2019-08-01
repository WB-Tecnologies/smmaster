import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import classNames from 'classnames';

import plus from '!svg-url-loader?noquotes!../../../src/assets/plus.svg';// eslint-disable-line import/no-webpack-loader-syntax

import './image-drop-loader.sass';

export default function ImageDropLoader() {
  // eslint-disable-next-line no-unused-vars
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const classes = classNames(
    'dropzone',
    { dropzone_active: isDragActive },
  );

  return (
    <div {...getRootProps({ className: classes })}>
      <input {...getInputProps()} />
      <img src={plus} alt="Drag 'n' drop some files here, or click to select files" />
    </div>
  );
}
