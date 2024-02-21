<template>
  <div class="container">
    <h2 class="title">Dar de alta nuevo modelo</h2>
    <form @submit.prevent="agregarModelo" class="form">
      <div class="form-group">
        <label for="marca" class="label">Marca:</label>
        <select id="marca" v-model="nuevoModelo.idMarca" required class="select">
          <option value="">Selecciona una marca</option>
          <option v-for="marca in marcas" :value="marca.id">{{ marca.nombre }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="modelo" class="label">Modelo:</label>
        <input type="text" id="modelo" v-model="nuevoModelo.modelo" required class="input">
      </div>
      <div class="form-group">
        <label for="extra" class="label">Precio Extra:</label>
        <input type="number" id="extra" v-model.number="nuevoModelo.extraPorModelo" min="0" class="input">
      </div>
      <button type="submit" class="button">Guardar</button>
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
  
      });
  },
  methods: {
    agregarModelo() {
      if (!this.nuevoModelo.extraPorModelo) {
        this.nuevoModelo.extraPorModelo = 0;
      }

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
          this.limpiarFormulario();
        })
        .catch(error => {
         
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
.form {
  width: 300px;
}

.form-group {
  margin-bottom: 15px;
}

.label {
  font-weight: bold;
  margin-bottom: 5px;
}

.input{
  width: 94%; 
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.select {
  width: 100%; 
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #0056b3;
}
</style>
