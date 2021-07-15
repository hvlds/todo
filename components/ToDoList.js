app.component("todo-list", {
    props: {
        tasks: {
            type: Array,
            required: true
        }
    },
    template: 
    /*html*/
    `
    <div v-if="tasks.length > 0" class="box">
        <todo-filter @tag-toggled="onTagToggled"></todo-filter>
        <ul>
            <li v-for="(task, index) in tasks">
                <div v-show="task.isVisible" class="column columns is-vcentered mt-0">
                    <div class="column is-11">
                        <label class="label is-size-5" :class="{'task-completed':task.isCompleted}">
                            <input                                 
                                type="checkbox"
                                v-show="!task.isCompleted"
                                @click="completeTask(index)" 
                                name="{{ task.description }}" 
                                value="{{ task.description }}">
                            {{ task.description }}
                            <span v-if="task.isCompleted" class="tag task-tag is-info">Completed</span>
                            <span v-else-if="isToday(task.date)" class="tag task-tag is-primary">Today</span>
                            <span v-else-if="isYesterday(task.date)" class="tag task-tag is-warning">Yesterday</span>
                            <span v-else-if="isEarlier(task.date)" class="tag task-tag is-danger">Earlier</span>
                        </label>
                    </div>
                    <div class="column is-1">
                        <button @click="deleteTask(index)" class="delete"></button>
                    </div>
                </div>
                <div 
                    v-if="tasks.length != 1 && index != tasks.length - 1"
                    v-show="task.isVisible" 
                    style="border-top: 3px solid #bbb;">
                </div>
            </li>
        </ul>
    </div>
    `,
    data() {
        return {
            today: new Date(),
        }
    },
    methods: {
        deleteTask(index) {
            this.tasks.splice(index, 1)
        },
        completeTask(index) {
            this.tasks[index].isCompleted = true
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
            for (let [index, task] of this.tasks.entries()) {
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

                if (disabledNames.includes(state)) {
                    this.tasks[index].isVisible = false
                } else {
                    this.tasks[index].isVisible = true
                }
            }
        },
        getCompletedTasks() {
            let completedTasks = this.tasks.filter(task => task.isCompleted)
            return completedTasks
        }
    }
})