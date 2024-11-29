<template>
    <h2>Horas extras realizadas</h2>
    <ul class="listaHoras">
        <li v-for="hora in horas" :key="hora.id">{{ hora.horasRealizadas }} horas extras</li>
    </ul>
</template>

<script setup>
import HorasService from '@/services/HorasService';
import { onMounted } from 'vue';

const service = new HorasService()
const horas = service.getHoras()

onMounted(async () => {
    await service.fetchAll() //Llamo al método fetchAll del servicio para obtener los datos del backend
})
</script>

<style scoped>
.listaHoras{
    width: 20vw;
    height: 75px;
    padding: 20px;
    list-style-type: none;
}

.listaHoras li{
    padding: 10px;
    width: 100%;
    border: 1px solid #ccc;
}
</style>