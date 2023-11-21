import React from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';

import {fontSize, hp, wp} from '../../helper/utilities';
import { colors } from '../../helper/colorConstant';

const Input = ({
    isErr,
    value,
    title,
    errMsg,
    onPress,
}) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleTxtStyle}>{title}</Text>
        <TouchableOpacity style={[styles.innerMainView, {
          borderColor: isErr ? colors.red : colors.border,
        }]} activeOpacity={0.6} onPress={onPress}>
          <Text style={styles.valTextStyle} numberOfLines={1}>{value}</Text>
        </TouchableOpacity>
        {/* <TextInput
          editable={false}
          value={value}
          autoCorrect={false}
          blurOnSubmit={false}
          autoCapitalize={'none'}
          onFocus={() => {
            console.log('Called!!!');
          }}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          style={[styles.textInputStyle, {
            borderColor: isErr ? colors.red : colors.border,
          }]}
          placeholder={placeHolderText}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={colors.placeHolder}
        /> */}
      {isErr &&<Text
        style={styles.textStyle}
      >
        {errMsg}
      </Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: hp(16),
    marginHorizontal: wp(24),
  },
  titleTxtStyle: {
    fontWeight: '600',
    color: colors.text,
    fontSize: fontSize(16),
  },
  innerMainView: {
    height: hp(50),
    marginTop: hp(12),
    borderWidth: wp(1),
    borderRadius: wp(8),
    justifyContent: 'center',
    paddingHorizontal: wp(12),
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  valTextStyle: {
    fontWeight: '500',
    color: colors.placeHolder,
    fontSize: fontSize(16),
  },
  textInputStyle: {
    padding: wp(12),
    marginTop: hp(12),
    fontWeight: '400',
    paddingTop: wp(12),
    color: colors.text,
    borderWidth: wp(1),
    borderRadius: wp(8),
    fontSize: fontSize(16),
    textAlignVertical: 'top',
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  textStyle: {
    marginTop: hp(6),
    color: colors.red,
    fontSize: fontSize(15),
  }
});

export default Input;
