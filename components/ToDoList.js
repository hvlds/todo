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
        <li v-for="value in tasks">
            {{ value }}
            <button>Delete</button>
        </li>
    </ul>
    `
})