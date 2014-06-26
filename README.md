# FLUIDITY

### A fully responsive css framework that is impossibly small

HTML out of the box is almost 100% responsive.
This stylesheet fixes that in 247 minified bytes.
Let's make the web just a bit more responsive shall we?

## Installing fluidity

#### Production

Just include the fluidity css file in the head of your html file:
```html
<link rel="stylesheet" href="css/fluidity.min.css">
```

For elements that need to retain widths that might be wider than a device's
viewport (i.e tables), wrap them in a div with the class 'overflow-container'
like so:
```html
  <div class="overflow-container">
    <table>
      ...
    </table>
  </div>
```

#### Development

If you want to develop with the uncompressed version, include instead:
```html
<link rel="stylesheet" href="css/fluidity.css">
```

## Available build / dev tools

If you'd like to use the available build tools just run:
```
cd fluidity
npm install -g gulp
npm install
gulp
```

## Gulp Tasks

Gulp is a JavaScript task runner.
http://gulpjs.com

There are a few common tasks that gulp takes care of here:
* Livereload
* CSS minification
* Autoprefixer
* Sass
* Lints the compiled css

Run these from the root directory of the project. The command
```
gulp
```
runs a live reload server and starts sass compilation while running csslint, while
```
gulp production
```
also minifies the css.


# License

The MIT License (MIT)

Copyright (c) 2014 @mrmrs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

