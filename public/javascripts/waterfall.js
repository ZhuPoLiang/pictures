;(function($){

    //计算列数
    var $box = $('#images');
    var $loader = $('#loader');
    var itemWidth = 232;   //列宽
    var itemSpace = 22;    //间隔宽
    var page = 0;    //初始值
    var isFectchData = true;

    function setQueueData(imgWidth, imgSpace){
        var $window = $(window),
            top = [],
            left = [],
            offsetWidth = imgWidth + imgSpace,
            autoWidth = 0,
            queue = 0,
            _contentWidth = 0,
            wWidth = 0;

        return {
            cleanMap: function() {
                top.length = 0;
                left.length = 0;
            },
            initData: function() {
                wWidth = $window.width();
                queue = Math.floor(wWidth / offsetWidth);
                _contentWidth = offsetWidth * queue - imgSpace;
                autoWidth = Math.floor((wWidth - _contentWidth) / 2);

                for (var i = 0; i < queue; i++) {
                    top.push(0);
                    left.push(i * offsetWidth + autoWidth);
                }

                return {
                    offsetWidth: offsetWidth,
                    autoWidth: autoWidth,
                    topMap: top,
                    leftMap: left,
                    queue: queue,
                    setTopMap: function(index, value, isCover) {
                        if (isCover) {
                            top[index] = value;
                        } else {
                            top[index] += value;
                        }
                    },
                    setLeftMap: function(index, value, isCover) {
                        if (isCover) {
                            left[index] = value;
                        } else {
                            left[index] += value;
                        }
                    }
                }
            }
        }
    }

    function getMinHeight(topMap){
        var iv = topMap[0];
        var _index = 0;

        for(var i = 0, len = topMap.length; i < len; i++){
            if(topMap[i] < iv){
                iv = topMap[i];
                _index = i;
            }
        }

        return _index;
    }

    function fetchImagesLis(getQueueData, imgWidth){

        return function(page) {
            if (!isFectchData) {
                return false;
            }

            isFectchData = false;
            $loader.show();

            var $ajax = $.ajax({
                url : '/images/popular?page=' + page
            });

            $ajax.done(function (data) {
                var _data = $.parseJSON(data);

                var _html = _data.filter(function(item) {
                    return parseInt(item.width, 10);
                }).map(function(item) {
                    var iHeight = Math.floor(imgWidth / item.width * item.height),
                        _topMap = getQueueData.topMap,
                        _leftMap = getQueueData.leftMap,
                        _minIndex = getMinHeight(_topMap),
                        html = '<div class="item" style="top: '+ _topMap[_minIndex] +'px; left: '+ _leftMap[_minIndex] +'px; height: '+ iHeight +'px;">'
                                + '<img class="imageLoading" src="'+ item.preview +'" width="'+ imgWidth +'" height="'+ iHeight +'" />'
                             + '</div>';

                    getQueueData.setTopMap(_minIndex, iHeight + 20);

                    return html;
                }).join('');

                $box.append(_html);
                $box.find('.item').show();
                $box.find('img').on({
                    'load': function() {
                        $(this).addClass('imageLoaded');
                    }
                });
                $loader.hide();
                isFectchData = true;
            });

            $ajax.fail(function (err) {
                $loader.hide();
                isFectchData = true;
                console.log(err);
            });
        }
    }

    var _setQueueData = setQueueData(itemWidth, itemSpace),
        _scrollData = _setQueueData.initData(),
        _fetchImagesLis = fetchImagesLis(_scrollData, itemWidth);

    //初始化
    _fetchImagesLis(page);

    // 窗口事件
    $(window).on({
        'scroll': function() {
            var $window = $(window),
                _scrollHeight = $window.scrollTop() + $window.innerHeight(),
                _minIndex = getMinHeight(_scrollData.topMap),
                _top = _scrollData.topMap[_minIndex] + $box.offset().top;

            if (isFectchData && _top < _scrollHeight) {
                page++;
                _fetchImagesLis(page);
            }
        },
        'resize': function(e){
            setTimeout(function() {
                _setQueueData.cleanMap();

                // 重新初始队列数据
                var _resize = _setQueueData.initData();

                // 获取所有图片重新定位图片位置
                var $item = $box.find('.item');

                $item.each(function(){
                    var $this = $(this),
                        _height = $this.height(),
                        _minIndex = getMinHeight(_resize.topMap);

                    $this.animate({
                        left: _resize.leftMap[_minIndex],
                        top: _resize.topMap[_minIndex]
                    });

                    _resize.setTopMap(_minIndex, _height + 20);
                });
            }, 500);
        }
    });

}(jQuery));
