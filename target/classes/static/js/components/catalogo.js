export const Catalogo = {
    data() {
        return {
            categorias: [],
            brinquedos: [],
            sourceCategorias: null,
            sourceBrinquedos: null,
            categoriaSelecionada: null,
            buscouBrinquedos: false,
            carregandoCategorias: true 
        };
    },
    methods: {
        carregarCategorias() {
            this.carregandoCategorias = true;
            fetch("http://localhost:8080/categoria")
                .then(response => response.json())
                .then(data => {
                    this.categorias = data;
                    this.carregandoCategorias = false;
                })
                .catch(error => {
                    console.error("Erro ao carregar categorias:", error);
                    this.carregandoCategorias = false;
                });
        },
        carregarBrinquedosPorCategoria(nomeCategoria) {
            fetch(`http://localhost:8080/brinquedo/categoria/${encodeURIComponent(nomeCategoria)}`)
                .then(response => {
                    if (!response.ok) throw new Error("Erro ao buscar brinquedos");
                    return response.json();
                })
                .then(data => {
                    this.brinquedos = data;
                    this.buscouBrinquedos = true;
                })
                .catch(error => {
                    console.error("Erro ao carregar brinquedos da categoria:", error);
                    this.brinquedos = [];
                    this.buscouBrinquedos = true;
                });
        },
        iniciarAtualizacaoAutomatica() {
            this.sourceCategorias = new EventSource("http://localhost:8080/sse/categoria");
            this.sourceCategorias.addEventListener("atualizacao", () => {
                this.carregarCategorias();
                this.$forceUpdate();
            });

            this.sourceBrinquedos = new EventSource("http://localhost:8080/sse/brinquedo");
            this.sourceBrinquedos.addEventListener("atualizacao", () => {
                if (this.categoriaSelecionada) {
                    this.carregarBrinquedosPorCategoria(this.categoriaSelecionada);
                    this.$forceUpdate();
                }
            });
        },
        selecionarCategoria(categoria) {
            this.categoriaSelecionada = categoria.nome;
            this.carregarBrinquedosPorCategoria(categoria.nome);
        }
    },
    mounted() {
        this.carregarCategorias();
        this.iniciarAtualizacaoAutomatica();
    },
    beforeUnmount() {
        if (this.sourceCategorias) {
            this.sourceCategorias.close();
        }
        if (this.sourceBrinquedos) {
            this.sourceBrinquedos.close();
        }
    },
    template: `
    <section class="catalogo">
        <h1 id="titulo">Catálogo de Brinquedos<span v-if="categoriaSelecionada"> - Brinquedos da categoria: {{ categoriaSelecionada }}</span></h1>

        <div class="categorias" v-if="!categoriaSelecionada">
            <div v-for="categoria in categorias" :key="categoria.id || categoria.nome" class="categoria" @click="selecionarCategoria(categoria)">
                <div class="card-img-categoria">
                    <img :src="categoria.urlimagem" :alt="categoria.nome" :title="categoria.nome" />
                </div>
                <p>{{ categoria.nome }}</p>
            </div>
            <p v-if="!carregandoCategorias && categorias.length === 0" id="sem-brinquedos">Ops! Por enquanto, nenhuma categoria foi cadastrada no sistema.</p>
        </div>

        <div id="btn-voltar">
            <button v-if="categoriaSelecionada" @click="categoriaSelecionada = null; brinquedos = []; buscouBrinquedos = false;"><i class="fi fi-rr-arrow-small-left"></i> Voltar</button>
        </div>
        <div v-if="categoriaSelecionada">
            <div class="destaques" v-if="brinquedos.length > 0">
                <div v-for="brinquedo in brinquedos" :key="brinquedo.id || brinquedo.nome" class="card-brinquedo">
                    <div class="img-brinquedo">
                        <img :src="brinquedo.urlimagem" :alt="brinquedo.nome" :title="brinquedo.nome" />
                    </div>
                    <p id="descricao-brinquedo">{{ brinquedo.descricao }}</p>
                    <div class="preco-brinquedo">
                        <p id="dinheiro">R$ {{ brinquedo.preco.toFixed(2) }}</p>
                        <p id="pix">R$ {{ (brinquedo.preco * 0.9).toFixed(2) }} no PIX</p>
                    </div>
                    <button id="btn-comprar"><i class="fi fi-sr-shopping-cart"></i>Comprar</button>
                </div>
            </div>

            <p v-if="buscouBrinquedos && brinquedos.length === 0" id="sem-brinquedos">Ops! Por enquanto, nenhum brinquedo foi cadastrado para a categoria '{{ categoriaSelecionada }}'.</p>

        </div>
    </section>
    `
};
