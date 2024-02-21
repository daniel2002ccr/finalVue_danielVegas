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
            this.nuevaMarca = {
              nombre: '',
              anioFundacion: null,
              origen: ''
            };
          })
          .catch(error => {
            
          });
      }
    }
  };
  </script>
  <style scoped>

  .form-marca {
    width: 80%;
    max-width: 400px;
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="number"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  button.boton {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button.boton:hover {
    background-color: #0056b3;
  }
</style>