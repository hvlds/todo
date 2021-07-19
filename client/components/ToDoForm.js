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
            tasks: new Map(),
            lastID: 0,
        }
    },
    methods: {
        onSubmit() {
            if (this.taskDescription === "") {
                return
            }
            
            this.lastID += 1
            
            let newTask = {
                description: this.taskDescription,
                date: new Date(),
                isVisible: true,
                isCompleted: false,
                id: this.lastID
            }
            
            this.tasks.set(this.lastID, newTask)
            this.taskDescription = ""
        }
    }
})