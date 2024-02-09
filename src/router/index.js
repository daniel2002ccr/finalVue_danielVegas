import { createRouter, createWebHashHistory } from 'vue-router'
import Inicio from '../views/Inicio'
import Marcas from '../views/Marcas.vue';
import nuevaMarca from '../views/NuevaMarca.vue';
import Modelos from '../views/Modelos.vue';
import nuevoModelo from '../views/NuevoModelo.vue';
import Vehiculo from '../views/Vehiculo.vue';
import nuevoVehiculo from '../views/NuevoVehiculo.vue';
import Alquiler from '../views/Alquiler.vue';
import Cliente from '../views/Cliente.vue';

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: Inicio
  },
  {
    path: '/marcas',
    name: 'marcas',
    component: Marcas
  },
  {
    path: '/nuevamarca',
    name: 'nuevamarca',
    component: nuevaMarca
  },
  {
    path: '/modelos',
    name: 'modelos',
    component: Modelos
  },
  {
    path: '/nuevomodelo',
    name: 'nuevomodelo',
    component: nuevoModelo
  },
  {
    path: '/vehiculo',
    name: 'vehiculo',
    component: Vehiculo
  },
  {
    path: '/nuevovehiculo',
    name: 'nuevovehiculo',
    component: nuevoVehiculo
  },
  {
    path: '/alquiler',
    name: 'alquiler',
    component: Alquiler
  },
  {
    path: '/cliente',
    name: 'cliente',
    component: Cliente
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
