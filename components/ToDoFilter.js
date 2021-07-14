app.component("todo-filter", {
    template: 
    /*html*/
    `
    <div class="box">
        <!-- Active Tags -->
        <div class="columns column">
            <span 
                v-for="(tag, index) in tags" 
                class="tag ml-1" 
                @click="toggleTag(index)"
                :class="[{'is-light': !tag.isEnable}, tag.color]">
                {{ tag.name }}
            </span>
        </div>
    </div>    
    `,
    data() {
        return {
            tags: [
                { name: "Today", color: "is-primary", isEnable: true },
                { name: "Yesterday", color: "is-warning", isEnable: true },
                { name: "Earlier", color: "is-danger", isEnable: true },
                { name: "Completed", color: "is-info", isEnable: true },
            ]
        }
    },
    methods: {
        toggleTag(index) {
            this.tags[index].isEnable ^= true
            let disabledTags = this.tags.filter(tag => !tag.isEnable)
            let disabledNames = disabledTags.map(tag => tag.name)
            
            this.$emit("tag-toggled", disabledNames)
        }
    }
})