console.log("loaded");
(function () {
    let flLIB = {
        getRandomColor() {
            function getByte() {
                return 55 + Math.round(Math.random() * 200);
            }
            return "rgba(" + getByte() + "," + getByte() + "," + getByte() + ",.8)";
        },

        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        drawRectangle(ctx, x, y, width, height, fillstyle = "black", lineWidth = 0, strokeStyle = "black") {
            ctx.fillStyle = fillstyle;
            ctx.save();
            ctx.beginPath();
            ctx.rect(x, y, width, height);
            ctx.closePath();
            ctx.fill();
            if (lineWidth > 0) {
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = strokeStyle;
                ctx.stroke();
            }
            ctx.restore();
        }
    };
    if (window) {
        window["flLIB"] = flLIB;
    } else {
        throw "'windows' is not defined!";
    }
})();