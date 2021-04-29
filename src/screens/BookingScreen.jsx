import React, {Component, useEffect, useState, useRef} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import axios from 'axios';
import {Card, Button, Paragraph, ActivityIndicator} from 'react-native-paper';
import moment from 'moment';
import {normalize} from '../core/size';
import dayjs from 'dayjs';
import {useNavigation} from '@react-navigation/native';
import {getColors} from '../core/theme';
import {getLocation} from '../core/location';
import Geolocation from 'react-native-geolocation-service';
import {DarkCalendar, LightCalendar} from './Calendar';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export default function BookingScreen({route}) {
  const navigation = useNavigation();

  const {room, type, company} = route.params;
  const [selectedDay, setSelectedDay] = useState(moment().format('YYYY-MM-DD'));
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentApartment, setCurrentApartment] = useState('');
  const [currentBuilding, setCurrentBuilding] = useState('');
  const [currentCompany, setCurrentCompany] = useState('');
  const [userBookings, setUserBookings] = useState([]);
  const [currentFocus, setCurrentFocus] = useState(null);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isCancelButtonVisible, setIsCancelButtonVisible] = useState(false);
  const [timeslotid, setTimeslotid] = useState([]);
  const currentDay = dayjs().format('YYYY-MM-DD');
  const [colors, setColors] = useState([]);
  const [darktheme, setDarktheme] = useState(false);
  const [position1, setPosition1] = useState({});
  const [toBeDeleted, setToBeDeleted] = useState(null);
  const getColors1 = async () => {
    const colors1 = await getColors();
    console.log(colors1);

    setColors(colors1);
  };
  const getTheme = async () => {
    const theme = await AsyncStorage.getItem('darkmode');
    let theme1 = JSON.parse(theme);

    setDarktheme(theme1);
  };
  useEffect(() => {
    getTheme();
  }, []);
  useEffect(() => {
    getColors1();
  }, []);

  useEffect(() => {
    try {
      const getCurrentApartmentBuilding = async () => {
        const company = await AsyncStorage.getItem('company');
        const apartment = await AsyncStorage.getItem('apartment');
        const building = await AsyncStorage.getItem('building');

        setCurrentApartment(apartment);
        setCurrentBuilding(building);
        setCurrentCompany(company);
      };
      getCurrentApartmentBuilding();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const fetchData = async () => {
    const apartment = await AsyncStorage.getItem('apartment');
    const building = await AsyncStorage.getItem('building');
    try {
      const result = await axios(
        `http://192.168.0.49:8081/api/bookings/bookinghistory?apartment=${apartment}&building=${building}&company=${company}`,
      );
      setUserBookings(result.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setInterval(() => {
      fetchData();
    }, 5000);
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let day = dayjs().format('YYYY-MM-DD');

        const resp = await axios.get(
          `http://192.168.0.49:8081/api/bookings/bookingavailable?rid=${room}&date=${day}&company=${company}`,
        );
        setEvents(resp.data.timeslots);
        setIsLoading(false);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    };
    fetchData();
  }, []);
  const data = [];

  userBookings.map(item => {
    let date = dayjs(item.date).format('YYYY-MM-DD');
    data.push({
      key: item.id,
      id: item.id,
      date: date,
    });
    return data;
  });

  const onSetReminder = datetime => {
    const {
      date,
      apartment,
      building,
      start_time: startTime,
      end_time: endTime,
    } = props;
    const remindDate = moment(datetime).format('YYYY-MM-DD');
    const remindTime = moment(datetime).format('hh:mm');
    let title = 'Reminder!';
    let message = `You have booked ${apartment} ${building} on ${moment(
      date,
    ).format('YYYY-MM-DD')} at ${startTime} - ${endTime}`;
    let date1 = datetime;
    notif.current.scheduleNotif(title, message, date1);

    Alert.alert(
      'Done!',
      `You have set a reminder on ${remindDate} at ${remindTime} for this booking.`,
      [
        {
          title: 'Okay',
          onPress: toggleDatePicker,
        },
      ],
    );
  };
  useEffect(() => {
    let i;
    Geolocation.getCurrentPosition(
      position => {
        setPosition1(position);
      },
      error => {
        console.log(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 1000,
        maximumAge: 10000,
      },
    );
  }, []);
  const onCancelPress = async () => {
    let result;
    try {
      result = await axios.delete(
        `http://192.168.0.49:8081/api/bookings/removeSpecificBooking/${toBeDeleted}`,
      );
    } catch (error) {}
    fetchData();
  };
  const onBookPress = async () => {
    let result;
    console.log(position1);
    try {
      result = await axios.post(
        'http://192.168.0.49:8081/api/bookings/booking',
        {
          rid: room,
          building: currentBuilding,
          apartment: currentApartment,
          company: currentCompany,
          date: selectedDay,
          tid: currentFocus,
          slot: FindNeedle(),
          location: position1,
          room_building: currentBuilding,
        },
      );
    } catch (error) {}
    const json = [
      {
        rid: room,
        building: currentBuilding,
        apartment: currentApartment,
        company: currentCompany,
        date: selectedDay,
        tid: currentFocus,
        slot: FindNeedle(),
        location: position1,
        room_building: currentBuilding,
      },
    ];
    // axios
    //   // This is where the data is hosted
    //   .post('http://192.168.0.49:8081/api/bookings/booking', {
    //     rid: room,
    //     building: currentBuilding,
    //     apartment: currentApartment,
    //     date: selectedDay,
    //     tid: currentFocus,
    //     company: currentCompany,
    //     coordinates: location
    //   })
    //   // Once we get a response and store data, let's change the loading state
    //   .then((response) => {
    //     if (response && response.data && response.status === 201) {
    //       getEvents();
    //       const startTime = moment(
    //         currentFocus.timeslot.split('-')[0],
    //         'hh:mm',
    //       );
    //       const notifyTime = startTime.subtract(2, 'hours').toDate();
    //       scheduleNotification(
    //         'Reminder!',
    //         `You have booked ${currentApartment} ${currentBuilding} on ${selectedDay} at ${currentFocus.timeslot}`,
    //         notifyTime,
    //       );
    //       const {message} = response.data;
    //       Alert.alert('Booked!', message, [
    //         {
    //           title: 'Okay',
    //           onPress: () => {
    //             onFocusPress(null);
    //           },
    //         },
    //       ]);
    //     }
    //   })
    //   // If we catch any errors connecting, let's update accordingly
    //   .catch((error) => {
    //     if (error && error.data) {
    //       const {message} = error.data;
    //       Alert.alert('Oops!', message, [
    //         {
    //           title: 'Okay',
    //           onPress: () => {
    //             onFocusPress(null);
    //           },
    //         },
    //       ]);
    //     }
    //   });
    navigation.navigate('BookingConfirmed', {booking: json});
  };
  const onFocusPress = currentFocus => {
    console.log(currentFocus);

    setCurrentFocus(currentFocus);
    toggleBookButton();
    toggleCancelButton();
  };

  const getCardColor = (apartment, timeslot) => {
    const isTimePassed1 = isTimePassed(timeslot);
    const isToday1 = isToday();
    const isPast1 = isPast();

    if (apartment === currentApartment) {
      return {
        textColor: 'rgba(255, 255, 255, 1)',
        backgroundColor: colors.timeslotIsApartment,
      };
    }
    if (isTimePassed1 && isToday1) {
      return {
        textColor: colors.text,

        backgroundColor: '#363636',
      };
    }
    if (isPast1) {
      return {
        textColor: 'rgba(255, 255, 255, 0.6)',

        backgroundColor: '#363636',
      };
    }
    if (typeof apartment === 'string' && apartment != currentApartment) {
      return {
        textColor: colors.cardslotText,
        backgroundColor:
          isTimePassed1 && isToday1
            ? colors.disabled
            : colors.timeslotNotApartment,
      };
    }

    if (apartment === currentApartment) {
      return {
        textColor: 'rgba(255, 255, 255, 0.6)',
        backgroundColor: colors.calendarTimeslot,
      };
    }
    return {
      textColor: '#000000',
      backgroundColor: colors.border,
    };
  };

  const onDayPress = async day => {
    let date = day.dateString;
    setSelectedDay(date);
    getEvents(date);
  };

  const getEvents = async date => {
    setIsLoading(true);
    try {
      const resp = await axios.get(
        `http://192.168.0.49:8081/api/bookings/bookingavailable?rid=${room}&date=${date}&company=${currentCompany}`,
      );
      setEvents(resp.data.timeslots);
      console.log(room, date, currentCompany);
      setIsLoading(false);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };
  const toggleCancelButton = () => {
    setIsCancelButtonVisible(!isCancelButtonVisible);
  };
  const toggleBookButton = () => {
    setIsButtonVisible(!isButtonVisible);
  };
  const isTimePassed = timeslot => {
    const minutesOfDay = m => m.minutes() + m.hours() * 60;
    const startTime = moment(timeslot.split(' - ')[0], 'hh:mm');
    const endTime = moment(timeslot.split(' - ')[1], 'hh:mm');
    const currentTime = moment();

    return (
      minutesOfDay(currentTime) >=
      (minutesOfDay(startTime) +
        (minutesOfDay(endTime) === 0 ? 1459 : minutesOfDay(endTime))) /
        2
    );
  };

  const isToday = () => {
    return moment(selectedDay, 'YYYY-MM-DD').isSame(moment(), 'date');
  };
  const isPast = () => {
    return moment(selectedDay, 'YYYY-MM-DD').isBefore(moment(), 'date');
  };
  const isFocused = (id, timeslot) => {
    if (currentFocus) {
      return currentFocus.tid === id;
    }
    return false;
  };

  const FindNeedle = () => {
    let needle = currentFocus;
    // iterate over each element in the array
    for (var i = 0; i < events.length; i++) {
      // look for the entry with a matching `code` value
      if (events[i].timeslot_id == needle) {
        return events[i].timeslot;
      }
    }
  };
  const ShowBookingButton = timeslot_id => {
    timeslotid.push(timeslot_id);
    const lastItem = timeslotid[timeslotid.length - 1];
    const secondlastItem = timeslotid[timeslotid.length - 2];
    setIsButtonVisible(true);
    if (lastItem === secondlastItem) {
      setIsButtonVisible(false);
      timeslotid.splice(0, timeslotid.length);
    }
  };
  const showCancelBookingButton = timeslot_id => {
    timeslotid.push(timeslot_id);
    const lastItem = timeslotid[timeslotid.length - 1];
    const secondlastItem = timeslotid[timeslotid.length - 2];
    setIsCancelButtonVisible(true);
    if (lastItem === secondlastItem) {
      setIsCancelButtonVisible(false);
      timeslotid.splice(0, timeslotid.length);
    }
  };
  return (
    <View style={{height: '100%', backgroundColor: colors.background}}>
      {darktheme ? (
        <DarkCalendar
          selectedDay={selectedDay}
          onDayPress={onDayPress}
          current={currentDay}
          userdata={userBookings}
        />
      ) : (
        <LightCalendar
          selectedDay={selectedDay}
          onDayPress={onDayPress}
          current={currentDay}
          userdata={userBookings}
        />
      )}
      <ScrollView>
        {!isLoading ? (
          <View
            style={[
              styles.cardsContainer,
              {backgroundColor: colors.background},
            ]}>
            {events.map(function (timeslots) {
              const {timeslot_id, apartment, timeslot, id} = timeslots;
              const {textColor, backgroundColor} = getCardColor(
                apartment,
                timeslot,
              );
              const isTimePassed1 = isTimePassed(timeslot);
              const isFocused1 = isFocused(timeslot_id, timeslot);
              const isToday1 = isToday();
              const shouldBeDisabled = () => {
                if (apartment === null) {
                  return false;
                }
                if ((isTimePassed1 && isToday1) || apartment === null) {
                  return true;
                }
                if (apartment != currentApartment) {
                  return true;
                }
              };
              const showButton = () => {
                if (apartment === currentApartment) {
                  console.log(id);
                  setCurrentFocus(timeslot_id);
                  setIsButtonVisible(false);
                  showCancelBookingButton(timeslots);
                  setToBeDeleted(id);
                }
                if (apartment != currentApartment) {
                  console.log(id);

                  setCurrentFocus(timeslot_id);
                  setIsCancelButtonVisible(false);
                  ShowBookingButton(timeslot_id);
                }
              };
              return (
                <TouchableOpacity
                  key={timeslot_id}
                  disabled={shouldBeDisabled()}
                  onPress={() => {
                    showButton();
                  }}>
                  <Card
                    style={[
                      styles.card,
                      {backgroundColor},
                      isFocused1 && {borderColor: colors.primary},
                    ]}>
                    <View>
                      <Paragraph style={[styles.text, {color: textColor}]}>
                        {timeslot}
                      </Paragraph>
                      <Paragraph style={[styles.text, {color: textColor}]}>
                        {apartment}
                      </Paragraph>
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <ActivityIndicator size="large" />
        )}
      </ScrollView>
      {!isCancelButtonVisible ? null : (
        <TouchableOpacity
          style={[colors.bookingButton, styles.floating]}
          onPress={() => {
            onFocusPress(null);
          }}>
          <Button
            labelStyle={{color: colors.text}}
            mode="contained"
            color={colors.primary}
            style={styles.button}
            mode="contained"
            onPress={() => {
              onCancelPress();
            }}>
            Ta bort bokning
          </Button>
        </TouchableOpacity>
      )}
      {!isButtonVisible ? null : (
        <TouchableOpacity
          style={[colors.bookingButton, styles.floating]}
          onPress={() => {
            onFocusPress(null);
          }}>
          <Button
            labelStyle={{color: colors.text}}
            mode="contained"
            color={colors.primary}
            style={styles.button}
            mode="contained"
            onPress={() => {
              onBookPress();
            }}>
            Boka Nu
          </Button>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: 200,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    height: '100%',
  },
  card: {
    margin: normalize(4.5),
    width: SCREEN_WIDTH / 3 - normalize(10),
    marginTop: normalize(8),
    height: SCREEN_WIDTH / 7 - normalize(10),
    borderWidth: 2,
    alignItems: 'center',
    flexDirection: 'row',
    marginStart: 5,
  },

  floating: {
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    color: 'white',
  },
  text: {
    textAlign: 'center', // <-- the magic
    marginBottom: 0,
    fontSize: normalize(14),
  },
});
