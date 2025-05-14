export const Catalogo = {
    data() {
        return {
            categorias: [],
            source: null
        };
    },
    methods: {
        carregarCategorias() {
            fetch("http://localhost:8080/categoria")
                .then(response => response.json())
                .then(data => {
                    this.categorias = data;
                })
                .catch(error => {
                    console.error("Erro ao carregar categorias:", error);
                });
        },
        iniciarAtualizacaoAutomatica() {
            this.source = new EventSource("http://localhost:8080/sse/categoria");
            this.source.addEventListener("atualizacao", () => {
                this.carregarCategorias();
            });
        }
    },
    mounted() {
        this.carregarCategorias();
        this.iniciarAtualizacaoAutomatica();
    },
    beforeUnmount() {
        if (this.source) {
            this.source.close();
        }
    },
    template: `
        <section class="catalogo">
            <h1 id="titulo">Catálogo de Brinquedos</h1>

            <div class="categorias">
                <!--
                <div class="categoria" title="Adicionar Categoria">
                    <p id="add-categoria">+</p>
                </div>
                -->

                <div v-for="categoria in categorias" :key="categoria.id" class="categoria">
                    <div class="card-img-categoria">
                        <img :src="categoria.urlimagem" :alt="categoria.nome" :title="categoria.nome">
                    </div>
                    <p>{{ categoria.nome }}</p>
                </div>
            </div>
        </section>
    `
};
