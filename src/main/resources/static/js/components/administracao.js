import { API_URL } from "./config.js";

export const Administracao = {
    data() {
        return {
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
            buscaImagemCriar: '',
            buscaImagemEditar: '',
            // Categorias
            categorias: [],
            mostrarCriarCategoria: false,
            mostrarEditarCategoria: false,
            carregandoCategorias: true,
            novaCategoria: {
                nome: '',
                urlimagem: ''
            },
            categoriaEditando: null,
            tabelaAtual: 'categorias',
            tituloPagina: 'Administração de Categorias',
            showDeleteConfirm: false,
            deleteType: '',
            deleteId: null,
            showMensagemSucesso: false,
            mensagemSucesso: '',
        };
    },
    methods: {
        // Brinquedos
        carregarBrinquedos() {
            this.carregando = true;
            fetch(`${API_URL}/brinquedo`)
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
            fetch(`${API_URL}/brinquedo`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.novoBrinquedo)
            })
            .then(() => {
                this.mostrarCriar = false;
                this.limparNovoBrinquedo();
                this.carregarBrinquedos();
                this.exibirMensagemSucesso("Brinquedo criado com sucesso!");
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
            fetch(`${API_URL}/brinquedo/${this.brinquedoEditando.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.brinquedoEditando)
            })
            .then(() => {
                this.mostrarEditar = false;
                this.carregarBrinquedos();
                this.exibirMensagemSucesso("Brinquedo editado com sucesso!");
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
        pesquisarImagem(termo) {
            if (!termo) {
                alert('Digite um termo para buscar no Google Imagens.');
                return;
            }
            const url = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(termo)}`;
            window.open(url, '_blank');
        },

        carregarCategorias() {
    this.carregandoCategorias = true;
    fetch(`${API_URL}/categoria`)
        .then(res => res.json())
        .then(data => {
            this.categorias = data;
        })
        .catch(err => {
            console.error("Erro ao carregar categorias:", err);
        })
        .finally(() => {
            this.carregandoCategorias = false;
        });
        },
        salvarNovaCategoria() {
            fetch(`${API_URL}/categoria`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.novaCategoria)
            })
            .then(() => {
                this.mostrarCriarCategoria = false;
                this.limparNovaCategoria();
                this.carregarCategorias();
                this.exibirMensagemSucesso("Categoria criada com sucesso!");
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
            fetch(`${API_URL}/categoria/${this.categoriaEditando.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.categoriaEditando)
            })
            .then(() => {
                this.mostrarEditarCategoria = false;
                this.carregarCategorias();
                this.exibirMensagemSucesso("Categoria editada com sucesso!");
            })
            .catch(err => console.error("Erro ao editar categoria:", err));
        },
        excluirCategoria(id) {
            this.deleteType = 'categoria';
            this.deleteId = id;
            this.showDeleteConfirm = true;
        },
        deleteNow() {
    const url = this.deleteType === 'brinquedo'
        ? `${API_URL}/brinquedo/${this.deleteId}`
        : `${API_URL}/categoria/${this.deleteId}`;

    fetch(url, {
        method: 'DELETE'
    })
    .then(() => {
        if (this.deleteType === 'brinquedo') {
            // Remove localmente
            this.brinquedos = this.brinquedos.filter(b => b.id !== this.deleteId);
            this.exibirMensagemSucesso("Brinquedo excluído com sucesso!");
        } else {
            // Remove localmente
            this.categorias = this.categorias.filter(c => c.id !== this.deleteId);
            this.exibirMensagemSucesso("Categoria excluída com sucesso!");
        }
    })
    .catch(err => console.error("Erro ao excluir:", err))
    .finally(() => {
        this.showDeleteConfirm = false;
        this.deleteType = '';
        this.deleteId = null;
    });
},
        limparNovaCategoria() {
    this.novaCategoria = {
        nome: '',
        urlimagem: ''
    };
},
        cancelarCriacao() {
            this.mostrarCriar = false;
            this.mostrarCriarCategoria = false;
            this.novoBrinquedo = {
                nome: "",
                descricao: "",
                categoria: "",
                marca: "",
                urlimagem: "",
                preco: null,
                detalhes: ""
            };
            this.novaCategoria = {
                nome: '',
                urlimagem: ''
            };
            this.buscaImagemCriar = "";
        },
        cancelDelete() {
            this.showDeleteConfirm = false;
            this.deleteType = '';
            this.deleteId = null;
        },
        exibirMensagemSucesso(msg) {
            this.mensagemSucesso = msg;
            this.showMensagemSucesso = true;
        },
        fecharMensagemSucesso() {
            this.showMensagemSucesso = false;
        },
        mostrarTabelaCategorias() {
        this.tabelaAtual = 'categorias';
        this.tituloPagina = 'Administração de Categorias';
    },
    mostrarTabelaBrinquedos() {
        this.tabelaAtual = 'brinquedos';
        this.tituloPagina = 'Administração de Brinquedos';
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

        <h1 id="titulo">{{ tituloPagina }}</h1>

        <div class="abas-tabelas">
  <button 
    :class="{ ativo: tabelaAtual === 'categorias' }" 
    @click="mostrarTabelaCategorias">
    <i class="fi fi-sr-catalog"></i>Categorias
  </button>
  <button 
    :class="{ ativo: tabelaAtual === 'brinquedos' }" 
    @click="mostrarTabelaBrinquedos">
    <i class="fi fi-sc-teddy-bear"></i>Brinquedos
  </button>
</div>


        <!-- Tabela de Categorias -->
        <table v-if="tabelaAtual === 'categorias' && categorias.length > 0" class="tabela-categorias">
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
                        <button id="btn-editar-tabela" @click.prevent="editarCategoria(categoria.id)">Editar</button>
                        <button id="btn-excluir-tabela" @click.prevent="excluirCategoria(categoria.id)">Excluir</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <p  v-if="tabelaAtual === 'categorias' && !carregandoCategorias && categorias.length === 0" id="sem-brinquedos">Nenhuma categoria cadastrada no sistema.</p>
        <button v-if="tabelaAtual === 'categorias' && !carregandoCategorias" id="btn-nova-categoria" @click.prevent="mostrarCriarCategoria = true">Nova Categoria<i class="fi fi-br-plus"></i></button>

        <!-- Modal: Criar Categoria -->
<div class="popup-overlay" v-if="mostrarCriarCategoria">
  <div class="modal-criar-brinquedo">
    <h2>Nova Categoria</h2>
    <form class="form-brinquedo" @submit.prevent="salvarNovaCategoria">
      <label>Nome:
        <input v-model="novaCategoria.nome" placeholder="Digite o nome da categoria" required />
      </label>
      <label>Imagem:
        <div class="linha-imagem">
          <input v-model="novaCategoria.urlimagem" placeholder="URL da imagem" required />
          <input v-model="buscaImagemCriarCategoria" placeholder="Pesquisar imagem no Google" />
          <button id="btn-pesquisar" type="button" @click="pesquisarImagem(buscaImagemCriarCategoria)">Pesquisar</button>
        </div>
      </label>
      <div class="btns-form-brinquedo">
        <button type="submit">Salvar</button>
        <button type="button" id="btn-cancelar" @click="cancelarCriacao">Cancelar</button>
      </div>
    </form>
  </div>
</div>


        <!-- Modal: Editar Categoria -->
<div class="popup-overlay" v-if="mostrarEditarCategoria && categoriaEditando">
  <div class="modal-criar-brinquedo">
    <h2>Editar Categoria</h2>
    <form class="form-brinquedo" @submit.prevent="salvarEdicaoCategoria">
      <label>Nome:
        <input v-model="categoriaEditando.nome" placeholder="Digite o nome da categoria" required />
      </label>
      <label>Imagem:
        <div class="linha-imagem">
          <input v-model="categoriaEditando.urlimagem" placeholder="URL da imagem" required />
          <input v-model="buscaImagemEditarCategoria" placeholder="Pesquisar imagem no Google" />
          <button type="button" @click="pesquisarImagem(buscaImagemEditarCategoria)">Pesquisar</button>
        </div>
      </label>
      <div class="btns-form-brinquedo">
        <button type="submit">Salvar Edição</button>
        <button id="btn-cancelar" type="button" @click="mostrarEditarCategoria = false">Cancelar</button>
      </div>
    </form>
  </div>
</div>

        <!-- Tabela de Brinquedos -->
        <table v-if="tabelaAtual === 'brinquedos' && brinquedos.length > 0" class="tabela-brinquedos">
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
                        <button id="btn-editar-tabela" @click.prevent="editarBrinquedo(brinquedo.id)">Editar</button>
                        <button id="btn-excluir-tabela" @click.prevent="excluirBrinquedo(brinquedo.id)">Excluir</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-if="tabelaAtual === 'brinquedos' && brinquedos.length === 0" id="sem-brinquedos">Nenhum brinquedo cadastrado no sistema.</p>
        <button v-if="tabelaAtual === 'brinquedos'" id="btn-novo-brinquedo" @click.prevent="mostrarCriar = true">Novo Brinquedo<i class="fi fi-br-plus"></i></button>

        <!-- Modal: Criar Brinquedo -->
<div class="popup-overlay" v-if="mostrarCriar">
    <div class="modal-criar-brinquedo">
        <h2>Novo Brinquedo</h2>
        <form class="form-brinquedo" @submit.prevent="salvarNovoBrinquedo">
            <label>Nome:
                <input v-model="novoBrinquedo.nome" required placeholder="Ex: Carrinho de Controle Remoto" />
            </label>
            <label>Descrição:
                <input v-model="novoBrinquedo.descricao" required placeholder="Descreva o brinquedo brevemente" />
            </label>
            <label>Categoria: 
                <select v-model="novoBrinquedo.categoria" required>
                    <option disabled value="">Selecione uma categoria</option>
                    <option v-for="cat in categorias" :key="cat.id" :value="cat.nome">{{ cat.nome }}</option>
                </select>
            </label>
            <label>Marca:
                <input v-model="novoBrinquedo.marca" required placeholder="Ex: Hot Wheels, LEGO, etc." />
            </label>
            <label>Imagem:
                <div class="linha-imagem">
                    <input v-model="novoBrinquedo.urlimagem" required placeholder="URL da imagem do brinquedo" />
                    <input v-model="buscaImagemCriar" placeholder="Pesquisar imagem no Google" />
                    <button id="btn-pesquisar" type="button" @click="pesquisarImagem(buscaImagemCriar)">Pesquisar</button>
                </div>
            </label>
            <label>Preço:
                <input 
                    type="number" 
                    step="0.01" 
                    inputmode="decimal" 
                    v-model.number="novoBrinquedo.preco" 
                    required 
                    placeholder="Ex: 99.90"
                />
            </label>
            <label>Detalhes:
                <input v-model="novoBrinquedo.detalhes" required placeholder="Outras informações relevantes" />
            </label>
            <div class="btns-form-brinquedo">
                <button type="submit">Salvar</button>
                <button type="button" id="btn-cancelar" @click="cancelarCriacao">Cancelar</button>
            </div>
        </form>
    </div>
</div>

<!-- Modal: Editar Brinquedo -->
<div class="popup-overlay" v-if="mostrarEditar && brinquedoEditando">
    <div class="modal-criar-brinquedo">
        <h2>Editar Brinquedo</h2>
        <form class="form-brinquedo" @submit.prevent="salvarEdicao">
            <label>Nome:
                <input v-model="brinquedoEditando.nome" placeholder="Ex: Carrinho de Controle Remoto" required />
            </label>
            <label>Descrição:
                <input v-model="brinquedoEditando.descricao" placeholder="Descreva o brinquedo brevemente" required />
            </label>
            <label>Categoria: 
                <select v-model="brinquedoEditando.categoria" required>
                    <option disabled value="">Selecione uma categoria</option>
                    <option v-for="cat in categorias" :key="cat.id" :value="cat.nome">{{ cat.nome }}</option>
                </select>
            </label>
            <label>Marca:
                <input v-model="brinquedoEditando.marca" placeholder="Ex: Hot Wheels, LEGO, etc." required />
            </label>
            <label>Imagem:
                <div class="linha-imagem">
                    <input v-model="brinquedoEditando.urlimagem" placeholder="URL da imagem" required />
                    <input v-model="buscaImagemEditar" placeholder="Pesquisar imagem no Google" />
                    <button type="button" @click="pesquisarImagem(buscaImagemEditar)">Pesquisar</button>
                </div>
            </label>
            <label>Preço:
                <input type="number" step="0.01" inputmode="decimal" v-model.number="brinquedoEditando.preco" placeholder="Ex: 99.90" required />
            </label>
            <label>Detalhes:
                <input v-model="brinquedoEditando.detalhes" placeholder="Outras informações relevantes" required />
            </label>
            <div class="btns-form-brinquedo">
                <button type="submit">Salvar Edição</button>
                <button type="button" id="btn-cancelar" @click="mostrarEditar = false">Cancelar</button>
            </div>
        </form>
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

<!-- Pop-up de Sucesso -->
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