// src/camera.page.js file
import React from 'react';
import { View, Text } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import Toolbar from './toolbar.component';

import styles from './styles';

export default class CameraPage extends React.Component {
    camera = null;

    state = {
        hasCameraPermission: null,
        // setting flash to be turned off by default
        flashMode: Camera.Constants.FlashMode.off,
        capturing: null,
        // start the back camera by default
        cameraType: Camera.Constants.Type.back,
        hasCameraPermission: null,
    };

    async componentDidMount() {
        this.getCameraPermissions();
    };

    getCameraPermissions = async () => {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const hasCameraPermission = (camera.status === 'granted')
        this.setState({ hasCameraPermission });
    }

    setFlashMode = (flashMode) => this.setState({ flashMode });
    setCameraType = (cameraType) => this.setState({ cameraType });
    handleCaptureIn = () => this.setState({ capturing: true });

    handleCaptureOut = () => {
        if (this.state.capturing)
            this.camera.stopRecording();
    };

    handleShortCapture = async () => {
        const photoData = await this.camera.takePictureAsync();
        this.setState({ capturing: false, captures: [photoData, ...this.state.captures] })
    };

    handleLongCapture = async () => {
        const videoData = await this.camera.recordAsync();
        this.setState({ capturing: false, captures: [videoData, ...this.state.captures] });
    };

    render() {
        const { hasCameraPermission, flashMode, cameraType, capturing } = this.state;

        if (hasCameraPermission === null) {
            // return <View />;
            return <Text>Null permissions</Text>;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return (
            <React.Fragment>
                <View>
                    <Camera
                        type={cameraType}
                        flashMode={flashMode}
                        style={styles.preview}
                        ref={camera => this.camera = camera}
                    />
                </View>
                <Toolbar 
                     capturing={capturing}
                     flashMode={flashMode}
                     cameraType={cameraType}
                     setFlashMode={this.setFlashMode}
                     setCameraType={this.setCameraType}
                     onCaptureIn={this.handleCaptureIn}
                     onCaptureOut={this.handleCaptureOut}
                     onLongCapture={this.handleLongCapture}
                     onShortCapture={this.handleShortCapture}
                />
            </React.Fragment>
        );
    };
};