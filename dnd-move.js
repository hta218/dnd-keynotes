console.log('DnD ex3 script loaded!!')

window.addEventListener('load', function () {
	let dragEl = null
	const dragItems = document.querySelectorAll('.ex4 .example-draggable')
	dragItems.forEach(addDndEvents)

	function addDndEvents(item) {
		item.addEventListener('dragstart', function (e) {
			dragEl = e.target.cloneNode(true)
			const wrapperIndex = e.target.parentNode.dataset.index
			console.log('Dnd 2 - Drag start', wrapperIndex)
			e.dataTransfer.setData('text/plain', wrapperIndex)
			e.dataTransfer.effectAllowed = 'move'
		})

		item.parentNode.addEventListener('dragenter', function (e) {
			console.log('Dnd 2 - Drag enter', this)
			this.classList.add('over')

			const currIndex = Number(this.dataset.index)
			const wrapperIndex = Number(e.dataTransfer.getData('text/plain'))

			if (currIndex !== wrapperIndex) {
				const from = currIndex > wrapperIndex ? wrapperIndex : currIndex
				const to = currIndex > wrapperIndex ? currIndex : wrapperIndex
				const wrappers = document.querySelectorAll('.wrapper')
				for (let i = from; i < to; i++) {
					const wrapper = wrappers[i]
					const next = wrappers[i + 1]
					wrapper.firstElementChild.remove()
					wrapper.appendChild(next.firstElementChild)
				}
			}
		})

		item.parentNode.addEventListener('dragleave', function(e) {

		})
	}
})
