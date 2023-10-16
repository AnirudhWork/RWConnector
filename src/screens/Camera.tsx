import {StyleSheet, Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {globalColors} from '../Utils/global-colors';
import {
  launchCamera,
  CameraOptions,
  ImagePickerResponse,
  Asset,
} from 'react-native-image-picker';
import {SimpleAlert} from '../Utils/SimpleAlert';

const Camera = () => {
  const openCamera = async (callback: any) => {
    let options: CameraOptions = {
      maxWidth: 1024,
      maxHeight: 1024,
      quality: 0.9,
      saveToPhotos: false,
      cameraType: 'back',
      mediaType: 'photo',
      presentationStyle: 'fullScreen',
    };
    const result: ImagePickerResponse = await launchCamera(options);

    if (result.assets) {
      let assetInfo = result.assets[0];
      callback(assetInfo);
    } else {
      SimpleAlert('Camera failure', 'Picture not taken successfully!');
    }
  };

  const pickFromGallery = async () => {
    console.log('pickFromGallery() Triggered');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          openCamera((info: Asset) => {
            if (info.uri) {
              console.log('openCamera() | info.uri exists');
            }
          })
        }
        style={{marginRight: 20}}>
        <Image source={require('../Assets/Icons/Username.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={pickFromGallery}>
        <Image source={require('../Assets/Icons/PasswordLock.png')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: globalColors.LIGHT_GRAY,
  },
});

export default Camera;
