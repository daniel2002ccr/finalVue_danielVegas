<template>
    <div class="container">
      <h2>Dar de alta nuevo vehículo</h2>
      <form @submit.prevent="agregarVehiculo" class="form">
        <div class="form-group">
          <label for="marca">Marca:</label>
          <select id="marca" v-model="nuevoVehiculo.idMarca" class="input">
            <option v-for="marca in marcas" :key="marca.id" :value="marca.id">{{ marca.nombre }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="modelo">Modelo:</label>
          <select id="modelo" v-model="nuevoVehiculo.idModelo" :disabled="!nuevoVehiculo.idMarca || modelosFiltrados.length === 0" class="input">
            <option v-for="modelo in modelosFiltrados" :key="modelo.id" :value="modelo.id">{{ modelo.modelo }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="precioDia">Precio por día:</label>
          <input type="number" id="precioDia" v-model.number="nuevoVehiculo.precioDia" required class="input">
        </div>
        <div class="form-group">
          <label for="puertas">Número de puertas:</label>
          <input type="number" id="puertas" v-model.number="nuevoVehiculo.puertas" required class="input">
        </div>
        <div class="form-group">
          <label for="sillaInfantil">Silla infantil:</label>
          <input type="checkbox" id="sillaInfantil" v-model="nuevoVehiculo.sillaInfantil" class="checkbox">
        </div>
        <button type="submit" class="btn">Guardar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      marcas: Array,
      modelos: Array
    },
    data() {
      return {
        nuevoVehiculo: {
          idMarca: '',
          idModelo: '',
          precioDia: null,
          puertas: null,
          sillaInfantil: false
        }
      };
    },
    methods: {
      agregarVehiculo() {
        const datosVehiculo = {
          idModelo: this.nuevoVehiculo.idModelo,
          precioDia: this.nuevoVehiculo.precioDia,
          puertas: this.nuevoVehiculo.puertas,
          sillaInfantil: this.nuevoVehiculo.sillaInfantil
        };
  
        const URL = "http://localhost:3000/vehiculos/";
        const init = {
          method: 'POST',
          body: JSON.stringify(datosVehiculo),
          headers: {
            'Content-Type': 'application/json'
          }
        };
  
        fetch(URL, init)
          .then(response => response.json())
          .then(data => {
            this.nuevoVehiculo = {
              idMarca: '',
              idModelo: '',
              precioDia: null,
              puertas: null,
              sillaInfantil: false
            };
          })
          .catch(error => {
            
          });
      }
    },
    computed: {
      modelosFiltrados() {
        return this.modelos.filter(modelo => modelo.idMarca === this.nuevoVehiculo.idMarca);
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
  
  .form {
    width: 400px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .label {
    font-weight: bold;
  }
  
  .input {
    width: 95%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .checkbox {
    margin-right: 5px;
  }
  
  .btn {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }
  </style>
  