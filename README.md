# validPic.js
A JavaScript image validator based on mimetypes.

## Introduction
Tired of not finding any library to validate images on the client side, I decided to create one for my own use and anybody else who wants to save some time doing it.
Yeah, we all know client-side validation is just one of the many steps, and we should never rely only on it, but hey! It helps, not only us but also users!

This library makes use of the magic numbers to detect different mimetypes, so even when the mimetype is modified, we can still figure out if it is what it claims to be.

## Install using Bower or NPM

**Optionally**, you can install fullPage.js with bower or NPM if you prefer a terminal.

```shell
// With bower
bower install validpic.js

// With NPM
npm install validpic.js
```

## Usage

Valid image types at the moment are `png`, `jpg`, `gif` and `bmp`.

- Include the script before the closing `</body>` tag.
- Use the `valid-pic` class in any input you want to validate.
- Use the custom events to manage errors in your own way.

## Example

```html
<div>
    <input type="file" id="add-image" class="valid-pic" />
</div>
```

### Using JavaScript

```javascript
document.getElementById('add-image').addEventListener("error", function () {
    console.log("Invalid image - JavaScript custom event");
 
    // do whatever here
}, false);
```

### Using jQuery

```javascript
$('.valid-pic').on('error', function (e) {
    const data = e.originalEvent.detail;
 
    console.log(data);
    console.log("Invalid image - jQuery custom event");
    
    $(data.input).css('background', 'red');
    $(data.input).after('<p class="error-message" class="note">Invalid image type!</p>');
});
```
