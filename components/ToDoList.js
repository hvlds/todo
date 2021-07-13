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
            <li v-for="(value, index) in tasks">
                <div class="column columns is-vcentered mt-0">
                    <div class="column is-11">
                        <label class="label is-size-5">
                            <input type="checkbox" name="{{ value }}" value="{{ value }}">
                            {{ value }}
                        </label>
                    </div>
                    <button @click="deleteTask(index)" class="column is-1 button is-danger is-light"><i class="fas fa-trash"></i></button>
                </div>
                <div v-if="tasks.length != 1 && index != tasks.length - 1" style="border-top: 3px solid #bbb;"></div>
            </li>
        </ul>
    </div>
    `,
    methods: {
        deleteTask(index) {
            this.tasks.splice(index, 1)
        }
    }
})