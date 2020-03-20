// src/camera.page.js file
import React from 'react';
import { View, Text } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

import styles from './styles';

export default class CameraPage extends React.Component {
    camera = null;

    state = {
        hasCameraPermission: null,
    };

    async componentDidMount() {
        this.getCameraPermissions();
        // const camera = await Permissions.askAsync(Permissions.CAMERA);
        // const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        // const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');

        // this.setState({ hasCameraPermission });
    };

    getCameraPermissions = async () => {
        console.log('in this method');
        // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        console.log('camera', camera);
        const hasCameraPermission = (camera.status === 'granted')
        this.setState({ hasCameraPermission });
        // if (status === 'granted') {
        //   return camera;
        // } else {
        //   throw new Error('Cannot list without a picture');
        // }
    }

    render() {
        const { hasCameraPermission } = this.state;

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
                        style={styles.preview}
                        ref={camera => this.camera = camera}
                    />
                </View>
                <Toolbar />
            </React.Fragment>
        );
    };
};