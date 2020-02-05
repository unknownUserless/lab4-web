const LINE_WIDTH = 2;
const width = 300;
const height = 300;
const padding = 20;
const maxR = 2;

function drawArrow(ctx, from, to, headlen = 10) {

    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.beginPath();
    ctx.lineWidth = LINE_WIDTH;
    let angle = Math.atan2(to.y - from.y, to.x - from.x);
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.lineTo(to.x - headlen * Math.cos(angle - Math.PI / 6), to.y - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(to.x, to.y);
    ctx.lineTo(to.x - headlen * Math.cos(angle + Math.PI / 6), to.y - headlen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();

}

function axises(ctx, color = "rgb(0, 0, 0)") {
    let center = {
        x: width / 2,
        y: height / 2
    };

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(center.x, center.y, width / 200 < 5 ? width / 200 : 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = "bold 13px Courier";
    ctx.fillText("Y", width / 2 - 15, 10);
    ctx.fillText("X", width - 10, height / 2 - 8);

    drawArrow(ctx, {x: 0, y: center.y}, {x: width, y: center.y});
    drawArrow(ctx, {x: center.x, y: height}, {x: center.x, y: 0});

}

function drawMark(ctx, from, to) {

    ctx.fillStyle = "rgb(0, 0, 0)";

    let horizontal = from.x === to.x;
    ctx.lineWidth = 2;
    ctx.beginPath();

    if (horizontal) {
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
    } else {
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
    }
}

function rMarks(ctx) {

    let size;

    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = "normal 10px Courier";

    let xMark = padding;
    let stepx = (width - 2 * padding) / (maxR * 2 * 2);
    let xLine = height / 2;

    let yMark = padding;
    let stepy = (height - 2 * padding) / (maxR * 2 * 2);
    let yLine = width / 2;

    for (let i = -maxR; i <= maxR; i += 0.5) {

        if (i % 1 === 0) {
            size = 3;
        } else {
            size = 1.5;
        }

        drawMark(ctx, {x: xMark, y: (xLine - size)}, {x: xMark, y: (xLine + size)});
        if (i !== 0 && i % 1 === 0) {
            ctx.fillText(i.toString(), xMark - 6, xLine + size + 10);
        }
        xMark += stepx;
    }

    for (let i = maxR; i >= -maxR; i -= 0.5) {

        if (i % 1 === 0) {
            size = 3;
        } else {
            size = 1.5;
        }


        drawMark(ctx, {x: yLine - size, y: yMark}, {x: yLine + size, y: yMark});
        if (i !== 0 && i % 1 === 0) {
            ctx.fillText(i.toString(), yLine + size + 10, yMark);
        }
        yMark += stepy;
    }
}

function drawFigure(ctx, r = maxR) {

    if (r >= 0) {

        let step = ((width - 2 * padding) / 8);
        let rStep = step * (maxR - r);

        ctx.beginPath();
        ctx.fillStyle = "rgb(0, 0, 200)";

        ctx.moveTo(padding + 2 * rStep, height / 2);
        ctx.lineTo(width / 2, padding + 2 * rStep);
        ctx.lineTo(width / 2, padding + rStep / 2 + 2 * step);
        ctx.arc(width / 2, height / 2, r * step, -Math.PI / 2, 0, false);
        ctx.lineTo(width / 2, height / 2);
        ctx.lineTo(width / 2, height - padding - 2 * rStep);
        ctx.lineTo(padding + step * 2 + rStep, height - padding - 2 * rStep);
        ctx.lineTo(padding + step * 2 + rStep, height / 2);
        ctx.lineTo(padding + rStep, height / 2);
        ctx.fill();

    } else {

        let step = ((width - 2 * padding) / 8);
        let rStep = step * (maxR - (-r));

        ctx.beginPath();
        ctx.fillStyle = "rgb(0, 0, 200)";

        ctx.moveTo(width / 2, height / 2);
        ctx.lineTo(width / 2, padding + rStep*2);
        ctx.lineTo(width - padding - (2 * step) - rStep, padding + rStep*2);
        ctx.lineTo(width - padding - (2 * step) - rStep, height / 2);

        ctx.lineTo(width - padding - rStep*2, height / 2);
        ctx.lineTo(width / 2, height - padding - rStep*2);
        ctx.lineTo(width / 2, height - 2 * step - rStep);

        ctx.arc(width / 2, height / 2, -r * step, Math.PI / 2, Math.PI);


        ctx.lineTo(width / 2, height / 2);

        ctx.fill();

/*        ctx.beginPath();
        ctx.fillStyle = "rgb(0, 0, 200)";
        ctx.arc(width / 2, height / 2, 2 * step, 0, 2 * Math.PI);
        ctx.fill();*/


    }

}

function drawPoints(ctx, jsonlist, curR = maxR) {
    for (let check of jsonlist) {
        drawPoint(ctx, check, curR);
    }
}

function drawPoint(ctx, check, curR) {
    let cnv = toCanvas(check);

    let tr = parseFloat(check.r) !== parseFloat(curR);

    if (tr) {

        ctx.fillStyle = "#000000";

    } else {

        if (JSON.parse(check.result)) {

            ctx.fillStyle = "#008000";
        } else {

            ctx.fillStyle = "#FF0000";
        }
    }
    ctx.beginPath();
    ctx.arc(cnv.x, cnv.y, 2, 0, 2 * Math.PI);
    ctx.fill();

}

function redraw(ctx, r, json) {
    ctx.clearRect(0, 0, 320, 320);

    drawFigure(ctx, r);
    axises(ctx);
    rMarks(ctx);
    drawPoints(ctx, json, r);
}