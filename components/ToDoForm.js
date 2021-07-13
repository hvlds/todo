app.component("todo-form", {
    template:
        /*html*/
    `
        <h1 class="is-offset-one-quarter">TODO List</h1>
        <form @submit.prevent="onSubmit">
            <div class="column columns">
                <input class="input" v-model="task" type="text" id="task">
                <button class="button is-link is-light">Add</button>
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
        }
    }
})