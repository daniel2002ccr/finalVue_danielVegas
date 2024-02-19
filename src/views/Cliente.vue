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
        <div>
          <button @click="modificarCliente" :disabled="!clienteSeleccionado">Modificar</button>
          <button @click="eliminarCliente" :disabled="!clienteSeleccionado">Eliminar</button>
        </div>
      </div>
    </div>
    <div class="formulario-cliente">
      <h2>Formulario de Cliente</h2>
      <form @submit.prevent="guardarCliente" v-if="!clienteSeleccionado">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="nuevoCliente.nombre" required>
        <label for="dni">DNI:</label>
        <input type="text" id="dni" v-model="nuevoCliente.dni" required>
        <button type="submit">Alta</button>
      </form>
      <form @submit.prevent="modificarCliente" v-if="clienteSeleccionado">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="clienteSeleccionado.nombre" required>
        <label for="dni">DNI:</label>
        <input type="text" id="dni" v-model="clienteSeleccionado.dni" required>
        <button type="submit">Modificar</button>
        <button type="button" @click="eliminarCliente">Eliminar</button>
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
      nuevoCliente: {
        nombre: '',
        dni: '',
        alquileres: []
      }
    };
  },
  created() {
    this.obtenerClientes();
  },
  methods: {
    mostrarDetallesCliente(cliente) {
      this.clienteSeleccionado = cliente;
    },
    obtenerClientes() {
      fetch('http://localhost:3000/clientes')
        .then(response => response.json())
        .then(data => {
          this.clientes = data;
        })
        .catch(error => {
          console.error('Error al cargar los clientes:', error);
        });
    },
    guardarCliente() {
      fetch('http://localhost:3000/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.nuevoCliente)
      })
        .then(response => response.json())
        .then(data => {
          console.log('Cliente guardado:', data);
          this.obtenerClientes();
          this.limpiarFormulario();
        })
        .catch(error => {
          console.error('Error al guardar el cliente:', error);
        });
    },
    modificarCliente() {
      fetch(`http://localhost:3000/clientes/${this.clienteSeleccionado.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.clienteSeleccionado)
      })
        .then(response => response.json())
        .then(data => {
          console.log('Cliente modificado:', data);
          this.obtenerClientes();
          this.clienteSeleccionado = null;
        })
        .catch(error => {
          console.error('Error al modificar el cliente:', error);
        });
    },
    eliminarCliente() {
      fetch(`http://localhost:3000/clientes/${this.clienteSeleccionado.id}`, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(data => {
          console.log('Cliente eliminado:', data);
          this.obtenerClientes();
          this.clienteSeleccionado = null;
        })
        .catch(error => {
          console.error('Error al eliminar el cliente:', error);
        });
    },
    limpiarFormulario() {
      this.nuevoCliente.nombre = '';
      this.nuevoCliente.dni = '';
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
