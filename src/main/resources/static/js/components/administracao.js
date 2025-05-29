export const Administracao = {
    data() {
        return {
            // Brinquedos
            brinquedos: [],
            carregando: true,
            mostrarCriar: false,
            mostrarEditar: false,
            novoBrinquedo: {
                nome: '',
                descricao: '',
                 detalhes: '',
                marca: '',
                categoria: '',
                preco: '',
                urlimagem: ''
            },
            brinquedoEditando: null,

            // Categorias
            categorias: [],
            mostrarCriarCategoria: false,
            mostrarEditarCategoria: false,
            novaCategoria: {
                nome: '',
                urlimagem: ''
            },
            categoriaEditando: null,

            // Confirmação de exclusão
            showDeleteConfirm: false,
            deleteType: '', // 'brinquedo' ou 'categoria'
            deleteId: null
        };
    },
    methods: {
        // --- Brinquedos ---
        carregarBrinquedos() {
            this.carregando = true;
            fetch("http://localhost:8080/brinquedo")
                .then(res => res.json())
                .then(data => {
                    this.brinquedos = data;
                })
                .catch(err => {
                    console.error("Erro ao carregar brinquedos:", err);
                })
                .finally(() => {
                    this.carregando = false;
                });
        },
        salvarNovoBrinquedo() {
            fetch("http://localhost:8080/brinquedo", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.novoBrinquedo)
            })
            .then(() => {
                this.mostrarCriar = false;
                this.limparNovoBrinquedo();
                this.carregarBrinquedos();
            })
            .catch(err => console.error("Erro ao criar brinquedo:", err));
        },
        editarBrinquedo(id) {
            const brinquedo = this.brinquedos.find(b => b.id === id);
            if (brinquedo) {
                this.brinquedoEditando = { ...brinquedo };
                this.mostrarEditar = true;
            }
        },
        salvarEdicao() {
            fetch(`http://localhost:8080/brinquedo/${this.brinquedoEditando.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.brinquedoEditando)
            })
            .then(() => {
                this.mostrarEditar = false;
                this.carregarBrinquedos();
            })
            .catch(err => console.error("Erro ao editar brinquedo:", err));
        },
        excluirBrinquedo(id) {
            this.deleteType = 'brinquedo';
            this.deleteId = id;
            this.showDeleteConfirm = true;
        },
        limparNovoBrinquedo() {
            this.novoBrinquedo = {
                nome: '',
                descricao: '',
                categoria: '',
                preco: '',
                urlimagem: ''
            };
        },

        // --- Categorias ---
        carregarCategorias() {
            fetch("http://localhost:8080/categoria")
                .then(res => res.json())
                .then(data => {
                    this.categorias = data;
                })
                .catch(err => console.error("Erro ao carregar categorias:", err));
        },
        salvarNovaCategoria() {
            fetch("http://localhost:8080/categoria", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.novaCategoria)
            })
            .then(() => {
                this.mostrarCriarCategoria = false;
                this.limparNovaCategoria();
                this.carregarCategorias();
            })
            .catch(err => console.error("Erro ao criar categoria:", err));
        },
        editarCategoria(id) {
            const categoria = this.categorias.find(c => c.id === id);
            if (categoria) {
                this.categoriaEditando = { ...categoria };
                this.mostrarEditarCategoria = true;
            }
        },
        salvarEdicaoCategoria() {
            fetch(`http://localhost:8080/categoria/${this.categoriaEditando.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.categoriaEditando)
            })
            .then(() => {
                this.mostrarEditarCategoria = false;
                this.carregarCategorias();
            })
            .catch(err => console.error("Erro ao editar categoria:", err));
        },
        excluirCategoria(id) {
            this.deleteType = 'categoria';
            this.deleteId = id;
            this.showDeleteConfirm = true;
        },
        limparNovaCategoria() {
            this.novaCategoria = {
                nome: '',
                urlimagem: ''
            };
        },

        // Confirmação de Exclusão
        deleteNow() {
            const url = this.deleteType === 'brinquedo'
                ? `http://localhost:8080/brinquedo/${this.deleteId}`
                : `http://localhost:8080/categoria/${this.deleteId}`;

            fetch(url, {
                method: 'DELETE'
            })
            .then(() => {
                if (this.deleteType === 'brinquedo') {
                    this.carregarBrinquedos();
                } else {
                    this.carregarCategorias();
                }
            })
            .catch(err => console.error("Erro ao excluir:", err))
            .finally(() => {
                this.showDeleteConfirm = false;
                this.deleteType = '';
                this.deleteId = null;
            });
        },
        cancelDelete() {
            this.showDeleteConfirm = false;
            this.deleteType = '';
            this.deleteId = null;
        }
    },
    computed: {
    mensagemConfirmacaoExclusao() {
        if (this.deleteType === 'brinquedo') {
            return 'Você está prestes a excluir esse brinquedo. Deseja continuar?';
        } else if (this.deleteType === 'categoria') {
            return 'Você está prestes a excluir essa categoria. Deseja continuar?';
        } else {
            return '';
        }
    }
    },
    mounted() {
        this.carregarBrinquedos();
        this.carregarCategorias();
    },
    template: `
    <section class="administracao">
        <h1 id="titulo">Administração de Brinquedos</h1>

        <!-- Tabela de Brinquedos -->
        <p v-if="carregando">Carregando brinquedos...</p>
        <table v-if="!carregando && brinquedos.length > 0" class="tabela-brinquedos">
            <thead>
                <tr>
                    <th>Imagem</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Categoria</th>
                    <th>Valor</th>
                    <th>Controles</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="brinquedo in brinquedos" :key="brinquedo.id">
                    <td><img :src="brinquedo.urlimagem" :alt="brinquedo.nome" style="width: 60px;"></td>
                    <td>{{ brinquedo.nome }}</td>
                    <td>{{ brinquedo.descricao }}</td>
                    <td>{{ brinquedo.categoria }}</td>
                    <td>R$ {{ brinquedo.preco.toFixed(2) }}</td>
                    <td>
                        <a id="editar-tabela" href="#" @click.prevent="editarBrinquedo(brinquedo.id)">Editar</a> -
                        <a id="excluir-tabela" href="#" @click.prevent="excluirBrinquedo(brinquedo.id)">Excluir</a>
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-if="!carregando && brinquedos.length === 0">Nenhum brinquedo cadastrado.</p>
        <button id="btn-novo-brinquedo" @click.prevent="mostrarCriar = true">Novo Brinquedo<i class="fi fi-br-plus"></i></button>

        <!-- Modal: Criar Brinquedo -->
<div class="popup-overlay" v-if="mostrarCriar">
    <div class="modal-criar-brinquedo">
        <h2>Novo Brinquedo</h2>
        <div class="form-brinquedo">
            <label>Nome: <input v-model="novoBrinquedo.nome" /></label>
            <label>Descrição: <input v-model="novoBrinquedo.descricao" /></label>
            <label>Categoria: 
                <select v-model="novoBrinquedo.categoria">
                    <option disabled value="">Selecione uma categoria</option>
                    <option v-for="cat in categorias" :key="cat.id" :value="cat.nome">{{ cat.nome }}</option>
                </select>
            </label>
            <label>Marca: <input v-model="novoBrinquedo.marca" /></label>
            <label>Imagem (URL): <input v-model="novoBrinquedo.urlimagem" /></label>
            <label>Preço: <input type="number" v-model.number="novoBrinquedo.preco" /></label>
            <label>Detalhes: <input v-model="novoBrinquedo.detalhes" /></label>
        </div>
        <div class="btns-form-brinquedo">
            <button @click="salvarNovoBrinquedo">Salvar</button>
            <button id="btn-cancelar" @click="mostrarCriar = false">Cancelar</button>
        </div>
    </div>
</div>

<!-- Modal: Editar Brinquedo -->
<div class="popup-overlay" v-if="mostrarEditar && brinquedoEditando">
    <div class="modal">
        <h2>Editar Brinquedo</h2>
        <label>Nome: <input v-model="brinquedoEditando.nome" /></label><br>
        <label>Descrição: <input v-model="brinquedoEditando.descricao" /></label><br>
        <label>Categoria: 
            <select v-model="brinquedoEditando.categoria">
                <option disabled value="">Selecione uma categoria</option>
                <option v-for="cat in categorias" :key="cat.id" :value="cat.nome">{{ cat.nome }}</option>
            </select>
        </label><br>
        <label>Marca: <input v-model="brinquedoEditando.marca" /></label><br>
        <label>Imagem (URL): <input v-model="brinquedoEditando.urlimagem" /></label><br><br>
        <label>Preço: <input type="number" v-model.number="brinquedoEditando.preco" /></label><br>
        <label>Detalhes: <input v-model="brinquedoEditando.detalhes" /></label><br>
        <button @click="salvarEdicao">Salvar Edição</button>
        <button @click="mostrarEditar = false">Cancelar</button>
    </div>
</div>


        <h1 id="titulo">Administração de Categorias</h1>

        <!-- Tabela de Categorias -->
        <table v-if="categorias.length > 0" class="tabela-categorias">
            <thead>
                <tr>
                    <th>Imagem</th>
                    <th>Nome</th>
                    <th>Controles</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="categoria in categorias" :key="categoria.id">
                    <td><img :src="categoria.urlimagem" :alt="categoria.nome" style="width: 60px;"></td>
                    <td>{{ categoria.nome }}</td>
                    <td>
                        <a id="editar-tabela" href="#" @click.prevent="editarCategoria(categoria.id)">Editar</a> -
                        <a id="excluir-tabela" href="#" @click.prevent="excluirCategoria(categoria.id)">Excluir</a>
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-if="categorias.length === 0">Nenhuma categoria cadastrada.</p>
        <button id="btn-nova-categoria" @click.prevent="mostrarCriarCategoria = true">Nova Categoria<i class="fi fi-br-plus"></i></button>

        <!-- Modal: Criar Categoria -->
        <div class="popup-overlay" v-if="mostrarCriarCategoria">
            <div class="modal">
                <h2>Nova Categoria</h2>
                <label>Nome: <input v-model="novaCategoria.nome" /></label><br>
                <label>Imagem (URL): <input v-model="novaCategoria.urlimagem" /></label><br><br>
                <button @click="salvarNovaCategoria">Salvar</button>
                <button @click="mostrarCriarCategoria = false">Cancelar</button>
            </div>
        </div>

        <!-- Modal: Editar Categoria -->
        <div class="popup-overlay" v-if="mostrarEditarCategoria && categoriaEditando">
            <div class="modal">
                <h2>Editar Categoria</h2>
                <label>Nome: <input v-model="categoriaEditando.nome" /></label><br>
                <label>Imagem (URL): <input v-model="categoriaEditando.urlimagem" /></label><br><br>
                <button @click="salvarEdicaoCategoria">Salvar Edição</button>
                <button @click="mostrarEditarCategoria = false">Cancelar</button>
            </div>
        </div>

        <!-- Popup de confirmação de exclusão -->
<div class="popup-overlay" v-if="showDeleteConfirm">
    <div class="popup-content">
        <p id="interrogacao">!</p>
        <p>{{ mensagemConfirmacaoExclusao }}</p>
        <div class="btns-logout">
            <button id="btn-sim" @click="deleteNow">Sim, excluir</button>
            <button @click="cancelDelete">Voltar</button>
        </div>
    </div>
</div>

    </section>
    `
};
