<template>
    <div>
      <h1>Vista de Nuevo Vehículo</h1>
      <NuevoVehiculoComponente
        :marcas="marcas"
        :modelos="modelos"
        :marcaSeleccionada="marcaSeleccionada"
        :modeloSeleccionado="modeloSeleccionado"
        @cancelar="mostrarListadoVehiculos"
      />
    </div>
  </template>
  
  <script>
  import NuevoVehiculoComponente from '../components/NuevoVehiculoComponente';
  
  export default {
    components: {
      NuevoVehiculoComponente
    },
    data() {
      return {
        marcas: [],
        modelos: [],
        marcaSeleccionada: false,
        modeloSeleccionado: false
      };
    },
    // Métodos y lógica para cargar marcas y modelos, gestionar la selección de marca y modelo, etc.
    methods: {
      // Método para mostrar el listado de vehículos cuando se cancela el formulario
      mostrarListadoVehiculos() {
        // Lógica para mostrar el listado de vehículos
      }
    }
  };
  </script>
  