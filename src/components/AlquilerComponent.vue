<template>
    <div class="container">
        <h2>Alquiler de Vehículos</h2>
        <div>
            <label for="marca">Marca:</label>
            <select id="marca" v-model="marcaSeleccionada" @change="cargarModelos">
                <option value="">Selecciona una marca</option>
                <option v-for="marca in marcas" :key="marca.id" :value="marca.id">{{ marca.nombre }}</option>
            </select>
        </div>
        <div>
            <label for="modelo">Modelo:</label>
            <select id="modelo" v-model="modeloSeleccionado" :disabled="!marcaSeleccionada">
                <option value="">Selecciona un modelo</option>
                <option v-for="modelo in modelosFiltrados" :key="modelo.id" :value="modelo.id">{{ modelo.modelo }}</option>
            </select>
        </div>
        <div>
            <label for="vehiculo">Vehículo:</label>
            <select id="vehiculo" v-model="vehiculoSeleccionado" :disabled="!modeloSeleccionado">
                <option value="">Selecciona un vehículo</option>
                <option v-for="vehiculo in vehiculosDisponibles" :key="vehiculo.id" :value="vehiculo.id">
                    {{ vehiculo.idModelo }} - {{ vehiculo.precioDia }}€/día
                </option>
            </select>
        </div>
        <div>
            <label for="cliente">Cliente:</label>
            <select id="cliente" v-model="clienteSeleccionado" :disabled="!vehiculoSeleccionado">
                <option value="">Selecciona un cliente</option>
                <option v-for="cliente in clientes" :key="cliente.id" :value="cliente">
                    {{ cliente.nombre }} - {{ cliente.dni }}
                </option>
            </select>
        </div>
        <div>
            <label for="duracion">Duración del alquiler (días):</label>
            <input type="number" id="duracion" v-model.number="duracionAlquiler" :disabled="!clienteSeleccionado">
        </div>
        <div>
            <label for="fechaInicio">Fecha de inicio del alquiler:</label>
            <input type="date" id="fechaInicio" v-model="fechaInicioAlquiler" :disabled="!clienteSeleccionado">
        </div>
        <div>
            <button @click="registrarAlquiler"
                :disabled="!clienteSeleccionado || !duracionAlquiler || !fechaInicioAlquiler">Alquilar</button>
        </div>
        <div v-if="alquilerRealizado">
            <h3>Alquiler Realizado</h3>
            <p>Marca: {{ marcaSeleccionada }}</p>
            <p>Modelo: {{ modeloSeleccionado }}</p>
            <p>Cliente: {{ clienteSeleccionado.nombre }}</p>
            <p>DNI: {{ clienteSeleccionado.dni }}</p>
            <p>Precio Total: {{ precioTotal }}€</p>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            marcas: [],
            modelos: [],
            vehiculos: [],
            clientes: [],
            marcaSeleccionada: '',
            modeloSeleccionado: '',
            vehiculoSeleccionado: '',
            clienteSeleccionado: '',
            duracionAlquiler: null,
            fechaInicioAlquiler: '',
            precioTotal: 0,
            alquilerRealizado: false
        };
    },
    mounted() {
        this.obtenerMarcas();
        this.obtenerClientes();
        this.obtenerVehiculos();
    },
    computed: {
        modelosFiltrados() {
            return this.modelos.filter(modelo => modelo.idMarca === this.marcaSeleccionada);
        },
        vehiculosDisponibles() {
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
        obtenerClientes() {
            fetch('http://localhost:3000/clientes')
                .then(response => response.json())
                .then(data => {
                    this.clientes = data;
                })
                .catch(error => {
                    console.error('Error al cargar los clientes:', error);
                });
        },
        obtenerVehiculos() {
            fetch('http://localhost:3000/vehiculos')
                .then(response => response.json())
                .then(data => {
                    this.vehiculos = data;
                })
                .catch(error => {
                    console.error('Error al cargar los clientes:', error);
                });
        },
        cargarModelos() {
            if (!this.marcaSeleccionada) {
                return;
            }
            fetch(`http://localhost:3000/modelos?marca=${this.marcaSeleccionada}`)
                .then(response => response.json())
                .then(data => {
                    this.modelos = data;
                    this.modeloSeleccionado = '';
                    this.vehiculoSeleccionado = '';
                    this.clienteSeleccionado = '';
                    this.duracionAlquiler = null;
                    this.fechaInicioAlquiler = '';
                    this.precioTotal = 0;
                    this.alquilerRealizado = false;
                })
                .catch(error => {
                    console.error('Error al cargar los modelos:', error);
                });
        },
        registrarAlquiler() {
            const nuevoAlquiler = {
                vehiculo: this.vehiculoSeleccionado,
                numDias: this.duracionAlquiler,
                fechaInic: this.fechaInicioAlquiler.split('-').reverse().join('/')
            };

            this.clienteSeleccionado.alquileres.push(nuevoAlquiler);

            fetch(`http://localhost:3000/clientes/${this.clienteSeleccionado.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ alquileres: this.clienteSeleccionado.alquileres })
            })
                .then(response => response.json())
                .then(data => {
                    this.alquilerRealizado = true;
                    const vehiculoSeleccionado = this.vehiculos.find(vehiculo => vehiculo.id === this.vehiculoSeleccionado);
                    const modeloSeleccionado = this.modelos.find(modelo => modelo.id === vehiculoSeleccionado.idModelo);

                    // Obteniendo la marca del modelo seleccionado
                    const marcaSeleccionada = this.marcas.find(marca => marca.id === modeloSeleccionado.idMarca);

                    // Actualizando la marca seleccionada con su nombre
                    this.marcaSeleccionada = marcaSeleccionada ? marcaSeleccionada.nombre : '';

                    this.modeloSeleccionado = modeloSeleccionado ? modeloSeleccionado.modelo : '';
                    this.precioTotal = vehiculoSeleccionado.precioDia * this.duracionAlquiler;
                    
                })
                .catch(error => {
                    console.error('Error al registrar el alquiler:', error);
                });
        }
    }
};
</script>
  
<style scoped></style>
