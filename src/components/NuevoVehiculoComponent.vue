<template>
    <div class="container">
        <h2>Dar de alta nuevo vehículo</h2>
        <form @submit.prevent="agregarVehiculo">
            <div>
                <label for="marca">Marca:</label>
                <select id="marca" v-model="nuevoVehiculo.idMarca">
                    <option v-for="marca in marcas" :key="marca.id" :value="marca.id">{{ marca.nombre }}</option>
                </select>
            </div>
            <div>
                <label for="modelo">Modelo:</label>
                <select id="modelo" v-model="nuevoVehiculo.idModelo" :disabled="!nuevoVehiculo.idMarca || modelosFiltrados.length === 0">
                    <option v-for="modelo in modelosFiltrados" :key="modelo.id" :value="modelo.id">{{ modelo.modelo }}
                    </option>
                </select>
            </div>
            <div>
                <label for="precioDia">Precio por día:</label>
                <input type="number" id="precioDia" v-model.number="nuevoVehiculo.precioDia" required>
            </div>
            <div>
                <label for="puertas">Número de puertas:</label>
                <input type="number" id="puertas" v-model.number="nuevoVehiculo.puertas" required>
            </div>
            <div>
                <label for="sillaInfantil">Silla infantil:</label>
                <input type="checkbox" id="sillaInfantil" v-model="nuevoVehiculo.sillaInfantil">
            </div>
            <button type="submit">Guardar</button>
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
            const URL = "http://localhost:3000/vehiculos/";
            const init = {
                method: 'POST',
                body: JSON.stringify(this.nuevoVehiculo),
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            fetch(URL, init)
                .then(response => response.json())
                .then(data => {
                    console.log('vehiculo agregado:', data);
                    this.nuevoVehiculo = {
                        idMarca: '',
                        idModelo: '',
                        precioDia: null,
                        puertas: null,
                        sillaInfantil: false
                    };
                })
                .catch(error => {
                    console.error('Error al agregar la marca:', error);
                });
        },
        actualizarMarca() {
            if (this.nuevoVehiculo.idMarca) {
                this.modelosFiltrados = this.modelos.filter(modelo => modelo.idMarca === this.nuevoVehiculo.idMarca);
            } else {
                this.modelosFiltrados = [];
            }
        },
        actualizarModelos() {
                if (!this.nuevoVehiculo.idMarca) {
                    this.nuevoVehiculo.idMarca = this.marcas[0].id;
                }
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
</style>
