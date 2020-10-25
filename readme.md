# 💅 Javascript Drag and Drop API keynotes

I learned drag-and-drop APIs and created an example at [https://hta218.github.io/dnd-keynotes](https://hta218.github.io/dnd-keynotes)

Here are some of my notes about this.

## Basic concepts

- A typical **drag** operation begins when a user selects a **draggable** element, drags the element to a **droppable** element, and then releases the dragged element.

- Events:

Event | Fires when…
------------ | -------------
[drag](https://developer.mozilla.org/en-US/docs/Web/API/Document/drag_event) | …a dragged item (element or text selection) is dragged.
[dragend](https://developer.mozilla.org/en-US/docs/Web/API/Document/dragend_event) | …a drag operation ends (such as releasing a mouse button or hitting the **Esc** key)
[dragenter](https://developer.mozilla.org/en-US/docs/Web/API/Document/dragenter_event) | …a dragged item enters a valid drop target.
[dragexit](https://developer.mozilla.org/en-US/docs/Web/API/Document/dragexit_event) | …an element is no longer the drag operation's immediate selection target.
[dragleave](https://developer.mozilla.org/en-US/docs/Web/API/Document/dragleave_event) | …a dragged item leaves a valid drop target.
[dragover](https://developer.mozilla.org/en-US/docs/Web/API/Document/dragover_event) | …a dragged item is being dragged over a valid drop target, every few hundred milliseconds.
[dragstart](https://developer.mozilla.org/en-US/docs/Web/API/Document/dragstart_event) | …the user starts dragging an item.
[drop](https://developer.mozilla.org/en-US/docs/Web/API/Document/drop_event) | …an item is dropped on a valid drop target.

## Keynotes

- To make an element draggable, add `draggable="true"` attribute
  ```html
  <div draggable="true">This element is draggable</div>
  ```

- **dragstart**
  - `dragstart` is the first event fired when a drag operation triggered on a draggable element

  - use `e.dataTransfer.setData()` method to set any drag's data, this will stay during the drag operation

  ```js
  // The `dragstart` event fires on the `draggable` element
  dragElem.addEventListener('dragstart', function(e) {
		// We can set data using `e.dataTransfer.setData` method
    e.dataTransfer.setData('text/plain', e.target.id)
    // Use e.dataTransfer.setDragImage() to change the drag image
    // e.dataTransfer.setDragImage(img | element, xOffset, yOffset)
  })
  ```
  
  - If you don't want the translucent image generated from the drag target during drag, use `e.dataTransfer.setDragImage()` to change it

- The **dropEffect**

  - The **dropEffect** property is used to control the feedback the user is given during a drag-and-drop operation

  ```js
  dragElem.addEventListener('dragstart', function(e) {
    e.dataTransfer.setData('text/plain', e.target.id)
    // The `move` value works on window, not on macOS - It might be the problem of browser along with OS
    e.dataTransfer.dropEffect = "move" // or "copy"
  })
  ```

  - Effects may be defined:

    1. **move**: dragged data will be moved to the dropzone.
    2. **copy** dragged data will be copied to the dropzone.
    3. ...

- The **dropzone**

  - To make an element becomes a dropzone the element **must** have both **dragover** and **drop** event handler.

  - Remember to call **e.preventDefault()** or the browser or it will not let you drop anything inside

  ```js
  dropzone.addEventListener('dragover', function handleDragOver(e) {
		// The `dropzone` element must have both `dragover` and `drop` event
		// Remember to preventDefault the behavior or the browser or it will not let you drop anything inside
		e.preventDefault()
		e.dataTransfer.dropEffect = "move"
	})
	dropzone.addEventListener('drop', function handleDrop(e) {
		// NOTE: there must be a handler for dragover to use drop event
		e.preventDefault()
		// Use `e.dataTransfer.getData` method to retrieve drag's data and process them
    const data = e.dataTransfer.getData('text/plain')
		// NOTE: Keep mind that we can only use the `dataTransfer.getData()` in the `drop-handler`
		// `getData()` will return empty string inside handle dragover or dragenter
	})
  ```

Tutorial from [DigitalOcean](https://www.digitalocean.com/community/tutorials/js-drag-and-drop-vanilla-js#step-2-%E2%80%94-handling-drag-and-drop-events-with-javascript) and [Javascript.info](https://javascript.info/mouse-drag-and-drop)
