console.log('DnD ex3 script loaded!!')

window.addEventListener('load', function () {
	let dragEl = null
	const dragItems = document.querySelectorAll('.ex4 .example-draggable')
	const wrappers = document.querySelectorAll('.wrapper')

	dragItems.forEach(addItemDndEvents)
	wrappers.forEach(addWrapperDndEvents)

	function addWrapperDndEvents(wraper) {
		wraper.addEventListener('dragenter', function (e) {
			// e.preventDefault()
			e.dropEffect = "move"
			debugger
			console.log('Dnd 2 - Drag enter', this.dataset.index)

			const currIndex = Number(this.dataset.index)
			const wrapperIndex = Number(e.dataTransfer.getData('text/plain'))
			console.log('====> ', currIndex, e.dataTransfer.getData('text/plain'))
			if (currIndex !== wrapperIndex) {
				this.firstElementChild.classList.add('hide')
				const from = currIndex > wrapperIndex ? wrapperIndex : currIndex
				const to = currIndex > wrapperIndex ? currIndex : wrapperIndex

				console.log('before for loop =====', from, to)
				for (let i = from; i < to; i++) {
					const wrapper = wrappers[i]
					const next = wrappers[i + 1]
					const nextChild = next.firstElementChild.cloneNode(true)
					nextChild.classList.remove('hide')
					// console.log('Dnd 2 - Drag enter', next, i)
					wrapper.firstElementChild.classList.add('hide')
					wrapper.appendChild(nextChild)
				}
				// console.log('after for loop =====')
			}
		})

		wraper.addEventListener('dragover', function (e) {
			console.log('Dnd 2 - dragover', this.dataset.index)
			e.preventDefault()
			e.dropEffect = "move"
		})

		wraper.addEventListener('dragleave', function(e) {
			console.log('Dnd 2 - dragleave', this.dataset.index)
			e.preventDefault()
			// this.classList.remove('over')
		})

		wraper.addEventListener('drop', function(e) {
			console.log('Dnd 2 - drop', this.dataset.index)
			e.preventDefault()
			this.firstElementChild.remove()
			this.appendChild(dragEl)
		})
	}

	function addItemDndEvents(item) {
		item.addEventListener('dragstart', function (e) {
			dragEl = this.cloneNode(true)
			const wrapperIndex = this.parentNode.dataset.index
			console.log('Dnd 2 - Drag start', wrapperIndex)
			e.dataTransfer.effectAllowed = 'move';
			e.dropEffect = "move"
			e.dataTransfer.setData('text/plain', wrapperIndex)

			const test = e.dataTransfer.getData('text/plain')
			console.log('====>', test)
		})
	}
})
