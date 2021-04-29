import React, {useEffect} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import BookingHistory from './BookingHistory';
import ProfileScreen from './ProfileScreen';
import {Image, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import BookingConfirmedScreen from './BookingConfirmedScreen';
import BookingShowQR from './BookingShowQR';
import BookingScreen from './BookingScreen';
import ChangePassword from '../components/ChangePassword';

import {getColors} from '../core/theme';
import {colors} from 'react-native-elements';
import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native';
const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Home = () => {
  return <HomeScreen />;
};
const Bookings = () => {
  return <BookingHistory />;
};
/* const QRCodeStack = createStackNavigator();
 */
const Tab = createBottomTabNavigator();
function ActionBarIcon() {
  return (
    <Image
      source={require('../../assets/Diös.png')}
      style={{
        width: 100,
        height: 70,
        margin: 50,
      }}
    />
  );
}
function MainTabScreen({navigation, route}) {
  /*   const { colors } = useTheme();
   */ const [colors, setColors] = React.useState([]);

  const getColors1 = async () => {
    const colors = await getColors();
    setColors(colors);
  };
  useEffect(() => {
    getColors1();
  }, []);
  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: '#121212'}}
      initialRouteName="Home"
      tabBar={(props) => <MyTabBar {...props} />}
      tabBarOptions={{
        showLabel: false,
        keyboardHidesTabBar: true,
        activeTintColor: 'white',
        inactiveTintColor: '#6fb6ae',
        style: {
          /*           height: '15%',
           */ backgroundColor: colors.tabBarColor,
        },
      }}>
      <Tab.Screen
        name="Bokningar"
        component={BookingHistoryStackScreen}
        options={{
          unmountOnBlur: true,
          /*           tabBarVisible: false,
           */ tabBarLabel: 'Updates',
          tabBarColor: colors.tabBarColor,
          tabBarIcon: ({color, tintColor, focused, size}) => (
            <View>
              <Icon
                name={focused ? 'receipt' : 'receipt-outline'}
                color={focused ? '#05526D' : '#ffffff'}
                size={size}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          unmountOnBlur: true,

          activeColor: '#009310',
          tabBarLabel: 'Home',
          tabBarColor: colors.tabBarColor,
          tabBarIcon: ({color, tintColor, focused, size}) => (
            <Icon
              name={focused ? 'calendar' : 'calendar-outline'}
              color={focused ? '#05526D' : '#ffffff'}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          unmountOnBlur: true,

          tabBarLabel: 'Profil',
          tabBarColor: colors.tabBarColor,
          tabBarIcon: ({color, tintColor, focused, size}) => (
            <Icon
              name={focused ? 'person' : 'person-outline'}
              color={focused ? '#05526D' : '#ffffff'}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabScreen;
const setTabBarVisible = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  const hideOnScreens = ['EditProfile'];
  if (hideOnScreens.indexOf(routeName) > -1) return false;
  return true;
};
function HomeStackScreen({navigation, route}) {
  const {colors} = useTheme();

  return (
    <HomeStack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: '#121212'},
        cardOverlay: () => {
          <View
            style={{
              flex: 1,
              backgroundColor: colors.background,
            }}
          />;
        },
        tabBarColor: colors.tabBarColor,
        headerStyle: {
          backgroundColor: colors.tabBarColor,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          tabBarColor: colors.tabBarColor,
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      />
      <HomeStack.Screen
        name="BookingScreen"
        component={BookingScreen}
        options={{
          tabBarColor: '#009310',

          headerShown: false,
          // headerBackTitleVisible: true,
          // title: 'Sauna',
        }}
      />
      <HomeStack.Screen
        name="BookingConfirmed"
        component={BookingConfirmedScreen}
        options={{
          tabBarColor: colors.primary,

          headerTitleStyle: {alignSelf: 'center'},
          headerStyle: {
            backgroundColor: 'white',
          },
          headerShown: false,
          // headerBackTitleVisible: true,
          // title: 'Sauna',
          headerRight: (props) => <ActionBarIcon {...props} />,
        }}
      />
    </HomeStack.Navigator>
  );
}
function BookingHistoryStackScreen({navigation, route}) {
  return (
    <DetailsStack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: colors.background},

        cardOverlay: () => {
          <View
            style={{
              flex: 1,
              backgroundColor: colors.background,
            }}
          />;
        },
        headerStyle: {
          backgroundColor: '#1f65ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <DetailsStack.Screen
        name="BookingHistory"
        component={Bookings}
        options={{
          headerShown: false,
          /*           tabBarVisible: false,
           */ headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#1f65ff"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
      <DetailsStack.Screen
        name="BookingShowQR"
        component={BookingShowQR}
        options={{
          headerShown: false,
        }}
      />
    </DetailsStack.Navigator>
  );
}
function ProfileStackScreen({navigation, route}) {
  const [colors, setColors] = React.useState([]);

  const getColors1 = async () => {
    const colors = await getColors();
    setColors(colors);
  };
  useEffect(() => {
    getColors1();
  }, []);
  return (
    <ProfileStack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: colors.background},

        cardOverlay: () => {
          <View
            style={{
              flex: 1,
              backgroundColor: colors.background,
            }}
          />;
        },
        headerStyle: {
          backgroundColor: '#1f65ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          /*           tabBarVisible: false,
           */ headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#1f65ff"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
      <ProfileStack.Screen
        options={{
          headerTitle: 'Byt Pin-Kod',
          headerStyle: {
            backgroundColor: colors.tabBarColor,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name="ChangePassword"
        component={ChangePassword}
      />
    </ProfileStack.Navigator>
  );
}
function MyTabBar({tabs, state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const [colors, setColors] = React.useState([]);

  const getColors1 = async () => {
    const colors = await getColors();
    setColors(colors);
  };
  useEffect(() => {
    getColors1();
    setInterval(() => {
      getColors1();
    }, 500);
  }, []);

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        let iconName;
        let unfocused;
        switch (route.name) {
          case 'Bokningar':
            iconName = 'receipt';
            unfocused = 'receipt-outline';
            break;
          case 'Home':
            iconName = 'calendar';
            unfocused = 'calendar-outline';
            break;
          case 'Profile':
            iconName = 'person';
            unfocused = 'person-outline';
          default:
            break;
        }
        return (
          <TouchableOpacity
          key={route.name}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              height: 62,
              flex: 1,
              backgroundColor: colors.tabBarColor,
              justifyContent: 'center',
              alignItems: 'center',
              borderRightWidth: route.name === 'Profile' ? null : 2,
              borderRightColor: route.name === 'Profile' ? null : 'white',
            }}>
            <Icon
              name={isFocused ? iconName : unfocused}
              size={28}
              color={isFocused ? colors.primary : colors.disabled}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
