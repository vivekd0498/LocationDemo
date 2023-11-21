import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

import { colors } from '../../helper/colorConstant';
import {fontSize, hp, wp} from '../../helper/utilities';

const Button = ({
    title,
    onPress,
    mainContainer,
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[styles.mainContainer, mainContainer]}>
      <Text style={styles.textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: wp(150),
    marginTop: hp(35),
    borderRadius: wp(8),
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: hp(15),
    backgroundColor: colors.blue,
  },
  textStyle: {
    fontWeight: '700',
    color: colors.white,
    fontSize: fontSize(16),
  },
});

export default Button;
