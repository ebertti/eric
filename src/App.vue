<template>
  <v-app>
    <v-main class="white">
      <v-container>
        <v-row align="center">
          <v-col cols="12"
                 sm="6"
                 class="mb-5 mb-sm-0">
            <div class="d-block text-h2 title--text mb-5 gochi-hand-regular">Falae pessoal,<br />aqui é o Eric!</div>
            <div class="d-block my-5">
              A grande pergunta que você deve estar se fazendo:

              <h3 class="my-3">resposta: Ainda não :)</h3>

              Ainda estou na barriga da mamãe 🤰, mas já dá pra ver que sou a carinha do papai 🦸‍️.
              E tá tudo bem, porque a mamãe acha o papai lindo 😍, como ela mesma diz o tempo todo.
            </div>
            <div class="my-5">
              Devo chegar lá pelo dia 15 de julho. No hospital Gloria D’Or, no Rio de Janeiro.
              Vou ser um dos poucos cariocas com bom gosto, grêmista de berço 🇪🇪.
            </div>
            <div class="d-block my-5">
              <h3>Links úteis</h3>
              <v-list class="list">
                <v-list-item class="item">
                  Perinatal no Glória D’or: <a href="https://www.instagram.com/grupo.perinatal/">@grupo.perinatal</a>
                </v-list-item>
                <v-list-item>
                  Equipe Nascer Carioca: <a href="https://www.instagram.com/nascercarioca/">@nascercarioca</a>
                </v-list-item>
                <v-list-item>
                  Fotografa do ensaio: <a href="https://www.instagram.com/tatifelixfotografia/">@tatifelixfotografia</a>
                </v-list-item>
                <v-list-item>
                  Fotografa do parto: <a href="https://www.instagram.com/beatrizmarquesfotografia/">@beatrizmarquesfotografia</a>
                </v-list-item>
              </v-list>
            </div>
          </v-col>
          <v-col sm="6">
            <v-carousel cycle hide-delimiters>
              <v-carousel-item v-for="foto in fotos" :src="foto.src"></v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <h2 class="d-block pa-5 mb-5 gochi-hand-regular bg-eric rounded-5 text-center">Meus Novos Amigos</h2>
        <ul class="cloud">
          <li v-for="amigo in amigos"><a :data-weight="amigo.tamanho">{{ amigo.nome }}</a></li>
        </ul>

      </v-container>


      <v-container class="bg-orange-lighten-4">
        Como você pode imaginar, vou precisar de muitas fraldas nesses primeiros anos de vida. Então, se quiser ajudar
        minha mamãe e meu papai, veja a listinha de fraldas e faça um pix 🙊
      </v-container>

      <v-container>
            <h2 class="d-block pa-5 mb-5 gochi-hand-regular bg-eric rounded-5 text-center">Minha Listinha</h2>
        <v-row>
          <v-col cols="12"
                 md="4"
                 sm="6"
                 v-for="presente in presentes"
                 :key="presente.nome">
            <presente :presente="presente"></presente>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer app
              class="button py-0 bg-grey-lighten-4"
              v-if="valor">
      <v-container>
        <v-row>
          <v-col cols="12"
                 class="d-flex flex-column flex-sm-row">
            <div class="flex-grow-1  mr-sm-2 rounded text-center">
              <span class="d-inline-block  font-weight-bold">{{ total }}</span>
            </div>
            <v-btn class="mb-2 mb-md-0 mr-2 white--text font-weight-bold"
                   color="green"
                   elevation="0"
                   @click="linkPix">Fazer um Pix</v-btn>
            <v-btn class="mb-2 mb-md-0 mr-md-2 font-weight-bold"
                   color="grey-lighten-2"
                   outlined
                   elevation="0"
                   @click="limparCarrinho">Esvaziar Carrinho</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
  <v-dialog
      v-model="modalPix"
      transition="dialog-bottom-transition"
  >
  <template v-slot:default="{ isActive }">
    <v-card title="Pix">
      <v-card-text align="center">
        <v-img :src="qrcode"
               max-height="300px"></v-img>
        <v-form>
          <v-text-field label="deixa uma mensagem"
                        v-model="mensagem"
                        maxlength="50"
                        counter
                        @keyup="gerar_qrcode"></v-text-field>
        </v-form>
        <span class="d-block mb-3">
          {{ total }}
        </span>

          <v-textarea ref="cc"
                      v-model="copia"
                      label="Não suportado, copie diretamente por aqui:"
                      readonly></v-textarea>
        <v-btn v-if="isSupported"
               color="eric"
               @click="copiar">Copiar Código Pix</v-btn>

      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat
               text="Fechar"
               color="grey-lighten-2"
               @click="isActive.value = false"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
  </v-dialog>
  <v-snackbar
      v-model="resultado_copia"
  >
      {{ resultado_copia }}

      <template v-slot:actions>
        <v-btn
            color="red"
            variant="text"
            @click="resultado_copia = null"
        >
          fechar
        </v-btn>
      </template>
  </v-snackbar>
</template>

<script>

import {useClipboard} from '@vueuse/core'
import Presente from "./components/Presente.vue"
import {moeda} from "./filter.js"
import {QrCodePix} from 'qrcode-pix';

export default {
  name: 'App',
  components: {
    Presente
  },
  data: () => ({
    amigos: [],
    modalPix: false,
    qrcode: null,
    copia: null,
    isSupported: true,
    mensagem: "",
    resultado_copia: false,
    presentes: [
      {nome: 'Pampers Premium Care P 40', icone: 'premiumP40.jpg', qtd: 0, valor: 64.90},
      {nome: 'Pampers Premium Care M 80', icone: 'premiumM80.jpg', qtd: 0, valor: 119.90},
      {nome: 'Pampers Premium Care G 30', icone: 'premiumG30.jpg', qtd: 0, valor: 74.90},
      {nome: 'Pampers Premium Care XG 26', icone: 'premiumXG26.jpg', qtd: 0, valor: 68.90},
    ],
    fotos: [
      {src: "casal.jpg"},
      {src: "IMG_3402-pra-postar.jpg"},
      {src: "IMG_3422-pra-postar.jpg"},
      {src: "IMG_3431-pra-postar.jpg"},
      {src: "IMG_3444-pra-postar.jpg"},
      {src: "IMG_3464-pra-postar.jpg"},
      {src: "IMG_3488-pra-postar.jpg"},
      {src: "IMG_3535-pra-postar.jpg"},
      {src: "IMG_3539-pra-postar.jpg"},
      {src: "IMG_3571-pra-postar.jpg"},
      {src: "IMG_3585-pra-postar.jpg"},
    ]
  }),

  computed: {
    valor() {
      return this.presentes.reduce((a, i) => a + (i.qtd * i.valor), 0)
    },
    total() {
      return moeda(this.valor)
    },
  },

  mounted(){
    fetch('https://script.google.com/macros/s/AKfycbyWiRX5gPNWkGQc-7k0FldRLLBahXffHErDuKM6eiBcE09IKT6OAon7vEhZjSTWUiFhHQ/exec', {mode: 'no-cors'})
        .then(response => response.json())
        .then(data => this.amigos = data.data)

    if(this.amigos.length === 0 ){
        this.amigos = [
          {"nome": "Ariel S","tamanho": 2},
          {"nome": "Felipe W", "tamanho": 2},
          {"nome": "Dalvo R", "tamanho": 2},
          {"nome": "Rodrigo S", "tamanho": 5},
          {"nome": "Patrick","tamanho": 1},
          {"nome": "PS", "tamanho": 2},
          {"nome": "Matheus","tamanho": 1}
      ]
    }
  },


  methods: {
    async gerar_qrcode() {
      const code = QrCodePix({
        version: '01',
        key: '1c02f9b8-d322-4287-a258-62599f63756f', //or any PIX key
        name: 'Ezequiel Bertti',
        city: 'Rio de Janeiro',
        // transactionId: 'bb', //max 25 characters
        message: this.mensagem,
        cep: '22280010',
        value: this.valor,
      });
      this.qrcode = await code.base64()
      this.copia = code.payload()
    },
    limparCarrinho() {
      this.qrcode = null
      this.copia = null
      this.presentes.forEach((i) => i.qtd = 0)
    },
    linkPix() {
      this.gerar_qrcode()
      this.modalPix = true
    },
    copiar() {
      navigator.clipboard.writeText(this.copia)
      const {text, copy, copied, isSupported} = useClipboard({source: this.copia})
      this.isSupported = isSupported
      console.log(text.value)
      if (copied) {
        this.resultado_copia = "Abra o app do seu banco, e cole o pix"
      }
    }
  },
}
</script>

<style>

ul.cloud {
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  line-height: 2.75rem;
  width: 100%;
}

ul.cloud a {
  /*
  Not supported by any browser at the moment :(
  --size: attr(data-weight number);
  */
  --size: 4;
  --color: #a33;
  color: var(--color);
  font-size: calc(var(--size) * 0.25rem + 0.5rem);
  display: block;
  padding: 0.125rem 0.25rem;
  position: relative;
  text-decoration: none;
  /*
  For different tones of a single color
  opacity: calc((15 - (9 - var(--size))) / 15);
  */
}

ul.cloud a[data-weight="1"] { --size: 2; }
ul.cloud a[data-weight="2"] { --size: 3; }
ul.cloud a[data-weight="3"] { --size: 4; }
ul.cloud a[data-weight="4"] { --size: 5; }
ul.cloud a[data-weight="5"] { --size: 7; }
ul.cloud a[data-weight="6"] { --size: 9; }
ul.cloud a[data-weight="7"] { --size: 11; }
ul.cloud a[data-weight="8"] { --size: 14; }
ul.cloud a[data-weight="9"] { --size: 17; }

ul[data-show-value] a::after {
  content: " (" attr(data-weight) ")";
  font-size: 1rem;
}

ul.cloud li:nth-child(2n+1) a { --color: #181; }
ul.cloud li:nth-child(3n+1) a { --color: #33a; }
ul.cloud li:nth-child(4n+1) a { --color: #c38; }

ul.cloud a:focus {
  outline: 1px dashed;
}

ul.cloud a::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  width: 0;
  height: 100%;
  background: var(--color);
  transform: translate(-50%, 0);
  opacity: 0.15;
  transition: width 0.25s;
}

ul.cloud a:focus::before,
ul.cloud a:hover::before {
  width: 100%;
}

@media (prefers-reduced-motion) {
  ul.cloud * {
    transition: none !important;
  }
}

</style>
