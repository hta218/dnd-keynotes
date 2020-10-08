console.log('DnD ex2 script loaded!!')

window.addEventListener('load', function () {
	const dragItems = document.querySelectorAll('.ex3 .example-draggable')
	dragItems.forEach(addDndEvents)

	function addDndEvents(item) {
		item.addEventListener('dragstart', function (e) {
			console.log('Dnd - Drag start')
			const target = e.target
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('text/plain', e.target.id)
			target.classList.add('dragstart')
		})

		item.addEventListener('dragenter', function (e) {
			e.preventDefault()
			console.log('Dnd - Drag enter')
			const target = e.target
			const dragElemId = e.dataTransfer.getData('text/plain')
			if (target.id !== dragElemId) {
				target.classList.add('dragover')
			}
		})

		item.addEventListener('dragleave', function (e) {
			e.preventDefault()
			console.log('Dnd - Drag leave')
			e.target.classList.remove('dragover')
		})

		item.addEventListener('dragover', function (e) {
			e.preventDefault()
			e.dropEffect = "move"
			console.log('Dnd - dragover')
		})

		item.addEventListener('drop', function (e) {
			console.log('Dnd - drop')
			e.preventDefault()
			const dragElemId = e.dataTransfer.getData('text/plain')
			if (dragElemId !== e.target.id) {
				const dragElem = document.getElementById(dragElemId)

				e.target.classList.remove('dragover')
				const clone = e.target.cloneNode(true)
				addDndEvents(clone)

				dragElem.replaceWith(clone)
				dragElem.classList.remove('dragstart')
				e.target.replaceWith(dragElem)
			}
			e.target.classList.remove('dragstart')
			e.target.classList.remove('dragover')
		})
	}
})
