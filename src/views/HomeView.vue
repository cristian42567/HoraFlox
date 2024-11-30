<template>
  <header>
    <h1>HoraFlox</h1>
  </header>
  <div class="contenedor">
    <main>
      <p class="parrafo">Bienvenid@s a la mejor aplicación de registros de horas extras. Registra y consulta tus horas rápidamente.</p>
      <nav class="botones">
        <button>Registrar horas</button>
        <button class="boton2">Ver registro de horas</button>
      </nav>
    </main>
    <footer>
      <p>© 2024 Cristian, Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<script setup>

</script>

<style scoped>
h1 {
  display: flex;
  justify-content: center;
  margin-top: 80px;
  font-size: 4rem;
  font-weight: 600;
  color: #FFFFFF;

}

.contenedor{

  width: 440px;
  margin: auto;
}

.parrafo{

  display: flex;
  background-color: #F1F0E8;
  padding: 15px;
  border-radius: 10px;
  font-weight: 500;
  margin-top: 70px;
  font-size: 1.2rem;
}

.botones button{
  width:100%;
  border: none;
  font-weight: 500;
  font-size: 1.2rem;
  background-color: #F1F0E8;
  border-radius: 10px;
  height: 70px;
}

.botones button:hover{
  cursor: pointer;
  background-color: #E5E1DA;
}

.boton2{
  margin-top: 20px;
}
</style>