<template>
  <v-card elevation="0" class="text-center my-5">
    <v-img class="rounded-5" height="240px" position="center" :src="presente.icone"></v-img>
    <span class="font-weight-bold d-block">{{ presente.nome }}</span>
    <span class="mr-2" v-if="presente.qtd">{{ presente.qtd }}x</span>
    <span>{{ valor }}</span>
    <div class="d-flex mx-10">
      <v-btn class="flex-grow-1 title--text font-weight-bold mr-2" color="light-blue-darken-4" @click="adicionar">
        <span v-if="this.presente.qtd > 0">
          <v-icon icon="mdi-plus"></v-icon>
        </span>
        <span v-else>
          Adicionar
        </span>
      </v-btn>
      <v-btn class="flex-grow-1 title--text font-weight-bold" color="grey-lighten-3"  @click="remover" v-if="this.presente.qtd > 0">
        <v-icon icon="mdi-minus"></v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import {moeda} from "../filter.js";

export default {
  name: "Presente",
  props: {
    presente: Object
  },
  computed: {
    valor() {
      return moeda(this.presente.valor)
    }
  },
  methods: {
    adicionar(){
      this.presente.qtd++
    },
    remover(){
      if(this.presente.qtd !== 0){
        this.presente.qtd--
      }
    }
  }
}
</script>

<style scoped>

</style>