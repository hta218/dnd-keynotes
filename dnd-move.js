console.log('DnD ex3 script loaded!!')

window.addEventListener('load', function () {
	const dragTracker = {
		dragEl: null,
		wrapperIndex: -1
	}

	function cleanUp() {
		dragTracker.dragEl = null
		dragTracker.wrapperIndex = -1
	}

	function getDragoverElements(from, to) {
		const elems = []
		const step = to > from ? 1 : -1

		let count = from
		while(count !== to) {
			elems.push(wrappers[count])
			count += step
		}

		elems.push(wrappers[to])

		return elems
	}

	window.__dragTracker = dragTracker

	const placeholder = document.createElement('div')
	placeholder.classList.add('placeholder')
	const dragItems = document.querySelectorAll('.ex4 .example-draggable')
	const wrappers = document.querySelectorAll('.wrapper')

	dragItems.forEach(addItemDndEvents)
	wrappers.forEach(addWrapperDndEvents)

	function addWrapperDndEvents(wrapper) {
		wrapper.addEventListener('dragenter', function (e) {
			console.log('Dnd 2 - Drag enter', this.dataset.index)
			if (!this.firstElementChild) {
				return
			}

			const currIndex = Number(this.dataset.index)
			const wrapperIndex = Number(dragTracker.wrapperIndex)
			if (currIndex !== wrapperIndex) {
				const dragoverWrappers = getDragoverElements(wrapperIndex, currIndex)
				console.log('before for loop =====>', dragoverWrappers)
				dragoverWrappers.forEach((wrp, i) => {
					const next = dragoverWrappers[i + 1]
					if (next.firstElementChild) {
						if (wrp.firstElementChild) {
							wrp.firstElementChild.remove()
						}
						wrp.appendChild(next.firstElementChild)
					}
				})
				dragTracker.wrapperIndex = currIndex

				// for (let i = from; i < to; i++) {
				// 	const wrp = wrappers[i]
				// 	const next = wrappers[i + 1]
				// 	if (next.firstElementChild) {
				// 		if (wrp.firstElementChild) {
				// 			wrp.firstElementChild.remove()
				// 		}
				// 		wrp.appendChild(next.firstElementChild)
				// 	}
				// }
				// dragTracker.wrapperIndex = currIndex
			}
		})

		wrapper.addEventListener('dragover', function (e) {
			console.log('Dnd 2 - dragover', this.dataset.index)
			e.preventDefault()
			e.dropEffect = "move"
		})

		wrapper.addEventListener('dragleave', function(e) {
			console.log('Dnd 2 - dragleave', this.dataset.index)
			e.preventDefault()
		})

		wrapper.addEventListener('drop', function(e) {
			console.log('Dnd 2 - drop', this.dataset.index)
			e.preventDefault()
			this.appendChild(dragTracker.dragEl)
			cleanUp()
		})
	}

	function addItemDndEvents(item) {
		item.addEventListener('dragstart', function (e) {
			dragTracker.dragEl = addItemDndEvents(this.cloneNode(true))
			this.classList.add('moving')

			const wrapperIndex = this.parentNode.dataset.index
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('text/plain', wrapperIndex)

			dragTracker.wrapperIndex = wrapperIndex

			console.log('Dnd 2 - Drag start', wrapperIndex)
		})

		item.addEventListener('dragend', function(e) {
			const dropEffect = e.dataTransfer.dropEffect
			console.log('Dnd 2 - dragend', this, dropEffect)
		})

		return item
	}
})
