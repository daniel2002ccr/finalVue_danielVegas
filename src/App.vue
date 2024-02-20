<template>
  <nav>
    <router-link to="/">Inicio</router-link> 
    <router-link to="/marcas">Marcas</router-link> 
    <router-link to="/nuevamarca">Nueva marca</router-link> 
    <router-link to="/modelos">Modelos</router-link> 
    <router-link to="/nuevomodelo">Nuevo Modelo</router-link> 
    <router-link to="/vehiculo">Vehículos</router-link> 
    <router-link to="/nuevovehiculo">Nuevo Vehículo</router-link> 
    <router-link to="/alquiler">Alquiler</router-link> 
    <router-link to="/cliente">Clientes</router-link>
  </nav>
  <router-view />
</template>

<style>

body{
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: rgb(222, 226, 219);
  width: 9%;
  float: left;
}

nav a {
  padding: 20px;
  text-decoration: none;
  color: green;
  font-weight: bolder;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>
