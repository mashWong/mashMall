(function () {
    var pageList = [];
    var header = new Vue({
        el: ".header",
        data: {
            userInfo: {},
            userId: null,
            menuTitle: null,
            showSearch: false,
            searchUrl: "pub/image/search_g.png",
            showMod: false,
            name: true
        },
        methods: {
            getUserInfo: function () {
                this.$http.get('/actionDispatcher.do?reqUrl=GetUserInfoAction')
                    .then(function (json) {
                        my = json.body.d;
                        this.userInfo = json.body.d;
                        this.userId = json.body.d.czybm;
                        // 加载主菜单
                        loadModular.loadModule();
                    });
            },
            showModular: function () {
                loadModular.isShow = !loadModular.isShow;
            },
            changePsw: function () {
                window.location = "page/changePsw/changePsw.html?czybm=" + this.userId + "&yqbm=" + yqbm + "&yljgbm=" + jgbm
            },
            toSearch: function () {
                this.showSearch = true;
                this.searchUrl = "pub/image/search.png"
            },
            hideSearch: function () {
                this.showSearch = false;
                this.searchUrl = "pub/image/search_g.png"
            }
        }
    });

    var loadModular = new Vue({
        el: '.modularDiv',
        data: {
            isShow: false,
            moduleList: [],
            iconUrl: 'pub/image/menuIcon/'
        },
        methods: {
            loadModule: function () {
                this.$http.get('/actionDispatcher.do?reqUrl=MainAction&czybm=' + header.userId +
                    '&types=QueryXtmkCzy').then(function (json) {
                    if (json.body.a == 1) {
                        malert("系统模块加载失败");
                    } else {
                        // 加载模块
                        this.moduleList = json.body.d;
                        // 加载菜单
                        this.loadMenu(this.moduleList[0].mkbm, this.moduleList[0].mkmc, this.moduleList[0].iconame);
                    }
                }, function (error) {
                    console.log(error);
                });
            },
            loadMenu: function (id, title, url) {
                leftMenu.showFa = {};
                header.menuTitle = title;
                leftMenu.iconName = this.iconUrl + url;
                this.$http.get('/actionDispatcher.do?reqUrl=MainAction&czybm=' + header.userId +
                    '&types=QueryMkqxCzy&mkbm=' + id).then(function (json) {
                    leftMenu.menuData = json.body.d;
                    // 加载菜单图标
                    for (var i = 0; i < leftMenu.menuData.length; i++) {
                        if (leftMenu.menuData[i].iconame != null && leftMenu.menuData[i].iconame.indexOf('&') != -1) {
                            leftMenu.showFa[i] = true;
                        } else {
                            leftMenu.showFa[i] = false;
                        }
                    }
                }, function (error) {
                    console.log(error);
                });
                if (leftMenu.isFold == true) leftMenu.menuFolding();
            }
        }
    });

    var rightMenu = new Vue({
        el: '.rightMenu',
        mixins: [baseFunc],
        components: {
            'calendar': calendar,
        },
        data: {
            pageLists: pageList,
            transitionName: 'expand',
            isSelect: null,
            isDone: false,
            isFold: false,
            conTitle: "首页",
            testDate: null,
            isStop: false
        },
        methods: {
            removePage: function (index) {
                this.pageLists.splice(index, 1);
                if (index <= this.isSelect && this.isSelect != 0) this.isSelect--;
            },
            move: function (direction) {
                if (this.isStop) return;
                this.isStop = true;
                var width = $(".titleCon")['0'].offsetWidth;
                var _div = $(".titleCon > div");
                var _last = _div.find("div:last");
                var left = _div['0'].offsetLeft;
                var right = _last['0'].offsetLeft + _last['0'].offsetWidth;
                if (direction == 'left' && right + left > width) {
                    _div.animate({left: "-=100px"}, function () {
                        rightMenu.isStop = false;
                    });
                } else if (direction == 'right' && left < 0) {
                    _div.animate({left: "+=100px"}, function () {
                        rightMenu.isStop = false;
                    });
                } else {
                    this.isStop = false;
                }
            },
            refresh: function () {
                if (this.isSelect != null) {
                    $('#iframeCon iframe').eq(rightMenu.isSelect).attr('src', $('#iframeCon iframe').eq(rightMenu.isSelect).attr('src'));
                }
            }
        }
    });

    var leftMenu = new Vue({
        el: '.leftMenu',
        data: {
            isPastDay: false,
            isLiSelect: false,
            menuTitle: null,
            iconName: null,
            menuData: [],
            menuLiData: [],
            isFold: false,
            iconNameUrl: 'pub/image/menuIcon/',
            showFa: {}
        },
        methods: {
            loadChildMenu: function (id) {
                var _id = $("#" + id);
                if (_id.css("display") == "none") {
                    $(".menu .arrowIcon").removeClass("fa-angle-down").addClass("fa-angle-right");
                    _id.slideDown(200).parent().siblings().find("ul").slideUp(200);
                    _id.prev('div').addClass("menuSelected").parent().siblings().find("div").removeClass("menuSelected");
                    _id.parent().find(".arrowIcon").removeClass("fa-angle-right").addClass("fa-angle-down");
                } else {
                    _id.slideUp(200);
                    $(".menu div").removeClass("menuSelected");
                    _id.parent().find(".arrowIcon").removeClass("fa-angle-down").addClass("fa-angle-right");
                }
            },
            menuFolding: function () {
                this.isFold = !this.isFold;
                var name = $(".header"), mod = $(".modularDiv"), icon = $(".menu img"), indexCon = $("body"), menuIcon = $(".menuIcon");
                // var clientWidth = 10400 / document.body.clientWidth + "%";

                if (this.isFold == true) {
                    header.name = false;
                    $(".leftMenu").animate({left: "-=104px"});
                    $(".rightMenu").animate({left: "-=104px"});
                    name.animate({left: "-=104px"});
                    mod.animate({left: "-=104px"});
                    indexCon.animate({width: "+=104px"}, function () {
                        indexCon.css("width", "calc(100% + 104px)");
                    });
                    icon.css("float", "right").css("margin-right", "20px").css("position", "relative");
                    menuIcon.css("float", "right").css("margin-right", "20px").css("position", "relative");
                } else {
                    header.name = true;
                    icon.css("float", "left");
                    $(".leftMenu").animate({left: "+=104px"});
                    $(".rightMenu").animate({left: "+=104px"});
                    name.animate({left: "+=104px"});
                    mod.animate({left: "+=104px"});
                    indexCon.animate({width: "+100%"});
                    icon.css("margin-right", "10px").css("position", "absolute");
                    menuIcon.css("float", "left").css("margin-right", "10px").css("position", "absolute");
                }
            },
            loadCon: function (id, i, name, url) {
                rightMenu.conTitle = name;
                $("#" + id).find("li").eq(i).addClass("menuLiSelected").siblings().removeClass("menuLiSelected");
                for (var j = 0; j < pageList.length; j++) {
                    if (pageList[j].url.indexOf(url) != -1) {
                        rightMenu.isSelect = j;
                        return false;
                    }
                }
                pageList.push({"name": name, "url": "page" + url + ".html"});
                rightMenu.isSelect = pageList.length - 1;
                rightMenu.move("left");
            }
        }
    });
    header.getUserInfo();

    $('body').click(function () {
        loadModular.isShow = false
    });
})();