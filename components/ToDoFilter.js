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
                v-show="tag.isEnable" 
                @click="disableTag(index)"
                :class="tag.color">
                {{ tag.name }}
            </span>
        </div>

        <!-- Disabled Tags -->
        <div class="columns column">
            <span 
                v-for="(tag, index) in tags"
                @click="enableTag(index)" 
                class="tag is-light ml-1" 
                v-show="!tag.isEnable"
                :class="tag.color">
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
        disableTag(index) {
            this.tags[index].isEnable = false
        },
        enableTag(index) {
            this.tags[index].isEnable = true
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