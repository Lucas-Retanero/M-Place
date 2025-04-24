export const Home = {
    data() {
        return {
            brinquedos: []
        };
    },
    mounted() {
        this.carregarBrinquedos();
        this.iniciarAtualizacaoAutomatica();
    },
	mounted() {
		this.carregarBrinquedos();
	
		const source = new EventSource("http://localhost:8080/sse/brinquedos");
		source.addEventListener("atualizacao", () => {
		  this.carregarBrinquedos();
		});
	  },
    template: `
        <section class="home">
            <h1 id="titulo-home">Brinquedos em Destaque</h1>

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
        </section>
    `
};
