"use strict"

var gChart
var animateMode = false






function createChart() {
    gChart = ({
        type: 'food',
        theme: 'circle',
        title: {
            name: 'Favorite Food',
            x: gCanvas.width,
            y: 40,
            center: null,
            fontsize: 26
        },
        style: {
            font: 'Arial',
            fontSize: '45px',
            backgroundColor: 'transparent',
        },
        valueType: 'percent/value',
        terms:
            [{
                label: 'Pizza',
                value: 50,
                percentage: 50,
                color: colors.gray.regular,
                width: gCanvas.width / 3,
                brightColor: colors.gray.bright,
                textPosition: {
                    value: { x: null, y: 275, width: null, height: null, fontsize: 25 },
                    label: { x: null, y: 290, width: null, height: null, fontsize: 25 }
                },
                startPosition: null,
                endPostion: null
            },
            {
                label: 'Burger',
                value: 50,
                color: colors.pink.regular,
                brightColor: colors.pink.bright,
                percentage: 50,
                width: (gCanvas.width / 3) * 2,
                textPosition: {
                    value: { x: null, y: 275, width: null, height: null, fontsize: 25 },
                    label: { x: null, y: 290, width: null, height: null, fontsize: 25 }
                },
                startPosition: null,
                endPostion: null
            }
            ]
    })
}

function getTerms() {
    return gChart.terms
}

function getTitle() {
    return gChart.title
}

function getGraphById(id) {
    return gGallry.find(chart => chart.id === id)
}

function getTextPosition(term) {
    return term.textPosition
}

function removeTerm(idx) {
    var terms = getTerms()
    terms.splice(idx, 1)
    if (gChart.theme === 'rect')
        terms.forEach(term => {
            term.value = 50
            term.percentage = 50
        })
    setPostion()
    renderChart()
    renderEditor()

}

function addTerm() {
    var terms = getTerms()
    var color = colors.blue
    if (terms.length >= 3) color = colors.green
    if (terms.length >= 4) return
    if (gChart.theme != 'circle' && terms.length >= 3) return
    terms.push({
        label: 'write something',
        value: 40,
        percentage: 40,
        color: color.regular,
        brightColor: color.bright,
        width: (gCanvas.width / 3) * 2.5,
        textPosition: {
            value: { x: null, y: 275, width: null, height: null, fontsize: 15 },
            label: { x: null, y: 290, width: null, height: null, fontsize: 15 }
        },
        startPosition: null,
        endPostion: null
    })
    if (gChart.theme === 'rect')
        terms.forEach(term => {
            term.value = 33
            term.percentage = 33
        })
    setPostion()
    renderChart()
}

function addTitle(ev) {
    var text = ev.value
    var title = getTitle()
    title.name = text
}

function setColor(color, brightColor, idx) {
    var terms = getTerms()
    terms[idx].color = color
    terms[idx].brightColor = brightColor
    renderChart()
}

function changeValue(ev, idx) {
    var terms = getTerms()
    if (isNaN(ev.value) || (parseInt(ev.value) > 100)) return
    terms[idx].value = ev.value
}

//this function rewrite the position of any shape in the canvas
function setPostion() {
    var terms = getTerms()
    var chart_length = terms.length
    if (gChart.theme === 'circle') {
        var idx = 1
        terms.forEach(shape => {
            var textPosition = getTextPosition(shape)
            shape.width = (gCanvas.width / (chart_length + 1)) * idx
            textPosition.value.x = (gCanvas.width / (chart_length + 1)) * idx
            textPosition.value.y = gCanvas.height-10
            textPosition.label.x = (gCanvas.width / (chart_length + 1)) * idx
            textPosition.label.y = gCanvas.height-40
            idx++
        })
    }

    else if (gChart.theme === 'diagram') {
        var idx = 0
        terms.forEach(shape => {
            var textPosition = getTextPosition(shape)
            if (showMode === 'prcentage')
                var height = Math.round((canvas_height / 100) * shape.percentage)
            else var height = Math.round((canvas_height / 100) * parseInt(shape.value))
            shape.width = (gCanvas.width / (chart_length + 1)) * idx
            textPosition.value.x = ((gCanvas.width / (chart_length + 1)) * idx) + 40
            textPosition.value.y = canvas_height - height - 20
            textPosition.label.x = ((gCanvas.width / (chart_length + 1)) * idx) + 40
            textPosition.label.y = canvas_height - height - 50
            idx++
        })
    }

    else {
        var idx = 1
        var endPostion
        terms.forEach(shape => {
            if (showMode === 'prcentage') var multiplier = parseInt(shape.percentage)
            else {
                var multiplier = parseInt(shape.value)
            }
            var textPosition = getTextPosition(shape)
            if (idx === 1) {
                shape.startPostion = 0
                shape.width = ((canvas_width / 100) * multiplier)
                endPostion = shape.startPostion + shape.width
                textPosition.value.x = shape.width / 2
                textPosition.value.y = (canvas_height / 2) + 30
                textPosition.label.x = shape.width / 2
                textPosition.label.y = (canvas_height / 2) + 50
            }
            else {
                shape.startPostion = endPostion
                shape.width = (canvas_width / 100) * multiplier
                endPostion = shape.startPostion + shape.width
                textPosition.value.x = endPostion - (shape.width / 2)
                textPosition.value.y = (canvas_height / 2) + 30
                textPosition.label.x = endPostion - (shape.width / 2)
                textPosition.label.y = (canvas_height / 2) + 50
            }
            idx++
        })
    }
}