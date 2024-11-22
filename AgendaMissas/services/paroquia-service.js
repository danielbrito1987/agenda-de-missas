import { collection, getDocs } from "firebase/firestore";
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

export { fetchParoquias };