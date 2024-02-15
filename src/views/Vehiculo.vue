<template>
    <div class="container">
        <h2>Vehículos</h2>
        <div>
            <label for="marca">Marca:</label>
            <select id="marca" v-model="marcaSeleccionada" @change="cargarModelos">
                <option value="">Selecciona una marca</option>
                <option v-for="marca in marcas" :key="marca.id" :value="marca.id">{{ marca.nombre }}</option>
            </select>
        </div>
        <div>
            <label for="modelo">Modelo:</label>
            <select id="modelo" v-model="modeloSeleccionado">
                <option value="">Selecciona un modelo</option>
                <option v-for="modelo in modelosFiltrados" :key="modelo.id" :value="modelo.id">{{ modelo.modelo }}</option>
            </select>
        </div>
        <div v-if="!marcaSeleccionada || modelosFiltrados.length > 0">
            <h3>Vehículos</h3>
            <ul>
                <li v-for="vehiculo in vehiculosFiltrados" :key="vehiculo.id">
                    <div>{{ vehiculo.modelo }} - Precio alquiler: {{ vehiculo.precioDia }}€/día</div>
                    <ul>
                        <li v-for="cliente in clientesPorVehiculo(vehiculo.id)" :key="cliente.id">{{ cliente.nombre }}</li>
                    </ul>
                </li>
            </ul>
        </div>
        <button @click="mostrarNuevoVehiculo">Nuevo Vehículo</button>
        <div v-if="mostrarFormularioNuevoVehiculo">
            <NuevoVehiculo :marcaSeleccionada="marcaSeleccionada" :modeloSeleccionado="modeloSeleccionado"
                @cancelar="cancelarNuevoVehiculo" />
        </div>
    </div>
</template>
  
<script>
import NuevoVehiculo from './NuevoVehiculo.vue';

export default {
    components: {
        NuevoVehiculo
    },
    data() {
        return {
            marcas: [],
            modelos: [],
            vehiculos: [],
            clientes: [],
            marcaSeleccionada: '',
            modeloSeleccionado: '',
            mostrarFormularioNuevoVehiculo: false
        };
    },
    mounted() {
        this.obtenerMarcas();
        this.obtenerModelos();
        this.obtenerVehiculos();
        this.obtenerClientes();
    },
    computed: {
        modelosFiltrados() {
            return this.modelos.filter(modelo => modelo.idMarca === this.marcaSeleccionada);
        },
        vehiculosFiltrados() {
            if (!this.modeloSeleccionado) {
                return this.vehiculos;
            }
            return this.vehiculos.filter(vehiculo => vehiculo.idModelo === this.modeloSeleccionado);
        }
    },
    methods: {
        obtenerMarcas() {
            fetch('http://localhost:3000/marcas')
                .then(response => response.json())
                .then(data => {
                    this.marcas = data;
                })
                .catch(error => {
                    console.error('Error al cargar las marcas:', error);
                });
        },
        obtenerModelos() {
            fetch('http://localhost:3000/modelos')
                .then(response => response.json())
                .then(data => {
                    this.modelos = data;
                })
                .catch(error => {
                    console.error('Error al cargar los modelos:', error);
                });
        },
        obtenerVehiculos() {
            fetch('http://localhost:3000/vehiculos')
                .then(response => response.json())
                .then(vehiculos => {
                    this.modelos.forEach(modelo => {
                        const vehiculo = vehiculos.find(v => v.idModelo === modelo.id);
                        modelo.precioDia = vehiculo ? vehiculo.precioDia : 0;
                    });
                })
                .catch(error => {
                    console.error('Error al cargar los vehículos:', error);
                });
        },
        obtenerClientes() {
            // Lógica para obtener los clientes
        },
        cargarModelos() {
            // Lógica para cargar los modelos según la marca seleccionada
        },
        clientesPorVehiculo(idVehiculo) {
            return this.clientes.filter(cliente => cliente.alquileres.some(alquiler => alquiler.vehiculo === idVehiculo));
        },
        mostrarNuevoVehiculo() {
            this.mostrarFormularioNuevoVehiculo = true;
        },
        cancelarNuevoVehiculo() {
            this.mostrarFormularioNuevoVehiculo = false;
        }
    }
};
</script>
  