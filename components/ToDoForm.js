app.component("todo-form", {
    template:
        /*html*/
    `
        
        <form @submit.prevent="onSubmit">
            <div class="column columns">
                <input class="input" v-model="task" type="text" id="task" placeholder="New Task">
            </div>
        </form>
        <todo-list v-bind:tasks="tasks"></todo-list>
    `,
    data() {
        return {
            task: "",
            tasks: [],
        }
    },
    methods: {
        onSubmit() {
            this.tasks.push(task.value)
            task.value = ""
        }
    }
})