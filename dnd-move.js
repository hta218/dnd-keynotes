console.log('DnD ex3 script loaded!!')

window.addEventListener('load', function () {
	const dragTracker = {
		dragEl: null,
		wrapperIndex: -1
	}
	const dragItems = document.querySelectorAll('.ex4 .example-draggable')
	const wrappers = document.querySelectorAll('.wrapper')

	dragItems.forEach(addItemDndEvents)
	wrappers.forEach(addWrapperDndEvents)

	function addWrapperDndEvents(wraper) {
		wraper.addEventListener('dragenter', function (e) {
			console.log('Dnd 2 - Drag enter', this.dataset.index)

			const currIndex = Number(this.dataset.index)
			const wrapperIndex = Number(dragTracker.wrapperIndex)

			if (currIndex !== wrapperIndex) {
				// this.firstElementChild.classList.add('hide')
				const from = currIndex > wrapperIndex ? wrapperIndex : currIndex
				const to = currIndex > wrapperIndex ? currIndex : wrapperIndex

				console.log('before for loop =====', from, to)
				for (let i = from; i < to; i++) {
					const wrapper = wrappers[i]
					const next = wrappers[i + 1]
					// const nextChild = next.firstElementChild.cloneNode(true)
					// nextChild.classList.remove('hide')
					// console.log('Dnd 2 - Drag enter', next, i)
					// wrapper.firstElementChild.classList.add('hide')
					wrapper.appendChild(next.firstElementChild)
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
			this.appendChild(dragTracker.dragEl)
		})
	}

	function addItemDndEvents(item) {
		item.addEventListener('dragstart', function (e) {
			dragTracker.dragEl = this.cloneNode(true)

			const wrapperIndex = this.parentNode.dataset.index
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('text/plain', wrapperIndex)

			// this.classList.add('hide')
			dragTracker.wrapperIndex = wrapperIndex

			console.log('Dnd 2 - Drag start', wrapperIndex)
		})
	}
})
