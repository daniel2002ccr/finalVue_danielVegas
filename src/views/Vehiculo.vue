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
        <div v-if="!marcaSeleccionada || !modeloSeleccionado">
            <h3>Vehículos</h3>
            <ul>
                <li v-for="vehiculo in vehiculos" :key="vehiculo.id">
                    <div>{{ obtenerNombreModelo(vehiculo.idModelo) }} - Precio alquiler: {{ vehiculo.precioDia }}€/día</div>
                    <ul>
                        <li v-for="cliente in clientesPorVehiculo(vehiculo.id)" :key="cliente.id">{{ cliente.nombre }}</li>
                    </ul>
                </li>
            </ul>
        </div>
        <div v-else-if="!modeloSeleccionado">
            <h3>Vehículos</h3>
            <ul>
                <li v-for="vehiculo in vehiculosFiltradosPorMarca" :key="vehiculo.id">
                    <div>{{ obtenerNombreModelo(vehiculo.idModelo) }} - Precio alquiler: {{ vehiculo.precioDia }}€/día</div>
                    <ul>
                        <li v-for="cliente in clientesPorVehiculo(vehiculo.id)" :key="cliente.id">{{ cliente.nombre }}</li>
                    </ul>
                </li>
            </ul>
        </div>
        <div v-else>
            <h3>Vehículos</h3>
            <ul>
                <li v-for="vehiculo in vehiculosFiltrados" :key="vehiculo.id">
                    <div>{{ obtenerNombreModelo(vehiculo.idModelo) }} - Precio alquiler: {{ vehiculo.precioDia }}€/día</div>
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
        vehiculosFiltradosPorMarca() {
        return this.vehiculos.filter(vehiculo => {
            const modelo = this.modelos.find(m => m.id === vehiculo.idModelo);
            return modelo && modelo.idMarca === this.marcaSeleccionada;
        });
    },
        vehiculosFiltrados() {
            if (!this.modeloSeleccionado) {
                if (!this.marcaSeleccionada) {
                    return this.vehiculos;
                } else {
                    return this.vehiculos.filter(vehiculo => {
                        const modelo = this.modelos.find(m => m.id === vehiculo.idModelo);
                        return modelo && modelo.idMarca === this.marcaSeleccionada;
                    });
                }
            } else {
                return this.vehiculos.filter(vehiculo => vehiculo.idModelo === this.modeloSeleccionado);
            }
        },
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
                    this.vehiculos = vehiculos;
                })
                .catch(error => {
                    console.error('Error al cargar los vehículos:', error);
                });
        },
        obtenerClientes() {
            fetch('http://localhost:3000/clientes')
                .then(response => response.json())
                .then(clientes => {
                    this.clientes = clientes;
                })
                .catch(error => {
                    console.error('Error al cargar los vehículos:', error);
                });
        },
        cargarModelos() {
            if (!this.marcaSeleccionada) {
                fetch('http://localhost:3000/modelos')
                    .then(response => response.json())
                    .then(data => {
                        this.modelos = data;
                    })
                    .catch(error => {
                        console.error('Error al cargar los modelos:', error);
                    });
                this.modeloSeleccionado = '';
            } else {
                console.log(this.marcaSeleccionada);
                fetch(`http://localhost:3000/modelos?idMarca=${this.marcaSeleccionada}`)
                    .then(response => response.json())
                    .then(data => {
                        this.modelos = data;
                    })
                    .catch(error => {
                        console.error('Error al cargar los modelos:', error);
                    });
            }
        },
        obtenerVehiculosPorMarca(idMarca) {
            fetch(`http://localhost:3000/vehiculos?idMarca=${idMarca}`)
                .then(response => response.json())
                .then(vehiculos => {
                    this.vehiculos = vehiculos;
                })
                .catch(error => {
                    console.error('Error al cargar los vehículos por marca:', error);
                });
        },
        clientesPorVehiculo(idVehiculo) {
            return this.clientes.filter(cliente => cliente.alquileres.some(alquiler => alquiler.vehiculo === idVehiculo));
        },
        mostrarNuevoVehiculo() {
            this.mostrarFormularioNuevoVehiculo = true;
        },
        cancelarNuevoVehiculo() {
            this.mostrarFormularioNuevoVehiculo = false;
        },
        obtenerNombreModelo(idModelo) {
            const modelo = this.modelos.find(m => m.id === idModelo);
            return modelo ? modelo.modelo : 'Modelo Desconocido';
        }
    }
};
</script>

