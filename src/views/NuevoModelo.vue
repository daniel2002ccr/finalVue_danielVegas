<template>
    <div class="container">
      <h2>Dar de alta nuevo modelo</h2>
      <form @submit.prevent="agregarModelo">
        <div>
          <label for="marca">Marca:</label>
          <select id="marca" v-model="nuevoModelo.idMarca" required>
            <option value="">Selecciona una marca</option>
            <option v-for="marca in marcas" :value="marca.id">{{ marca.nombre }}</option>
          </select>
        </div>
        <div>
          <label for="modelo">Modelo:</label>
          <input type="text" id="modelo" v-model="nuevoModelo.modelo" required>
        </div>
        <div>
          <label for="extra">Precio Extra:</label>
          <input type="number" id="extra" v-model.number="nuevoModelo.extraPorModelo">
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        marcas: [],
        nuevoModelo: {
          idMarca: '',
          modelo: '',
          extraPorModelo: 0
        }
      };
    },
    mounted() {
      fetch('http://localhost:3000/marcas')
        .then(response => response.json())
        .then(data => {
          this.marcas = data;
        })
        .catch(error => {
          console.error('Error al cargar las marcas:', error);
        });
    },
    methods: {
      agregarModelo() {
        const URL = "http://localhost:3000/modelos";
        const init = {
          method: 'POST',
          body: JSON.stringify(this.nuevoModelo),
          headers: {
            'Content-Type': 'application/json'
          }
        };
  
        fetch(URL, init)
          .then(response => response.json())
          .then(data => {
            console.log('Modelo agregado:', data);
            this.limpiarFormulario();
          })
          .catch(error => {
            console.error('Error al agregar el modelo:', error);
          });
      },
      limpiarFormulario() {
        this.nuevoModelo = {
          idMarca: '',
          modelo: '',
          extraPorModelo: 0
        };
      }
    }
  };
  </script>
  <style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>