console.log('Keynotes script loaded!')

window.addEventListener('load', function () {
	function handleDragStart(e) {
		// The `dragstart` event fire on the `draggable` element
		console.log('Drag start!')
		// We can set data using `e.dataTransfer.setData` method
		e.dataTransfer.setData('text/plain', e.target.id)
		e.dataTransfer.effectAllowed = "move"
		e.dataTransfer.dropEffect = "move"
		e.target.classList.add('dragging')
	}

	function handleDragEnd(e) {
		// The `dragend` event fired on the `draggable` element
		// We can check wether the drag operation succeeded or not by check the `e.dataTransfer.dropEffect`
		// If it's not succeeded the value of `e.dataTransfer.dropEffect` will be "none"
		const dropEffect = e.dataTransfer.dropEffect
		e.target.classList.remove('dragging')
		console.log('Drag end!', dropEffect)
	}

	function handleDragOver(e) {
		// The `dropzone` element must have both `dragover` and `drop` event
		// Remember to preventDefault the behavior or the browser or it will not let you drop anything inside
		console.log('Drag over!')
		e.preventDefault()
		e.dataTransfer.dropEffect = "move"
	}

	function handleDrop(e) {
		// Use `e.dataTransfer.getData` method to retrieve drag's data and process them
		// NOTE: there must be a handler for dragover to use drop event
		// NOTE: Keep mind that we can oly use the `dataTransfer.getData()` in the `drop-handler`
		// `getData()` will return empty string inside handle dragover or dragenter
		console.log('Drop!')
		e.preventDefault()
		const data = e.dataTransfer.getData('text/plain')
		const dragEl = document.getElementById(data)
		dragEl.classList.remove('dragging')
		this.appendChild(dragEl)
	}

	const dragElems = document.querySelectorAll('.ex1 .example-draggable')
	const dropzone = document.querySelector('.ex1 .example-dropzone')

	dragElems.forEach(dragEl => {
		dragEl.addEventListener('dragstart', handleDragStart)
		dragEl.addEventListener('dragend', handleDragEnd)
	})

	dropzone.addEventListener('dragover', handleDragOver)
	dropzone.addEventListener('drop', handleDrop)
})
