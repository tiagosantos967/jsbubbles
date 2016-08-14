# JSBubbles
Java Script Bubbles for extra interactions on your website.  
As easy as calling a JavaScript function. [See it in action](http://tmasantos.com/projects/jsbubbles/test/test1.html)  

![What it looks like](https://github.com/tiagosantos967/jsbubbles/blob/master/src/res/no-animation.png?raw=true)  
_version 0.5_

## Support
Tested for: **Firefox, Chrome and Safari**  
Not tested for mobile support yet.

## Main Features
- Dynamically add bubbles to your website;
- Add custom bubbles (using FontAwesome!);
- Add start and hover animations to each bubble;
- Add notifications and tool-tips!
- Add FastBubbles (just give the name and url):  
-- Facebook  
-- Twitter  
-- Instagram  
-- Linkedin

![What it looks like](https://raw.githubusercontent.com/tiagosantos967/jsbubbles/master/src/res/animation-bounce.png)  
![What it looks like](https://github.com/tiagosantos967/jsbubbles/blob/master/src/res/animation-enlarge-top.png?raw=true)  
![What it looks like](https://raw.githubusercontent.com/tiagosantos967/jsbubbles/master/src/res/notification-tooltip.png)

## Deppendencies
- Jquery
- FontAwesome

## How to use
### HTML
```HTML
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">

<link rel="stylesheet" type="text/css" href="../css/main.css">
<script src="../js/jsbubbles.js"></script>

<div class="js-bubbles">
    <div class="bubbles">
      <!--JS will add the bubbles here!-->
    </div>
</div>
```
### JAVASCRIPT
```javascript
 //Start
 var jsbubbles = new JSBubbles({<bubbles>},{animations});
```
## Examples
Fast example for javascript:
```javascript  
var jsbubbles = new JSBubbles({
      git: 'https://github.com/tiagosantos967',
      linkedin: 'https://nl.linkedin.com/in/tiago-santos-1b04a5118',
      CUSTOM:{
        color: '#ecc5a8',
        img: 'fa-ellipsis-h ',
        url: '#'
      }
    },{
      start:{
        name: 'animation-enlarge-top',
        time: 1500,
        delay: 100
      },
      hover:{
        name: 'transition-enlarge-top'
      }
    });
```
Add extra bubbles:
```javascript  
jsbubbles.addBubbles({
        linkedin: 'https://nl.linkedin.com/in/tiago-santos-1b04a5118'
      } , {
        start:{
          name: 'animation-bounce',
          time: 1500
        } //you can add an hover animation too.
      });
```
Add notification number and tooltips:
```javascript  
jsbubbles.addNotification('facebook',1);
jsbubbles.setTooltipText('facebook','hello world facebook');
```
