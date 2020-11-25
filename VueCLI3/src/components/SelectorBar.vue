<template>
    <nav class="task_status_navbar container">
        <button
        v-for="selector in selectButtons"
        :data-selector="selector.sort"
        :class="{ 'focus-active': nowSelector === selector.sort }"
        @click="changeSelector(selector.sort)"
        :key="selector.title"
        >
        {{ selector.title }}
        </button>
    </nav>
</template>

<script>
export default {
    name: "SelectorBar",
    data() {
        return {
        nowSelector: 'all',
        selectButtons: [
            {
            title: "My tasks",
            sort: "all",
            },
            {
            title: "In progress",
            sort: "undone",
            },
            {
            title: "Completed",
            sort: "done",
            },
        ],
        };
    },
    methods:{
        changeSelector(value){
            this.nowSelector = value;
            this.$emit('update-selector', this.nowSelector); 
    },
    },
};
</script>

<style lang="scss">
    .task_status_navbar {
        display: flex;

        button {
            flex: 1 1 1/3*100%;
            padding: 10px 10px 13px 10px;

            text-align: center;
            font-size: 16px;
            color: #00408B;
            background-color: transparent;
            border: none;

            &:hover {
                text-decoration: none;
                color: white;
                border-bottom: 5px solid #00408B;
            }

            &:focus {
                outline: none;
            }

            &.focus-active {
            color: white;
            border-bottom: 5px solid #00408B;
            outline: none;
            }
        }

        button+button {
            margin-left: 20px;
        }
    }
</style>