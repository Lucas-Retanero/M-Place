import { API_URL } from "../config.js";

export const Login = {
  data() {
    return {
      login: { email: '', senha: '' },
      cadastro: {
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        permissao: 1
      },
      erroLogin: '',
      sucessoCriacao: '',
      erroCadastro: '',
      erroRecuperacao: '',
      sucessoRecuperacao: '',
      modoCadastro: false,
      modoRecuperacao: false,
      mostrarSenhaLogin: false,
      mostrarSenhaCadastro: false,
      mostrarSenhaRecuperacao: false,
      carregando: false
    };
  },

  methods: {
    async fazerLogin() {
      this.carregando = true;
      try {
        const response = await fetch(`${API_URL}/usuario/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.login)
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(text || "Usuário ou senha inválidos.");
        }

        const data = await response.json();
        this.erroLogin = '';

        localStorage.setItem("usuarioId", data.usuario.idUsuario);
        localStorage.setItem("usuarioNome", data.usuario.nome);
        localStorage.setItem("permissao", data.usuario.tipo);

        this.$router.push('/home');

      } catch (error) {
        this.erroLogin = error.message;
        localStorage.removeItem("usuarioId");
        localStorage.removeItem("usuarioNome");
        localStorage.removeItem("permissao");
      } finally {
        this.carregando = false;
      }
    },

    async criarUsuario() {
      if (this.cadastro.senha !== this.cadastro.confirmarSenha) {
        this.erroCadastro = "As senhas devem ser iguais.";
        return;
      }

      this.carregando = true;
      try {
        const response = await fetch(`${API_URL}/usuario`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: this.cadastro.nome,
            email: this.cadastro.email,
            senha: this.cadastro.senha,
            permissao: this.cadastro.permissao
          })
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(text || "Erro ao criar usuário.");
        }

        await response.json();
        this.sucessoCriacao = "Usuário criado com sucesso!";
        this.erroCadastro = '';

        this.cadastro = { nome: '', email: '', senha: '', confirmarSenha: '', permissao: 1 };
        this.mostrarSenhaCadastro = false;

        setTimeout(() => {
          this.modoCadastro = false;
          this.sucessoCriacao = '';
        }, 3000);

      } catch (error) {
        this.sucessoCriacao = '';
        this.erroCadastro = error.message;
      } finally {
        this.carregando = false;
      }
    },

    async recuperarSenha() {
      if (this.cadastro.senha !== this.cadastro.confirmarSenha) {
        this.erroRecuperacao = "As senhas devem ser iguais.";
        this.sucessoRecuperacao = '';
        return;
      }

      this.carregando = true;
      try {
        const response = await fetch(`${API_URL}/usuario/recuperar-senha`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: this.login.email,
            novaSenha: this.cadastro.senha
          })
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(text || "Erro ao redefinir senha.");
        }

        await response.json();
        this.sucessoRecuperacao = "Senha redefinida com sucesso.";
        this.erroRecuperacao = '';

        this.login.email = '';
        this.cadastro.senha = '';
        this.cadastro.confirmarSenha = '';
        this.mostrarSenhaCadastro = false;

        setTimeout(() => {
          this.modoRecuperacao = false;
          this.sucessoRecuperacao = '';
        }, 3000);

      } catch (error) {
        this.erroRecuperacao = error.message;
        this.sucessoRecuperacao = '';
      } finally {
        this.carregando = false;
      }
    },

    trocarFormulario(modo) {
      this.modoCadastro = modo === 'cadastro';
      this.modoRecuperacao = modo === 'recuperacao';
      this.erroCadastro = '';
      this.erroLogin = '';
      this.erroRecuperacao = '';
      this.sucessoCriacao = '';
      this.sucessoRecuperacao = '';
      this.login = { email: '', senha: '' };
      this.cadastro = { nome: '', email: '', senha: '', confirmarSenha: '', permissao: 1 };
      this.mostrarSenhaLogin = false;
      this.mostrarSenhaCadastro = false;
      this.mostrarSenhaRecuperacao = false;
    }
  },

  template: `
    <section class="login">
      <div class="wraper">
        <div class="form-header" :class="{'largura-aumentada': modoRecuperacao}">
          <div class="titles">
            <div v-if="!modoCadastro && !modoRecuperacao" class="title-login">Login</div>
            <div v-else-if="modoCadastro" class="title-cadastro">Cadastro</div>
            <div v-else class="title-recuperacao">Recuperar Senha</div>
          </div>
        </div>

        <form v-if="!modoCadastro && !modoRecuperacao" class="form-container login-form" @submit.prevent="fazerLogin">
          <div class="input-box" :class="{ filled: login.email }">
            <input type="email" class="input-field" v-model="login.email" required>
            <label class="label">Email</label>
            <i class="fi fi-rr-envelope" id="icon-login"></i>
          </div>
          <div class="input-box" :class="{ filled: login.senha }">
            <input :type="mostrarSenhaLogin ? 'text' : 'password'" class="input-field" v-model="login.senha" required>
            <label class="label">Senha</label>
            <i class="fi fi-rr-lock" id="icon-login"></i>
          </div>
          <div class="form-cols">
            <div class="col-1">
              <input type="checkbox" id="mostrar-senha" v-model="mostrarSenhaLogin">
              <label for="mostrar-senha">{{ mostrarSenhaLogin ? 'Ocultar Senha' : 'Mostrar Senha' }}</label>
            </div>
            <div class="col-2"><a href="#" @click.prevent="trocarFormulario('recuperacao')">Esqueceu a senha?</a></div>
          </div>
          <div class="input-box">
            <button type="submit" class="btn-submit" :disabled="carregando">
              <span v-if="carregando" class="loader"></span>
              <template v-else>Entrar <i class='bx bx-log-in'></i></template>
            </button>
          </div>
          <p id="msg-erro" v-if="erroLogin">{{ erroLogin }}</p>
          <div class="swith-form">
            <span>Não tem uma conta? <a href="#" @click.prevent="trocarFormulario('cadastro')">Cadastre-se</a></span>
          </div>
        </form>

        <form v-else-if="modoCadastro" class="form-container cadastro-form" @submit.prevent="criarUsuario">
          <div class="input-box" :class="{ filled: cadastro.nome }">
            <input type="text" class="input-field" v-model="cadastro.nome" required>
            <label class="label">Nome</label>
            <i class="fi fi-rs-user" id="icon-login"></i>
          </div>
          <div class="input-box" :class="{ filled: cadastro.email }">
            <input type="email" class="input-field" v-model="cadastro.email" required>
            <label class="label">Email</label>
            <i class="fi fi-rr-envelope" id="icon-login"></i>
          </div>
          <div class="input-box" :class="{ filled: cadastro.senha }">
            <input :type="mostrarSenhaCadastro ? 'text' : 'password'" class="input-field" v-model="cadastro.senha" required>
            <label class="label">Senha</label>
            <i class="fi fi-rr-lock" id="icon-login"></i>
          </div>
          <div class="input-box" :class="{ filled: cadastro.confirmarSenha }">
            <input :type="mostrarSenhaCadastro ? 'text' : 'password'" class="input-field" v-model="cadastro.confirmarSenha" required>
            <label class="label">Confirmar Senha</label>
            <i class="fi fi-rr-lock" id="icon-login"></i>
          </div>
          <div class="form-cols">
            <div class="col-1">
              <input type="checkbox" id="mostrar-senha-cadastro" v-model="mostrarSenhaCadastro">
              <label for="mostrar-senha-cadastro">{{ mostrarSenhaCadastro ? 'Ocultar Senhas' : 'Mostrar Senhas' }}</label>
            </div>
          </div>
          <div class="input-box">
            <button type="submit" class="btn-submit" :disabled="carregando">
              <span v-if="carregando" class="loader"></span>
              <template v-else>Cadastrar <i class='bx bx-log-out'></i></template>
            </button>
          </div>
          <p id="msg-erro" v-if="erroCadastro">{{ erroCadastro }}</p>
          <p id="msg-sucesso" v-if="sucessoCriacao">{{ sucessoCriacao }}</p>
          <div class="swith-form">
            <span>Já tem uma conta? <a href="#" @click.prevent="trocarFormulario('login')">Faça o Login</a></span>
          </div>
        </form>

        <form v-else-if="modoRecuperacao" class="form-container recuperacao-form" @submit.prevent="recuperarSenha">
          <div class="input-box" :class="{ filled: login.email }">
            <input type="email" class="input-field" v-model="login.email" required>
            <label class="label">Email</label>
            <i class="fi fi-rr-envelope" id="icon-login"></i>
          </div>
          <div class="input-box" :class="{ filled: cadastro.senha }">
            <input :type="mostrarSenhaCadastro ? 'text' : 'password'" class="input-field" v-model="cadastro.senha" required>
            <label class="label">Nova Senha</label>
            <i class="fi fi-rr-lock" id="icon-login"></i>
          </div>
          <div class="input-box" :class="{ filled: cadastro.confirmarSenha }">
            <input :type="mostrarSenhaCadastro ? 'text' : 'password'" class="input-field" v-model="cadastro.confirmarSenha" required>
            <label class="label">Confirmar Nova Senha</label>
            <i class="fi fi-rr-lock" id="icon-login"></i>
          </div>
          <div class="form-cols">
            <div class="col-1">
              <input type="checkbox" id="mostrar-senha-recuperacao" v-model="mostrarSenhaCadastro">
              <label for="mostrar-senha-recuperacao">{{ mostrarSenhaCadastro ? 'Ocultar Senhas' : 'Mostrar Senhas' }}</label>
            </div>
          </div>
          <div class="input-box">
            <button type="submit" class="btn-submit" :disabled="carregando">
              <span v-if="carregando" class="loader"></span>
              <template v-else>Redefinir Senha <i class='bx bx-reset'></i></template>
            </button>
          </div>
          <p id="msg-erro" v-if="erroRecuperacao">{{ erroRecuperacao }}</p>
          <p id="msg-sucesso" v-if="sucessoRecuperacao">{{ sucessoRecuperacao }}</p>
          <div class="swith-form">
            <span>Lembrou sua senha? <a href="#" @click.prevent="trocarFormulario('login')">Voltar ao Login</a></span>
          </div>
        </form>
      </div>
    </section>
  `
};