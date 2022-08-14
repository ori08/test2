"use strict"


var storedGraph = []
var image = null
var showMode = 'prcentage'



const colors = {
    gray: { regular: 'rgb(117, 117, 117)', bright: 'rgb(54,54,54)' },
    pink: { regular: 'rgb(240, 98, 146)', bright: 'rgb(227,40,84)' },
    blue: { regular: ' rgb(30, 87, 188)', bright: 'rgb(0,52,140)' },
    green: { regular: 'rgb(76, 175, 80)', bright: 'rgb(24,120,25)' }
}


function init() {
    count_times_Of_draw = 0
    createCanvas()
    if (loadFromStorage("graph")) {
        storedGraph = loadFromStorage("graph")
        renderGraphImg()
    }
    resizeCanvas()
    createGallery()
    renderGallery()
    createChart()
    setPostion()
    renderChart()
    renderEditor()
    addMouseListeners()
}

// Function group that change the values in the graph

function onRemoveTerm(idx) {
    removeTerm(idx)
}

function onChangeValue(ev, idx) {
    changeValue(ev, idx)
    caculateStatistcs()
    setPostion()
    renderChart()
}

function onChangeTerm(ev, idx) {
    var terms = getTerms()
    terms[idx].label = ev.value
    var text = terms[idx].label

    renderChart()
}

function onAddTitle(ev) {
    addTitle(ev)
    renderChart()
}

function onAddTerm() {
    addTerm()
    renderChart()
    renderEditor()
}

function caculateStatistcs() {
    var terms = getTerms()
    var sum = 0
    terms.forEach(term => {
        sum += parseInt(term.value)
    })
    terms.forEach(term => {
        term.percentage = Math.round((term.value / sum) * 100)
    })
}



// Function group that hide and show elements in the html 

function openColorSection(idx) {
    var terms = getTerms()
    terms[idx].isColorBtnPressed = true
    renderEditor()
}

function closeColorSection(idx) {
    var terms = getTerms()
    terms[idx].isColorBtnPressed = false
    renderEditor()
}

function openEditor(style) {
    count_times_Of_draw = 0
    init()
    gChart.theme = style

    setPostion()
    var elMain = document.querySelector('.main-container').style.display = "none"
    var elPersonalGallery = document.querySelector('.my-graph-container').style.display = "none"
    var elGallery = document.querySelector('.main-container-gallery').style.display = "none"
    var elEditor = document.querySelector('.main-container-editor').style.display = "flex"
    animateMode = true
    renderChart()
}

function closeEditor() {
    var elMain = document.querySelector('.main-container').style.display = "flex"
    var elEditor = document.querySelector('.main-container-editor').style.display = "none"
    gChart = null
}

function openGraphGallery() {
    var elMain = document.querySelector('.my-graph-container').style.display = "flex"
    var elEditor = document.querySelector('.main-container-editor').style.display = "none"
    var elHomePage = document.querySelector('.main-container').style.display = "none"
    var elGallery = document.querySelector('.main-container-gallery').style.display = "none"
    init()
}

function openGallery() {
    var elPersonalGraph = document.querySelector('.my-graph-container').style.display = "none"
    var elGallery = document.querySelector('.main-container-gallery').style.display = "flex"
    var elEditor = document.querySelector('.main-container-editor').style.display = "none"
    var elHomePage = document.querySelector('.main-container').style.display = "none"
    init()
}

function openHomePage() {
    var elPersonalGraph = document.querySelector('.my-graph-container').style.display = "none"
    var elGallery = document.querySelector('.main-container-gallery').style.display = "none"
    var elEditor = document.querySelector('.main-container-editor').style.display = "none"
    var elHomePage = document.querySelector('.main-container').style.display = "flex"
    init()
}

//Function Group that save and loaf from local storage 

function saveGraph() {
    var imageUrl = gCanvas.toDataURL("image/jpg");
    var graphObejct = { graph: gChart, image: imageUrl }
    saveToStorage("obejct", graphObejct)
    storedGraph.push(loadFromStorage('obejct'))
    saveToStorage("graph", storedGraph)
    renderGraphImg()
}

function renderGraphImg() {
    var strHtml = ''
    var idx = 0
    storedGraph.forEach(graph => {
        strHtml += `<img class="graph-img" onclick="loadGraph(${idx})" src="${graph.image}">`
        idx++
    })
    var elMyGraph = document.querySelector('.my-graph-container').innerHTML = strHtml

}

function loadGraph(idx) {
    count_times_Of_draw = 0
    storedGraph = loadFromStorage('graph')
    var theme = storedGraph[idx].graph.theme
    gChart = storedGraph[idx].graph
    setPostion()
    var elMain = document.querySelector('.main-container').style.display = "none"
    var elPersonalGallery = document.querySelector('.my-graph-container').style.display = "none"
    var elGallery = document.querySelector('.main-container-gallery').style.display = "none"
    var elEditor = document.querySelector('.main-container-editor').style.display = "flex"
    animateMode = true
    renderChart()

}

function showPrcentage() {
    showMode = 'prcentage'
    caculateStatistcs()
    setPostion()
    renderChart()

}

function showNumbers() {
    showMode = 'numbers'
    caculateStatistcs()
    setPostion()
    renderChart()

}

function onSetLang(lang) {
    setLang(lang);
    if (lang === "he") {
        // document.querySelector('.right-side-container').classList.add("rtl")
        document.querySelector('.terms').classList.add("rtl")
        document.querySelector('.theme-selection-p').classList.add("rtl")
        var elInputs = document.querySelectorAll('input')
        elInputs.forEach(el => el.classList.add("rtl"))
        document.body.style.fontFamily = "heb-font"
    }

    else {
        document.querySelector('.terms').classList.remove("rtl")
        document.querySelector('.right-side').classList.remove("rtl")
        document.querySelector('.theme-selection-p').classList.remove("rtl")
        var elInputs = document.querySelectorAll('input')
        elInputs.forEach(el => el.classList.remove("rtl"))
        document.body.style.fontFamily = "open-sans"
    }

    // doTrans();
    renderChart();
    renderEditor()
    doTrans();
}


function playAnimation() {
    animateMode = true
    renderChart()
}