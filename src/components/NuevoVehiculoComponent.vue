<template>
    <div class="container">
        <h2>Dar de alta nuevo vehículo</h2>
        <form @submit.prevent="agregarVehiculo">
            <div>
                <label for="marca">Marca:</label>
                <select id="marca" v-model="nuevoVehiculo.idMarca" :disabled="marcaSeleccionada">
                    <option v-for="marca in marcas" :key="marca.id" :value="marca.id">{{ marca.nombre }}</option>
                </select>
            </div>
            <div>
                <label for="modelo">Modelo:</label>
                <select id="modelo" v-model="nuevoVehiculo.idModelo" :disabled="modeloSeleccionado">
                    <option v-for="modelo in modelos" :key="modelo.id" :value="modelo.id">{{ modelo.modelo }}</option>
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
            <button type="button" @click="cancelar">Cancelar</button>
        </form>
    </div>
</template>
  
<script>
export default {
    props: {
        marcaSeleccionada: Boolean,
        modeloSeleccionado: Boolean,
        marcas: Array,
        modelos: Array
    },
    data() {
        return {
            nuevoVehiculo: {
                idModelo: '',
                precioDia: null,
                puertas: null,
                sillaInfantil: false
            }
        };
    },
    methods: {
        agregarVehiculo() {
            // Validar y enviar el nuevo vehículo al servidor
            console.log('Nuevo vehículo:', this.nuevoVehiculo);
            this.cancelar();
        },
        cancelar() {
            this.nuevoVehiculo = {
                idModelo: '',
                precioDia: null,
                puertas: null,
                sillaInfantil: false
            };
            this.$emit('cancelar');
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
  