#s

A super-lightweight html tag selector library. Does what vanilla JS does, but with less typing. 

Uses very jQuery-like syntax. Methods generally return the parent object so that calls can be chained together.

## Usage

### Constructor

### `s(identifier)`

Returns a Selector, an array-like collection of matching objects.

*`identifier`* - String or HTMLElement. 
- If it's an HTMLElement
	- returns a selector containing just that one item. 
- If it's a String
	- returns a selector object containing all items matching the css selector. Can accept any valid css selector, but is optimised for single classes, ids or tag names.
	
### Properties

### `selector.length`

Contains the number of elements in the selector when created. Does not update with the DOM. Is read and write, so can be overwritten.

### Methods

### `selector.addClass(className)`

Adds a class to all the elements in the selector. Returns the selector.

*`className`* - String. The class name. Note: No dot in front of it. 

### `selector.css(cssObject)`

Removes the class from all the elements in the selector that have it, and adds the class to all elements that don't. Returns the selector.

*`cssObject`* - Object. An object containing the new CSS values. Object keys must be in the javascript form, not the CSS form, i.e. `backgroundImage`, not `"background-image"`

e.g.

```
s(".menuButton").css({color:"#446600", fontWeight:"bold"});
```

### `selector.data(keyName [, newValue])`

Gets or sets the value of an HTML data-attribute. Returns the data-attribute value, or the selector if newValue is set..

*`keyName`* - String. The name of the data-attribute, without the "data-" at the front. Note: No string transformation is done on the name of the key. String transformation is *wrong* and should always be avoided.

*`newValue`* - Variant, optional. The new value for the data attribute.

### `selector.find(identifier)`

Searches within the all elements of the selector to find items matching `identifier`. Returns a new selector.

*`identifier`* - String or HTMLElement. Uses the same rules as the s constructor.

### `selector.hasClass(className)`

Checks if the given first element of the selector has the specified class. Returns `true` or `false`.

*`className`* - String. The class name. Note: No dot in front of it. 

### `selector.removeClass(className)`

Removes the class from all the elements in the selector. Returns the selector.

*`className`* - String. The class name. Note: No dot in front of it.

### `selector.toggleClass(className)`

Removes the class from all the elements in the selector that have it, and adds the class to all elements that don't. Returns the selector.

*`className`* - String. The class name. Note: No dot in front of it. 

### Event handling

Utility functions for triggering events and adding and removing event listeners.

### `selector.on(eventName, handler)`

Add an event listener to each item in the selector collection.

*`eventName`* - String matching the event type.

*`handler`* - Function that will be called when the event is heard.

### `selector.off(eventName, handler)`

Remove the specified event listener from each item in the selector collection.

*`eventName`* - String matching the event type.

*`handler`* - Function that will be called when the event is heard.

### `selector.trigger(eventName)`

Dispatch a new event of the type specified from each item in the selector collection.

*`eventName`* - String matching the event type.

