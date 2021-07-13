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
        <ul>
            <li v-for="(task, index) in tasks">
                <div class="column columns is-vcentered mt-0">
                    <div class="column is-11">
                        <label class="label is-size-5">
                            <input type="checkbox" name="{{ task.description }}" value="{{ task.description }}">
                            {{ task.description }}
                            <span v-if="task.date" class="tag is-primary">Today</span>
                            <span class="tag is-warning">Yesterday</span>
                            <span class="tag is-danger">Erlier</span>
                        </label>
                    </div>
                    <div class="column is-1">
                        <button @click="deleteTask(index)" class="button is-danger is-light icon"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
                <div v-if="tasks.length != 1 && index != tasks.length - 1" style="border-top: 3px solid #bbb;"></div>
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
        }
    }
})