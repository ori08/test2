'use strict'
var gStartPos
var selectedLine = null

var curr_idx_shape
var mousedown
function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)

    gCanvas.addEventListener('touchstart', onMove)
    gCanvas.addEventListener('touchmove', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

function onMove(ev) {
    var terms = getTerms()

    const pos = getEvPos(ev)


    if (!mousedown) return


    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y


    var moveto = { x: dx + gStartPos.x, y: dy + gStartPos.y }

    if (curr_idx_shape != null) {
        selectedLine.x = moveto.x
        selectedLine.y = moveto.y

        // terms[curr_idx_shape].textPosition.x = moveto.x
        // terms[curr_idx_shape].textPosition.y = moveto.y

    }
    else {
        selectedLine = null
        return
    }

    renderChart()
    drawRect(selectedLine)


}

function onUp(ev) {
    mousedown = false
    gCanvas.style.cursor = "default";

}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    return pos
}

function onDown(ev) {
    var terms = getTerms()
    mousedown = true
    //Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    console.log((pos.y));
    renderChart()
    gStartPos = pos
    let indexBox = 0

    for (let diagram of terms) {
        var textPosition = getTextPosition(diagram)
        for (const [key, value] of Object.entries(textPosition)) {
            if (is_mouse_on_shape(gStartPos.x, gStartPos.y, value)) {
                console.log(diagram);
                curr_idx_shape = indexBox
                selectedLine = value
                drawRect(value)
                gCanvas.style.cursor = "grabbing";
                return
            }
            else curr_idx_shape = null

            indexBox++
            // console.log(indexBox);
        }
    }
}

function is_mouse_on_shape(x, y, textPosition) {


    let shape_left = textPosition.center
    let shape_right = textPosition.center + textPosition.width
    var shape_top = textPosition.y - textPosition.height
    var shape_bottom = textPosition.y

    if (x > shape_left && x < shape_right && y > shape_top && y < shape_bottom) {
        return true
    }
    return false
}

function drawRect(textPosition) {
    let shape_left = textPosition.center - 5
    let shape_right = textPosition.center + textPosition.width
    var shape_top = textPosition.y - textPosition.height
    var shape_bottom = textPosition.y

    gCtx.beginPath()
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'black'
    gCtx.rect(shape_left, shape_top - 10, textPosition.width + 10, textPosition.height + 20);
    gCtx.stroke();

}
