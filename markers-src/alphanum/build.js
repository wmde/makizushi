// Requires the fonts-open-sans OS package.

const {spawn} = require('child_process')

const {createSVGWindow} = require('svgdom')
const {SVG, registerWindow} = require('@svgdotjs/svg.js')
const beautify = require('xml-formatter')

const sizes = [11, 15, 20]

function createNewCanvas() {
	const window = createSVGWindow()
	const document = window.document
	registerWindow(window, document)
	const canvas = SVG(document.documentElement)
	return canvas
}

function renderTextToSvg(text) {
	const canvas = createNewCanvas().size(100, 100)
	const group = canvas.group()

	// debugging
	// canvas.css({
		// 'background-color': 'blue',
		// 'border': '1px solid black'
	// })

	group.text(text)
		.x(50).y(70)
		.font({
			size: '108px',
			family: 'Open Sans',
			weight: 'bold',
			fill: '#444444',
			'size': '108px',
			'text-anchor': 'middle',
			'text-align': 'center',
			stroke: '#ffffff',
			'stroke-width': '8',
			'stroke-opacity': '0.3',
			'fill-opacity': '1',
			'paint-order': 'stroke',
		})

	return beautify(canvas.svg())
}

function renderSvgToPng(svg, outputPath, size) {
	const proc = spawn('inkscape', ['--pipe', '-o', outputPath, '-w', size, '-h', size])
	proc.stdin.write(svg)
	proc.stdin.end()
}

function renderAllPngs(text) {
	const svg = renderTextToSvg(text)

	sizes.forEach(size => {
		renderSvgToPng(svg, `${text}-${size}.png`, size)
		renderSvgToPng(svg, `${text}-${size}@2x.png`, size * 2)
	})
}

renderAllPngs("1")

// debugging
// const debugSvg = renderTextToSvg("1")
// console.log(debugSvg)
// const fs = require('fs')
// fs.writeFileSync("o.svg", debugSvg)
