<template>
    <div class="tasks">
        <nav>
            <ul class="routes">
                <router-link :key="index" :to="link" exact-active-class="router-link-exact-active colors green" tag="li"
                             v-for="(label, link, index) in links">
                    {{ label }}
                </router-link>
            </ul>
            <ul class="labels">
                <li class="colors blue">{{ statusPreview.all }}</li>
                <li class="colors green">{{ statusPreview.late }}</li>
                <li class="colors yellow">{{ statusPreview.near }}</li>
                <li class="colors red">{{ statusPreview.normal }}</li>
            </ul>
        </nav>
        <table>
            <caption>Задачи на исполнение</caption>
            <tr>
                <th class="required_date">Срок</th>
                <th class="executor">Исполнитель</th>
                <th class="type">Тип</th>
                <th class="description">Краткое содержание</th>
                <th class="created_date">Дата создания задачи</th>
            </tr>
            <tr :key="index" v-for="(task, index) in tasks">
                <td :class="[status(task.status_id)]" class="required_date colors">{{ task.require_date | moment }}</td>
                <td class="executor">{{ task.executor }}</td>
                <td class="type">{{ type(task.type_id) }}</td>
                <td class="description">{{ task.description }}</td>
                <td class="created_date">{{ task.date_create | moment }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        name: "Tasks",

        beforeCreate () {
            this.types = {
                1: 'Проверсти проверку',
                2: 'Контроль предписания',
                3: 'Поручение'
            }
        },

        data () {
            return {
                links: {
                    '/tasks/': 'Все задачи',
                    '/tasks/1/': 'Проверсти проверку',
                    '/tasks/2/': 'Контроль предписания',
                    '/tasks/3/': 'Поручение'
                }
            }
        },

        computed: {
            tasks () {
                return this.$store.getters.tasks(this.$route.params.type);
            },

            statusPreview () {
                return {
                    all: this.tasks.length,
                    late: this.tasks.filter(el => el.status_id === 1).length,
                    near: this.tasks.filter(el => el.status_id === 2).length,
                    normal: this.tasks.filter(el => el.status_id === 3).length,
                }
            }
        },

        filters: {
            moment: (date, format = 'DD.MM.YYYY') => moment(date).format(format),
        },

        methods: {
            type: function (type_id) {
                return this.types[type_id];
            },

            status: function (status_id) {
                switch (status_id) {
                    case 1:
                        return 'green';

                    case 2:
                        return 'yellow';

                    case 3:
                        return 'red';

                    default:
                        return null;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .tasks {
        $colors: (
                (
                        'blue': #0097A7,
                        'green': #7CB342,
                        'yellow': #FFA000,
                        'red': #E53935
                )
        );

        .colors {
            color: white;

            @each $color, $code in $colors {
                &.#{$color} {
                    background-color: #{$code};
                }
            }
        }

        nav {
            display: flex;
            padding: 0 10% 30px 0;
            justify-content: space-between;
        }

        ul {
            margin: 0;
            padding: 0;
            list-style: none;
            display: inline-block;

            li {
                padding: 2px 10px;
                display: inline-block;

                &:not(:first-child) {
                    margin-left: 5px;
                }
            }
        }

        .routes {
            li {
                cursor: pointer;
                border-radius: 3px;
            }
        }

        .labels {
            li {
                color: white;
                min-width: 1em;
                text-align: center;
                border-radius: 999em;
            }
        }

        table {
            width: 100%;
            border-collapse: collapse;

            &, caption, th, td {
                padding: 1em;
                border: 1px solid #D0D0D0;
            }

            caption {
                color: white;
                text-align: left;
                font-size: larger;
                border-bottom: none;
                background-color: #5FA2DD;
            }

            tr {
                &:nth-child(even) {
                    background-color: #F6F6F6;
                }

                th, td {
                    &.required_date, &.created_date {
                        width: (100/12) * 1%;
                    }

                    &.executor {
                        width: (100/12) * 2%;
                    }

                    &.type, &.description {
                        width: (100/12) * 4%;
                    }
                }

                th {
                    text-align: left;
                    background-color: white;
                }
            }
        }
    }
</style>
