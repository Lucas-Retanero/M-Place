export const Home = {
    data() {
        return {
            brinquedos: [],
            source: null,
            selectedBrinquedo: null,
            carregando: true 
        };
    },
    methods: {
        carregarBrinquedos() {
            this.carregando = true; // <- começa carregando
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
            <h1 id="titulo">Brinquedos em Destaque <span v-if="selectedBrinquedo"> - {{ selectedBrinquedo.nome }}</span></h1>
            <div id="btn-voltar" v-if="selectedBrinquedo">
                <button @click="voltarParaLista"><i class="fi fi-rr-arrow-small-left"></i> Voltar</button>
            </div>
            <!-- Tela de detalhes -->
            <div v-if="selectedBrinquedo" class="select-brinquedo">
                <div class="conteiner-brinquedo-top">
                    <img id="img-brinquedo-selecionado" :src="selectedBrinquedo.urlimagem" :alt="selectedBrinquedo.nome">
                    <div class="info-brinquedo">
                        <h3 id="descricao-brinquedo-detalhes">{{ selectedBrinquedo.descricao }}</h3>
                        <div class="preco-brinquedo-detalhes">
                            <p id="dinheiro-detalhes">Preço: R$ {{ selectedBrinquedo.preco.toFixed(2) }}</p>
                            <p id="pix-detalhes">PIX: R$ {{ (selectedBrinquedo.preco * 0.9).toFixed(2) }} (à vista)</p>
                        </div>
                        <button id="btn-comprar-detalhes"><i class="fi fi-sr-shopping-cart"></i>Comprar</button>
                    </div>
                </div>
                <div class="conteiner-brinquedo-bottom">
                    <p id="detalhes-brinquedo">Detalhes sobre o brinquedo:</p>
                </div>
            </div>

            <!-- Lista de brinquedos -->
            <div v-else class="destaques">
                <div v-for="brinquedo in brinquedos" :key="brinquedo.id" class="card-brinquedo" @click="verDetalhes(brinquedo)">
                    <div class="img-brinquedo">
                        <img :src="brinquedo.urlimagem" :alt="brinquedo.nome" :title="brinquedo.nome">
                    </div>
                    <p id="descricao-brinquedo">{{ brinquedo.descricao }}</p>
                    <div class="preco-brinquedo">
                        <p id="dinheiro">R$ {{ brinquedo.preco.toFixed(2) }}</p>
                        <p id="pix">R$ {{ (brinquedo.preco * 0.9).toFixed(2) }} no PIX</p>
                    </div>
                    <button id="btn-comprar"><i class="fi fi-sr-shopping-cart"></i>Comprar</button>
                </div>
            </div>

            <p v-if="!selectedBrinquedo && !carregando && brinquedos.length === 0" id="sem-brinquedos">
                Ops! Por enquanto, nenhum brinquedo foi cadastrado no sistema.
            </p>
        </section>
    `
};
