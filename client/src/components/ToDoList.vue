<template>
    <div v-show="activeTasks.size > 0" class="box">
        <ToDoFilter @tag-toggled="onTagToggled"></ToDoFilter>
        <ul>
            <li v-for="[index, task] in activeTasks" :key="task.id">
                <div v-show="task.isVisible" class="column columns is-vcentered mt-0">
                    <div class="column is-11">
                        <label class="label is-size-5" :class="{'task-completed':task.isCompleted}">
                            <button                                 
                                type="button"
                                v-show="!task.isCompleted"
                                @click="completeTask(index)" 
                                name="{{ task.description }}" 
                                value="{{ task.description }}">
                                <span class="icon is-small">
                                    <i class="fas fa-check"></i>
                                </span>
                            </button>
                            {{ task.description }}

                            <span 
                                v-if="isToday(task.date)" 
                                class="tag task-tag is-primary">
                                Today
                            </span>
                            <span 
                                v-else-if="isYesterday(task.date)" 
                                class="tag task-tag is-warning">
                                Yesterday
                            </span>
                            <span 
                                v-else-if="isEarlier(task.date)" 
                                class="tag task-tag is-danger">
                                Earlier
                            </span>
                        </label>
                    </div>
                    <div class="column is-1">
                        <button @click="deleteTask(index)" class="delete"></button>
                    </div>
                </div>
                <div 
                    v-if="tasks.size != 1"
                    v-show="task.isVisible" 
                    style="border-top: 3px solid #bbb;">
                </div>
            </li>
            <li 
                v-for="task in completedTasks" :key="task.id">
                <div v-show="task.isVisible" class="column columns is-vcentered mt-0">
                    <div class="column is-11">
                        <label class="label is-size-5" :class="{'task-completed':task.isCompleted}">
                            {{ task.description }}
                            <span 
                                class="tag task-tag is-info">
                                Completed
                            </span>
                        </label>
                    </div>
                    <div class="column is-1">
                        <button @click="deleteTask(task.id)" class="delete"></button>
                    </div>
                </div>
                <div 
                    v-if="tasks.size != 1"
                    v-show="task.isVisible" 
                    style="border-top: 3px solid #bbb;">
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import ToDoFilter from "../components/ToDoFilter.vue"

export default {
    name: "ToDoList",
    components: {
        ToDoFilter
    },
    props: {
        tasks: Map
    },
    data() {
        return {
            today: new Date(),
            completedTasks: new Map(),
            activeTasks: new Map(),
        }
    },
    methods: {
        async deleteTask(index) {
            const requestOptionsDelete = {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: null,
                url: "http://localhost:8090",
                credentials: 'include',
                mode: "cors"
            }

            const url = "http://localhost:8090/task/" + index
            await fetch(url, requestOptionsDelete)
                .then(response => response.json())
                .then(data => console.log(data))
            
            this.tasks.delete(index)
            this.getCompletedTasks()
            this.getActiveTasks()
        },
        completeTask(index) {
            let tempTask = this.tasks.get(index)
            tempTask.isCompleted = true
            tempTask.is_completed = true
            this.tasks.set(index, tempTask) 
        },
        isToday(taskDate) {
            let today = new Date()
            let isToday = false
            if (taskDate.getDate() == today.getDate()
                && taskDate.getYear() == today.getYear()
                && taskDate.getMonth() == today.getMonth()) {
                isToday = true 
            }
            return isToday
        },
        isYesterday(taskDate) {
            let today = new Date()
            let isYesterday = false
            if (taskDate.getDate() == today.getDate() - 1
                && taskDate.getYear() == today.getYear()
                && taskDate.getMonth() == today.getMonth()) {
                isYesterday = true 
            }
            return isYesterday
        },
        isEarlier(taskDate) {
            return !this.isToday(taskDate) && !this.isYesterday(taskDate)
        },
        onTagToggled(disabledNames) {
            for (let [index, task] of this.tasks) {
                let state = ""
                
                if (task.isCompleted) {
                    state = "Completed"
                } else if (this.isToday(task.date)) {
                    state = "Today"
                } else if(this.isYesterday(task.date)) {
                    state = "Yesterday"
                } else if(this.isEarlier(task.date)) {
                    state = "Earlier"
                }
                
                let tempTask = this.tasks.get(index)
                if (disabledNames.includes(state)) {
                    tempTask.isVisible = false
                } else {
                    tempTask.isVisible = true
                }
                this.tasks.set(index, tempTask)
            }
        },
        getCompletedTasks() {
            for (let [key, value] of this.tasks.entries()) {
                if (value.is_completed) {
                    this.completedTasks.set(key, value)
                }
            }
            console.log(this.completedTasks)
        },
        getActiveTasks() {
            for (let [key, value] of this.tasks.entries()) {
                if (!value.is_completed) {
                    this.activeTasks.set(key, value)
                }
            }
            console.log(this.activeTasks)
        },
        taskUpdate() {
            this.getActiveTasks()
            this.getCompletedTasks()
        }
    }
    // ,mounted() {
        // 
    // }
}
</script>