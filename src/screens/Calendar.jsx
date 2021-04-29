import dayjs from 'dayjs';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {View, Text} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import {getColors} from '../core/theme';


export const LightCalendar = (props) => {
  const [colors, setColors] = useState({});
  const getColors1 = async () => {
    let colors1;
    try {
      colors1 = getColors();
    } catch (error) {}
    setColors(colors1);
  };
  useEffect(() => {
    getColors1();
  }, []);
  let currentDay = dayjs().format('YYYY-MM-DD');
  let selectedDay = props.selectedDay;
  const getMarkedData = () => {
    const data = [];

    props.userdata.map((item) => {
      let date = dayjs(item.date).format('YYYY-MM-DD');
      data.push({
        key: item.id,
        id: item.id,
        date: date,
      });
      return data;
    });

    let marked = {};
    data.forEach((item) => {
      marked[item.date] = {
        customStyles: {
          container: {
            backgroundColor: '#75C4C3',
            borderRadius: 0,
          },
          text: {
            color: 'black',
            fontWeight: 'bold',
          },
        },
      };
    });
    marked[currentDay] = {
      customStyles: {
        container: {
          backgroundColor: '#00613F',
          borderRadius: 0,
        },
        text: {
          color: 'white',
          fontWeight: 'bold',
        },
      },
    };
    marked[selectedDay] = {
      customStyles: {
        container: {
          backgroundColor: '#05526D',
          borderRadius: 0,
        },
        text: {
          color: colors.text,
          fontWeight: 'bold',
        },
      },
    };
    return marked;
  };
  return (
    <View>
      <CalendarList
        current={props.current}
        onDayPress={props.onDayPress}
        theme={{
            calendarBackground: colors.text,
            textSectionTitleColor: colors.text,
            dayTextColor: colors.text,
            todayTextColor: colors.text,
            selectedDayTextColor: colors.text,
            monthTextColor: colors.text,
            indicatorColor: colors.text,
            selectedDayBackgroundColor: colors.text,
            arrowColor: 'white',
        }}
        pastScrollRange={1}
        futureScrollRange={2}
        horizontal
        pagingEnabled={true}
        firstDay={1}
        markingType={'custom'}
        markedDates={getMarkedData()}
        renderHeader={(date) => {
          const header = date.toString('MMMM yyyy');
          const [month, year] = header.split(' ');
          const textStyle = {
            fontSize: 18,
            fontWeight: 'bold',
            // paddingTop: 10,
            paddingBottom: 10,
            paddingRight: 5,
          };

          return (
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text style={{marginLeft: 5, ...textStyle}}>{`${month}`}</Text>
              <Text style={{marginRight: 5, ...textStyle}}>{year}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};
export const DarkCalendar = (props) => {
  let currentDay = dayjs().format('YYYY-MM-DD');
  let selectedDay = props.selectedDay;
  const [colors, setColors] = useState({});
  const getColors1 = async () => {
    const colors1 = await getColors();
    console.log(colors1)

    setColors(colors1);
  };
  useEffect(() => {
    getColors1();
  }, []);

  const getMarkedData = () => {
    const data = [];

    props.userdata.map((item) => {
      let date = dayjs(item.date).format('YYYY-MM-DD');
      data.push({
        key: item.id,
        id: item.id,
        date: date,
      });
      return data;
    });
    let marked = {};
    data.forEach((item) => {
      marked[item.date] = {
        customStyles: {
          container: {
            backgroundColor: '#75C4C3',
            borderRadius: 0,
          },
          text: {
            color: 'black',
            fontWeight: 'bold',
          },
        },
      };
    });
    marked[currentDay] = {
      customStyles: {
        container: {
          backgroundColor: '#00613F',
          borderRadius: 0,
        },
        text: {
          color: 'white',
          fontWeight: 'bold',
        },
      },
    };
    marked[selectedDay] = {
      customStyles: {
        container: {
          backgroundColor: '#05526D',
          borderRadius: 0,
        },
        text: {
          color: colors.text,
          fontWeight: 'bold',
        },
      },
    };
    return marked;
  };
  return (
    <View>
      <CalendarList
        theme={{
          calendarBackground: "#121212",
          textSectionTitleColor: 'rgba(255, 255, 255, 0.6)',
          dayTextColor: 'rgba(255, 255, 255, 0.6)',
          todayTextColor: 'rgba(255, 255, 255, 0.6)',
          selectedDayTextColor: 'rgba(255, 255, 255, 0.6)',
          monthTextColor: 'rgba(255, 255, 255, 0.6)',
          indicatorColor: 'rgba(255, 255, 255, 0.6)',
          selectedDayBackgroundColor: '#ffffff',
          arrowColor: 'white',
        }}
        current={props.current}
        onDayPress={props.onDayPress}
        pastScrollRange={1}
        futureScrollRange={2}
        horizontal
        pagingEnabled={true}
        firstDay={1}
        markedDates={getMarkedData()}
        markingType={'custom'}
        renderHeader={(date) => {
          const header = date.toString('MMMM yyyy');
          const [month, year] = header.split(' ');
          const textStyle = {
            fontSize: 18,
            fontWeight: 'bold',
            // paddingTop: 10,
            paddingBottom: 10,
            paddingRight: 5,
          };

          return (
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text style={{color: 'rgba(255, 255, 255, 0.6)',marginLeft: 5, ...textStyle}}>{`${month}`}</Text>
              <Text style={{color: 'rgba(255, 255, 255, 0.6)',marginRight: 5, ...textStyle}}>{year}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};
//   <CalendarList
//   key={key}
//   theme={theme}
//   onDayPress={onDayPress}
//   current={currentDay}
//   pastScrollRange={1}
//   futureScrollRange={2}
//   horizontal
//   pagingEnabled={true}
//   firstDay={1}
//   markingType={'custom'}
//   markedDates={getMarkedData()}
//   renderHeader={(date) => {
//     const header = date.toString('MMMM yyyy');
//     const [month, year] = header.split(' ');
//     const textStyle = {
//       fontSize: 18,
//       fontWeight: 'bold',
//       // paddingTop: 10,
//       paddingBottom: 10,
//       paddingRight: 5,
//     };

//     return (
//       <View
//         style={{
//           flexDirection: 'row',
//           width: '100%',
//           justifyContent: 'space-between',
//           marginTop: 10,
//           marginBottom: 10,
//         }}>
//         <Text style={{marginLeft: 5, ...textStyle}}>{`${month}`}</Text>
//         <Text style={{marginRight: 5, ...textStyle}}>{year}</Text>
//       </View>
//     );
//   }}
// />
