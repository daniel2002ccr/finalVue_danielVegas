<template>
    <div class="container">
        <h2>Modelos</h2>
        <div>
            <label for="marca">Selecciona una marca:</label>
            <select id="marca" v-model="marcaSeleccionada" @change="cargarModelos">
                <option value="">Selecciona una marca</option>
                <option v-for="marca in marcas" :key="marca.id" :value="marca.id">{{ marca.nombre }}</option>
            </select>
        </div>
        <div v-if="modelos.length > 0">
            <h3>Modelos de {{ marcaSeleccionadaNombre }}</h3>
            <table class="tabla">
                <thead>
                    <tr>
                        <th>Modelo</th>
                        <th>Precio alquiler (€/día)</th>
                        <th>Extra</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="modelo in modelos" :key="modelo.id">
                        <td>{{ modelo.modelo }}</td>
                        <td>{{ modelo.precioDia }}</td>
                        <td>
                            <template v-if="modelo.extraPorModelo === 0">
                                <input type="number" v-model="nuevoExtra[modelo.id]">
                                <button @click="actualizarExtra(modelo.id)">Actualizar</button>
                            </template>
                            <template v-else>
                                {{ modelo.extraPorModelo }}
                            </template>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            marcas: [],
            modelos: [],
            marcaSeleccionada: '',
            marcaSeleccionadaNombre: '',
            nuevoExtra: {}
        };
    },
    mounted() {
        this.obtenerMarcas();
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
        cargarModelos() {
            fetch(`http://localhost:3000/modelos?idMarca=${this.marcaSeleccionada}`)
                .then(response => response.json())
                .then(data => {
                    this.modelos = data;
                    this.marcaSeleccionadaNombre = this.marcas.find(marca => marca.id === this.marcaSeleccionada).nombre;

                    // Calcular precio medio y extra por modelo
                    const modelosConPrecioExtraCero = this.modelos.filter(modelo => modelo.extraPorModelo === 0);
                    for (const modelo of modelosConPrecioExtraCero) {
                        this.nuevoExtra[modelo.id] = ''; // Inicializar el objeto nuevoExtra
                    }

                    // Obtener detalles de los vehículos
                    this.obtenerDetallesVehiculos(); // Llamada aquí para garantizar que se ejecute después de cargar los modelos
                })
                .catch(error => {
                    console.error('Error al cargar los modelos:', error);
                });
        },
        obtenerDetallesVehiculos() {
            fetch('http://localhost:3000/vehiculos')
                .then(response => response.json())
                .then(vehiculos => {
                    // Asignar el precio de alquiler de los vehículos a los modelos correspondientes
                    this.modelos.forEach(modelo => {
                        const vehiculo = vehiculos.find(v => v.idModelo === modelo.id);
                        modelo.precioDia = vehiculo ? vehiculo.precioDia : 0;
                    });
                })
                .catch(error => {
                    console.error('Error al cargar los vehículos:', error);
                });
        },

        actualizarExtra(idModelo) {
            const modelo = this.modelos.find(modelo => modelo.id === idModelo);
            if (!modelo || modelo.extraPorModelo !== 0) {
                return;
            }

            const nuevoExtra = this.nuevoExtra[idModelo];
            if (nuevoExtra === '' || isNaN(nuevoExtra)) {
                return;
            }

            fetch(`http://localhost:3000/modelos/${idModelo}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ extraPorModelo: parseFloat(nuevoExtra) })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('No se pudo actualizar el extra por modelo.');
                    }
                    this.cargarModelos();
                })
                .catch(error => {
                    console.error('Error al actualizar el extra por modelo:', error);
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
}
.tabla{
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}

.tabla th,
.tabla td {
  border: 1px solid #dddddd;
  padding: 8px;
  text-align: left;
}

.tabla th {
  background-color: #f2f2f2;
}
</style>