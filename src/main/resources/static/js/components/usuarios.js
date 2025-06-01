export const Usuarios = {
    data() {
        return {
            usuarios: [],
            carregandoUsuarios: true,
            usuarioEditando: null,
            novaPermissao: null,
            showDeleteConfirm: false,
            usuarioParaExcluir: null,
            showMensagemSucesso: false,
            mensagemSucesso: '',
            eventSource: null,
        };
    },
    methods: {
        carregarUsuarios() {
            this.carregandoUsuarios = true;
            fetch("http://localhost:8080/usuario")
                .then(res => res.json())
                .then(data => {
                    this.usuarios = data;
                })
                .catch(err => console.error("Erro ao carregar usuários:", err))
                .finally(() => {
                    this.carregandoUsuarios = false;
                });
        },
        editarPermissao(usuario) {
            this.usuarioEditando = usuario;
            this.novaPermissao = usuario.permissao;
        },
        salvarPermissao() {
            const usuarioAtualizado = {
                permissao: parseInt(this.novaPermissao)
            };

            fetch(`http://localhost:8080/usuario/${this.usuarioEditando.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(usuarioAtualizado)
            })
            .then(() => {
                this.usuarioEditando = null;
                this.novaPermissao = null;
                this.exibirMensagemSucesso("Permissão atualizada com sucesso!");
                // Atualização automática via SSE
            })
            .catch(err => console.error("Erro ao editar permissão:", err));
        },
        cancelarEdicaoPermissao() {
            this.usuarioEditando = null;
            this.novaPermissao = null;
        },
        confirmarExclusao(usuario) {
            this.usuarioParaExcluir = usuario;
            this.showDeleteConfirm = true;
        },
        excluirUsuario() {
            fetch(`http://localhost:8080/usuario/${this.usuarioParaExcluir.id}`, {
                method: 'DELETE'
            })
            .then(() => {
                this.exibirMensagemSucesso("Usuário excluído com sucesso!");
                // Atualização automática via SSE
            })
            .catch(err => console.error("Erro ao excluir usuário:", err))
            .finally(() => {
                this.usuarioParaExcluir = null;
                this.showDeleteConfirm = false;
            });
        },
        cancelarExclusao() {
            this.usuarioParaExcluir = null;
            this.showDeleteConfirm = false;
        },
        exibirMensagemSucesso(msg) {
            this.mensagemSucesso = msg;
            this.showMensagemSucesso = true;
        },
        fecharMensagemSucesso() {
            this.showMensagemSucesso = false;
        },
        nomePermissao(permissao) {
            if (permissao === 1) return "Usuário";
            if (permissao === 2) return "Admin";
            if (permissao === 3) return "Admin Master";
            return "Desconhecido";
        },
        iniciarSSE() {
    this.eventSource = new EventSource("http://localhost:8080/sse/usuario");

    this.eventSource.addEventListener("atualizacao", (event) => {
        console.log("Evento SSE recebido:", event.data);
        const usuariosAtualizados = JSON.parse(event.data);
        // Substitui toda a lista de usuários pelo conteúdo recebido
        this.usuarios = usuariosAtualizados;
    });

    this.eventSource.onerror = (err) => {
        console.error("Erro na conexão SSE:", err);
        // Opcional: fechar e tentar reconectar ou avisar o usuário
    };
},

    },
    mounted() {
        this.carregarUsuarios();
        this.iniciarSSE();
    },
    beforeUnmount() {
        if (this.eventSource) {
            this.eventSource.close();
        }
    },
    template: `
    <section class="administracao">
        <h1 id="titulo">Gerenciamento de Usuários</h1>

        <div v-if="carregandoUsuarios" style="color: var(--text-color)">Carregando usuários...</div>

        <table v-else class="tabela-brinquedos">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Permissão</th>
                    <th>Controles</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="usuario in usuarios" :key="usuario.id">
                    <td>{{ usuario.nome }}</td>
                    <td>{{ usuario.email }}</td>
                    <td v-if="usuarioEditando && usuarioEditando.id === usuario.id">
                        <select v-model="novaPermissao" 
                                style="padding: 0.3rem; border-radius: 5px; border: 1px solid var(--complementary-color); background-color: var(--text-color); color: var(--bg-color);">
                            <option value="1">Usuário</option>
                            <option value="2">Admin</option>
                            <option value="3">Admin Master</option>
                        </select>
                    </td>
                    <td v-else>{{ nomePermissao(usuario.permissao) }}</td>
                    <td>
                        <template v-if="usuarioEditando && usuarioEditando.id === usuario.id">
                            <button id="btn-editar-tabela" @click="salvarPermissao">Salvar</button>
                            <button id="btn-cancelar" @click="cancelarEdicaoPermissao">Cancelar</button>
                        </template>
                        <template v-else>
                            <button id="btn-editar-tabela" @click="editarPermissao(usuario)">Editar Permissão</button>
                            <button id="btn-excluir-tabela" @click="confirmarExclusao(usuario)">Excluir</button>
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Confirmação de Exclusão -->
        <div v-if="showDeleteConfirm" class="popup-overlay">
            <div class="modal-criar-brinquedo" style="max-width: 400px;">
                <p>Você tem certeza que deseja excluir o usuário <strong>{{ usuarioParaExcluir.nome }}</strong>?</p>
                <div class="btns-form-brinquedo" style="justify-content: center; margin-top: 1rem;">
                    <button id="btn-excluir-tabela" @click="excluirUsuario">Sim, excluir</button>
                    <button id="btn-cancelar" @click="cancelarExclusao">Cancelar</button>
                </div>
            </div>
        </div>

        <!-- Mensagem de Sucesso -->
        <div v-if="showMensagemSucesso" class="popup-overlay" @click.self="fecharMensagemSucesso">
            <div class="modal-criar-brinquedo" style="max-width: 350px; text-align: center;">
                <p>{{ mensagemSucesso }}</p>
                <button id="btn-editar-tabela" @click="fecharMensagemSucesso">Fechar</button>
            </div>
        </div>
    </section>
    `
};
