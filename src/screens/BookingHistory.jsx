import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import orderBy from 'lodash/orderBy';
import dayjs from 'dayjs';
import ListItem from '../components/ListItem';
import {normalize} from '../core/size';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import {Card, Paragraph, Title} from 'react-native-paper';
import {CompanyImage} from '../components/CompanyImage';
import {getColors} from '../core/theme';

export default function BookingHistory() {
  const [events, setEvents] = useState([]);

  const [refreshing, setRefreshing] = React.useState(false);
  const [company, setCompany] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [colors, setColors] = useState([]);

  const getColors1 = async () => {
    const colors1 = await getColors();
    console.log(colors1);
    setColors(colors1);
  };
  useEffect(() => {
    getColors1();
  }, []);
  useEffect(() => {
    setIsLoading(true);

    AsyncStorage.getItem('company').then(token => {
      setCompany(token), setIsLoading(false);
    });
  }, []);
  useEffect(() => {
    getHistoryOfBookings();
  }, []);
  useEffect(() => {
    setInterval(() => {
      getHistoryOfBookings();
    }, 1000);
  }, []);
  const getHistoryOfBookings = async () => {
    const currentApartment = await AsyncStorage.getItem('apartment');
    const currentBuilding = await AsyncStorage.getItem('building');
    const company = await AsyncStorage.getItem('company');

    Axios
      // This is where the data is hosted
      .get(
        `http://192.168.0.49:8081/api/bookings/bookinghistory?building=${currentBuilding}&apartment=${currentApartment}&company=${company}`,
      )
      // Once we get a response and store data, let's change the loading state
      .then(response => {
        /*         //console.log(response.data.results);
         */ setEvents(response.data.results);
      })
      // If we catch any errors connecting, let's update accordingly
      .catch();
  };
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      getHistoryOfBookings();
      setRefreshing(false);
    } catch (error) {}

    setRefreshing(false);
  }, [refreshing]);
  const isToday = date =>
    dayjs(date, 'YYYY-MM-DD').isSame(dayjs().format('YYYY-MM-DD'));

  const isPast = date =>
    dayjs(date, 'YYYY-MM-DD').isBefore(dayjs().format('YYYY-MM-DD'));

  const isFuture = date =>
    dayjs(date, 'YYYY-MM-DD').isAfter(dayjs().format('YYYY-MM-DD'));
  const sorted = orderBy(events, event => {
    if (isToday(event.date)) {
      return 0;
    }
    if (isFuture(event.date)) {
      return 1;
    }
    return 2;
  });

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={{marginTop: '5%'}}>
        <CompanyImage value={company} />
      </View>
      <Card
        style={{
          marginLeft: 16,
          marginRight: 16,
          marginTop: '5%',
          backgroundColor: colors.list,
        }}>
        <Title style={{marginLeft: 32, color: colors.primary}}>
          Mina Bokningar
        </Title>
        <View style={{height: 5, backgroundColor: colors.primary}} />
      </Card>
      <View style={{marginTop: '10%'}}>
        {events.length === 0 ? (
          <>
            <Title
              numberOfLines={2}
              style={{
                paddingVertical: 12,
                paddingHorizontal: 16,
              }}>
              Ni har inte gjort några bokningar
            </Title>
            <Title
              style={{
                paddingVertical: 12,
                paddingHorizontal: 16,
              }}>
              Dina bokningar kommer att visas här
            </Title>
          </>
        ) : (
          <FlatList
            contentContainerStyle={{paddingBottom: '50%'}}
            data={sorted}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            keyExtractor={data => data.id.toString()}
            renderItem={({item}) => <ListItem {...item} />}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: normalize(10),
    paddingBottom: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: '#000000',
    margin: 5,
    padding: 5,
    width: '70%',
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
});
