#s

A super-lightweight html tag selector library. Does what vanilla JS does, but with less typing. 

Uses very jQuery-like syntax. Methods generally return the parent object so that calls can be chained together.

## Usage

### `s(identifier)`

Returns a Selector, an array-like collection of matching objects.

*`identifier`* - String or HTMLElement. 
- If it's a String
	- and it starts with a '.', it will look for elements with that class. `s(".circular")`.
	- and it starts with a '#', it will look for elements with that id. `s("#page-id")`.
	- otherwise will look for elements of that type. `s("h1")`
- If it's an HTMLElement
	- returns a selector containing just that one item. 

### `selector.length`

Contains the number of elements in the selector when created. Does not update with the DOM. Is read and write, so can be overwritten.

### `selector.addClass(className)`

Adds a class to all the elements in the selector. Returns the selector.

*`className`* - String. The class name. Note: No dot in front of it. 

### `selector.removeClass(className)`

Removes the class from all the elements in the selector. Returns the selector.

*`className`* - String. The class name. Note: No dot in front of it.

### `selector.toggleClass(className)`

Removes the class from all the elements in the selector that have it, and adds the class to all elements that don't. Returns the selector.

*`className`* - String. The class name. Note: No dot in front of it. 

### `selector.hasClass(className)`

Checks if the given first element of the selector has the specified class. Returns `true` or `false`.

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

Search within the first element of the selector to find items matching `identifier`. Returns a new selector.

*`identifier`* - String or HTMLElement. Uses the same rules as the s constructor.


