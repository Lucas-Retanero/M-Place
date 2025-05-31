export const Catalogo = {
    data() {
        return {
            categorias: [],
            brinquedos: [],
            sourceCategorias: null,
            sourceBrinquedos: null,
            categoriaSelecionada: null,
            selectedBrinquedo: null,
            buscouBrinquedos: false,
            carregandoCategorias: true 
        };
    },
    methods: {
        async carregarCategorias() {
            this.carregandoCategorias = true;
            try {
                const response = await fetch("http://localhost:8080/categoria");
                this.categorias = await response.json();
            } catch (error) {
                console.error("Erro ao carregar categorias:", error);
            } finally {
                this.carregandoCategorias = false;
            }
        },

        async carregarBrinquedosPorCategoria(nomeCategoria) {
            try {
                const response = await fetch(`http://localhost:8080/brinquedo/categoria/${encodeURIComponent(nomeCategoria)}`);
                if (!response.ok) throw new Error("Erro ao buscar brinquedos");
                this.brinquedos = await response.json();
            } catch (error) {
                console.error("Erro ao carregar brinquedos da categoria:", error);
                this.brinquedos = [];
            } finally {
                this.buscouBrinquedos = true;
            }
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
        voltarParaCategorias() {
            this.categoriaSelecionada = null;
            this.selectedBrinquedo = null;
            this.brinquedos = [];
            this.buscouBrinquedos = false;
        },
        selecionarCategoria(categoria) {
            this.categoriaSelecionada = categoria.nome;
            this.carregarBrinquedosPorCategoria(categoria.nome);
        },
        verDetalhes(brinquedo) {
            this.selectedBrinquedo = brinquedo;
        },
        voltarParaLista() {
            this.selectedBrinquedo = null;
        }
    },
    mounted() {
        this.carregarCategorias();
        this.iniciarAtualizacaoAutomatica();
    },

    beforeUnmount() {
        if (this.sourceCategorias) this.sourceCategorias.close();
        if (this.sourceBrinquedos) this.sourceBrinquedos.close();
    },

    template: `
    <section class="catalogo">
    <h1 id="titulo">
        Catálogo de Brinquedos
        <span v-if="categoriaSelecionada && !selectedBrinquedo"> - Brinquedos da categoria: {{ categoriaSelecionada }}</span>
        <span v-if="selectedBrinquedo"> - Detalhes do Brinquedo</span>
    </h1>

    <div id="btn-voltar" v-if="categoriaSelecionada">
        <button @click="selectedBrinquedo ? voltarParaLista() : voltarParaCategorias()">
        <i class="fi fi-rr-arrow-small-left"></i> Voltar
        </button>
    </div>


    <div class="categorias" v-if="!categoriaSelecionada">
        <div 
            v-for="categoria in categorias" 
            :key="categoria.id || categoria.nome" 
            class="categoria" 
            @click="selecionarCategoria(categoria)"
        >
            <div class="card-img-categoria">
                <img :src="categoria.urlimagem" :alt="categoria.nome" :title="categoria.nome" />
            </div>
            <p>{{ categoria.nome }}</p>
        </div>
    </div>

    <p v-if="!carregandoCategorias && categorias.length === 0" id="sem-brinquedos">
        Ops! Por enquanto, nenhuma categoria foi cadastrada no sistema.
    </p>

    <div class="destaques" v-if="categoriaSelecionada && !selectedBrinquedo && brinquedos.length > 0">

            <div 
                v-for="brinquedo in brinquedos" 
                :key="brinquedo.id || brinquedo.nome" 
                class="card-brinquedo" 
                @click="verDetalhes(brinquedo)"
            >
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


        <p v-if="buscouBrinquedos && brinquedos.length === 0" id="sem-brinquedos">
            Ops! Por enquanto, nenhum brinquedo foi cadastrado para a categoria '{{ categoriaSelecionada }}'.
        </p>
    </div>

    <!-- Tela de detalhes -->
    <div v-if="selectedBrinquedo" class="select-brinquedo">
        <div class="conteiner-brinquedo-top">
            <img 
                id="img-brinquedo-selecionado" 
                :src="selectedBrinquedo.urlimagem" 
                :alt="selectedBrinquedo.nome"
            >
            <div class="info-brinquedo">
                <h3 id="descricao-brinquedo-detalhes">{{ selectedBrinquedo.descricao }}</h3>
                <div class="preco-brinquedo-detalhes">
                    <p id="dinheiro-detalhes">Preço: R$ {{ selectedBrinquedo.preco.toFixed(2) }}</p>
                    <p id="pix-detalhes">PIX: R$ {{ (selectedBrinquedo.preco * 0.9).toFixed(2) }} (à vista)</p>
                </div>
                <button id="btn-comprar-detalhes">
                    <i class="fi fi-sr-shopping-cart"></i> Comprar
                </button>
            </div>
        </div>

        <div class="conteiner-brinquedo-bottom">
            <div class="info-card">
                <h4>Nome:</h4>
                <p>{{ selectedBrinquedo.nome }}</p>
            </div>
            <div class="info-card">
                <h4>Detalhes:</h4>
                <p>{{ selectedBrinquedo.detalhes }}</p>
            </div>
            <div class="info-card">
                <h4>Marca:</h4>
                <p>{{ selectedBrinquedo.marca }}</p>
            </div>
            <div class="info-card">
                <h4>Categoria:</h4>
                <p>{{ selectedBrinquedo.categoria }}</p>
            </div>
        </div>
    </div>
</section>

    `
};
