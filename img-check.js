(function(){
	let foregroundElement = null

	const clrSucces = '#0f0',
		clrWarning = '#ff0',
		clrDanger = '#f00'

	class Image {
		constructor(imgEl) {
			this.el = imgEl

			this.naturalWidth = imgEl.naturalWidth
			this.naturalHeight = imgEl.naturalHeight

			const rect = imgEl.getBoundingClientRect()
			this.width = rect.width
			this.height = rect.height

			this.successBorder = `5px solid ${clrSucces}`
			this.dangerBorder = `5px solid ${clrDanger}`
			this.warningBorder = `5px solid ${clrWarning}`

			this.el.addEventListener('click', e => {
				e.preventDefault()
				e.stopPropagation()
				if (foregroundElement) closeForeground()
				this.sizeComparison()
			})
		}

		borderStyle(diff) {
			if (diff > 0) return this.warningBorder // img larger than source
			if (diff < 0) return this.dangerBorder  // img smaller than source
			return this.successBorder               // Exact same size
		}

		setWidthBorderStyle(style) {
			this.el.style.borderTop = style
			this.el.style.borderBottom = style
		}

		setHeightBorderStyle(style) {
			this.el.style.borderLeft = style
			this.el.style.borderRight = style
		}

		testSize() {
			const widthDiff = this.width - this.naturalWidth,
				heightDiff = this.height - this.naturalHeight

			this.el.style.boxSizing = 'border-box'
			this.el.style.zIndex = 1
			this.setWidthBorderStyle(this.borderStyle(widthDiff))
			this.setHeightBorderStyle(this.borderStyle(heightDiff))
		}

		sizeComparison() {
			const compDiv = document.createElement('div')
			compDiv.className = 'comparison'

			const trueSizeImg = document.createElement('img')
			trueSizeImg.src = this.el.src
			trueSizeImg.className = 'comparison__source-image'

			const setSizeDiv = document.createElement('div')
			setSizeDiv.innerText = `${this.width}x${this.height}`
			setSizeDiv.style.width = `${this.width}px`
			setSizeDiv.style.height = `${this.height}px`
			setSizeDiv.className = 'comparison__displayed-size'

			const dimensions = document.createElement('div')
			dimensions.innerText = `${this.naturalWidth}x${this.naturalHeight}`
			dimensions.className = 'comparison__source-dimensions'

			compDiv.appendChild(trueSizeImg)
			compDiv.appendChild(setSizeDiv)
			compDiv.appendChild(dimensions)
			document.body.appendChild(compDiv)
			foregroundElement = compDiv

			const heightY = dimensions.getBoundingClientRect().height,
				moveX = this.naturalWidth / 2,
				moveY = (this.naturalHeight /2) + 5 + heightY
				console.log(heightY, moveX, moveY)
			dimensions.style.transform = `translateX(-${moveX}px) translateY(-${moveY}px)`
		}
		
	}

	document.body.addEventListener('click', e => {
		if (foregroundElement) {
			closeForeground()
		}
	})

	function closeForeground() {
		foregroundElement.parentNode.removeChild(foregroundElement)
		foregroundElement = null
	}

	Array.from(document.getElementsByTagName('img'))
		.map(imgEl => new Image(imgEl))
		.map(img => img.testSize())
})()