IncludeJS
=========

Version 1.0.0

A library to include HTML partials, useful for layout presentation and [Handlebars][handlebars] template ready.

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

    <script src="../vendor/handlebars-v1.3.0.js"></script>
    <script src="../include.js"></script>

    <!--[if lt IE 9]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
</head>

<body>
    <include src="template/header.html"></include>
    <include src="template/content.html"></include>
    <include src="template/footer.html"></include>
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


[image]: https://imagizer.imageshack.us/v2/728x214q90/661/eRzoBc.png
[folder]: https://github.com/vitto/includejs/tree/master/test
[handlebars]: http://handlebarsjs.com
