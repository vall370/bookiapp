import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  Button,
  Card,
  Colors,
  Divider,
  FAB,
  IconButton,
  Paragraph,
  Title,
} from 'react-native-paper';
import {normalize} from '../core/size';
import {getColors} from '../core/theme';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const styles = StyleSheet.create({
  contentContainer: {
    padding: normalize(10),
  },
  card: {
    flex: 1,
    marginBottom: normalize(10),
  },
  inner: {
    flexDirection: 'row',
  },
  code: {
    width: normalize(8),
    borderTopLeftRadius: normalize(4),
    borderBottomLeftRadius: normalize(4),
  },
  innerContent: {
    padding: normalize(10),
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    /*         color: 'grey',
     */ fontSize: normalize(14),
    paddingBottom: normalize(4),
  },
  qr: {
    padding: normalize(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    opacity: 0.25,
  },
  text: {
    fontSize: 12,
  },
  tinyLogo: {
    width: 36,
    height: 36,
  },
});
export default function RoomList(props) {
  const navigation = useNavigation();

  const [colors, setColors] = useState([]);
  const getColors1 = async () => {
    const colors1 = await getColors();
    setColors(colors1);
  };
  useEffect(() => {
    getColors1();
  }, []);
  // console.log(props);
  return (
    <View
      key={props.id}
      style={{
        flex: 1,
        alignSelf: 'center',
        elevation: 5,
        marginBottom: 25,
        height: 'auto',
        width: '100%',
        paddingLeft: normalize(25),
        paddingRight: normalize(25),
      }}>
      <Card style={{height: '100%', width: '100%', elevation: 10, backgroundColor: colors.card}}>
        <Card.Content>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: '65%', height: '100%'}}>
              <Title style={{color: colors.text}}>{props.type === "Laundree" ? "Tvättrum" : "Bastu"}</Title>
              <Paragraph style={{color: colors.text}}>
                {props.building}, Rum: {props.room_number}
              </Paragraph>
            </View>
            <View
              style={{
                width: '35%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {props.type === 'Sauna' ? (
                <Image
                  style={styles.tinyLogo}
                  source={require('../../assets/sauna.png')}
                />
              ) : (
                <Image
                  style={styles.tinyLogo}
                  source={require('../../assets/washing-machine.png')}
                />
              )}
            </View>
          </View>
          {/* <Title style={{color: colors.text}}>{props.type}</Title>
          <View style={{flex: 1, backgroundColor: 'black', width: '25%', height: '100%'}}>
          <Image
              style={{width: 18, height: 18}}
              source={require('../../assets/washing-machine.png')}
            />
            </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Paragraph style={{color: colors.text}}>
              {props.building}, Rum: {props.room_number}
            </Paragraph>

          </View> */}
          <Divider style={{backgroundColor: colors.text}} />
        </Card.Content>
        <Card.Content>
          <Title style={{color: colors.text}}>
            LEDIGA TIDER {props.empty_booking}
          </Title>
          <Divider style={{backgroundColor: colors.text}} />
        </Card.Content>
        <Card.Actions style={{alignSelf: 'flex-end'}}>
          {props.type === 'Laundree' ?
          <Paragraph style={{color: colors.text,marginRight: normalize(5)}}>
            Boka Tvättid
          </Paragraph> :
          <Paragraph style={{color: colors.text,marginRight: normalize(5)}}>
            Boka Bastutid
          </Paragraph>}
          <FAB
            icon="arrow-right"
            theme={{colors: {accent: colors.secondary}}}
            color="#FFFFFF"
            small
            key={props.room_number}
            onPress={() => {
              navigation.navigate('BookingScreen', {
                room: props.id,
                type: props.type,
                company: 'Diös Fastigheter',
              });
            }}
          />
        </Card.Actions>
      </Card>
    </View>
  );
}
