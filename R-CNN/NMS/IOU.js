let data = {
    rect: [
        {
            "x": 0,
            "y": 0,
            "width": 20,
            "height": 20,
            "type": "eye",
            "name": "box1"
        },
        {
            "x": 21,
            "y": 21,
            "width": 20,
            "height": 20,
            "type": "eye",
            "name": "box2"
        },
        {
            "x": 0,
            "y": 0,
            "width": 20,
            "height": 20,
            "type": "eye",
            "name": "box3"
        },
        {
            "x": 5,
            "y": 5,
            "width": 20,
            "height": 20,
            "type": "eye",
            "name": "box4"
        },
        {
            "x": 5,
            "y": 5,
            "width": 10,
            "height": 10,
            "type": "eye",
            "name": "box5"
        },
    ]
}

let rect = [];
const IOU_THRESHOLD = 0.3; //IoU阈值

for (let i = 0; i < data.rect.length; i++) {
    let itemType = data.rect[i].type;
    let isOverlapping = false; //是否重叠

    for (let k = 0; k < rect.length; k++) {
        if (rect[k].type == itemType) {
            //让 data.rect[i] 与rect里 同类型的 进行比较，比较重叠率，如果重叠率高，则不放置
            let x11 = data.rect[i].x;
            let y11 = data.rect[i].y;
            let x12 = data.rect[i].x + data.rect[i].width;
            let y12 = data.rect[i].y + data.rect[i].height;

            let x21 = rect[k].x;
            let y21 = rect[k].y;
            let x22 = rect[k].x + rect[k].width;
            let y22 = rect[k].y + rect[k].height;

            /*
            Math.min(x12, x22) 用于确定两个矩形在x轴上重叠的右边界。
            Math.max(x11, x21) 用于确定两个矩形在x轴上重叠的左边界。

            Math.min(y12, y22) 用于确定两个矩形在y轴上重叠的下边界。
            Math.max(y11, y21) 用于确定两个矩形在y轴上重叠的上边界。
            */

            //1、重合(交集)面积计算
            let interWidth = Math.min(x12, x22) - Math.max(x11, x21);
            let interHeight = Math.min(y12, y22) - Math.max(y11, y21);
            let interArea = Math.max(0, interWidth) * Math.max(0, interHeight);

            /*
            为什么要 Math.max(0, interWidth) 呢？
            使用 Math.max(0, interWidth) 是因为我们要确保计算出的交集宽度（interWidth）不会是一个负数。这在计算矩形交集面积时是非常重要的，因为面积不能是负的。
            考虑这样一种情况：当两个矩形在x轴上并没有实际重叠，即一个矩形的右边界在另一个矩形的左边界的左侧时，如果我们直接计算Math.min(x12, x22) - Math.max(x11, x21)，结果将会是一个负数。同样地，如果它们在y轴上没有重叠，计算出的interHeight也可能是负的。
            然而，在计算交集面积时，我们希望如果两个矩形没有重叠，那么交集面积应该是0。因此，我们使用Math.max(0, interWidth)和Math.max(0, interHeight)来确保，即使计算出的宽度或高度是负的，我们也将它们视为0。这样，当我们计算interArea = Math.max(0, interWidth) * Math.max(0, interHeight)时，如果宽度或高度中的任何一个是0（或两者都是0），那么交集面积也将是0。
            
            如果思考不明白，请使用 IOU.html 来理解。
            */

            //2、并集的面积计算
            let unionArea = (x12 - x11) * (y12 - y11) + (x22 - x21) * (y22 - y21) - interArea;

            //3、计算IoU
            let IOU = interArea / unionArea;

            console.log(data.rect[i].name, rect[k].name, '重叠率是', IOU)

            if (IOU > IOU_THRESHOLD) {
                isOverlapping = true; //如果重叠率高于阈值，则标记为重叠
                break; //可以提前退出，因为已找到重叠
            }
        }
    }

    if (!isOverlapping) {
        rect.push(data.rect[i]); //如果没有重叠，则添加矩形
    }

}

console.log(rect)