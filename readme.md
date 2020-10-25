# 💅 Javascript Drag and Drop API keynotes

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


- `drag`
- `dragstart`
- `dragover`
- `drop`
- ...

Tutorial from [DigitalOcean](https://www.digitalocean.com/community/tutorials/js-drag-and-drop-vanilla-js#step-2-%E2%80%94-handling-drag-and-drop-events-with-javascript) and [Javascript.info](https://javascript.info/mouse-drag-and-drop)
