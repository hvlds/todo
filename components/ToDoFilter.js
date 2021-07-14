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
        },
        areAllDisabled() {
            let disableCounter = 0
            for (tag in this.tags) {
                if (tag.isEnable == false) {
                    disableCounter += 1
                }
            }
            return disableCounter == 0
        }
    }
})