export const Conta = {
    data() {
        return {
            usuario: {},
            // showLogoutConfirm e logoutCallback não são mais necessários aqui,
            // pois o logout será tratado pelo componente raiz (app.js)
        };
    },
    mounted() {
        const id = localStorage.getItem("usuarioId");
        if (id) {
            fetch(`http://localhost:8080/usuario/${id}`)
                .then(res => res.json())
                .then(data => {
                    this.usuario = data;
                })
                .catch(err => {
                    console.error("Erro ao buscar dados do usuário:", err);
                });
        }
    },
    methods: {
        // Removido: formatarData, pois não há campos de data no modelo Usuário
        
        // Novo método para converter o ID da permissão para um rótulo legível
        getPermissaoLabel(permissaoId) {
            switch (permissaoId) {
                case 1:
                    return "Usuário Padrão";
                case 2:
                    return "Administrador(a)";
                case 3:
                    return "Administrador(a) Master"; // Adicionei '(a)' para administradores
                default:
                    return "Desconhecido";
            }
        },
        sair() {
            this.$root.handleLogout(); 
        }
    },
    template: `
        <h1 id="titulo">Minha Conta</h1>
        <section class="conta">
            <div class="container-conta">
                <div class="card-conta" v-if="usuario.nome">
                    <div class="user-profile">
                        <i class="fi fi-ss-user icon"></i>
                        <div class="user-details-header">
                            <h2 class="user-name">{{ usuario.nome }}</h2>
                            <h2 class="user-permission">
                                {{getPermissaoLabel(usuario.permissao) }}
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
                        <i class="bx bx-log-out"></i><span>Sair da Conta</span>
                    </button>
                </div>
                <p v-else class="loading-message">Carregando informações do usuário...</p>
            </div>
        </section>
    `
};