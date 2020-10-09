console.log('DnD ex2 script loaded!!')

window.addEventListener('load', function () {
	let dragEnd = false
	const dragItems = document.querySelectorAll('.ex3 .example-draggable')
	dragItems.forEach(addDndEvents)

	document.body.addEventListener('dragover', function(e) {
		e.preventDefault()
		console.log('Document dragover')
	})
	document.body.addEventListener('drop', function(e) {
		console.log('Document drop')
		if (!dragEnd) {
			const dragElemId = e.dataTransfer.getData('text/plain')
			document.getElementById(dragElemId).classList.remove('dragstart')
			dragEnd = true
		}
	})

	function addDndEvents(item) {
		item.addEventListener('dragstart', function (e) {
			console.log('Dnd - Drag start')
			dragEnd = false
			const target = e.target
			// e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('text/plain', e.target.id)
			// e.dataTransfer.setDragImage(e.target, 0, 0)
			target.classList.add('dragstart')
		})

		item.addEventListener('dragenter', function (e) {
			console.log('Dnd - Drag enter')
			e.preventDefault()
			const target = e.target
			const dragElemId = e.dataTransfer.getData('text/plain')
			if (target.id !== dragElemId) {
				target.classList.add('dragover')
			}
		})

		item.addEventListener('dragleave', function (e) {
			console.log('Dnd - Drag leave')
			e.preventDefault()
			e.target.classList.remove('dragover')
		})

		item.addEventListener('dragover', function (e) {
			console.log('Dnd - dragover')
			e.preventDefault()
			// e.dropEffect = "move"
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
			dragEnd = true
		})
	}
})
