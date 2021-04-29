import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../components/context';

const SettingsScreen = () => {

  const { signOut, toggleTheme } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
      <Button
        title="Log Out"
        onPress={() => { signOut() }}
      />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
