<template>
  <div class="container">
    <h2>Vehículos</h2>
    <div>
      <label for="marca">Marca:</label>
      <select id="marca" v-model="marcaSeleccionada" @change="cargarModelos" class="select">
        <option value="">Selecciona una marca</option>
        <option v-for="marca in marcas" :key="marca.id" :value="marca.id">{{ marca.nombre }}</option>
      </select>
    </div>
    <div>
      <label for="modelo">Modelo:</label>
      <select id="modelo" v-model="modeloSeleccionado" :disabled="!marcaSeleccionada" class="select">
        <option value="" disabled>Selecciona un modelo</option>
        <option v-for="modelo in modelosFiltrados" :key="modelo.id" :value="modelo.id">{{ modelo.modelo }}</option>
      </select>
    </div>
    <div>
      <h3>Vehículos</h3>
      <ul>
        <li v-for="vehiculo in vehiculosFiltrados" :key="vehiculo.id" class="vehiculo">
          <div class="modelo-info">{{ obtenerNombreModelo(vehiculo.idModelo) }} - Precio alquiler: {{ vehiculo.precioDia }}€/día</div>
          <ul>
            <li v-for="cliente in clientesPorVehiculo(vehiculo.id)" :key="cliente.id">{{ cliente.nombre }}</li>
          </ul>
        </li>
      </ul>
    </div>
    <button @click="mostrarNuevoVehiculo" class="button">Nuevo Vehículo</button>
    <div v-if="mostrarFormularioNuevoVehiculo">
      <NuevoVehiculo :marcaSeleccionada="marcaSeleccionada" :modeloSeleccionado="modeloSeleccionado" @cancelar="cancelarNuevoVehiculo" />
    </div>
  </div>
</template>
  
  <script>
  import NuevoVehiculo from './NuevoVehiculo.vue';
  
  export default {
    components: {
      NuevoVehiculo
    },
    data() {
      return {
        marcas: [],
        modelos: [],
        vehiculos: [],
        clientes: [],
        marcaSeleccionada: '',
        modeloSeleccionado: '',
        mostrarFormularioNuevoVehiculo: false
      };
    },
    mounted() {
      this.obtenerMarcas();
      this.obtenerModelos();
      this.obtenerVehiculos();
      this.obtenerClientes();
    },
    computed: {
      modelosFiltrados() {
        return this.modelos.filter(modelo => modelo.idMarca === this.marcaSeleccionada);
      },
      vehiculosFiltrados() {
        if (!this.modeloSeleccionado) {
          if (!this.marcaSeleccionada) {
            return this.vehiculos;
          } else {
            return this.vehiculos.filter(vehiculo => {
              const modelo = this.modelos.find(m => m.id === vehiculo.idModelo);
              return modelo && modelo.idMarca === this.marcaSeleccionada;
            });
          }
        } else {
          return this.vehiculos.filter(vehiculo => vehiculo.idModelo === this.modeloSeleccionado);
        }
      },
    },
    methods: {
      obtenerMarcas() {
        fetch('http://localhost:3000/marcas')
          .then(response => response.json())
          .then(data => {
            this.marcas = data;
          })
          .catch(error => {
            console.error('Error al cargar las marcas:', error);
          });
      },
      obtenerModelos() {
        fetch('http://localhost:3000/modelos')
          .then(response => response.json())
          .then(data => {
            this.modelos = data;
          })
          .catch(error => {
            console.error('Error al cargar los modelos:', error);
          });
      },
      obtenerVehiculos() {
        fetch('http://localhost:3000/vehiculos')
          .then(response => response.json())
          .then(vehiculos => {
            this.vehiculos = vehiculos;
          })
          .catch(error => {
            console.error('Error al cargar los vehículos:', error);
          });
      },
      obtenerClientes() {
        fetch('http://localhost:3000/clientes')
          .then(response => response.json())
          .then(clientes => {
            this.clientes = clientes;
          })
          .catch(error => {
            console.error('Error al cargar los vehículos:', error);
          });
      },
      cargarModelos() {
        if (!this.marcaSeleccionada) {
          fetch('http://localhost:3000/modelos')
            .then(response => response.json())
            .then(data => {
              this.modelos = data;
              this.modeloSeleccionado = '';
              this.obtenerVehiculos();
            })
            .catch(error => {
              console.error('Error al cargar los modelos:', error);
            });
        } else {
          fetch(`http://localhost:3000/modelos?idMarca=${this.marcaSeleccionada}`)
            .then(response => response.json())
            .then(data => {
              this.modelos = data;
              this.modeloSeleccionado = '';
              this.obtenerVehiculos();
            })
            .catch(error => {
              console.error('Error al cargar los modelos:', error);
            });
        }
      },
      clientesPorVehiculo(idVehiculo) {
        return this.clientes.filter(cliente => cliente.alquileres.some(alquiler => alquiler.vehiculo === idVehiculo));
      },
      mostrarNuevoVehiculo() {
        this.mostrarFormularioNuevoVehiculo = true;
      },
      cancelarNuevoVehiculo() {
        this.mostrarFormularioNuevoVehiculo = false;
      },
      obtenerNombreModelo(idModelo) {
        const modelo = this.modelos.find(m => m.id === idModelo);
        return modelo ? modelo.modelo : '';
      }
    }
  };
  </script>
  <style scoped>
.select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px; 
}

.button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 10px; 
}

.button:hover {
  background-color: #0056b3;
}

.vehiculo {
  margin-bottom: 20px; 
}

.modelo-info {
  font-weight: bold;
  margin-bottom: 5px; 
}
</style>
  