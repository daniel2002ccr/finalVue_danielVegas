<template>
  <div class="container">
    <h2>Listado de Marcas</h2>
    <ul>
      <li v-for="marca in marcasOrdenadasPorPrecioMedio" :key="marca.id" @click="mostrarModelos(marca)">
        {{ marca.nombre }} - Precio medio: {{ calcularPrecioMedio(marca.id) }}
      </li>
    </ul>
    <div v-if="marcaSeleccionada">
      <h3>Modelos de {{ marcaSeleccionada.nombre }}</h3>
      <ul>
        <li v-for="modelo in modelosDeMarca" :key="modelo.id">
          {{ modelo.modelo }} - Precio alquiler: {{ precioAlquiler(modelo) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      marcas: [],
      modelos: [],
      vehiculos: [],
      marcaSeleccionada: null
    };
  },
  mounted() {
    this.obtenerDatosMarcas();
    this.obtenerDatosModelos();
    this.obtenerDatosVehiculos();
  },
  computed: {
    marcasOrdenadasPorPrecioMedio() {
      return this.marcas.slice().sort((a, b) => {
        const precioMedioA = this.calcularPrecioMedio(a.id);
        const precioMedioB = this.calcularPrecioMedio(b.id);
        return precioMedioB - precioMedioA;
      });
    },
    modelosDeMarca() {
      return this.modelos.filter(modelo => modelo.idMarca === this.marcaSeleccionada.id);
    }
  },
  methods: {
    obtenerDatosMarcas() {
      fetch('http://localhost:3000/marcas')
        .then(response => response.json())
        .then(data => {
          this.marcas = data;
        })
        .catch(error => {
         
        });
    },
    obtenerDatosModelos() {
      fetch('http://localhost:3000/modelos')
        .then(response => response.json())
        .then(data => {
          this.modelos = data;
        })
        .catch(error => {
          
        });
    },
    obtenerDatosVehiculos() {
      fetch('http://localhost:3000/vehiculos')
        .then(response => response.json())
        .then(data => {
          this.vehiculos = data;
        })
        .catch(error => {
         
        });
    },
    calcularPrecioMedio(idMarca) {
      const modelosDeMarca = this.modelos.filter(modelo => modelo.idMarca === idMarca);
      const vehiculosDeMarca = this.vehiculos.filter(vehiculo => {
        return modelosDeMarca.some(modelo => modelo.id === vehiculo.idModelo);
      });

      if (vehiculosDeMarca.length === 0) return 0;

      const precioTotal = vehiculosDeMarca.reduce((total, vehiculo) => total + vehiculo.precioDia, 0);
      return precioTotal / vehiculosDeMarca.length;
    },
    mostrarModelos(marca) {
      this.marcaSeleccionada = marca;
    },
    precioAlquiler(modelo) {
      if (this.vehiculos.length === 0) return null;

      const vehiculosDeMarca = this.vehiculos.filter(vehiculo => vehiculo.idModelo === modelo.id);
      if (vehiculosDeMarca.length > 0) {
        return vehiculosDeMarca[0].precioDia;
      } else {
        return null;
      }
    }
  }
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
  cursor: pointer;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

li:hover {
  background-color: #ccc;
}

h2, h3 {
  margin-bottom: 20px;
  font-size: 30px;
}

h3 {
  color: #333;
}

</style>