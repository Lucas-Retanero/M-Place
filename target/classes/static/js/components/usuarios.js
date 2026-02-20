import { API_URL } from "../config.js";

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
            showEditPermissaoPopup: false,
        };
    },
    methods: {
        carregarUsuarios() {
            this.carregandoUsuarios = true;
            fetch(`${API_URL}/usuario`)
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
            this.showEditPermissaoPopup = true;
        },
        salvarPermissao() {
    const usuarioAtualizado = {
        permissao: parseInt(this.novaPermissao)
    };

    const id = this.usuarioEditando.id;

    fetch(`${API_URL}/usuario/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioAtualizado)
    })
    .then(() => {
        const index = this.usuarios.findIndex(u => u.id === id);
        if (index !== -1) {
            this.usuarios[index].permissao = usuarioAtualizado.permissao;
        }
        this.showEditPermissaoPopup = false;
        this.exibirMensagemSucesso("Permissão atualizada com sucesso!");

        this.usuarioEditando = null;
        this.novaPermissao = null;
    })
    .catch(err => console.error("Erro ao editar permissão:", err));
},
        cancelarEdicaoPermissao() {
            this.usuarioEditando = null;
            this.novaPermissao = null;
            this.showEditPermissaoPopup = false;
        },
        confirmarExclusao(usuario) {
            this.usuarioParaExcluir = usuario;
            this.showDeleteConfirm = true;
        },
        excluirUsuario() {
            fetch(`${API_URL}/usuario/${this.usuarioParaExcluir.id}`, {
                method: 'DELETE'
            })
            .then(() => {
                this.usuarios = this.usuarios.filter(u => u.id !== this.usuarioParaExcluir.id);
                this.exibirMensagemSucesso("Usuário excluído com sucesso!");
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
            this.eventSource = new EventSource(`${API_URL}/sse/usuario`);

            this.eventSource.addEventListener("atualizacao", (event) => {
                console.log("Evento SSE recebido:", event.data);
                const usuariosAtualizados = JSON.parse(event.data);
                this.usuarios = usuariosAtualizados;
            });

            this.eventSource.onerror = (err) => {
                console.error("Erro na conexão SSE:", err);
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
                    <td>{{ nomePermissao(usuario.permissao) }}</td>
                    <td>
                        <button id="btn-editar-tabela" @click="editarPermissao(usuario)">Editar Permissão</button>
                        <button id="btn-excluir-tabela" @click="confirmarExclusao(usuario)">Excluir</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="showEditPermissaoPopup" class="popup-overlay">
            <div class="modal-criar-brinquedo" style="max-width: 400px;">
                <h2>Editar Permissão de {{ usuarioEditando.nome }}</h2>
                <form class="form-brinquedo" @submit.prevent="salvarPermissao">
                    <label>Permissão:
                        <select v-model="novaPermissao">
                            <option value="1">Usuário</option>
                            <option value="2">Admin</option>
                            <option value="3">Admin Master</option>
                        </select>
                    </label>
                    <div class="btns-form-brinquedo" style="justify-content: center; margin-top: 1rem;">
                        <button type="submit">Salvar</button>
                        <button type="button" id="btn-cancelar" @click="cancelarEdicaoPermissao">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="popup-overlay" v-if="showDeleteConfirm">
            <div class="popup-content">
                <p id="interrogacao">!</p>
                <p>Você tem certeza que deseja excluir o usuário <strong>{{ usuarioParaExcluir.nome }}</strong>?</p>
                <div class="btns-logout">
                    <button id="btn-sim" @click="excluirUsuario">Sim, excluir</button>
                    <button @click="cancelarExclusao">Voltar</button>
                </div>
            </div>
        </div>

        <div class="popup-overlay" v-if="showMensagemSucesso">
            <div class="popup-content">
                <p>{{ mensagemSucesso }}</p>
                <div class="btns-logout">
                    <button @click="fecharMensagemSucesso">Ok</button>
                </div>
            </div>
        </div>
    </section>
    `
};