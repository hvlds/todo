<template>
    <div>
        <h1 class="title is-offset-one-quarter has-text-centered">ToDo</h1>
        <form class="box" @submit.prevent="onSubmit">
            <div class="column columns">
                <input 
                    class="input is-primary" 
                    v-model="taskDescription" 
                    type="text" 
                    id="taskDescription" 
                    placeholder="New Task">
                <button class="button ml-1 is-primary">ADD</button>
            </div>
        </form>
        <ToDoList ref="todoList" v-bind:tasks="tasks"></ToDoList>
    </div>
</template>

<script>
import ToDoList from "../components/ToDoList.vue"

export default {
    name: "ToDoForm",
    components: {
        ToDoList
    },
    data() {
        return {
            taskDescription: "",
            tasks: new Map(),
        }
    },
    methods: {
        async onSubmit() {
            if (this.taskDescription === "") {
                return
            }
            
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    description: this.taskDescription,
                    date: new Date(),
                    is_completed: false
                })
            }

            await fetch("http://127.0.0.1:8090/tasks/", requestOptions)
                .then(response => response.json())
                .then(data => {
                    data.date = new Date(data.date)
                    data.isCompleted = data.is_completed
                    data.isVisible = true
                    this.tasks.set(data.id, data)
                    this.$refs.todoList.taskUpdate();
                })
                .catch(error => console.error(error))
            
            this.taskDescription = ""
        },
        async getAllTasks() {
            await fetch("http://localhost:8090/tasks")
                .then(response => response.json())
                .then(data => {
                    for (let task of data) {
                        task.date = new Date(task.date)
                        task.isCompleted = task.is_completed
                        task.isVisible = true
                        this.tasks.set(task.id, task)
                    }
                    this.$refs.todoList.taskUpdate();
                })
        }
    }, 
    async mounted() {
        await this.getAllTasks()
    }
}
</script>