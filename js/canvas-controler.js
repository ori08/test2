'use strict'

var gCanvas
var gCtx
var canvas_width
var canvas_height
var count_times_Of_draw = 0
var animetion_id

gSize: {



}




function createCanvas() {
    gCanvas = document.getElementById('canvas')
    gCtx = gCanvas.getContext('2d')
    gCanvas.height = window.innerHeight - 110
    if (window.innerWidth < 500) gCanvas.height = 250
    canvas_width = gCanvas.width
    canvas_height = gCanvas.height
}

function drawText(text, diagram = { x: 1, y: 1, width: 1, height: 1, fontsize: 15 }, color) {
    gCtx.lineWidth = 0.5
    gCtx.font = `${diagram.fontsize}px Arial`

    //in case of rect mode im want all text with black color
    if (gChart.theme === 'rect') {
        gCtx.fillStyle = "black"
        gCtx.strokeStyle = "black"
    }
    // in other case use the shape color
    else {
        gCtx.fillStyle = color
        gCtx.strokeStyle = color
    }
    // messure the text to put in in center 
    var messureTxt = gCtx.measureText(text)

    // if the input is the title im want him in the middele of canvas
    diagram.center = diagram.x
    if (diagram.x === canvas_width)
        diagram.center = (diagram.x / 2) - (messureTxt.width / 2)
    else diagram.center -= messureTxt.width / 2
    //draw the line
    gCtx.fillText(text, diagram.center, diagram.y)
    gCtx.strokeText(text, diagram.center, diagram.y)
    // save  the text width and height in the object to use them after 
    diagram.width = messureTxt.width
    diagram.height = messureTxt.actualBoundingBoxAscent
}

function drawRectingle(shape) {

    var frame = 1
    var animetion_id
    var rectSize = parseInt(shape.width)

    //call animation to draw the shape
    animateRect()
    function animateRect() {
        if (is_Animation_Can_Be_Calld('rect', animateMode))
            animetion_id = window.requestAnimationFrame(animateRect)
        else frame = rectSize
        gCtx.beginPath();
        gCtx.rect(shape.startPostion, 50, frame, canvas_height)
        gCtx.strokeStyle = shape.color
        gCtx.stroke();
        gCtx.fillStyle = shape.color;
        gCtx.fill();
        isAnimationOver(frame, rectSize, animetion_id)
        frame++
    }
}

function drawArcPlusLine(shape) {
    var frame = 1
    var animetion_id
    var circleSize
    drawTexts()
    circleSize = value_or_prsentege(shape)

    //call animation to draw the shape
    animateCircle()
    function animateCircle() {
        if ((is_Animation_Can_Be_Calld('circle', animateMode)))
            animetion_id = window.requestAnimationFrame(animateCircle)

        else {
            frame = circleSize
        }

        gCtx.beginPath();
        gCtx.arc(shape.width, canvas_height / 2, frame, 0, 2 * Math.PI);
        gCtx.draw
        gCtx.fillStyle = shape.color;
        gCtx.fill();
        gCtx.beginPath();
        gCtx.moveTo(shape.width, gCanvas.height/2);
        gCtx.lineTo(shape.width, gCanvas.height-50);
        gCtx.lineWidth = 3
        gCtx.strokeStyle = shape.brightColor
        gCtx.stroke();

        isAnimationOver(frame, circleSize, animetion_id)
        frame++
    }

}




function value_or_prsentege(shape) {
    if (showMode === 'prcentage') return parseInt(shape.percentage)
    else return parseInt(shape.value)
}

function drawRectDiagrm(shape) {

    var frame = 1
    var animetion_id
    var value = value_or_prsentege(shape)
    var shape_height = Math.round((canvas_height / 100) * value)
    var diagramWidth = gCanvas.width * 0.15
    console.log(gCanvas.width);
    animate()
    function animate() {
        if ((is_Animation_Can_Be_Calld('diagram', animateMode)))
            animetion_id = window.requestAnimationFrame(animate)
        else frame = shape_height

        gCtx.beginPath();
        gCtx.rect(shape.width, canvas_height - frame, diagramWidth, frame)
        gCtx.fillStyle = shape.color;
        gCtx.fill();

        isAnimationOver(frame, shape_height, animetion_id)
        frame++
    }
}

function downloadGraph(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function fontIncrase() {
    var terms = getTerms()
    if (selectedLine === null) selectedLine = terms[0].textPosition.label
    selectedLine.fontsize += 2
    renderChart()
    drawRect(selectedLine)
}

function fontDecrase() {
    var terms = getTerms()
    selectedLine.fontsize -= 2
    if (selectedLine === null) selectedLine = terms[0].textPosition.label
    renderChart()
    drawRect(selectedLine)
}

function is_Animation_Can_Be_Calld(condition1, condition2) {
    if (gChart.theme === condition1 && condition2) return true
    else return false
}

function isAnimationOver(animation_frame, size, id) {
    //stop the animation when shape is already draw
    if (animation_frame === size) {
        cancelAnimationFrame(id)
        count_times_Of_draw++
        animation_frame = 1

    }
    // if all the shapes are draw animation cancel till user click on animation button
    if (count_times_Of_draw === gChart.terms.length) {
        animateMode = false
        count_times_Of_draw = 0
        drawTexts()
    }
    console.log();
}