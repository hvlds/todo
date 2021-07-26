<template>
    <div :class="[{'is-active':modalState}, 'modal']">
        <div class="modal-background" @click="closeModal"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Statistics</p>
                <button class="delete" aria-label="close" @click="closeModal"></button>
            </header>
            <section class="modal-card-body">
            <!-- Content ... -->
            </section>
        </div>
    </div>
</template>

<script>
export default {
    name: "ToDoCharts",
    props: {
        modalState: Boolean
    },
    methods: {
        closeModal() {
            this.$emit("closeModal")
        }
    }
}                
</script>
