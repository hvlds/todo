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
    <ul>
        <li v-for="(value, index) in tasks">
            <div class="column columns">
                <p class="column is-11">{{ value }}</p>
                <button class="column is-1 button is-danger is-light"><i class="fas fa-trash"></i></button>
            </div>
            <div v-if="tasks.length != 1 && index != tasks.length - 1" style="border-top: 3px solid #bbb;"></div>
        </li>
    </ul>
    `
})