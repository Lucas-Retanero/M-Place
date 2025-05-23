import { Home } from './components/home.js';
import { Catalogo } from './components/catalogo.js';
import { Administracao } from './components/administracao.js';
import { Usuarios } from './components/usuarios.js';
import { Equipe } from './components/equipe.js';
import { Login } from './components/login.js';

const routes = [
    { path: '/', component: Login },
    { path: '/home', component: Home },
    { path: '/catalogo', component: Catalogo },
    { path: '/admin', component: Administracao },
    { path: '/usuarios', component: Usuarios },
    { path: '/equipe', component: Equipe },
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
});

router.afterEach((to) => {
    if (to.path === '/' || to.path === '/login') {
        document.body.classList.add('login-background');
    } else {
        document.body.classList.remove('login-background');
    }
});

const app = {
    data() {
        return {
            showLogoutConfirm: false,
            logoutCallback: null
        };
    },
    methods: {
        confirmLogout(navigate) {
            this.logoutCallback = navigate;
            this.showLogoutConfirm = true;
        },
        logoutNow() {
            this.showLogoutConfirm = false;
            if (this.logoutCallback) this.logoutCallback();
        },
        cancelLogout() {
            this.showLogoutConfirm = false;
            this.logoutCallback = null;
        }
    },
    template: `
    <nav v-if="$route.path !== '/' && $route.path !== '/login'">
        <ul>
            <li id="logo">
                <i class="fi fi-sc-gamepad"></i>
            </li>

            <router-link to="/home" custom v-slot="{ navigate, isActive }">
                <li @click="navigate" :class="{ active: isActive }">
                    <i class="fi fi-sr-home"></i><p>Home</p>
                </li>
            </router-link>

            <router-link to="/catalogo" custom v-slot="{ navigate, isActive }">
                <li @click="navigate" :class="{ active: isActive }">
                    <i class="fi fi-sr-catalog"></i><p>Catálogo</p>
                </li>
            </router-link>

            <router-link to="/admin" custom v-slot="{ navigate, isActive }">
                <li @click="navigate" :class="{ active: isActive }">
                    <i class="fi fi-sr-file-edit"></i><p>Administração</p>
                </li>
            </router-link>

            <router-link to="/usuarios" custom v-slot="{ navigate, isActive }">
                <li @click="navigate" :class="{ active: isActive }">
                    <i class="fi fi-sr-users-alt"></i><p>Usuários</p>
                </li>
            </router-link>

            <router-link to="/equipe" custom v-slot="{ navigate, isActive }">
                <li @click="navigate" :class="{ active: isActive }">
                    <i class="fi fi-sr-users"></i><p>Equipe</p>
                </li>
            </router-link>

            <router-link to="/" custom v-slot="{ navigate, isActive }">
                <li @click.prevent="confirmLogout(navigate)" :class="{ active: isActive }" id="logout">
                    <i class="bx bx-log-out"></i><p>Sair</p>
                </li>
            </router-link>
        </ul>
    </nav>

    <!-- POP-UP DE CONFIRMAÇÃO DE LOGOUT -->
    <div v-if="showLogoutConfirm" class="logout-popup">
        <div class="popup-content">
            <p id="interrogacao">?</p>
            <p>Você está prestes a sair. Deseja continuar?</p>
            <div class="btns-logout">
                <button id="btn-sim" @click="logoutNow">Sim, quero sair</button>
                <button @click="cancelLogout">Voltar</button>
            </div>
        </div>
    </div>

    <div class="container">
        <header>
            <h1>M-Place</h1>
        </header>

        <main>
            <router-view></router-view>
        </main>
    </div>
    `
};

const App = Vue.createApp(app);
App.use(router);
App.mount('#app');
