<template>
    <h2>Horas extras realizadas</h2>
    <!-- Iterar por cada mes -->
    <div v-for="(horasPorMes, mes) in horasPorMesesOrdenados" :key="mes">
        <h3>{{ formatMes(mes) }}</h3>
        <table class="tabla">
            <thead>
                <tr>
                    <th>Horas</th>
                    <th>Fecha</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="hora in horasPorMes" :key="hora.id">
                    <td>{{ hora.horasRealizadas }}</td>
                    <td>{{ formatFecha(hora.fecha) }}</td>
                </tr>
            </tbody>
        </table>
        <div class="total-horas">
            <p>En {{ formatMes(mes) }} has hecho: {{ calcularTotalMes(horasPorMes) }} horas extras.</p>
        </div>
        <hr>
    </div>
</template>

<script setup>
import HorasService from '@/services/HorasService';
import { computed, onMounted } from 'vue';

const service = new HorasService();
const horas = service.getHoras();

// Agrupar las horas por mes (Año-Mes)
const horasPorMeses = computed(() => {
    const agrupado = {};

    horas.value.forEach((hora) => {
        const fecha = new Date(hora.fecha);
        const mes = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`; // Año-Mes

        if (!agrupado[mes]) {
            agrupado[mes] = [];
        }
        agrupado[mes].push(hora);
    });

    return agrupado;
});

// Ordenar los meses de forma descendente (el más reciente primero)
const horasPorMesesOrdenados = computed(() => {
    const entries = Object.entries(horasPorMeses.value);
    // Ordenar por fecha de forma descendente (el mes más reciente primero)
    entries.sort(([mesA], [mesB]) => new Date(mesB) - new Date(mesA));
    return Object.fromEntries(entries);
});

// Calcular el total de horas por mes
const calcularTotalMes = (horasMes) => {
    return horasMes.reduce((sum, hora) => sum + Number(hora.horasRealizadas), 0);
};

// Formatear el mes para mostrar en formato legible (por ejemplo, "Diciembre 2024")
const formatMes = (mes) => {
    const [anio, mesNum] = mes.split('-');
    const fecha = new Date(anio, mesNum - 1);
    const nombreMes = fecha.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
    return nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1);
};

// Formatear la fecha en formato legible (por ejemplo, "dd/mm/yyyy")
const formatFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

// Llamada al backend para obtener los datos
onMounted(async () => {
    await service.fetchAll();
});
</script>

<style scoped>
h2 {
    color: #ffffff;
    font-size: 3rem;
    text-align: center;
    margin-top: 30px;
}

h3 {
    display: flex;
    align-items: center;
    justify-content: center;
}

.tabla {
    width: 400px;
    max-width: 90%;
    border-collapse: collapse;
    background-color: #ffffff;
    border-radius: 20px;
    overflow: hidden;
    margin: 20px auto;
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

.tabla th,
.tabla td {
    text-align: center;
}

.tabla tbody tr {
    transition: background-color 0.2s ease;
}

.total-horas {
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    margin-top: -40px;
}

.total-horas p {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    background-color: #494a4b;
    padding: 20px 0px;
    border-radius: 15px;
    width: 400px;
    max-width: 90%;
    color: #fff;
    font-size: 1rem;
}

hr {
    border: 0;
    width: 450px;
    max-width: 90%;
    height: 1px;
    background-color: #695c5c;
    /* Color de la línea */
    margin: 20px auto;
    /* Espaciado alrededor de la línea */
}
</style>
