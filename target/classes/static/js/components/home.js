export const Home = {
    data() {
        return {
            brinquedos: [],
            source: null,
            selectedBrinquedo: null,
            carregando: true
        };
    },
    computed: {
        brinquedosFiltradosPorCategoria() {
            const brinquedosAgrupados = {};
            this.brinquedos.forEach(brinquedo => {
                if (!brinquedosAgrupados[brinquedo.categoria]) {
                    brinquedosAgrupados[brinquedo.categoria] = [];
                }
                brinquedosAgrupados[brinquedo.categoria].push(brinquedo);
            });

            let brinquedosLimitados = [];
            for (const categoria in brinquedosAgrupados) {
                brinquedosLimitados = brinquedosLimitados.concat(brinquedosAgrupados[categoria].slice(0, 3));
            }

            for (let i = brinquedosLimitados.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [brinquedosLimitados[i], brinquedosLimitados[j]] = [brinquedosLimitados[j], brinquedosLimitados[i]];
            }
            return brinquedosLimitados;
        }
    },
    methods: {
        carregarBrinquedos() {
            this.carregando = true;
            fetch("http://localhost:8080/brinquedo")
                .then(response => response.json())
                .then(data => {
                    this.brinquedos = data;
                })
                .catch(error => {
                    console.error("Erro ao carregar brinquedos:", error);
                })
                .finally(() => {
                    this.carregando = false;
                });
        },
        iniciarAtualizacaoAutomatica() {
            this.source = new EventSource("http://localhost:8080/sse/brinquedo");
            this.source.addEventListener("atualizacao", () => {
                this.carregarBrinquedos();
            });
        },
        verDetalhes(brinquedo) {
            this.selectedBrinquedo = brinquedo;
        },
        voltarParaLista() {
            this.selectedBrinquedo = null;
        }
    },
    mounted() {
        this.carregarBrinquedos();
        this.iniciarAtualizacaoAutomatica();
    },
    beforeUnmount() {
        if (this.source) {
            this.source.close();
        }
    },
    template: `
        <section class="home">
            <h1 id="titulo">
                Brinquedos em Destaque 
                <span v-if="selectedBrinquedo"> - {{ selectedBrinquedo.nome }}</span>
            </h1>
            <div id="btn-voltar" v-if="selectedBrinquedo">
                <button @click="voltarParaLista">
                    <i class="fi fi-rr-arrow-small-left"></i> Voltar
                </button>
            </div>
            <div v-if="selectedBrinquedo" class="select-brinquedo">
                <div class="conteiner-brinquedo-top">
                    <img 
                        id="img-brinquedo-selecionado" 
                        :src="selectedBrinquedo.urlimagem" 
                        :alt="selectedBrinquedo.nome"
                    >
                    <div class="info-brinquedo">
                        <h3 id="descricao-brinquedo-detalhes">
                            {{ selectedBrinquedo.descricao }}
                        </h3>
                        <div class="preco-brinquedo-detalhes">
                            <p id="dinheiro-detalhes">
                                Preço: R$ {{ selectedBrinquedo.preco.toFixed(2) }}
                            </p>
                            <p id="pix-detalhes">
                                PIX: R$ {{ (selectedBrinquedo.preco * 0.9).toFixed(2) }} (à vista)
                            </p>
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
            <div v-else class="destaques">
                <p v-if="carregando">Carregando brinquedos...</p>
                <div 
                    v-else-if="brinquedosFiltradosPorCategoria.length > 0"
                    v-for="brinquedo in brinquedosFiltradosPorCategoria" 
                    :key="brinquedo.id" 
                    class="card-brinquedo" 
                    @click="verDetalhes(brinquedo)"
                >
                    <div class="img-brinquedo">
                        <img 
                            :src="brinquedo.urlimagem" 
                            :alt="brinquedo.nome" 
                            :title="brinquedo.nome"
                        >
                    </div>
                    <p id="descricao-brinquedo">{{ brinquedo.descricao }}</p>
                    <div class="preco-brinquedo">
                        <p id="dinheiro">
                            R$ {{ brinquedo.preco.toFixed(2) }}
                        </p>
                        <p id="pix">
                            R$ {{ (brinquedo.preco * 0.9).toFixed(2) }} no PIX
                        </p>
                    </div>
                    <button id="btn-comprar">
                        <i class="fi fi-sr-shopping-cart"></i> Comprar
                    </button>
                </div>
                <p 
                    v-else 
                    id="sem-brinquedos"
                >
                    Ops! Por enquanto, nenhum brinquedo foi cadastrado no sistema.
                </p>
            </div>
        </section>
    `
};