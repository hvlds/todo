<template>
    <div :class="[{'is-active':modalState}, 'modal']">
        <div class="modal-background" @click="closeModal"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Statistics</p>
                <button class="delete" aria-label="close" @click="closeModal"></button>
            </header>
            <section class="modal-card-body">
                <canvas id="myChart" width="400" height="400"></canvas>
            </section>
        </div>
    </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

import {chartData} from "../chartData.js"

export default {
    name: "ToDoCharts",
    props: {
        modalState: Boolean
    },
    data() {
        return {
            chartData: chartData
        }
    },
    methods: {
        closeModal() {
            this.$emit("closeModal")
        }
    },
    mounted() {
        const ctx = document.getElementById('myChart')
        new Chart(ctx, this.chartData)
    }
}                
</script>
