import { API_URL } from "../config.js";

export const Conta = {
    data() {
        return {
            usuario: null,
            carregando: true
        };
    },

    async mounted() {
        const id = localStorage.getItem("usuarioId");

        if (!id) {
            this.$router.push("/login");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/usuario/${id}`);

            if (!response.ok) {
                throw new Error("Sessão inválida ou usuário não existe.");
            }

            const text = await response.text();

            let data;
            try {
                data = JSON.parse(text);
            } catch {
                throw new Error("Resposta inválida do servidor.");
            }

            this.usuario = data;

        } catch (erro) {
            console.error("Erro ao buscar dados do usuário:", erro.message);

            localStorage.removeItem("usuarioId");
            localStorage.removeItem("usuarioNome");
            localStorage.removeItem("permissao");

            alert("Sua sessão expirou. Faça login novamente.");
            this.$router.push("/login");

        } finally {
            this.carregando = false;
        }
    },

    methods: {
        getPermissaoLabel(permissaoId) {
            switch (permissaoId) {
                case 1: return "Usuário Padrão";
                case 2: return "Administrador(a)";
                case 3: return "Administrador(a) Master";
                default: return "Desconhecido";
            }
        },

        sair() {
            localStorage.removeItem("usuarioId");
            localStorage.removeItem("usuarioNome");
            localStorage.removeItem("permissao");
            this.$router.push("/login");
        }
    },

    template: `
        <h1 id="titulo">Minha Conta</h1>

        <section class="conta">
            <div class="container-conta">

                <p v-if="carregando" class="loading-message">
                    Carregando informações do usuário...
                </p>

                <div class="card-conta" v-else-if="usuario">

                    <div class="user-profile">
                        <i class="fi fi-ss-user icon"></i>

                        <div class="user-details-header">
                            <h2 class="user-name">{{ usuario.nome }}</h2>

                            <h2 class="user-permission">
                                {{ getPermissaoLabel(usuario.permissao) }}
                            </h2>

                            <p class="user-email">{{ usuario.email }}</p>
                        </div>
                    </div>

                    <div class="content-wrapper">
                        <div class="info-grupo personal-info">
                            <h3>Informações da Conta</h3>

                            <p><strong>Nome Completo:</strong> {{ usuario.nome || '---' }}</p>
                            <p><strong>Email:</strong> {{ usuario.email || '---' }}</p>
                            <p><strong>Tipo de Acesso:</strong> {{ getPermissaoLabel(usuario.permissao) || '---' }}</p>
                        </div>
                    </div>

                    <button id="sair" @click.prevent="sair" title="Sair da Conta">
                        <i class="bx bx-log-out"></i>
                        <span>Sair da Conta</span>
                    </button>

                </div>

                <p v-else class="loading-message">
                    Usuário não encontrado.
                </p>

            </div>
        </section>
    `
};