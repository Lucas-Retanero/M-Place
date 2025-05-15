export const Home = {
    data() {
        return {
            brinquedos: [],
            source: null
        };
    },
    methods: {
        carregarBrinquedos() {
            fetch("http://localhost:8080/brinquedo")
                .then(response => response.json())
                .then(data => {
                    this.brinquedos = data;
                })
                .catch(error => {
                    console.error("Erro ao carregar brinquedos:", error);
                });
        },
        iniciarAtualizacaoAutomatica() {
            this.source = new EventSource("http://localhost:8080/sse/brinquedo");
            this.source.addEventListener("atualizacao", () => {
                this.carregarBrinquedos();
            });
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
            <h1 id="titulo">Brinquedos em Destaque</h1>

            <div class="destaques">
                <div v-for="brinquedo in brinquedos" :key="brinquedo.id" class="card-brinquedo">
                    <div class="img-brinquedo">
                        <img :src="brinquedo.urlimagem" :alt="brinquedo.nome" :title="brinquedo.nome">
                    </div>
                    <p id="descricao-brinquedo">{{ brinquedo.descricao }}</p>
                    <div class="preco-brinquedo">
                        <p id="dinheiro">R$ {{ brinquedo.preco.toFixed(2) }}</p>
                        <p id="pix">R$ {{ (brinquedo.preco * 0.9).toFixed(2) }} no PIX</p>
                    </div>
                    <button id="btn-comprar">Comprar</button>
                </div>
            </div>

            <p v-if="brinquedos.length === 0" id="sem-brinquedos">Ops! Por enquanto, nenhum brinquedo foi cadastrado no sistema.</p>
        </section>
    `
};
