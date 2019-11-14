# SimpleClock
Analog Clock Made with Pure JavaScript using Canvas API.
A simple analog clock using HTML5 canvas and javascript

##  Include files

In the page's footer, just before <code>&lt;/body&gt;</code>, include the required JavaScript file

```html
<script src="simpleClockOOP.min.js"></script>
```

Add the markup to your HTML where you want the clock to appear on your page.
```html
<div id="myClock"></div>
```
Finally you can create your Clock by using the following Javascript:
```javascript

var myClock = new SimpleClock('myClock');
    
```


## Options

The SimpleClock has customizable feature.

```javascript

var myClock = new SimpleClock(id,
    {
        option1: value1,
        option2: value2,
    }
);

```

The Parameters are :

1. simpleClock's id, should be String.

2. An object to custom SimpleClock including available options which are listed below. A null object means default options.

| Option | Type | Default | Description |
|:---|:---:|:---:|:---|
| colorHourHand | String |"black" | The color of hour hand. |
| colorMinuteHand | String | "black" | The color of Minute hand. |
| colorSecondHand | String | "red" | The color of second hand. |
| colorNumber | String | "black" | The color of Number. |
| colorNumber90Deg | String | "red" | The color of numbers drawn after every 90 degrees. |
| colorDash | String | "black" | The color of dash. |
| colorText | String | "black" | The color of text. |
| text | String | "Quartz" | The color of hands. |
| width | Number | 600 | The width of canvas.  |
| height | Number | 600 | The height of canvas. |

## Methods
#### setSize
Resize the clock.
```javascript
    myClock.setSize(width,height);
```
The Parameters are :

1. width : The new Width of the canvas , should be Number.

2. height : The new height of the canvas , should be Number.


### demo  [SimpleClock](https://codepen.io/Dr_rakcha/pen/oNNEaKx)

### License [MIT License](https://opensource.org/licenses/MIT)

