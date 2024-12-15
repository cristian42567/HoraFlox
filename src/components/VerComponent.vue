<template>

    <h2>Horas extras realizadas</h2>
    <table class="tabla">
        <thead>
            <tr>
                <th>Horas</th>
                <th>Fecha</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="hora in horas" :key="hora.id">
                <td>{{ hora.horasRealizadas }}</td>
                <td>{{ formatFecha(hora.fecha) }}</td>
            </tr>
        </tbody>
    </table>
    <div class="total-horas">
        <p>El total es de {{ totalHoras }} horas extras</p>
    </div>
</template>

<script setup>
import HorasService from '@/services/HorasService';
import { computed, onMounted } from 'vue';

const service = new HorasService();
const horas = service.getHoras();

const totalHoras = computed(()=> {
    return horas.value.reduce((sum, hora) => sum + Number(hora.horasRealizadas), 0)
});

// Formatear la fecha en formato legible (por ejemplo, "dd/mm/yyyy")
const formatFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

onMounted(async () => {
    await service.fetchAll() //Llamo al método fetchAll del servicio para obtener los datos del backend
});
</script>

<style scoped>
h2 {
    color: #ffffff;
    font-size: 3rem;
    text-align: center;
    margin-top: 30px;
}

.tabla {
    width: 400px;
    max-width: 90%;
    border-collapse: collapse;
    background-color: #ffffff;
    border-radius: 20px;
    overflow: hidden;
    margin: 50px auto;
}

.tabla thead th {
    background-color: #343a40;
    color: #ffffff;
    font-weight: bold;
    padding: 12px;
    text-transform: uppercase;
    font-size: 0.9rem;
}

.tabla td {
    padding: 10px;
    border-bottom: 1px solid #dddddd;
    font-size: 1rem;
}

.tabla tbody tr:hover {
    background-color: #f1f1f1;
}

.tabla th, .tabla td {
    text-align: center;
}

.tabla tbody tr {
    transition: background-color 0.2s ease;
}

.navegacion{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    font-size: 1rem;
}

.navegacion button{
    border: none;
    font-size: 1rem;
    background-color: #343a40;
    color: white;
    padding: 6px 10px;
    border-radius: 10px;
    cursor: pointer;
}

.navegacion button:hover{
    background-color: #494a4b;
}

.total-horas{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -40px;
}

.total-horas p{
    display: flex;
    justify-content: center;
    background-color: #494a4b;
    padding: 20px 0px;
    border-radius: 15px;
    width: 400px;
    max-width: 90%;
    color: #fff;
    font-size: 1.1rem;
}
</style>