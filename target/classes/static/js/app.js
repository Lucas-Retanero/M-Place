// import { Home } from './components/home.js';
// import { Catalogo } from './components/catalogo.js';
// import { Administracao } from './components/administacao.js';
// import { Equipe } from './components/equipe.js';

// const routes = [
//     { path: '/', component: Home },
//     { path: '/catalogo', component: Catalogo },
//     { path: '/admin', component: Adiministracao },
//     { path: '/equipe', component: Equipe },
// ];

// const router = VueRouter.createRouter({
//     history: VueRouter.createWebHashHistory(),
//     routes
// });

const app = {
    data() {
        //variáveis
        return {

        };
    },
    //métodos
    methods: {

    },
    //templates 
    template: `
     
    <nav>
		<ul>
			<li id="logo">
				<i id="logo" class="fi fi-sc-gamepad"></i>
			</li>
			<li>
				<i class="fi fi-sr-home"></i>
				<p>Home</p>
			</li>
			<li>
				<i class="fi fi-sr-catalog"></i>
				<p>Catálogo</p>
			</li>
			<li>
				<i class="fi fi-sr-file-edit"></i>
				<p>Adiministração</p>
			</li>
			<li>
				<i class="fi fi-sr-users"></i>
				<p>Equipe</p>
			</li>
		</ul>
	</nav>

	<div class="container">
		<header id="titulo">
			<h1>M-Place</h1>
		</header>

		<main>
			<router-view></router-view>
		</main>
	</div>
	
    `
};

const App = Vue.createApp(app);
//App.use(router);
App.mount('#app');