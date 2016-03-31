#s

A super-lightweight html tag selector library. Does what vanilla JS does, but with less typing. 

Uses very jQuery-like syntax.

## Usage

### `s(identifier)`

Returns an array-like collection of matching objects.

*`identifier`* - A String or an HTMLElement. 
- If it's a String
	- and it starts with a '.', it will look for elements with that class. `s(".circular")`.
	- and it starts with a '#', it will look for elements with that id. `s("#page-id")`.
	- otherwise will look for elements of that type. `s("h1")`
- If it's an HTMLElement
	- returns an s collection containing just that one item. 


