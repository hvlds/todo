<template>
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
    <ToDoList v-bind:tasks="tasks"></ToDoList>
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

            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    description: this.taskDescription,
                    date: new Date(),
                    is_completed: false
                })
            }

            fetch("http://127.0.0.1:8090/tasks/", requestOptions)
                .then(response => response.json())
                .then(data => {
                    newTask.id = data.id
                    console.log(this.newTask)
                    this.tasks.set(data.id, newTask)
                })
                .catch(error => console.error(error))

            this.taskDescription = ""
        }
    }
}
</script>