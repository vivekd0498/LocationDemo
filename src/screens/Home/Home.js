import React, { useState } from 'react';
import {View, StyleSheet} from 'react-native';

import { useDispatch } from 'react-redux';
import Geocoder from 'react-native-geocoding';

import { colors } from '../../helper/colorConstant';
import { navigate } from '../../helper/rootNavigation';
import { hp, statusBar, wp } from '../../helper/utilities';
import { googleKey, strings } from '../../helper/constants';
import { Button, Header, Input, LocationDetailsModal, SearchLocationModal } from '../../components';

Geocoder.init(googleKey.api);

const Home = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [locationType, setLocationType] = useState('');
  const [isOriginErr, setIsOriginErr] = useState(false);
  const [isDestErr, setIsDestErr] = useState(false);
  const [isLocationVisible, setIsLocationVisible] = useState(false);
  const [isLocDetModalShow, setIsLocDetModalShow] = useState(false);
  const [orgLat, setOrgLat] = useState('');
  const [orgLong, setOrgLong] = useState('');
  const [destLat, setDestLat] = useState('');
  const [destLong, setDestLong] = useState('');
  const [distance, setDistance] = useState(0);

  const dispatch = useDispatch();

  const onBackPress = () => {
    console.log('onBackPress');
  }

  const onOriginPress = () => {
    setLocationType('origin');
    setIsLocationVisible(true);
  }

  const onDestinationPress = () => {
    setLocationType('destination');
    setIsLocationVisible(true);
  }

  const onLocModClose = () => {
    setIsLocationVisible(false);
  };

  const getLatLongFromLocation = async(address, type) => {
    await Geocoder.from(address)
      .then(json => {
        var location = json.results[0].geometry.location;
        let lat = Number(location?.lat);
        let fixLat = lat.toFixed(7).toString();
        let long = Number(location?.lng);
        let fixLong = long.toFixed(7).toString();
        if (type === 'origin') {
          setOrgLat(fixLat);
          setOrgLong(fixLong);
        } else {
          setDestLat(fixLat);
          setDestLong(fixLong);
        }
      })
      .catch(error => {
        console.log('Location Err :-', location);
      });
  };

  const onSelectLocation = async (data) => {
    if (locationType !== '') {
      if (locationType === 'origin') {
        setOrigin(data?.description);
        setIsOriginErr(false);
        getLatLongFromLocation(data?.description, 'origin');
      } else {
        setDestination(data?.description);
        setIsDestErr(false);
        getLatLongFromLocation(data?.description, 'destination');
      }
      onLocModClose()
    }
  };

  const getDistanceOneToOne = async (lat1, lng1, lat2, lng2) => {
    const Location1Str = lat1 + "," + lng1;
    const Location2Str = lat2 + "," + lng2;

    let ApiURL = "https://maps.googleapis.com/maps/api/distancematrix/json?";

    let params = `origins=${Location1Str}&destinations=${Location2Str}&key=${googleKey.api}`; // you need to get a key
    let finalApiURL = `${ApiURL}${encodeURI(params)}`;

    let fetchResult =  await fetch(finalApiURL);
    let Result =  await fetchResult.json();

    return Result?.rows[0]?.elements[0]?.distance?.text;
  }

  const onSubmitBtnPress = async() => {
    if (!origin) {
      setIsOriginErr(true);
    } else if (!destination) {
      setIsDestErr(true);
    } else {
      let distance = await getDistanceOneToOne(orgLat, orgLong, destLat, destLong);
      setDistance(distance);
      setTimeout(() => {
        setIsLocDetModalShow(true);
      }, 500);
    }
  };

  const onMapBtnPress = () => {
    let marker = [];
    let fromObj = {
      id: 1,
      type: 'origin',
      latitude: Number(orgLat),
      longitude: Number(orgLong),
    };
    let toObj = {
      id: 2,
      type: 'destination',
      latitude: Number(destLat),
      longitude: Number(destLong),
    };
    marker.push(fromObj, toObj);
    setOrigin('');
    setDestination('');
    setIsLocDetModalShow(false);
    navigate('Map', {
      markers: marker,
    })
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        onPress={onBackPress}
        title={strings.trackLocation}
      />
      <View style={styles.innerMainView}>
        <Input
          title={`${strings.org}*`}
          isErr={isOriginErr}
          onPress={onOriginPress}
          errMsg={strings.orgErr}
          value={origin || strings.orgPlaceholder}
        />
        <Input
          isErr={isDestErr}
          title={`${strings.dest}*`}
          onPress={onDestinationPress}
          errMsg={strings.destErr}
          value={destination || strings.destPlaceholder}
        />

        <Button
          title={strings.submit}
          onPress={onSubmitBtnPress}
        />
      </View>

      <SearchLocationModal
        headerTitle={strings.locations}
        onBackPress={onLocModClose}
        isVisible={isLocationVisible}
        selectedLocation={onSelectLocation}
      />

      <LocationDetailsModal
        orgLat={orgLat}
        orgLong={orgLong}
        destLat={destLat}
        distance={distance}
        destLong={destLong}
        orgLocation={origin}
        destLocation={destination}
        onMapPress={onMapBtnPress}
        isVisible={isLocDetModalShow}
        modalMainTitle={strings.routeDetails}
        onCancelPress={() => setIsLocDetModalShow(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: statusBar,
    backgroundColor: colors.blue,
  },
  innerMainView: {
    flex: 1,
    paddingTop: hp(10),
    borderTopLeftRadius: wp(24),
    borderTopRightRadius: wp(24),
    backgroundColor: colors.white,
  },
});

export default Home;
