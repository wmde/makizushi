// Requires the fonts-open-sans OS package.

const {spawn} = require('child_process')
const {createSVGWindow} = require('svgdom')
const {SVG, registerWindow} = require('@svgdotjs/svg.js')
const window = createSVGWindow()
registerWindow(window, window.document)

const sizes = [11, 15, 20]

function renderTextToSvg(text) {
	const doc = SVG(window.document.documentElement).size(100, 100)
	doc.group()
		.text(text)
		.font({
			family: 'Open Sans',
			size: '72px',
			weight: 'bold',
			color: '#000000',
			fill: '#444444',
			'text-anchor': 'middle',
			'dominant-baseline': 'middle',
		})
		.cx(50)
		.cy(50)

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
