<template>
    <div class="column is-half mt-5">
        <ToDoForm></ToDoForm>
    </div>
</template>

<script>
import ToDoForm from "../components/ToDoForm.vue"

export default {
    name: "ToDo",
    components: {
        ToDoForm
    }
}
</script>
