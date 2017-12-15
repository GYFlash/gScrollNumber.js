
/**
 * Created by GYFlasher on 2017-12-08.
 */
/**
 * 滚动数字 (依赖jq)
 * @param el 用来显示滚动字幕的容器class 或 id
 * @param option 配置参数 width: 数字的宽 (无单位),fontSize: 字体大小（无单位）, color: 文字颜色,autoSizeContainerWidth: 自动计算容器宽度
 * @returns {Object}
 */
function gScrollNumber3D(el,option) {
    this.container = $(el);
    this.option = option;
    this.container.css({
        position: "relative",
        padding: "0",
        overflow: "hidden"
    });
    var height = this.container.height();
    this.subWidth = option.width;
    this.subHeight = height;
    this.autoSizeContainerWidth = option.autoSizeContainerWidth;
    this.col = '<span class="g-num-item" id="g-num-item" href="0">' +
        '<i class="g-wheel-item g-wheel-item-0"><a>0</a></i>' +
        '<i class="g-wheel-item g-wheel-item-1"><a>1</a></i>' +
        '<i class="g-wheel-item g-wheel-item-2"><a>2</a></i>' +
        '<i class="g-wheel-item g-wheel-item-3"><a>3</a></i>' +
        '<i class="g-wheel-item g-wheel-item-4"><a>4</a></i>' +
        '<i class="g-wheel-item g-wheel-item-5"><a>5</a></i>' +
        '<i class="g-wheel-item g-wheel-item-6"><a>6</a></i>' +
        '<i class="g-wheel-item g-wheel-item-7"><a>7</a></i>' +
        '<i class="g-wheel-item g-wheel-item-8"><a>8</a></i>' +
        '<i class="g-wheel-item g-wheel-item-9"><a>9</a></i>' +
        '<i class="g-wheel-item g-wheel-item-10"><a>.</a></i>' +
        '</span>';
}
gScrollNumber3D.prototype.run = function (value) {
    console.log("old = " + this.currentValue + "\nnew = " + value);
    this.currentValue = value;
    var self = this;
    var valueString = value.toString();
    var itemLength = 11;
    var angle = 360 / itemLength;
    var h = self.subHeight / Math.tan((angle * 0.5) * (2 * Math.PI/360));
    if (self.autoSizeContainerWidth) {
        self.container.css({
            "width": valueString.length * self.subWidth + "px"
        });
    }
    var oldLength = self.container.children(".g-num-item").length;

    if (valueString.length > oldLength) {
        for (var i = 0; i < valueString.length - oldLength; i++) {
            self.container.append(self.col);
            self.container.children(".g-num-item").eq(oldLength + i).css({
                right: self.subWidth * (oldLength + i) + "px"
            });
            var num = 0;
            self.oldValueString = num.toString() + self.oldValueString;
        }
    }else if (valueString.length < oldLength) {
        for (var i = 0; i < oldLength - valueString.length; i++) {
            self.container.children(".g-num-item:last").remove();
            var newStr = self.oldValueString.substr(1, self.oldValueString.length - 1);
            self.oldValueString = newStr;
        }
    }
    $(".g-num-item").css({
        position: "absolute",
        top: -(h - self.subHeight) * 0.5 + "px",
        width: self.subWidth + "px",
        height: h + "px",
        display:'inline-block',
        transformStyle:' preserve-3d',
        '-webkit-transform-style':' preserve-3d',
        '-ms-transform-style': 'preserve-3d'
    });
    $(".g-wheel-item").css({
        width: self.subWidth + "px",
        height: h + "px",
        position: 'absolute',
        left: 0,
        top: 0,
        border: '0px solid gainsboro',
        transformStyle:' preserve-3d',
        '-webkit-transform-style':' preserve-3d',
        '-ms-transform-style': 'preserve-3d'
    });
    $(".g-wheel-item a").css({
        width: self.subWidth + "px",
        height: self.subHeight + "px",
        lineHeight: self.subHeight + "px",
        textAlign: "center",
        fontSize: self.option.fontSize + "px",
        color: self.option.color,
        display: "block",
        fontStyle: "normal",
        transform: 'translateY(-'+ (self.subHeight * 0.5) +'px) rotateX(90deg)',
        backgroundColor: '#ffffff',
    });
    for (var i = 0; i < itemLength; i++) {
        $(".g-wheel-item-" + i).css({
            transform: "rotateX(" + (-90 - i * angle) + "deg)",
            height: h+ "px"
        });
    }
    setTimeout(function () {
        if (valueString.length !== self.container.children(".g-num-item").length) {
            console.log("%c%s","color:red;", "数字位数和数字条个数不相等");
            debugger
        }
        for (var i = 0; i < valueString.length; i++) {
            var rotateAngle  = 0;
            var value = parseInt(valueString[i]);

            var lastValue = parseInt(self.oldValueString[i]);
            var lastRotateAngle = parseFloat(self.container.children(".g-num-item").eq(valueString.length - i - 1).attr("href"));
            if (valueString[i] === ".") {
                value = 10;
            }
            if (self.oldValueString[i] === ".") {
                lastValue = 10;
            }
            if (value > lastValue) {
                rotateAngle = lastRotateAngle + (value - lastValue) * angle + 0;
            }
            if (value < lastValue) {
                rotateAngle = lastRotateAngle + (360 - (lastValue - value) * angle);
            }
            if (value === lastValue) {
                rotateAngle = lastRotateAngle + 360;
            }
            self.container.children(".g-num-item").eq(valueString.length - i - 1).css({
                transform: "rotateX(" + rotateAngle + "deg)",
                transition: "transform 2.0s"
            });
            self.container.children(".g-num-item").eq(valueString.length - i - 1).attr("href", rotateAngle);
        }
        self.oldValueString = valueString;
    }, 0);
};
gScrollNumber3D.prototype.getCurrentValue = function () {
    return this.currentValue;
};
