import AsyncStorage from '@react-native-community/async-storage';
import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#600EE6',
    secondary: '#414757',
    bookedbyme: '#d4979e',
    bookedbyanother: '#9cb6d3',
    error: '#f13a59',
  },
};
const colors = {
  'Diös Fastigheter': {
    tabBarColor: '#75C4C3',
    button: '#05526D',
    error: '#EF5F6D',
    primary: '#05526D',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(242, 242, 242)',
    text: '#121212',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
    disabled: 'rgb(108, 97, 110)',
    calendarTimeslot: '#ffffff',
    timeslotNotApartment: '#ff6961',
    timeslotIsApartment: '#77dd77',
    bookingIsToday: '#aec6cf',
    bookingIsPast: '#cfaeb6',
    bookingIsFuture: '#cfc8ae',
    bookingCardColor: '#ffffff',
    list: '#ffffff',
    secondary: '#f16771'
  },
  'Lindbäcks Fastigheter': {
    primary: 'rgba(20, 131, 250, 0.6)',
    secondary: '#ff6666',
    accent: '#cc0066',
    tertiary: '#30475e',
    dark: '#66cccc',
    button: '#ffffff',
    text: '#1482FA',
    cardslotText: 'rgba(255, 255, 255, 1)',
    tabBarColor: '#1482FA',
    background: '#ffffff',
    list: '#ffffff',
    calendarTimeslot: '#ffffff',
    timeslotNotApartment: '#ff6961',
    timeslotIsApartment: '#77dd77',
    bookingIsToday: '#aec6cf',
    bookingIsPast: '#cfaeb6',
    bookingIsFuture: '#cfc8ae',
    bookingCardColor: '#ffffff',
    button1: '#2B2E35',
  },
};
const darkmodecolors = {
  'Diös Fastigheter': {
    tabBarColor: '#001F2A',
    button: '#2B2E35',
    error: '#EF5F6D',
    primary: 'rgba(255, 255, 255, 0.6)',
    background: '#121212',
    card: '#001F2A',
    text: 'rgb(255, 255, 255)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
    disabled: 'rgb(108, 97, 110)',
    calendarTimeslot: '#ffffff',
    timeslotNotApartment: '#ff6961',
    timeslotIsApartment: '#77dd77',
    bookingIsToday: '#aec6cf',
    bookingIsPast: '#cfaeb6',
    bookingIsFuture: '#cfc8ae',
    bookingCardColor: '#ffffff',
    list: '#1F1B24',
    secondary: '#616E7C',
    calendarBackground: '#121212',
    textSectionTitleColor: 'rgb(255, 255, 255)',
    dayTextColor: 'rgb(255, 255, 255)',
    todayTextColor: 'rgb(255, 255, 255)',
    selectedDayTextColor: 'rgb(255, 255, 255)',
    monthTextColor: 'rgb(255, 255, 255)',
    indicatorColor: 'rgb(255, 255, 255)',
    selectedDayBackgroundColor: 'rgb(255, 255, 255)',
    arrowColor: 'white',
    theme: {
      calendarBackground: '#121212',
      textSectionTitleColor: 'rgb(255, 255, 255)',
      dayTextColor: 'rgb(255, 255, 255)',
      todayTextColor: 'rgb(255, 255, 255)',
      selectedDayTextColor: 'rgb(255, 255, 255)',
      monthTextColor: 'rgb(255, 255, 255)',
      indicatorColor: 'rgb(255, 255, 255)',
      selectedDayBackgroundColor: 'rgb(255, 255, 255)',
      arrowColor: 'white',
    },
  },
  'Lindbäcks Fastigheter': {
    tabBarColor: '#121212',
    button: '#2B2E35',
    error: '#EF5F6D',
    secondary: '#f16771',
    primary: 'rgba(20, 131, 250, 0.6)',
    background: '#121212',
    list: '#1F1B24',
    card: '#212121',
    text: 'rgba(255, 255, 255, 0.6)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
    disabled: 'rgb(108, 97, 110)',
    calendarTimeslot: '#ffffff',
    timeslotNotApartment: 'rgba(108, 19, 19,1)',
    timeslotIsApartment: 'rgba(0, 97, 63,1)',
    bookingIsToday: '#aec6cf',
    bookingIsPast: '#B00020',
    bookingIsFuture: '#cfc8ae',
    bookingCardColor: '#ffffff',
  },
};
export const getColors = async () => {
  const building = await AsyncStorage.getItem('company');
  const darkmode = await AsyncStorage.getItem('darkmode');
  try {
    if (darkmode != null) {
      if (JSON.parse(darkmode) === true) {
        return darkmodecolors[building];
      } else {
        return colors[building];
      }
    }
  } catch (error) { }
  // if (JSON.parse(darkmode) === true) {
  //   return darkmodecolors[building];
  // } else {
  //   return colors[building];
  // }
};
