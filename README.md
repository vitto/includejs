IncludeJS
=========

A library to include **HTML** and **Markdown** partials inside a web page, useful for layout templates with [Handlebars][handlebars] and read [Markdown][marked] articles without complex works.

**Features**

- Use `<include>` tag to include html partials on the page
- It supports [Handlebars][handlebars] and can handle JSON strings
- You can wrap **JSON strings** inside `<include> { "message" : "hello" } </include>` tag to send data to Handlebars
- You can link a **JSON file** to `<include>` with `data-json-src` attribute
- It supports [Marked][marked] to include markdown files
- You can include `.html` or `.md` files, IncludeJS will know what to do

[Download version 1.2.2][release]

===

Base usage example:

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">

    <title>IncludeJS test page</title>
    <meta name="author" content="Vittorio Vittori">
    <meta name="description" content="IncludeJS is a library to include HTML partials, useful for static templates">

    <script src="test/vendor/handlebars-v1.3.0.js"></script>
    <script src="test/vendor/marked.js"></script>
    <script src="../include.js"></script>

    <!--[if lt IE 9]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
</head>

<body>
    <include
        src="template/header.html"
        data-json-src="data/menu.json">
    </include>
    <section>
        <include src="template/content.md"></include>
    </section>
    <include src="template/footer.html">
        {
            "author" : "Vittorio Vittori",
            "url"    : "http://vit.to"
        }
    </include>
    <script type="text/javascript">
        Include.onLoad = function() {
            console.log("Hello! Everything is loaded succesfully and JS can be executed with happyness!");
        };
    </script>
</body>
</html>
```

This is the [folder structure][folder], and this is the result:

![Render result][image]

[release]: https://github.com/vitto/includejs/releases/tag/1.2.2
[image]: https://imagizer.imageshack.us/v2/728x214q90/661/eRzoBc.png
[folder]: https://github.com/vitto/includejs/tree/master/test
[handlebars]: http://handlebarsjs.com
[marked]: https://github.com/chjj/marked
