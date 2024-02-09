<template>
    <div>
      <h2>Marcas disponibles</h2>
      <ul>
        <li v-for="marca in marcasOrdenadas" :key="marca.id" @click="mostrarModelos(marca.id)">
          {{ marca.nombre }} - Precio medio: {{ marca.precioMedio }}
        </li>
      </ul>

      <div v-if="marcaSeleccionada !== null">
        <h3>Modelos de {{ marcaSeleccionada.nombre }}</h3>
        <ul>
          <li v-for="modelo in modelosMarcaSeleccionada" :key="modelo.id">
            {{ modelo.modelo }} - Precio de alquiler por día: {{ modelo.precioDia }}
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
        clientes: [],
        marcaSeleccionada: null
      };
    },
    computed: {
      marcasOrdenadas() {
        return this.marcas.map(marca => {
          const modelosMarca = this.modelos.filter(modelo => modelo.idMarca === marca.id);
          const precioMedio = modelosMarca.reduce((acc, modelo) => acc + modelo.precioDia, 0) / modelosMarca.length;
          return { ...marca, precioMedio };
        }).sort((a, b) => b.precioMedio - a.precioMedio);
      },
      modelosMarcaSeleccionada() {
        if (this.marcaSeleccionada === null) return [];
        return this.modelos.filter(modelo => modelo.idMarca === this.marcaSeleccionada.id);
      }
    },
    methods: {
      mostrarModelos(idMarca) {
        this.marcaSeleccionada = this.marcas.find(marca => marca.id === idMarca);
      }
    },
    mounted() {
        fetch('C:\Users\alumnofp\Desktop\finalVue_danielVegas\finalvue_danielvegas\src\bbdd.json')
      .then(response => response.json())
      .then(data => {
        this.marcas = data.marcas;
        this.modelos = data.modelos;
        this.vehiculos = data.vehiculos;
        this.clientes = data.clientes;
      })
      .catch(error => {
        console.error('Error al cargar los datos:', error);
      });
  }
};
  </script>
  