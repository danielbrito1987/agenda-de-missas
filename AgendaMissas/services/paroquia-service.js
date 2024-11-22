import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const fetchParoquias = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "paroquia"));
        const paroquias = [];
        querySnapshot.forEach((doc) => {
            paroquias.push({ id: doc.id, ...doc.data() });
        });
        return paroquias;
    } catch (error) {
        console.error("Erro ao buscar paróquias:", error);
        throw error;
    }
};

const fetchAgendaProquia = async (paroquiaId) => {
    try {
        const agendaRef = collection(db, `paroquia/${paroquiaId}/agenda`);
        const agendaSnapshot = await getDocs(agendaRef);
        const items = {};

        agendaSnapshot.forEach((doc) => {
            const data = doc.data();
            const date = data.data.toDate().toISOString().split('T')[0];

            if (!items[date]) {
                items[date] = [];
            }

            items[date].push({
                name: `${data.comunidade}`,
                time: parseInt(data.hora.split(':')[0]) < 12 ? `${data.hora} AM` : `${data.hora} PM`
            });
        });

        return items;
    } catch (error) {
        console.error("Erro ao buscar a agenda da paróquia:", error);
        throw error;
    }
}

function formatToISODate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export { fetchParoquias, fetchAgendaProquia };