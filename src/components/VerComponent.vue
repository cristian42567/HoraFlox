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
</template>

<script setup>
import HorasService from '@/services/HorasService';
import { onMounted } from 'vue';

const service = new HorasService()
const horas = service.getHoras()

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
})
</script>

<style scoped>
h2 {
    color: #ffffff;
    font-size: 3rem;
    text-align: center;
    margin-top: 60px;
}

.tabla {
    width: 400px;
    max-width: 90%;
    border-collapse: collapse;
    background-color: #ffffff;
    border-radius: 20px;
    overflow: hidden;
    margin: 80px auto;
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
</style>