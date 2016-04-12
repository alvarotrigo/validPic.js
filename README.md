# validPic.js
Javascript image validator based on mimetypes.


# Introduction
Tired of not finding any library to validate images on the client side I decided to create one for my own use.
Yeah, we all know client side validation is just one of the steps and we should never rely only on it, but hey! I helps, not only us but also users!

This library makes use of the magic numbers to detect different mimetypes, thefore even when the mimetype is mnodifed we can still figure out it it is what it claims to be.

# Usage

Valid image types at the moment are: `png, `jpg`, `gif`, `bmp`.

- Include the script before the closing `</body>` tag.
- Use the class `valid-pic` in any input you want to validate.
- Use the the custom events to manage errors in your own way

# Example

```html
<div>
    <input type="file" id="add-image" class="valid-pic" />
</div>
```

###Using javascript

```javascript
document.getElementById('add-image').addEventListener("error", function(){
    console.log("Invalid image - javascript custom event");

    //do whatever here
}, false);
```

###Using jQuery

```javascript
$('.valid-pic').on('error', function(e){
    var data = e.originalEvent.detail;

    console.log(data);
    console.log("Invalid image - jQuery custom event");
    
    $(data.input).css('background', 'red');
    $(data.input).after('<span class="error-message">Invalid image type!</div>');
});
```

