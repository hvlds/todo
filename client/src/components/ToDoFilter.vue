<template>
    <div class="columns box pt-0 pb-0">
        <div class="column is-11">
            <span 
                v-for="(tag, index) in tags"
                :key="tag.id" 
                class="tag ml-1" 
                @click="toggleTag(index)"
                :class="[{'is-light': !tag.isEnable}, tag.color]">
                {{ tag.name }}
            </span>
        </div>
        <div class="column is-1">
            <button class="button is-link is-small" @click="toggleModal">
                <i class="fas fa-chart-bar"></i>
            </button>
        </div>
        <ToDoCharts v-bind:modalState="modalState" @close-modal="toggleModal"></ToDoCharts>
    </div>  
</template>

<script>
import ToDoCharts from "../components/ToDoCharts.vue"

export default {
    name: "ToDoFilter",
    components: {
        ToDoCharts
    },
    data() {
        return {
            tags: [
                { name: "Today", color: "is-primary", isEnable: true },
                { name: "Yesterday", color: "is-warning", isEnable: true },
                { name: "Earlier", color: "is-danger", isEnable: true },
                { name: "Completed", color: "is-info", isEnable: true },
            ],
            modalState: false
        }
    },
    methods: {
        toggleTag(index) {
            this.tags[index].isEnable ^= true
            let disabledTags = this.tags.filter(tag => !tag.isEnable)
            let disabledNames = disabledTags.map(tag => tag.name)
            
            this.$emit("tag-toggled", disabledNames)
        },
        toggleModal() {
            this.modalState ^= true
        }
    }
}
</script>
