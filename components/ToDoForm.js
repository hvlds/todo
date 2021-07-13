app.component("todo-form", {
    template:
        /*html*/
    `   
        <h1 class="title is-offset-one-quarter has-text-centered">ToDo</h1>
        <form class="box" @submit.prevent="onSubmit">
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
            if (task.value === "") {
                return
            }

            this.tasks.push(task.value)
            task.value = ""
        }
    }
})