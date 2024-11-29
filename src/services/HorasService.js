import { ref } from "vue"
import axios from "axios"

class HorasService {
    constructor() {
        this.horas = ref([])
    }

    getHoras() {
        return this.horas //Retorna una referencia para poder usarla con otros componentes
    }

    async fetchAll() {
        try {
            const response = await axios.get('http://localhost:4000/horas'); //Solicitud al backend
            this.horas.value = response.data;
        } catch (error) {
            console.log(error) 
        }
    }
}

export default HorasService