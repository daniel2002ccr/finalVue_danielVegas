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
            {{ vehiculo.modelo }} - Precio: {{ vehiculo.precioTotal }}€.
          </li>
        </ul>
      </div>
    </div>
    <div class="formulario-cliente">
      <h2>Formulario de Cliente</h2>
      <form @submit.prevent="guardarCliente" v-if="!clienteSeleccionado">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="nuevoCliente.nombre" required>
        <label for="dni">DNI:</label>
        <input type="text" id="dni" v-model="nuevoCliente.dni" required>
        <button type="submit" class="alta-btn" :disabled="!nuevoCliente.nombre || !nuevoCliente.dni">Alta</button>
      </form>
      <form @submit.prevent="modificarCliente" v-if="clienteSeleccionado">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="clienteTemporal.nombre" required>
        <label for="dni">DNI:</label>
        <input type="text" id="dni" v-model="clienteTemporal.dni" required>
        <button type="submit" class="modificar-btn">Modificar</button>
        <button type="button" @click="eliminarCliente" class="eliminar-btn">Eliminar</button>
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
      clienteTemporal: null,
      vehiculos: [],
      marcas: [],
      nuevoCliente: {
        nombre: '',
        dni: '',
        alquileres: []
      }
    };
  },
  created() {
    this.obtenerClientes();
    this.obtenerVehiculos();
    this.obtenerModelos();
  },
  methods: {
    mostrarDetallesCliente(cliente) {
      this.clienteSeleccionado = { ...cliente };
      this.clienteTemporal = { ...cliente };
      this.clienteSeleccionado.vehiculosAlquilados = [];

      cliente.alquileres.forEach(alquiler => {
        const vehiculoAlquilado = this.vehiculos.find(vehiculo => vehiculo.id === alquiler.vehiculo);
        if (vehiculoAlquilado) {
          const modeloSeleccionado = this.modelos.find(modelo => modelo.id === vehiculoAlquilado.idModelo);
          if (modeloSeleccionado) {
            vehiculoAlquilado.modelo = modeloSeleccionado.modelo;
            const duracionAlquiler = alquiler.numDias;
            const precioTotal = vehiculoAlquilado.precioDia * duracionAlquiler;
            vehiculoAlquilado.precioTotal = precioTotal;
            this.clienteSeleccionado.vehiculosAlquilados.push(vehiculoAlquilado);
          }
        }
      });
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
    obtenerVehiculos() {
      fetch('http://localhost:3000/vehiculos')
        .then(response => response.json())
        .then(data => {
          this.vehiculos = data;
        })
        .catch(error => {
          console.error('Error al cargar los vehículos:', error);
        });
    },
    obtenerModelos() {
      fetch('http://localhost:3000/modelos')
        .then(response => response.json())
        .then(data => {
          this.modelos = data;
        })
        .catch(error => {
          console.error('Error al cargar las marcas:', error);
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
        body: JSON.stringify(this.clienteTemporal)
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
  display: grid;
  grid-template-columns: repeat(2, 1fr) auto;
  gap: 20px;
  align-items: start;
}

.clientes-lista {
  grid-column: 1;
}

ul {
  list-style: none;
}

.detalle-cliente {
  grid-column: 2;
}

.formulario-cliente {
  grid-column: 1 / -1;
}
</style>
