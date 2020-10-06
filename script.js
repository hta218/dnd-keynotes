console.log('Script loaded!!')
window.addEventListener('load', function () {
	console.log('Window loaded!!')

	function onDragStart(event) {
		console.log('Drag start!')
		// Set the `id` of the dragged element
		event.dataTransfer.setData('text/plain', event.target.id)

		// Set element style via `currentTarget` object
		// The dragged element will keep this new style unless you manually change it back!
		event.currentTarget.style.background = 'lightgreen'
	}

	function onDragOver(event) {
		event.preventDefault()
	}

	function onDrop(event) {
		// get the `id` in `dataTransfer` that we saved before
		const id = event.dataTransfer.getData('text')
		const draggableEle = document.getElementById(id)
		// const dropzone = event.target;
		dropzone.appendChild(draggableEle);

		// clean up by clear the `dataTransfer`
		event.dataTransfer.clearData()
	}


	const dragElems = document.querySelectorAll('.ex1 .example-draggable')
	const dropzone = document.querySelector('.example-dropzone')

	dragElems.forEach(el => el.addEventListener('dragstart', onDragStart))
	dropzone.addEventListener('dragover', onDragOver)
	dropzone.addEventListener('drop', onDrop)
})
