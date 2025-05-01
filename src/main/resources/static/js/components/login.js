export const Login = {
    data() {
        return {
            email: '',
            senha: '',
            erroLogin: '',
            mostrarPopup: false,
            novoUsuario: {
                nome: '',
                email: '',
                senha: '',
                permissao: 2
            },
            sucessoCriacao: ''
        };
    },
    methods: {
        fazerLogin() {
            fetch("http://localhost:8080/usuario/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: this.email,
                    senha: this.senha
                })
            })
            .then(response => {
                if (!response.ok) throw new Error("Login inválido");
                return response.json();
            })
            .then(data => {
                // Redireciona ou salva o usuário logado
                console.log("Usuário logado:", data);
                this.erroLogin = '';
                // Exemplo: this.$router.push('/home');
            })
            .catch(error => {
                this.erroLogin = error.message;
            });
        },
        criarUsuario() {
            fetch("http://localhost:8080/usuario", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.novoUsuario)
            })
            .then(response => {
                if (!response.ok) throw new Error("Erro ao criar usuário");
                return response.json();
            })
            .then(data => {
                this.sucessoCriacao = "Usuário criado com sucesso!";
                this.mostrarPopup = false;
                this.novoUsuario = { nome: '', email: '', senha: '', permissao: 2 };
            })
            .catch(error => {
                this.sucessoCriacao = "Erro: " + error.message;
            });
        }
    },
    template: `
    <section class="login">
        <h1>Login</h1>
        <input v-model="email" type="email" placeholder="Email">
        <input v-model="senha" type="password" placeholder="Senha">
        <button @click="fazerLogin">Entrar</button>
        <p style="color:red" v-if="erroLogin">{{ erroLogin }}</p>
        <p style="color:green" v-if="sucessoCriacao">{{ sucessoCriacao }}</p>

        <p>Não tem uma conta? <a href="#" @click="mostrarPopup = true">Crie aqui</a></p>

        <div v-if="mostrarPopup" class="popup">
            <div class="popup-conteudo">
                <h2>Criar Usuário</h2>
                <input v-model="novoUsuario.nome" type="text" placeholder="Nome">
                <input v-model="novoUsuario.email" type="email" placeholder="Email">
                <input v-model="novoUsuario.senha" type="password" placeholder="Senha">
                <select v-model="novoUsuario.permissao">
                    <option :value="1">Administrador</option>
                    <option :value="2">Usuário</option>
                </select>
                <button @click="criarUsuario">Criar</button>
                <button @click="mostrarPopup = false">Cancelar</button>
            </div>
        </div>
    </section>
    `
};
