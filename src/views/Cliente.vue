<template>
    <div class="container">
      <div class="clientes-lista">
        <h2>Listado de Clientes</h2>
        <ul>
          <li v-for="cliente in clientes" :key="cliente.id" @click="mostrarDetallesCliente(cliente)">
            {{ cliente.nombre }}
          </li>
        </ul>
      </div>
      <div class="detalle-cliente">
        <h2>Detalles del Cliente</h2>
        <div v-if="clienteSeleccionado">
          <p>Nombre: {{ clienteSeleccionado.nombre }}</p>
          <p>DNI: {{ clienteSeleccionado.dni }}</p>
          <h3>Vehículos Alquilados</h3>
          <ul>
            <li v-for="vehiculo in clienteSeleccionado.vehiculosAlquilados" :key="vehiculo.id">
              {{ vehiculo.marca }} - {{ vehiculo.modelo }} - Precio: {{ vehiculo.precio }}
            </li>
          </ul>
        </div>
      </div>
      <div class="formulario-cliente">
        <h2>Formulario de Cliente</h2>
        <form @submit.prevent="guardarCliente">
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" v-model="nuevoCliente.nombre" required>
          <label for="dni">DNI:</label>
          <input type="text" id="dni" v-model="nuevoCliente.dni" required>
          <button type="submit" :disabled="!nuevoCliente.nombre || !nuevoCliente.dni">Guardar Cliente</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        clientes: [], 
        clienteSeleccionado: null, 
        nuevoCliente: { nombre: '', dni: '' } 
      };
    },
    methods: {
      mostrarDetallesCliente(cliente) {
        this.clienteSeleccionado = cliente;
      },

      guardarCliente() {

      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    justify-content: space-between;
  }
  .clientes-lista,
  .detalle-cliente,
  .formulario-cliente {
    width: 30%;
  }
  </style>
  