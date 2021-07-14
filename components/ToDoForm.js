app.component("todo-form", {
    template:
        /*html*/
    `   
        <h1 class="title is-offset-one-quarter has-text-centered">ToDo</h1>
        <form class="box" @submit.prevent="onSubmit">
            <div class="column columns">
                <input 
                    class="input is-primary" 
                    v-model="taskDescription" 
                    type="text" 
                    id="taskDescription" 
                    placeholder="New Task">
            </div>
        </form>
        <todo-list v-bind:tasks="tasks"></todo-list>
    `,
    data() {
        return {
            taskDescription: "",
            tasks: [],
        }
    },
    methods: {
        onSubmit() {
            if (this.taskDescription === "") {
                return
            }

            let newTask = {
                description: this.taskDescription,
                date: new Date(),
                isVisible: true
            }

            this.tasks.push(newTask)
            this.taskDescription = ""
        }
    }
})