import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { fetchAgendaProquia } from '../services/paroquia-service';
import { LocaleConfig, Agenda } from 'react-native-calendars';

const AgendaScreen = ({ route }) => {
    console.log('Received params:', route.params);

    LocaleConfig.locales['pt-br'] = {
        monthNames: [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ],
        monthNamesShort: [
            'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
            'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
        ],
        dayNames: [
            'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
            'Quinta-feira', 'Sexta-feira', 'Sábado'
        ],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        today: 'Hoje'
    };
    LocaleConfig.defaultLocale = 'pt-br';

    const { paroquiaId } = route.params;
    const [agenda, setAgenda] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAgenda = async () => {
            try {
                const data = await fetchAgendaProquia(paroquiaId);
                setAgenda(data);
            } catch (error) {
                console.error("Erro ao carregar a agenda da paróquia:", error);
            } finally {
                setLoading(false);
            }
        };

        console.log(agenda);

        loadAgenda();
    }, [paroquiaId]);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Carregando a agenda...</Text>
            </View>
        );
    }

    return (
        <Agenda
            items={agenda}
            renderItem={(item) => (
                <View style={styles.item}>
                    <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                    <Text>{item.time}</Text>
                </View>
            )}
            renderEmptyDate={() => (
                <View style={styles.item}>
                    <Text>Sem missas para esta data</Text>
                </View>
            )}
            showOnlyDay={true}
            showOnlySelectedDayItems={true}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    emptyDate: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
});

export default AgendaScreen;