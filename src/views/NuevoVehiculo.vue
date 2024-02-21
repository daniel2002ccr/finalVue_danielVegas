<template>
  <div class="container">
    <h1>Vista de Nuevo Vehículo</h1>
    <NuevoVehiculoComponent :marcas="marcas" :modelos="modelos" :marcaSeleccionada="marcaSeleccionada"
      :modeloSeleccionado="modeloSeleccionado" @listado="mostrarListadoVehiculos" />
  </div>
</template>
  
<script>
import NuevoVehiculoComponent from '@/components/NuevoVehiculoComponent.vue';

export default {
  components: {
    NuevoVehiculoComponent
  },
  data() {
    return {
      marcas: [],
      modelos: [],
      marcaSeleccionada: null,
      modeloSeleccionado: null
    };
  },
  mounted() {
    this.obtenerDatosMarcas();
    this.obtenerDatosModelos();
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
    mostrarListadoVehiculos() {
      this.$router.push({ name: 'ListadoVehiculos' });
    }
  }
};
</script>
  