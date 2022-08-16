// Requires the fonts-open-sans OS package.

const {spawn} = require('child_process')
const {createSVGWindow} = require('svgdom')
const {SVG, registerWindow} = require('@svgdotjs/svg.js')
const window = createSVGWindow()
registerWindow(window, window.document)

const sizes = [11, 15, 20]

function renderTextToSvg(text) {
	const baseFontSize = 92;
	const baseFontStyle = {
		family: 'Open Sans',
		weight: 'bold',
		color: '#000000',
		fill: '#444444',
		'size': '108px',
		'text-anchor': 'middle',
		'text-align': 'center',
		'dominant-baseline': 'middle',
	}
	const doc = SVG(window.document.documentElement).size(100, 100)
	const group = doc.group()
	group
		.text(text)
		.x(50).y(60)
		.font({
			...baseFontStyle,
			size: `${baseFontSize * 1.18}px`,
			//stroke: '#ffffff',
			'stroke-width': '8',
			stroke: '#ff0000',
			//'stroke-opacity': '0.3',
			// 'stroke-linecap': 'butt',
			// 'stroke-linejoin': 'miter',
			// 'stroke-miterlimit': '8',
		})
	group
		.text(text)
		.x(50).y(60)
		.font({
			...baseFontStyle,
			size: `${baseFontSize}px`,
		})

	return doc.svg()
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

const fs = require('fs')
fs.writeFileSync("o.svg", renderTextToSvg("1"))
