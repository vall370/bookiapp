import AsyncStorage from '@react-native-community/async-storage';
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableHighlight,
} from 'react-native';
import {ListItem, Avatar, Icon, Input, Text} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';

import {
  Appbar,
  Paragraph,
  Divider,
  Menu,
  Button,
  List,
  Checkbox,
  TextInput,
  TouchableRipple,
  Switch,
  useTheme,
  RadioButton,
  Modal,
  Dialog,
  Portal,
  Provider,
  Title,
  ActivityIndicator,
} from 'react-native-paper';
import {CompanyImage} from '../components/CompanyImage';

import {AuthContext} from '../components/context';
import {getColors, theme} from '../core/theme';

const list = [
  {
    title: 'Appointments',
    icon: 'av-timer',
  },
  {
    title: 'Trips',
    icon: 'flight-takeoff',
  },
];
export default function ProfileScreen({navigation}) {
  const [visible, setVisible] = React.useState(false);
  const [building, setBuilding] = useState('');
  const [company, setCompany] = useState('');
  const [apartment, setApartment] = useState('');
  const [notificationValueTime, setNotificationValueTime] = useState('timmar');
  const [checked, setChecked] = React.useState(true);
  const {signOut, toggleTheme} = React.useContext(AuthContext);
  const [inputVal, setInputVal] = useState('test');
  const [menuTimeValue, setMenuTimeValue] = useState('hours');
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isOpen, setOpen] = React.useState(false);
  const [value, onChangeText] = React.useState('Useless Placeholder');
  const [isSwitchOn, setIsSwitchOn] = React.useState(true);
  const [isChangePinCodeVisible, setIsChangePinCodeVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [colors, setColors] = useState([]);
  const [darkTheme, setDarkTheme] = useState();
  const Dark = async () => {
    let test = await AsyncStorage.getItem('darkmode');
    setDarkTheme(test);
  };
  useEffect(() => {
    Dark();
  }, []);
  const getColors1 = async () => {
    const colors1 = await getColors();
    setColors(colors1);
  };
  useEffect(() => {
    getColors1();
  }, []);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const onToggleSwitch1 = () => setDarkTheme(!darkTheme);

  const paperTheme = useTheme();
  const ShowPinCode = () => {
    setIsChangePinCodeVisible(!isChangePinCodeVisible);
  };
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const [modalVisible, setModalVisible] = useState(false);
  const onPressItemHandler = value => {
    setMenuTimeValue(value);
    setOpen(false);
  };
  const GetItems = async () => {
    try {
      const apartment = await AsyncStorage.getItem('apartment');
      const building = await AsyncStorage.getItem('building');

      setApartment(apartment);
      setBuilding(building);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    setIsLoading(true);

    AsyncStorage.getItem('company').then(token => {
      setCompany(token), setIsLoading(false);
    });
    GetItems();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const DarkTheme = async () => {
    let result = await AsyncStorage.getItem('darkmode');
    setDarkTheme(!darkTheme);
    await AsyncStorage.setItem('darkmode', JSON.stringify(!darkTheme));
    //console.log(result);
    getColors1();
  };
  //console.log(darkTheme);
  if (isLoading) return <ActivityIndicator animating={true} />;
  return (
    <>
      {isDialogVisible ? (
        <Portal>
          <Dialog
            visible={isDialogVisible}
            onDismiss={() => setIsDialogVisible(false)}>
            <Dialog.Title>Påminnelse innan bokning</Dialog.Title>
            <Dialog.Content>
              <View style={styles.container}>
                <View style={styles.textInputWrapper}>
                  <Input
                    maxLength={2}
                    style={styles.textInput}
                    placeholder="Month"
                    placeholderTextColor="#d3d3d3"
                    onChangeText={text => onChangeText(text)}
                    value={value}
                  />
                </View>
                <View style={styles.textInputWrapper}>
                  <Menu
                    style={{marginTop: 70}}
                    visible={isOpen}
                    onDismiss={() => setOpen(false)}
                    anchor={
                      <Button
                        style={{marginTop: 25}}
                        color="#8DB600"
                        icon="account"
                        dark={true}
                        mode="contained"
                        onPress={() => setOpen(true)}>
                        {menuTimeValue}
                      </Button>
                    }>
                    <Menu.Item
                      onPress={() => onPressItemHandler('timmar')}
                      title="timmar"
                    />
                    <Menu.Item
                      onPress={() => onPressItemHandler('minuter')}
                      title="minuter"
                    />
                  </Menu>
                </View>
              </View>
            </Dialog.Content>
            <Dialog.Actions style={{marginTop: 32}}>
              <Button onPress={() => setIsDialogVisible(false)}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      ) : null}
      <View style={{flex: 1, backgroundColor: colors.background}}>
        <View style={{marginTop: 25}}>
          <CompanyImage value={company} />
        </View>
        <ScrollView>
          <List.Section style={{backgroundColor: colors.list, elevation: 2}}>
            <List.Subheader style={{color: colors.primary}}>
              Mina uppgifter
            </List.Subheader>
            <List.Item
              titleStyle={{color: colors.primary}}
              title="Address"
              right={props => (
                <TextInput
                  disabled
                  value={building}
                  theme={{colors: {text: colors.primary}}}
                  style={{height: 30, backgroundColor: 'transparent'}}
                />
              )}
            />
            <List.Item
              title="Lägenhetsnummer"
              titleStyle={{color: colors.primary}}
              right={props => (
                <TextInput
                  disabled
                  value={apartment}
                  theme={{colors: {text: colors.primary}}}
                  style={{height: 30, backgroundColor: 'transparent'}}
                />
              )}
            />
          </List.Section>
          <List.Section style={{backgroundColor: colors.list}}>
            <List.Subheader style={{color: colors.primary}}>
              Notifikationer
            </List.Subheader>
            <List.Item
              title="Notifikationer på / av"
              titleStyle={{color: colors.primary}}
              right={props => (
                <Switch
                  color={colors.primary}
                  value={isSwitchOn}
                  onValueChange={onToggleSwitch}
                />
              )}
              onPress={onToggleSwitch}
            />
            <List.Item
              disabled={isSwitchOn}
              titleStyle={{color: colors.primary}}
              descriptionStyle={{color: colors.primary}}
              title="Standard tid för påminnelse"
              description="Bokningspåminnelse innan bokning"
              right={props => (
                <Title theme={{colors: {text: colors.primary}}} {...props}>
                  2 timmar
                </Title>
              )}
            />
          </List.Section>
          <List.Section style={{backgroundColor: colors.list}}>
            <List.Subheader style={{color: colors.primary}}>
              Pin-kod
            </List.Subheader>
            <Button
              onPress={() => {
                navigation.navigate('ChangePassword');
              }}
              mode="outlined"
              compact={true}
              color={colors.primary}>
              Byt Pin-kod
            </Button>
          </List.Section>
          <List.Section style={{backgroundColor: colors.list}}>
            <List.Subheader style={{color: colors.primary}}>
              App-inställningar
            </List.Subheader>
            <List.Item
              title="Tema mörkt / ljust"
              titleStyle={{color: colors.primary}}
              right={props => (
                <Switch value={darkTheme} onValueChange={DarkTheme} />
              )}
            />
          </List.Section>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey',
  },
  formContainer: {
    backgroundColor: 'white',
    width: 250,
    borderRadius: 10,
    // paddingTop: 32,
    paddingBottom: 32,
    justifyContent: 'center',
    alignItems: 'center',
    // alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  textInputWrapper: {
    flex: 1,
    height: 50,
  },
  textInput: {
    flex: 1,
  },
});
