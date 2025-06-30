Vue.createApp({
    data() {
        return {
            leaderboard: [
                {id: 0, img: '../resources/test/avatar.png', name: 'User1', score: 3500},
                {id: 1, img: '../resources/test/avatar.png', name: 'User1', score: 3400},
                {id: 2, img: '../resources/test/avatar.png', name: 'User1', score: 3300},
                {id: 3, img: '../resources/test/avatar.png', name: 'User1', score: 3200},
                {id: 4, img: '../resources/test/avatar.png', name: 'User1', score: 3100},
                {id: 5, img: '../resources/test/avatar.png', name: 'User1', score: 3000},
                {id: 6, img: '../resources/test/avatar.png', name: 'User1', score: 2900},
                {id: 7, img: '../resources/test/avatar.png', name: 'User1', score: 2800},
                {id: 8, img: '../resources/test/avatar.png', name: 'User1', score: 2700},
                {id: 9, img: '../resources/test/avatar.png', name: 'User1', score: 2600},
                {id: 10, img: '../resources/test/avatar.png', name: 'User1', score: 3200},
                {id: 11, img: '../resources/test/avatar.png', name: 'User1', score: 3100},
                {id: 12, img: '../resources/test/avatar.png', name: 'User1', score: 3000},
                {id: 13, img: '../resources/test/avatar.png', name: 'User1', score: 2900},
                {id: 14, img: '../resources/test/avatar.png', name: 'User1', score: 2800},
                {id: 15, img: '../resources/test/avatar.png', name: 'User1', score: 2700},
                {id: 16, img: '../resources/test/avatar.png', name: 'User1', score: 2600}
            ]
        }
    }
})

.component('leaderboard-row', {
    template: '#leaderboard-row-template',
    props: {
        id: { type: Number, required: true },
        img: { type: String, default: '' },
        name: { type: String, required: true },
        score: { type: Number, default: 0}
    },
})

.mount('#app')