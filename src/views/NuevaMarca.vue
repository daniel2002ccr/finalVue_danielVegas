<template>
    <div class="container">
      <h2>Dar de alta nueva marca</h2>
      <form @submit.prevent="agregarMarca">
        <div>
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" v-model="nuevaMarca.nombre" required>
        </div>
        <div>
          <label for="anioFundacion">Año de fundación:</label>
          <input type="number" id="anioFundacion" v-model.number="nuevaMarca.anioFundacion" required>
        </div>
        <div>
          <label for="origen">País de origen:</label>
          <input type="text" id="origen" v-model="nuevaMarca.origen" required>
        </div>
        <button type="submit" class="boton">Guardar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        nuevaMarca: {
          nombre: '',
          origen: '',
          anioFundacion: null
        }
      };
    },
    methods: {
      agregarMarca() {
        const URL = "http://localhost:3000/marcas"; 
        const init = {
          method: 'POST',
          body: JSON.stringify(this.nuevaMarca), 
          headers: {
            'Content-Type': 'application/json'
          }
        };
  
        fetch(URL, init)
          .then(response => response.json())
          .then(data => {
            console.log('Marca agregada:', data);
            this.nuevaMarca = {
              nombre: '',
              anioFundacion: null,
              origen: ''
            };
          })
          .catch(error => {
            console.error('Error al agregar la marca:', error);
          });
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
.boton{
  margin-top: 5px;
}
</style>