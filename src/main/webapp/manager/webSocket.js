/**
 * Created by wangx on 2018-02-18.
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
    });

    alert('import成功!');
})();