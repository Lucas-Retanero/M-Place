export const Home = {
    data() {
        //variáveis
    },
    methods: {
        
    },
    template: `
    
	<section class="home">
			<h1 id="titulo-home">Brinquedos em Destaque</h1>

			<div class="destaques">

				<div class="card-brinquedo">
					<div class="img-brinquedo">
						<img src="https://superlegalbrinquedos.vtexassets.com/arquivos/ids/228379-800-auto?v=638429965434500000&width=800&height=auto&aspect=true" alt="Brinquedo 1" title="Brinquedo 1">
					</div>
					<p id="descricao-brinquedo">LEGO Minecraft - Expedição do Steve ao Deserto - 75 Peças - 21251</p>
					<div class="preco-brinquedo">
						<p id="dinheiro">R$ 99,99</p>
						<p id="pix">R$ 89,99 no PIX</p>
					</div>
					<button id="btn-comprar">Comprar</button>
				</div>

			</div>
	</section>

    `,
};