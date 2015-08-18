# jober

Simple quantitative timer with the ability to set the number of runs per day

## Quick examples
```javascript
var jober = require('jober');

var j = jober.init({
  interval: 60,
  jobs: [
    {
      jobsPerDay: 96,
      onTick: function(job) {
        myFunc('Hello world!', job);
      }
    }
  ]
});

function myFunc(str, obj) {
  console.log(str, JSON.stringify(obj));
}

// Result will be print "Hello world!" 96 times per day (i.e. every 86400/96/60=15 minute)
```

## Download

The source is available for download from
[GitHub](https://github.com/kolomiichenko/jober).
Alternatively, you can install using Node Package Manager (`npm`):

```bash
  npm install jober
```

## License

MIT License

Copyright (C) 2015 Andrii Kolomiichenko (bboywilld@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
