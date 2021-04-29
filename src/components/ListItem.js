import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, } from 'react-native';
import { Button, Card, Paragraph, Snackbar } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import dayjs from 'dayjs';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { normalize } from '../core/size';
import { useTheme } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import NotifService from '../core/NotifService';
import { getColors } from '../core/theme';
import axios from 'axios';

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

    }
});

export default function ListItem(props) {
    const [isVisible, setIsVisible] = useState(false);
    const [visible, setVisible] = React.useState(false);

    const onToggleSnackBar = () => setVisible(!visible);
    const [colors, setColors] = useState([])
    const getColors1 = async () => {
        const colors1 = await getColors();
        setColors(colors1)
    };
    useEffect(() => {
        getColors1()
    }, [])
    const navigation = useNavigation();
    const notif = useRef(new NotifService(onRegister, onNotif));
    const onNotif = (notif) => {
        Alert.alert(notif.title, notif.message);
    };
    const onRegister = (token) => {
        setRegisterToken(token.token);
        setFcmRegistered(true);
    };
    const onSetReminder = (datetime) => {
        const {
            date,
            apartment,
            building,
            start_time: startTime,
            end_time: endTime,
        } = props;
        const remindDate = dayjs(datetime).format('YYYY-MM-DD');
        const remindTime = dayjs(datetime).format('hh:mm');
        let title = 'Reminder!';
        let message = `You have booked ${apartment} ${building} on ${dayjs(
            date,
        ).format('YYYY-MM-DD')} at ${startTime} - ${endTime}`;
        let date1 = datetime;
        notif.current.scheduleNotif(title, message, date1);
        onToggleSnackBar();
    };

    const toggleDatePicker = () => {
        setIsVisible(!isVisible);
    };

    const getLabelColor = (date) => {
        if (isToday(date)) {
            return colors.bookingIsToday;
        }

        if (isPast(date)) {
            return colors.bookingIsPast;
        }

        return colors.bookingIsFuture;
    };

    const isToday = (date) =>
        dayjs(date, 'YYYY-MM-DD').isSame(dayjs().format('YYYY-MM-DD'));

    const isPast = (date) =>
        dayjs(date, 'YYYY-MM-DD').isBefore(dayjs().format('YYYY-MM-DD'));

    const isFuture = (date) =>
        dayjs(date, 'YYYY-MM-DD').isAfter(dayjs().format('YYYY-MM-DD'));
    const goToBookingShowQR = (props) => {
        navigation.navigate('BookingShowQR', { value: props });

    };
    console.log(props);
    const deleteBooking = async (props) => {
        let id = props
        try {
            const resp = await axios.delete(`http://192.168.0.49:8081/api/bookings/removeSpecificBooking/${id}`)
            console.log(resp.data);
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    }
    return (
        <TouchableOpacity
            disabled={isPast(props.date)}
            onPress={() => {
                goToBookingShowQR(props);
            }}>
            <Card style={[{ backgroundColor: colors.card }, styles.card, isPast(props.date) ? styles.overlay : null]}>
                <View style={styles.inner}>
                    <View
                        style={[styles.code, { backgroundColor: getLabelColor(props.date) }]}
                    />
                    <View style={styles.innerContent}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <Paragraph style={[styles.title, { color: colors.text }]}>{props.id}</Paragraph>
                            <Paragraph style={[styles.title, { color: colors.text }]}>{props.building}, {props.rid}</Paragraph>
                        </View>
                        <View style={styles.card}>
                            <View style={{ flex: 1, flexDirection: 'column' }}>

                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                            }}>
                            <Paragraph style={{ color: colors.text }}>
                                {dayjs(props.date).format('YYYY-MM-DD')}
                            </Paragraph>
                            <Paragraph
                                style={{
                                    color: colors.text, marginLeft: 4
                                }}>{`${props.start_time} - ${props.end_time}`}</Paragraph>

                            {isPast(props.date) ? null : <></>}
                        </View>
                        {isPast(props.date) ? null : (
                            <View
                                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity
                                    style={{
                                        height: normalize(30),
                                        borderRadius: 4,
                                        alignSelf: 'flex-start',
                                    }}
                                    onPress={toggleDatePicker}>
                                    <Paragraph style={{ color: colors.text }}>Sätt påminnelse</Paragraph>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => { deleteBooking(props.id) }}
                                    style={{
                                        width: normalize(60),
                                        height: normalize(30),
                                        borderRadius: 4,
                                        backgroundColor: 'red',
                                        alignSelf: 'flex-end',
                                    }}>
                                    <Paragraph style={{ alignSelf: 'center', color: 'white' }}>
                                        Avbryt
                  </Paragraph>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                    <View style={styles.qr}>
                        <QRCode value={props.QR_Code} size={normalize(60)} />
                    </View>
                </View>
                <DateTimePickerModal
                    isVisible={isVisible}
                    mode="datetime"
                    onConfirm={onSetReminder}
                    onCancel={toggleDatePicker}
                />
            </Card>
        </TouchableOpacity>
    );
}
