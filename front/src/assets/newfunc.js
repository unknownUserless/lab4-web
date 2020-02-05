function toCanvas(point) {

    let x = point.x;
    let y = point.y;

    if (x > 0) {
        x = width / 2 + x * (width - 2 * padding) / 4;
    } else {
        x = width / 2 + x * (width - 2 * padding) / 4;
    }

    if (y > 0) {
        y = height / 2 - y * (height - 2 * padding) / 4;
    } else {
        y = height / 2 - y * (height - 2 * padding) / 4;
    }

    return {"x": x, "y": y};
}

function fromCanvas(canPoint) {

    let x = canPoint.x;
    let y = height - canPoint.y;

    if (x < width / 2) {
        x = -(width / 2 - x);
    } else {
        x = x - width / 2;
    }

    if (y < height / 2) {
        y = -(height / 2 - y);
    } else {
        y = y - height / 2;
    }

    x = x / ((width - 2 * padding) / 4);
    y = y / ((height - 2 * padding) / 4);

    return {"x": x, "y": y};

}

function listener(e, canvas) {

    let rect = canvas.getBoundingClientRect();
    let canx = (e.clientX - rect.left - LINE_WIDTH / 2);
    let cany = (e.clientY - rect.top - LINE_WIDTH / 2);

    let res = fromCanvas({"x": canx, "y": cany});

    return res;

}