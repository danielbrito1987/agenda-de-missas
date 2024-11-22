import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { fetchParoquias } from "../services/paroquia-service";
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();

    const [paroquias, setParoquias] = useState([]);
    const [loading, setLoading] = useState(true);

    const handlePress = (paroquiaId) => {
        console.log('Navigating to Agenda with:', paroquiaId);
        navigation.navigate('AgendaPage', { paroquiaId: paroquiaId });
    };

    useEffect(() => {
        const loadParoquias = async () => {
            try {
                const data = await fetchParoquias();
                setParoquias(data);
            } catch (error) {
                console.error("Erro ao carregar paróquias:", error);
            } finally {
                setLoading(false);
            }
        };

        loadParoquias();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {paroquias.length === 0 ? (
                <Text>Sem dados disponíveis</Text>
            ) : (
                <FlatList
                    data={paroquias}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handlePress(item.id)}>
                            <Text style={styles.item}>{item.nome}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

export default HomeScreen;