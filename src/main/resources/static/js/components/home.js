export const Home = {
    data() {
        return {
            brinquedos: [],
            source: null,
            selectedBrinquedo: null,
            carregando: true,
            limiteExibicao: 8
        };
    },
    computed: {
        brinquedosExibidos() {
            const brinquedosAgrupados = {};
            this.brinquedos.forEach(brinquedo => {
                if (!brinquedosAgrupados[brinquedo.categoria]) {
                    brinquedosAgrupados[brinquedo.categoria] = [];
                }
                brinquedosAgrupados[brinquedo.categoria].push(brinquedo);
            });

            let brinquedosProcessados = [];
            for (const categoria in brinquedosAgrupados) {
                brinquedosProcessados = brinquedosProcessados.concat(brinquedosAgrupados[categoria].slice(0, 3));
            }

            for (let i = brinquedosProcessados.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [brinquedosProcessados[i], brinquedosProcessados[j]] = [brinquedosProcessados[j], brinquedosProcessados[i]];
            }

            return brinquedosProcessados.slice(0, this.limiteExibicao);
        },
        temMaisParaMostrar() {
            return this.limiteExibicao < this.brinquedos.length;
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
        },
        mostrarMais() {
            this.limiteExibicao += 8;
        },
        mostrarMenos() {
            this.limiteExibicao = 8;
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

            <template v-else>
                <div class="destaques">
                    <p v-if="carregando">Carregando brinquedos...</p>
                    <div
                        v-else-if="brinquedosExibidos.length > 0"
                        v-for="brinquedo in brinquedosExibidos"
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
                    <p v-else id="sem-brinquedos">
                        Ops! Por enquanto, nenhum brinquedo foi cadastrado no sistema.
                    </p>
                </div>

                <div class="controles-exibicao" v-if="!carregando && brinquedos.length > 8">
                    <button v-if="temMaisParaMostrar" @click="mostrarMais" class="btn-ver-mais">
                        Ver Mais <i class="fi fi-rr-plus"></i>
                    </button>
                    <button v-if="limiteExibicao > 8" @click="mostrarMenos" class="btn-ver-menos">
                        Ver Menos <i class="fi fi-rr-minus"></i>
                    </button>
                </div>
            </template>
        </section>
    `
};