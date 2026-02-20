import { Home } from './components/home.js';
import { Catalogo } from './components/catalogo.js';
import { Administracao } from './components/administracao.js';
import { Usuarios } from './components/usuarios.js';
import { Equipe } from './components/equipe.js';
import { Conta } from './components/conta.js';
import { Login } from './components/login.js';

const routes = [
    { path: '/', component: Login },
    { path: '/home', component: Home },
    { path: '/catalogo', component: Catalogo },
    { path: '/admin', component: Administracao },
    { path: '/usuarios', component: Usuarios },
    { path: '/equipe', component: Equipe },
    { path: '/conta', component: Conta },
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

router.beforeEach((to, from, next) => {
    const id = localStorage.getItem("usuarioId");
    const permissao = localStorage.getItem("permissao");

    if (!id && to.path !== '/') {
        next('/');
    } else if (id && to.path === '/') {
        next('/home');
    } else if (!id && to.path === '/') {
        next();
    } else if (to.path === '/admin' && !['2', '3'].includes(permissao)) {
        next('/home');
    } else if (to.path === '/usuarios' && permissao !== '3') {
        next('/home');
    } else {
        next();
    }
});

const app = {
    data() {
        return {
            showLogoutConfirm: false,
            logoutCallback: null,
            permissao: localStorage.getItem('permissao') || null,
            isLightMode: localStorage.getItem('theme') === 'light' || (!localStorage.getItem('theme') && !window.matchMedia('(prefers-color-scheme: dark)').matches)
        };
    },
    computed: {
        podeVerAdmin() {
            return ['2', '3'].includes(this.permissao);
        },
        podeVerUsuarios() {
            return this.permissao === '3';
        }
    },
    methods: {
        handleLogout() {
            this.showLogoutConfirm = true;
        },
        confirmLogout(navigate) {
            this.logoutCallback = navigate;
            this.showLogoutConfirm = true;
        },
        logoutNow() {
            localStorage.removeItem("usuarioId");
            localStorage.removeItem("usuarioNome");
            localStorage.removeItem("usuarioEmail");
            localStorage.removeItem("permissao");
            this.permissao = null;
            this.showLogoutConfirm = false;
            this.$router.push('/');
        },
        cancelLogout() {
            this.showLogoutConfirm = false;
            this.logoutCallback = null;
        },
        atualizarPermissao() {
            this.permissao = localStorage.getItem('permissao') || null;
        },
        toggleTheme() {
            this.isLightMode = !this.isLightMode;
            localStorage.setItem('theme', this.isLightMode ? 'light' : 'dark');
            this.aplicarTema();
        },
        aplicarTema() {
            document.documentElement.setAttribute('data-theme', this.isLightMode ? 'light' : 'dark');
        }
    },
    mounted() {
        window.addEventListener('storage', this.atualizarPermissao);
        this.aplicarTema();

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({matches: isDark}) => {
            if (!localStorage.getItem('theme')) {
                this.isLightMode = !isDark;
                this.aplicarTema();
            }
        });

        const originalSetItem = localStorage.setItem;
        localStorage.setItem = (...args) => {
            originalSetItem.apply(localStorage, args);
            if (args[0] === 'permissao') this.atualizarPermissao();
        };
    },
    beforeUnmount() {
        window.removeEventListener('storage', this.atualizarPermissao);
    },
    template: `
        <nav v-if="$route.path !== '/' && $route.path !== '/login'">
            <ul>
                <li id="logo"><i class="fi fi-sc-gamepad"></i></li>

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

                <router-link v-if="podeVerAdmin" to="/admin" custom v-slot="{ navigate, isActive }">
                    <li @click="navigate" :class="{ active: isActive }">
                        <i class="fi fi-sr-file-edit"></i><p>Administração</p>
                    </li>
                </router-link>

                <router-link v-if="podeVerUsuarios" to="/usuarios" custom v-slot="{ navigate, isActive }">
                    <li @click="navigate" :class="{ active: isActive }">
                        <i class="fi fi-sr-users-alt"></i><p>Usuários</p>
                    </li>
                </router-link>

                <router-link to="/conta" custom v-slot="{ navigate, isActive }">
                    <li @click="navigate" :class="{ active: isActive }"> 
                        <i class="fi fi-sr-user"></i><p>Conta</p>
                    </li>
                </router-link>

                <router-link to="/equipe" custom v-slot="{ navigate, isActive }">
                    <li @click="navigate" :class="{ active: isActive }">
                        <i class="fi fi-sr-users"></i><p>Equipe</p>
                    </li>
                </router-link>
                </ul>
        </nav>

        <div v-if="showLogoutConfirm" class="popup-overlay">
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
                <button class="theme-toggle" @click="toggleTheme" title="Alternar tema" aria-label="auto" aria-live="polite">
                    <svg class="sun-and-moon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
                        <mask class="moon" id="moon-mask">
                            <rect x="0" y="0" width="100%" height="100%" fill="white" />
                            <circle cx="24" cy="10" r="6" fill="black" />
                        </mask>
                        <circle class="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor" />
                        <g class="sun-beams" stroke="currentColor">
                            <line x1="12" y1="1" x2="12" y2="3" />
                            <line x1="12" y1="21" x2="12" y2="23" />
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                            <line x1="1" y1="12" x2="3" y2="12" />
                            <line x1="21" y1="12" x2="23" y2="12" />
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </g>
                    </svg>
                </button>
            </header>
            <main><router-view></router-view></main>
        </div>
    `
};

const App = Vue.createApp(app);
App.use(router);
App.mount('#app');