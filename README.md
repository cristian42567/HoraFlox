# ⏱️ HoraFlox - Registro de Horas Extras

HoraFlox es una aplicación web que permite registrar, visualizar, editar y eliminar horas extras trabajadas. Ideal para llevar un control mensual, semanal o total del tiempo adicional invertido en el trabajo.

---

## 🛠️ Tecnologías utilizadas

### Frontend
- Angular
- HTML + CSS
- TypeScript

### Backend
- Spring Boot
- Java
- MySQL

---

## 🎯 Funcionalidades principales

- 📋 Listado de horas con orden por fecha
- ➕ Añadir nuevas horas extras
- ✏️ Editar registros existentes
- ❌ Eliminar registros con confirmación
- 📊 Visualización agrupada por **mes**, **semana**, **año** o **total**
- 🧮 Cálculo automático del total de horas

---

## 🚀 Instalación y ejecución

### 🧩 Requisitos previos

- Node.js y Angular CLI
- Java 17 o superior
- MySQL
- Maven

---

### 🖥️ Backend - Spring Boot

1. Clona el repositorio backend (o accede a la carpeta si está en monorepo).
2. Configura `application.properties` con tus datos de MySQL.
3. Ejecuta el proyecto con:

```bash
./mvnw spring-boot:run
