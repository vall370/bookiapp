/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 import React, {useEffect} from 'react';
 import {View, ActivityIndicator} from 'react-native';
 import Toast from 'react-native-toast-message';
 import {theme} from './src/core/theme';
 
 import {
   NavigationContainer,
   DefaultTheme as NavigationDefaultTheme,
   DarkTheme as NavigationDarkTheme,
 } from '@react-navigation/native';
 
 import {
   Provider as PaperProvider,
   DefaultTheme as PaperDefaultTheme,
   DarkTheme as PaperDarkTheme,
 } from 'react-native-paper';
 
 import AsyncStorage from '@react-native-community/async-storage';
 import RootStackScreen from './src/screens/RootStackScreen';
 import MainTabScreen from './src/screens/MainTabScreen';
 import {AuthContext} from './src/components/context';
 import { NativeModules } from 'react-native';
 import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
 
 const App = () => {
   // const [isLoading, setIsLoading] = React.useState(true);
   // const [userToken, setUserToken] = React.useState(null);
 
   const deviceLanguage =
   Platform.OS === 'ios'
     ? NativeModules.SettingsManager.settings.AppleLocale ||
       NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
     : NativeModules.I18nManager.localeIdentifier;
 
 console.log(deviceLanguage); //en_US
   const [isDarkTheme, setIsDarkTheme] = React.useState(false);
   const darkmode = async () => {
     try {
       let darkmode = await AsyncStorage.getItem('darkmode')
       if (darkmode != null){
         console.log('do nothin')
       } else{
         console.log('do somethin')
         await AsyncStorage.setItem('darkmode', JSON.stringify(false))
       }
     } catch (e) {
     }
   };
   useEffect(() => {
     darkmode();
   }, []);
   const initialLoginState = {
     isLoading: true,
     userName: null,
     userToken: null,
   };
 
   const loginReducer = (prevState, action) => {
     switch (action.type) {
       case 'RETRIEVE_TOKEN':
         return {
           ...prevState,
           userToken: action.token,
           isLoading: false,
         };
       case 'LOGIN':
         return {
           ...prevState,
           userName: action.id,
           userToken: action.token,
           isLoading: false,
         };
       case 'LOGOUT':
         return {
           ...prevState,
           userName: null,
           userToken: null,
           isLoading: false,
         };
       case 'REGISTER':
         return {
           ...prevState,
           userName: action.id,
           userToken: action.token,
           isLoading: false,
         };
     }
   };
 
   const [loginState, dispatch] = React.useReducer(
     loginReducer,
     initialLoginState,
   );
 
   const authContext = React.useMemo(
     () => ({
       signIn: async (foundUser) => {
         // setUserToken('fgkj');
         // setIsLoading(false);
         const userToken = String(foundUser.jwt);
         const userName = foundUser.apartment;
         try {
           await AsyncStorage.setItem('userToken', userToken);
         } catch (e) {
         }
         // //console.log('user token: ', userToken);
         dispatch({type: 'LOGIN', id: userName, token: userToken});
       },
       signOut: async () => {
         // setUserToken(null);
         // setIsLoading(false);
         try {
           await AsyncStorage.removeItem('userToken');
         } catch (e) {
         }
         dispatch({type: 'LOGOUT'});
       },
       signUp: () => {
         // setUserToken('fgkj');
         // setIsLoading(false);
       },
       toggleTheme: () => {
         setIsDarkTheme((isDarkTheme) => !isDarkTheme);
       },
     }),
     [],
   );
 
   useEffect(() => {
     setTimeout(async () => {
       // setIsLoading(false);
       let userToken;
       userToken = null;
       try {
         userToken = await AsyncStorage.getItem('userToken');
       } catch (e) {
       }
       // //console.log('user token: ', userToken);
       dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
     }, 1000);
   }, []);
 
   if (loginState.isLoading) {
     return (
       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
         <ActivityIndicator size="large" />
       </View>
     );
   }
   return (
     <PaperProvider settings={{icon: props => <Icon {...props} />}} theme={theme}>
       <Toast ref={(ref) => Toast.setRef(ref)} />
 
       <AuthContext.Provider value={authContext}>
         <NavigationContainer theme={theme}>
           {loginState.userToken !== null ? (
             <MainTabScreen />
           ) : (
             <RootStackScreen />
           )}
         </NavigationContainer>
       </AuthContext.Provider>
     </PaperProvider>
   );
 };
 
 export default App;
 