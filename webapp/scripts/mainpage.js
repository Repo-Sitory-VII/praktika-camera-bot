Vue.createApp({
    data() {
        return {
            recently_task_id: 0,
            list_of_task: [
                {id: 0, name: 'Свалка', count: '0/200', priority: 0},
                {id: 1, name: 'ДТП', count: '50/100', priority: 0},
                {id: 2, name: 'Крыши', count: '20/300', priority: 0},
                {id: 3, name: 'Ямы', count: '350/500', priority: 0},
                {id: 4, name: 'Котики и собачки', count: '900/1000', priority: 0}
            ],
            isOpen: false
        }
    },
    methods: {
        togglePopup() {
            this.isOpen = !this.isOpen;
        },
        hadTasks() {
            return list_of_task.length > 0 ? true : false;
        }
    }
})

.component('task', {
    template: '#task-template',
    props: {
        id: {type: Number},
        name: {type: String, default: 'Задача'},
        count: {type: String, default: '0/0'}
    },
    data() {
        return {
        }
    },
    computed: {
        progressPercent() {
          const [current, total] = this.count.split('/').map(Number);
          return total > 0 ? Math.min(100, (current / total) * 100) : 0;
        },
        progressColor() {
            switch (true) {
                case this.progressPercent < 33:
                    return '#FA9D9D';
                case this.progressPercent < 66:
                    return '#F7C59F';
                default:
                    return '#C0F5B8';
            }
        }
    },
})

.mount('#app')