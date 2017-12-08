/**
 * Created by mash on 2017/11/21.
 */
(function () {
    var test = new Vue({
        el: '.test',
        data: {

        },
        methods: {
            getData: function () {
                this.$http.get('/users').then(function (json) {
                    console.log(json);
                })
            },
            getPort: function () {
                this.$http.get('/getPort').then(function (json) {
                    console.log(json);
                })
            }
        }
    })
})();