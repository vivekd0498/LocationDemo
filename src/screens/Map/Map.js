import React, { useEffect, useRef, useState } from 'react';
import {View, StyleSheet} from 'react-native';

import MapViewDirections from 'react-native-maps-directions';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import { Header } from '../../components';
import { colors } from '../../helper/colorConstant';
import { goBack } from '../../helper/rootNavigation';
import { hp, statusBar } from '../../helper/utilities';
import { googleKey, strings } from '../../helper/constants';


const Map = ({route}) => {
  const mapRef = useRef();
  const [marker, setMarker] = useState([]);

  useEffect(() => {
    let routeVal = route?.params;
    if (routeVal) {
      setMarker(routeVal?.markers);
    }
  }, [route?.params]);

  console.log('Marker ::--', marker);

  const onBackPress = () => {
      goBack();
  }

  return (
    <View style={styles.mainContainer}>
      <Header
        isIconVisible
        onPress={onBackPress}
        title={strings.routeMap}
      />
      <View style={styles.innerMainView}>
        {marker?.length > 0 ?<MapView
          ref={mapRef}
          style={styles.mapViewMainStyle}
          provider={PROVIDER_GOOGLE}
          onMapLoaded={() => {
            mapRef.current.fitToCoordinates(marker, { edgePadding: { top: hp(50), right: hp(50), bottom: hp(50), left: hp(50) }, animated: true })
          }}
          >
          {marker.map((item) => (
            <Marker
                key={item?.id}
                coordinate={item}
                pinColor={item?.type === 'origin' ? colors.green : colors.red}
            />
          ))}
          <MapViewDirections
            strokeWidth={5}
            strokeColor={colors.blue}
            apikey={googleKey.api}
            origin={marker[0]}
            destination={marker[1]}
          />
        </MapView> : <View/>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: statusBar,
    backgroundColor: colors.headerBg,
  },
  innerMainView: {
    flex: 1,
  },
  mapViewMainStyle: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
});

export default Map;
