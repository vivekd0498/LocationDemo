import React from 'react';
import {StyleSheet, TouchableOpacity, Image, View, Text} from 'react-native';

import { strings } from '../../helper/constants';
import { icons } from '../../helper/iconConstant';
import { colors } from '../../helper/colorConstant';
import {fontSize, hp, wp} from '../../helper/utilities';

const Header = ({
    title,
    onPress,
    isIconVisible,
}) => {
  return (
    <View style={styles.mainContainer}>
        {isIconVisible &&<TouchableOpacity onPress={onPress}>
          <Image
            source={icons.back}
            style={styles.imgStyle}
            resizeMode={strings.contain}
          />
        </TouchableOpacity>}
        <Text style={styles.textStyle}>{title}</Text>
        {isIconVisible &&<View style={styles.rightViewStyle}/>}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: hp(16),
    marginBottom: hp(24),
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(24),
  },
  imgStyle: {
    width: wp(20),
    height: hp(20),
    marginLeft: wp(10),
    tintColor: colors.white,
  },
  textStyle: {
    flex: 1,
    fontWeight: '600',
    color: colors.white,
    textAlign: 'center',
    fontSize: fontSize(24),
  },
  rightViewStyle: {
    width: wp(34),
  },
});

export default Header;
