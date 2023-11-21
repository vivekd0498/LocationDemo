import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Modal from 'react-native-modal';

import Button from '../common/Button';
import { colors } from '../../helper/colorConstant';
import { fontSize, hp, wp } from '../../helper/utilities';
import { icons } from '../../helper/iconConstant';
import { strings } from '../../helper/constants';

const LocationDetailsModal = ({
    orgLat,
    orgLong,
    destLat,
    destLong,
    distance,
    isVisible,
    onMapPress,
    orgLocation,
    destLocation,
    onCancelPress,
    modalMainTitle,
}) => {

  return (
    <Modal
      isVisible={isVisible}
      animationIn={'fadeInLeft'}
      style={styles.mainContainer}
      animationOut={'fadeOutRight'}
      onBackButtonPress={onCancelPress}>
      <View style={styles.mainViewStyle}>
        <View style={styles.headerViewStyle}>
          <View style={styles.cancelImgStyle} />
          <Text style={styles.headerTextStyle}>{modalMainTitle}</Text>
          <TouchableOpacity onPress={onCancelPress}>
            <Image
              source={icons.cancel}
              resizeMode={'contain'}
              style={styles.cancelImgStyle}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.innerViewMainContainer}>
            <View>
                <Text style={styles.innerTextStyle}>{strings.orgLocDetails}</Text>
                <Text style={[styles.innerLeftTextStyle, {
                    textAlign: 'justify',
                }]}>{strings.location}
                    <Text style={styles.innerRightTextStyle}>{orgLocation}</Text>
                </Text>
                <Text style={styles.innerLeftTextStyle}>{strings.lat}
                    <Text style={styles.innerRightTextStyle}>{orgLat}</Text>
                </Text>
                <Text style={styles.innerLeftTextStyle}>{strings.long}
                    <Text style={styles.innerRightTextStyle}>{orgLong}</Text>
                </Text>
            </View>
            <View style={{marginTop: hp(20)}}>
                <Text style={styles.innerTextStyle}>{strings.destLocDetails}</Text>
                <Text style={[styles.innerLeftTextStyle, {
                    textAlign: 'justify',
                }]}>{strings.location}
                    <Text style={styles.innerRightTextStyle}>{destLocation}</Text>
                </Text>
                <Text style={styles.innerLeftTextStyle}>{strings.lat}
                    <Text style={styles.innerRightTextStyle}>{destLat}</Text>
                </Text>
                <Text style={styles.innerLeftTextStyle}>{strings.long}
                    <Text style={styles.innerRightTextStyle}>{destLong}</Text>
                </Text>
            </View>
            <View style={{marginTop: hp(20)}}>
                <Text style={[styles.innerLeftTextStyle, {
                    textAlign: 'center',
                    fontWeight: '400',
                    fontSize: fontSize(16),
                }]}>{strings.distanceBetOrgDest}
                    <Text style={[styles.innerRightTextStyle, {
                        fontWeight: 'bold',
                        fontSize: fontSize(16),
                    }]}>{distance}</Text>
                </Text>
            </View>
        </View>

        <Button
          title={'Show On Map'}
          onPress={onMapPress}
          mainContainer={{
              marginTop: hp(20),
            marginVertical: hp(16),
          }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    mainContainer: {
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.modalRgba,
    },
    mainViewStyle: {
        width: wp(345),
        borderRadius: wp(24),
        backgroundColor: colors.white,
    },
    headerViewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: wp(16)
    },
    cancelImgStyle: {
        width: wp(20),
        height: wp(20),
    },
    headerTextStyle: {
        letterSpacing: 1,
        fontWeight: 'bold',
        color: colors.black,
        fontSize: fontSize(18),
    },
    innerViewMainContainer: {
        padding: hp(16),
        paddingBottom: 0,
        borderTopWidth: wp(1),
        borderColor: colors.border,
    },
    innerTextStyle: {
        fontWeight: 'bold',
        color: colors.black,
        fontSize: fontSize(16),
        textAlign: 'center',
    },
    innerLeftTextStyle: {
        marginTop: hp(5),
        fontWeight: '600',
        color: colors.black,
        fontSize: fontSize(14),
    },
    innerRightTextStyle: {
        fontWeight: '400',
        color: colors.black,
        fontSize: fontSize(14),
    },
});

export default LocationDetailsModal;
