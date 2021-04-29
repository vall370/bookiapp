import PushNotification from 'react-native-push-notification';

export const scheduleNotification = (title, message, date) => {
  PushNotification.localNotificationSchedule({
    title,
    message,
    date,
  });
};
