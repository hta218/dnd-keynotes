console.log('DnD ex3 script loaded!!')

window.addEventListener('load', function () {
	let dragEl = null
	const dragItems = document.querySelectorAll('.ex4 .example-draggable')
	dragItems.forEach(addDndEvents)

	function addDndEvents(item) {
		item.addEventListener('dragstart', function(e) {
			console.log('Dnd 2 - Drag start')
			const id = e.target.id
			dragEl = e.target.cloneNode(true)
			e.dataTransfer.setData('text/plain', id)
			e.dataTransfer.effectAllowed = 'move'
		})

		item.parentNode.addEventListener('dragenter', function(e) {
			console.log('Dnd 2 - Drag enter', this)
			this.classList.add('over')
			this.firstElementChild.classList.add('hide')
		})
	}
})
