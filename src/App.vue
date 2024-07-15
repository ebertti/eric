<template>
  <v-app>
    <v-main class="white">
      <v-container>
        <v-row align="center">
          <v-col cols="12" sm="6" class="mb-5 mb-sm-0">
            <div class="d-block text-h2 title--text mb-5 gochi-hand-regular">Falae pessoal,<br />aqui é o Eric!</div>
            <div class="d-block my-5">
              Cheguei 13/07/2024 as 9h45 com 2,715kg com 45cm
              Já fiz meu primeiro commit e deploy. Passei em todos os testes unitários da maternidade.
              O CI/CD não funcinou como esperado. O trabalho de parto demorou 48h. Mas L3 foi acionado e tudo foi resolvido com um
              hot-fix em produção. Papai falou que sou junior mas com coragem de senior. 
              Mamãe queria que eu fosse a cara do papai, mas como não sou bobo, vim a cara da mamãe.
              Papai tem até seu charme. Mas minha mamãe que é linda.
            </div>
            <div class="d-block my-5 bg-orange-lighten-4">
              <h3>Relato da mamãe</h3>
              Eric nasceu às 9:45 do dia 13/07 com 45 cm 2.715 kg após 39 longas semanas de gestação rs 
As contrações começaram no dia 11 logo que pegamos minha mae no aeroporto, na linha vermelha por volta de 7 da manhã 
Ele estava só esperando a vovó chegar 
Depois de mais de 48h entre trabalho de parto latente e ativo a bolsa não havia estourado ainda com 6 cm de dilatação.
Então a médica a rompeu e havia mecônio. Foi preciso uma cesárea de emergência pq alem disso, os batimentos cardíacos dele estavam diminuindo.
Foi frustrante não conseguir o parto vaginal após sofrer por 48h mas no final foi lindo. Valeu a pena o processo. 
Eric nasceu lindo e saudável, e se parece com a mamãe. Papai Ezequiel foi um parceiro incrível nessa jornada, que sorte a nossa. Obrigada também a equipe @nascercarioca e @beatrizmarquesfotografia.
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
        <ul v-if="amigos.length >= 1" class="cloud" >
          <li v-for="amigo in amigos"><a :data-weight="amigo.tamanho">{{ amigo.nome }}</a></li>
        </ul>
        <v-progress-linear v-else color="eric" indeterminate></v-progress-linear>
      </v-container>
      <v-container class="bg-orange-lighten-4">
        Como você pode imaginar, vou precisar de muitas fraldas nesses primeiros anos de vida. Então, se quiser ajudar
        minha mamãe e meu papai, veja a listinha de fraldas e faça um pix 🙊
      </v-container>
      <v-container>
            <h2 class="d-block pa-5 mb-5 gochi-hand-regular bg-eric rounded-5 text-center">Minha Listinha</h2>
        <v-row>
          <v-col
              cols="12"
              md="4"
              sm="6"
              v-for="presente in presentes"
              :key="presente.nome">
            <presente :presente="presente"></presente>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer
        app
        class="button py-0 bg-grey-lighten-4"
        v-if="valor">
      <v-container>
        <v-row>
          <v-col
              cols="12"
              class="d-flex flex-column flex-sm-row">
            <div class="flex-grow-1  mr-sm-2 rounded text-center">
              <span class="d-inline-block  font-weight-bold">{{ total }}</span>
            </div>
            <v-btn
                class="mb-2 mb-md-0 mr-2 white--text font-weight-bold"
                color="green"
                elevation="0"
                @click="linkPix">Fazer um Pix</v-btn>
            <v-btn
                class="mb-2 mb-md-0 mr-md-2 font-weight-bold"
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
          <v-text-field
              label="deixa uma mensagem"
              v-model="mensagem"
              maxlength="35"
              counter
              @keyup="gerar_qrcode"></v-text-field>
        </v-form>
        <span class="d-block mb-3">
          {{ total }}
        </span>

          <v-textarea
              ref="cc"
              v-model="copia"
              label="Não suportado, copie diretamente por aqui:"
              readonly></v-textarea>
        <v-btn
            v-if="isSupported"
            color="eric"
            @click="copiar">Copiar Código Pix</v-btn>

      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            flat
            text="Fechar"
            color="grey-lighten-2"
            @click="isActive.value = false"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
  </v-dialog>
  <v-snackbar v-model="resultado_copia">
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
      {src: "10acff7a-5357-42c5-93f6-75a5e7009939.jpeg"},
      {src: "2049b268-30a3-4851-96b5-a3eea7cbabcf.jpeg"},
      {src: "086a6fa5-4bf0-4a36-96c3-4d41cc8f22da.jpeg"},
      {src: "900a1bb3-a4dc-49ef-ae12-e3dda47f13ea.jpeg"},
      
 {src: "7fbf48dc-e960-46c5-b22f-0f36ac6249de.jpeg"},
 {src: "900a1bb3-a4dc-49ef-ae12-e3dda47f13ea.jpeg"},
 {src: "c075c676-d123-4cd2-978e-da796c137721.jpeg"},
 {src: "ee07c60d-ec26-4ead-8181-77724d6d1d84.jpeg"},
 {src: "f437fb7d-b7a8-4f80-a9bd-0b4b0512e41b.jpeg"},
 {src: "f22b134b-2f2c-4edf-80d2-eeb58117b03f.jpeg"},
 {src: "e026e03b-2c1a-4ef8-b17a-cd6bf7925a25.jpeg"},
 {src: "e026e03b-2c1a-4ef8-b17a-cd6bf7925a25.jpeg"},
 {src: "70f2b6f6-1b74-48b3-bc1f-4a833ecaecc0.jpeg"},
 {src: "0b64910a-b120-45b0-b232-b1b6f4edade6.jpeg"},
 {src: "747cd0d0-d295-40c1-a0e0-9ce0cd6fd900.jpeg"},
 {src: "8ec89047-d951-4fa5-a491-99187eba8099.jpeg"},
 {src: "d560098c-ffd8-4129-9a23-c71c75a23969.jpeg"},
 {src: "e243cfc2-3ed9-4158-a484-6db1c3d6ab48.jpeg"},


      
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

  mounted() {
    const url = 'https://script.google.com/macros/s/AKfycbzK2324XIb1ejnsccvuufcq9Aj4nruz9LN0c1oJB7YWjYKhYq_a9uVleaxbqZCupQlgzA/exec'
    fetch(url)
        .then(response => response.json())
        .then(data => this.amigos = data.data)
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

ul.cloud a[data-weight="1"] {
  --size: 2;
}

ul.cloud a[data-weight="2"] {
  --size: 3;
}

ul.cloud a[data-weight="3"] {
  --size: 4;
}

ul.cloud a[data-weight="4"] {
  --size: 5;
}

ul.cloud a[data-weight="5"] {
  --size: 7;
}

ul.cloud a[data-weight="6"] {
  --size: 9;
}

ul.cloud a[data-weight="7"] {
  --size: 11;
}

ul.cloud a[data-weight="8"] {
  --size: 14;
}

ul.cloud a[data-weight="9"] {
  --size: 17;
}

ul[data-show-value] a::after {
  content: " (" attr(data-weight) ")";
  font-size: 1rem;
}

ul.cloud li:nth-child(2n+1) a {
  --color: #181;
}

ul.cloud li:nth-child(3n+1) a {
  --color: #33a;
}

ul.cloud li:nth-child(4n+1) a {
  --color: #c38;
}

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
