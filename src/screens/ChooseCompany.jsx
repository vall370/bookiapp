import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  Animated,
} from 'react-native';
import axios from 'axios';
import {Button, Paragraph, Searchbar} from 'react-native-paper';
import {ListItem} from 'react-native-elements';
import AsyncStorage from '@callstack/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import BookiCircle1 from '../core/BookiCircle1';
import {normalize} from '../core/size';
import BookiCircle2 from '../core/BookiCircle2';
import BookiCircle3 from '../core/BookiCircle3';

import BookiCircle4 from '../core/BookiCircle4';
import BookiCircle5 from '../core/BookiCircle5';
import BookiCircle6 from '../core/BookiCircle6';
import BookiCircle7 from '../core/BookiCircle7';

export default function ChooseCompany({navigation}) {
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState('');
  const [company2, setCompany2] = useState('');
  const [chooseButton, setChooseButton] = useState(false);
  const [image, setImage] = useState('');
  const [arrayholder, setArrayholder] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    axios.get('http://192.168.0.49:8081/api/foretag').then((response) => {
      setDataSource(response.data);
      setIsLoading(false);
      setArrayholder(response.data);
    });
  }, []);
  const onPressCompany = async (item) => {
    setCompany2(item.company), setImage(item.range);

    AsyncStorage.setItem('company', item.company);

    navigation.navigate('ChoosenCompany', {
      image: image,
      company: item.company,
    });
  };
  const renderItem = ({item}) => (
    <ListItem
      bottomDivider
      onPress={() => {
        onPressCompany(item);
      }}>
      <ListItem.Content style={styles.listView}>
        <ListItem.Title>{item.company}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
  const SearchFilterFunction = (text) => {
    //passing the inserted text in textinput

    const newData = arrayholder.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.company
        ? item.company.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    //console.log(newData)

    setDataSource(newData);
    setText(text);
  };
  return (
    <>
      {chooseButton === false ? (
        <View
          style={{
            backgroundColor: 'black',
            height: '100%',
            width: '100%',
            flex: 1,
          }}>
          <LinearGradient
            colors={['#3498DB', '#1A4C6E']}
            style={{
              height: '100%',
              width: '100%',
              flex: 1,
            }}>
            <View
              style={{
                position: 'absolute',
                top: normalize(95),
                left: normalize(-21),
              }}>
              <BookiCircle1 />
            </View>
            <View
              style={{
                position: 'absolute',
                top: normalize(356),
                left: normalize(142),
              }}>
              <BookiCircle2 />
            </View>
            <View
              style={{
                position: 'absolute',
                top: normalize(473),
                left: normalize(39),
              }}>
              <BookiCircle3 />
            </View>
            {/*           <View>
            <LinearGradient
              colors={['#7ACAFF', '#3460DB']}
              style={{
                height: 324, width: 324, borderRadius: 324, position: 'absolute', left: '-5%'
              }}
              start={{ x: 1, y: 0.5 }}
              end={{ x: 0, y: 0.5 }} />
            <LinearGradient
              colors={['#F6A731', '#8234DB']}
              style={{ height: 204, width: 204, borderRadius: 204, right: '0%', position: 'absolute', top: 356 }}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0.5 }} />
            <LinearGradient
              colors={['#F6A731', '#8234DB']}
              style={{ height: 102, width: 102, borderRadius: 102, position: 'absolute', top: 450, left: 39 }}
              start={{ x: 0.5, y: -0.5 }}
              end={{ x: 1, y: 1 }} />
          </View> */}

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <LinearGradient
                colors={[
                  'rgba(20, 130, 250,0.56)',
                  'rgba(255, 255, 255,0.2)',
                  'rgba(20, 130, 250,0.56)',
                ]}
                style={{
                  position: 'absolute',
                  height: 160,
                  width: 280,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderRadius: 48,
                  borderColor: 'white',
                }}>
                <Paragraph
                  style={{
                    textAlign: 'center', // <-- the magic
                    fontWeight: 'bold',
                    lineHeight: 100,
                    fontSize: 60,
                    color: 'white',
                  }}>
                  booki
                </Paragraph>
              </LinearGradient>
            </View>
            <Button
              style={{
                position: 'absolute',
                width: 250,
                top: '80%',
                alignSelf: 'center',
              }}
              mode="contained"
              color="#3498DB"
              labelStyle={{color: 'white', fontSize: 18}}
              onPress={() => setChooseButton(true)}>
              Välj din hyresvärd
            </Button>
            <Text
              style={{
                marginTop: 10,
                alignSelf: 'center',
                position: 'absolute',
                top: '85%',
                alignSelf: 'center',
              }}>
              Finns inte din hyresvärd med?
              <Text style={styles.innerText}> Kontakta oss</Text>
            </Text>
          </LinearGradient>
        </View>
      ) : (
        <View
          style={{
            backgroundColor: 'black',
            height: '100%',
            width: '100%',
            flex: 1,
          }}>
          <LinearGradient
            colors={['#66C2FF', '#3498DB']}
            style={{
              height: '100%',
              width: '100%',
              flex: 1,
            }}>
            <View
              style={{
                position: 'absolute',
                top: normalize(0.07),
                left: normalize(-265),
              }}>
              <BookiCircle4 />
            </View>
            <View
              style={{
                position: 'absolute',
                top: normalize(294.5),
                left: normalize(137.47),
              }}>
              <BookiCircle5 />
            </View>
            <View
              style={{
                position: 'absolute',
                top: normalize(377.58),
                left: normalize(-25.45),
              }}>
              <BookiCircle6 />
            </View>
            <View
              style={{
                position: 'absolute',
                top: normalize(311.07),
                left: normalize(138.16),
              }}>
              <BookiCircle7 />
            </View>
            <View>
              {/*               <LinearGradient
                colors={['#3460DB', '#7ACAFF']}
                style={{
                  height: 324, width: 324, borderRadius: 324, position: 'absolute', left: '-55%'
                }}
                start={{ x: 1, y: 0.5 }}
                end={{ x: 0, y: 0.5 }} />
              <LinearGradient
                colors={['#F6A731', '#8234DB']}
                style={{ height: 204, width: 204, borderRadius: 204, right: '0%', position: 'absolute', top: 356 }}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0.5 }} />
              <LinearGradient
                colors={['#F6A731', '#8234DB']}
                style={{ height: 102, width: 102, borderRadius: 102, position: 'absolute', top: 450, left: 39 }}
                start={{ x: 0.5, y: -0.5 }}
                end={{ x: 1, y: 1 }} /> */}
            </View>
            {/*           <LinearGradient
            colors={['#F6A731', '#8234DB']}
            style={{ height: 204, width: 204, borderRadius: 204, right: '0%', position: 'absolute', top: '50%' }}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0.5 }} />
          <LinearGradient
            colors={['#F6A731', '#8234DB']}
            style={{ height: 102, width: 102, borderRadius: 102, position: 'absolute', top: '50%' }}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0.5 }} /> */}
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  position: 'absolute',
                  top: 213,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Paragraph
                  style={{
                    textAlign: 'center', // <-- the magic
                    fontWeight: 'bold',
                    lineHeight: 100,
                    fontSize: 60,
                    color: 'white',
                  }}>
                  booki
                </Paragraph>
              </View>
            </View>
            <View style={{top: -50}}>
              <View style={{height: 350}}>
                <Searchbar
                  placeholder="Search"
                  onChangeText={(text) => SearchFilterFunction(text)}
                  value={text}
                />

                <FlatList
                  keyExtractor={(item, index) => index.toString()}
                  data={dataSource}
                  renderItem={renderItem}
                />
                <Button
                  style={{backgroundColor: '#3498DB'}}
                  onPress={() => setChooseButton(false)}
                  color="white"
                  mode="contained"
                  labelStyle={{color: 'white', fontSize: 18}}>
                  Avbryt
                </Button>
              </View>
            </View>
          </LinearGradient>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  inearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  baseText: {
    fontWeight: 'bold',
  },
  innerText: {
    color: '#ffffff',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: 24,
    color: '#333',
  },
  text: {
    color: '#4f603c',
    fontSize: 24,
  },
  err: {
    color: 'red',
    fontSize: 30,
    fontWeight: 'bold',
  },
  listView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainContainer: {
    marginTop: 50,

    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  MainContainer1: {
    marginTop: 50,
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  bottomView: {
    width: '100%',
    height: '50%',
    position: 'absolute',
    bottom: 0,
  },
  textStyle: {
    color: '#fff',
    fontSize: 22,
  },
});
