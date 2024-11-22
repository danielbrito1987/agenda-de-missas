import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { db } from '../firebaseConfig';

const AgendaScreen = ({ route }) => {
    console.log('Received params:', route.params);

    const { paroquiaId } = route.params;
    const [agenda, setAgenda] = useState([]);

    useEffect(() => {
        db.collection('paroquia')
            .doc(paroquiaId)
            .collection('agenda')
            .onSnapshot((snapshot) => {
                const data = snapshot.docs.map(doc => doc.data());
                setAgenda(data);
            });
    }, [paroquiaId]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                {agenda.map((evento, index) => (
                    <Text key={index}>{evento.dia} - {evento.horario} - {evento.descricao}</Text>
                ))}
            </View>
        </SafeAreaView>
    );
};

export default AgendaScreen;