import {createApp} from 'vue'

import 'vuetify/styles'
import {createVuetify} from 'vuetify'

import {pt} from 'vuetify/locale'

import './style.css'
import App from './App.vue'

import {aliases, mdi} from 'vuetify/iconsets/mdi'


const vuetify = createVuetify({
    locale: {
        locale: 'pt',
        messages: {pt},
    },
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
    theme: {
        defaultTheme: 'padrao',
        themes: {
            padrao: {
                dark: false,
                colors: {
                    eric: '#000080',
                    title: '#E8697F',
                    text: '#998195',
                    button: '#FFFFFF',
                    bb: '#F8F4F0',
                    secondary: '#A24A59',
                    nubank: '#830AD1',
                    picpay: '#00C36F',
                    g100: '#303030',
                },
            },
        },
    },
})

let app = createApp(App).use(vuetify).mount('#app')