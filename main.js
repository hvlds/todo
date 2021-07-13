const app = Vue.createApp({
    data() {
        return {
            name: "Hernán"
        }
    },
    methods: {
        onClick() {
            this.name = "Felipe"
        }
    }
})