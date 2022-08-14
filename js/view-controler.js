'use strict'
var themeModalMode = true

console.log(window.innerWidth);

function toggleModal() {
    if (themeModalMode) document.querySelector('.theme-modal').style.display = "flex"
    else document.querySelector('.theme-modal').style.display = "none"
    themeModalMode = !themeModalMode
}

function changeTheme(theme) {
    gChart.theme = theme
    saveToStorage("currChart", gChart)
    init()
    if (loadFromStorage('currChart')) gChart = loadFromStorage('currChart')
    caculateStatistcs()
    setPostion()
    animateMode = true
    renderChart()
}

// Function group that render in the Html
function renderChart() {
    var terms = getTerms()
    gCtx.clearRect(0, 0, canvas_width, canvas_height)
    //if image there render it.....
    if (gImgData != null) {
        gImg = new Image()
        gImg.src = gImgData
        gCtx.drawImage(gImg, 0, 0, canvas_width, canvas_height)
    }
    terms.forEach(chart => {
        if (gChart.theme === 'circle') drawArcPlusLine(chart)
        else if (gChart.theme === 'diagram') {
            drawRectDiagrm(chart)
        }
        else {
            drawRectingle(chart)
        }
    })
}

function renderEditor() {
    var terms = getTerms()

    var strHtml = ""
    var elTerms = document.querySelector('.terms')
    var chartIdx = 0

    terms.forEach(term => {
        if (term.isColorBtnPressed) {
            strHtml += `  
            <div class="term">
            <div class="colors-modal term-input">
                <button class="btn gray" onclick="setColor('${colors.gray.regular}','${colors.gray.bright}',${chartIdx})"></button>
                <button class="btn pink" onclick="setColor('${colors.pink.regular}','${colors.pink.bright}',${chartIdx})"></button>
                <button class="btn blue" onclick="setColor('${colors.blue.regular}','${colors.blue.bright}',${chartIdx})"></button>
                <button class="btn green" onclick="setColor('${colors.green.regular}','${colors.green.bright}',${chartIdx})"></button>
                <button class="btn-close" onclick=" closeColorSection(${chartIdx})">x</button>
            </div>
        </div>`
        }
        else {
            var stringNum = ''
            var title
            // translate the term 
            switch (chartIdx) {
                case 0: {
                    if (gCurrLang === 'en') stringNum = 'ONE'
                    else stringNum = 'אחד'
                }
                    break
                case 1: {
                    if (gCurrLang === 'en') stringNum = "TWO"
                    else stringNum = "שני"
                }
                    break
                case 2: {
                    if (gCurrLang === 'en') stringNum = 'THREE'
                    else stringNum = 'שלישי'
                }
                    break
                case 3: {
                    if (gCurrLang === 'en') stringNum = "FOUR"
                    else stringNum = "רביעי"
                }
                    break
            }
            if (gCurrLang === 'en') title = 'TERM'
            else title = 'מונח'

            strHtml += `       
        <div class="term">
          <div class="term-input">
          <button class="color-btn term${chartIdx}" onclick=" openColorSection(${chartIdx})"></button>
          <h2>${title} ${stringNum}</h2>
        <input type="text" onkeyup=" onChangeTerm(this,${chartIdx})" data-trans="label" placeholder="Label">
        <input type="text" onkeyup=" onChangeValue(this,${chartIdx})" data-trans="value" placeholder="Value">
 `
            // render x botton only if there is more than 2 terms
            if (terms.length > 2)
                strHtml += `<button class="btn-close-terms" onclick="onRemoveTerm(${chartIdx})">x</button>`
            strHtml += `</div></div>`
            chartIdx++
        }
    })
    strHtml += `<button class="btn-add" onclick="onAddTerm()" data-trans="add-term">+ ADD TERM</button>`
    elTerms.innerHTML = strHtml
    // translate the editor when finish render
    doTrans()
}

function drawTexts() {
    var terms = gChart.terms
    var title = getTitle()
    drawText(title.name, title)
    terms.forEach(chart => {
        // asl how to show the value by value or presntge
        if (showMode === 'prcentage') var text = `${chart.percentage}%`
        else var text = `${chart.value}`
        var textPosition = getTextPosition(chart)
        drawText(text, textPosition.value, chart.color)
        drawText(chart.label, textPosition.label, chart.color)

    })
}

// resize canvas by listen to the reszie on web
function resizeCanvas() {

    addEventListener('resize', (event) => {

        if (window.innerWidth > 1200) {
            gCanvas.width = 560;
            canvas_width = gCanvas.width
            gChart.title.x = canvas_width
            setPostion()
            renderChart()
        }
        else if (window.innerWidth < 1200 && window.innerWidth > 950) {
            gCanvas.width = 480;
            canvas_width = gCanvas.width
            gChart.title.x = canvas_width
            setPostion()
            renderChart()
        }
        else if (window.innerWidth < 950 && window.innerWidth > 650) {

            gCanvas.width = 400;
            canvas_width = gCanvas.width
            gChart.title.x = canvas_width
            setPostion()
            renderChart()
        }
        else if (window.innerWidth < 650) {

            gCanvas.width = window.innerWidth;
            canvas_width = gCanvas.width
            gChart.title.x = canvas_width
            // canvas_height = gCanvas.height
            setPostion()
            renderChart()
        }
    })
}
