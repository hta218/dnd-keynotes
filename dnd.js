console.log('dnd script loaded!!')

window.addEventListener('load', function () {
	const dragTracker = {
		id: null,
		target: null
	}
	const placeholder = document.createElement('div')
	placeholder.classList.add('placeholder')

	window.dragTracker = dragTracker
	const dndBoard = document.querySelector('.ex2')
	const dragItems = document.querySelectorAll('.ex2 .example-draggable')

	dragItems.forEach(item => {
		item.addEventListener('dragstart', function (e) {
			console.log('drag start!', e.target.id)
			const target = e.target
			dragTracker.id = target.id
			dragTracker.target = target
			target.classList.add('dragging')
			target.replaceWith(placeholder)
		})
	})

	dragItems.forEach(item =>
		item.addEventListener('dragoverr', function (e) {
			if (dragTracker.id !== e.target.id) {
				console.log('drag over!', e.target.id)
				const { id, target } = dragTracker
				const curr = e.target
				const currId = curr.id

				const currIdx = [...dragItems].indexOf(curr)
				console.log(currIdx)
				if (currId !== id) {
					target.replaceWith(placeholder)

					if ([...dragItems].indexOf(curr) === dragItems.length - 1) {
						dndBoard.appendChild(target)
					} else {
						const next = dragItems[currIdx + 1]
						dndBoard.insertBefore(target, next)
					}
					target.classList.remove('dragging')
				}
			}
		})
	)
})
