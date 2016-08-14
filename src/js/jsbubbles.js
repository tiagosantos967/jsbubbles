
function JSBubbles(params, animations){
  console.log('Loading JSBubbles...');
  this.params = params;
  this.animations= animations;

  var common_params = {
    facebook: {
      color: '#3b5998',
      img: 'fa-facebook'
    },
    twitter: {
      color: '#326ada',
      img: 'fa-twitter '
    },
    instagram: {
      color: '#cd486b',
      img: 'fa-instagram '
    },
    git: {
      color: '#C0C0C0',
      img: 'fa-github'
    },
    linkedin: {
      color: '#0077b5',
      img: 'fa-linkedin'
    }
  };

  //Read and complete user parameters
  var readParams= function( params ){
    var bubbles = {};
    for (property in params) {
      //check if property is supported in common_params
      var toadd = { } ;
      toadd[ String(property) ] = {};
      if(property in common_params){
        //If supported, the user can provide only the url. Therefore both color and img shoul be added to the literal
        $.extend( toadd[ String(property) ], common_params[property] );
        $.extend( toadd[ String(property) ], {url: params[property]} );
      } else
        $.extend( toadd[ String(property) ], params[property] );

      $.extend( bubbles, toadd );
    }
    return bubbles;
  };

  var removeAllAnimations = function(id){
    //remote all classes containing "animation" and 'transition'
    var classes =  $('#bubble'+id).attr("class").split(" ");
    for(var i=0; i< classes.length ; i++){
      //if there are classes for anmations or transitions, remove them
      if(~classes[i].indexOf('transition') || ~classes[i].indexOf('animation'))
        $('#bubble'+id).removeClass(classes[i]);
    }
  };

  var startAnimation = function(id , animation_name , time , delay ){
    setTimeout(function() {
      $(id).addClass(animation_name);
      if(time != -1){
        $(id).css("animation-duration",(time/1000)+'s');
        setTimeout(function() {
          $(id).removeClass(animation_name);
        }, time);
      }
    }, delay);
  }

  //render complete parameters inside bubbles DIV
  var renderParams = function( params, animations ){

    var delay = typeof animations.start.delay !== 'undefined'? animations.start.delay : 0;
    var delayed = 0;

    for (bubble in params){
      $( ".bubbles" ).append( "<a href='"+params[bubble].url+"'><div id='bubble"+bubble+"' class='bubble "+params[bubble].img+"'></div></a>" );
      $('#bubble'+bubble).css("background-color", params[bubble].color); //font-family: 'FontAwesome'
      $('#bubble'+bubble).css("font-family",'FontAwesome');

      //register start animation here
      if(typeof animations.start !== 'undefined')
        startAnimation('#bubble'+bubble,animations.start.name,animations.start.time, delayed+=delay );

      //register hover animation
      if(typeof animations.hover !== 'undefined'){
        if(~animations.hover.name.indexOf('transition')){
          //not really starting but adding
          startAnimation('#bubble'+bubble,animations.hover.name,-1,0);
        } else {
          $('#bubble'+bubble).bind('mouseenter', {bubble: bubble, animations: animations} ,function(event) {
            var data = event.data;
            startAnimation('#bubble'+data.bubble,data.animations.hover.name,data.animations.hover.time,0);
          });
        }
      }
    }
  };

  //When the main DIV is ready...
  $( ".js-bubbles" ).ready(function() {
    console.log('JSBubbles loaded!');

    //complete given params and send them for rendering
    this.addBubbles(this.params,this.animations);
  }.bind(this));

  //add notification bubble
  this.addNotification =function(id,value){
    if( $('#bubble'+id+' > div.notification').length == 0)
      $('#bubble'+id).append("<div class='notification'>"+value+"</div>");
    else
      $('#bubble'+id+' > div.notification').html(value);
  };

  this.removeNotifications =function(id){
    $('#bubble'+id).empty();
  };

  //adds bubbles to the end of the list
  this.addBubbles =function(params,animations){
    //complete given params and send them for rendering
    renderParams(readParams( params ), animations);
  };

  //remove bubble from id
  this.removeBubble= function(id){
    $('#bubble'+id).remove();
  };

  this.setTooltipText = function(id,text){
    removeAllAnimations(id);

    if( $('#bubble'+id+' > div.tooltip').length == 0)
      $('#bubble'+id).append("<div class='tooltip'>"+text+"</div>");
    else
      $('#bubble'+id+' > div.tooltip').html(text);
  }

}
