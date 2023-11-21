import _ from 'lodash';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import Modal from 'react-native-modal';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { googleKey } from '../../helper/constants';
import { colors } from '../../helper/colorConstant';
import { fontSize, hp, statusBar, wp } from '../../helper/utilities';
import Header from './Header';


const SearchLocationModal = ({
  isVisible,
  onBackPress,
  selectedLocation,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      animationIn={'fadeInRightBig'}
      animationOut={'fadeInLeftBig'}
      style={style.mainContainer}>
      <View style={style.mainViewStyle}>
        <Header
          isIconVisible
          title={'Locations'}
          onPress={onBackPress}
        />
        <View style={style.innerMainView}>
        
        <GooglePlacesAutocomplete
          placeholder='Search location'
          onPress={(data, details = null) => {
            selectedLocation(data);
          }}
          query={{
            key: googleKey.api,
            language: 'en',
          }}
          styles={{
            textInput: style.locationTxtInput,
          }}    
        />
        </View>
      </View>
    </Modal>
  );
};

export const style = StyleSheet.create({
    mainContainer: {
      margin: 0,
      backgroundColor: colors.blue,
    },
    mainViewStyle: {
      flex: 1,
      // paddingTop: statusBar,
    },
    innerMainView: {
      flex: 1,
      paddingTop: hp(10),
      borderTopLeftRadius: wp(24),
      borderTopRightRadius: wp(24),
      backgroundColor: colors.white,
    },
    locationTxtInput: {
      margin: hp(16),
      height: hp(50),
      fontWeight: '600',
      color: colors.black,
      paddingLeft: wp(16),
      borderRadius: wp(25),
      fontSize: fontSize(16),
      backgroundColor: colors.skyBlue,
    },
  });

export default SearchLocationModal;
