
function JSBubbles(params){
  console.log('Loading JSBubbles...');
  this.params = params;

  //TODO: add linkedin
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
        //If supported, the user should only provide the url. Therefore both color and img shoul be added to the literal
        $.extend( toadd[ String(property) ], common_params[property] );
        $.extend( toadd[ String(property) ], {url: params[property]} );
      } else
        $.extend( toadd[ String(property) ], params[property] );

      $.extend( bubbles, toadd );
    }
    return bubbles;
  };

  var startAnimation = function(id,animation_name,time){
    $(id).addClass(animation_name);
    if(time != -1){
      $(id).css("animation-duration",(time/1000)+'s');
      setTimeout(function() {
        $(id).removeClass(animation_name);
      }, time);
    }
  }

  //render complete parameters inside bubbles DIV
  var renderParams = function( params ){
    //alert(params.toSource());
    for (bubble in params){
      $( ".bubbles" ).append( "<a href='"+params[bubble].url+"'><div id='bubble"+bubble+"' class='bubble "+params[bubble].img+"'></div></a>" );
      $('#bubble'+bubble).css("background-color", params[bubble].color); //font-family: 'FontAwesome'
      $('#bubble'+bubble).css("font-family",'FontAwesome');

      //TODO: add delay to the sequence?
      //register start animation here
      startAnimation('#bubble'+bubble,'animation-bounce',1500);

      //register hover animation
      $('#bubble'+bubble).bind('mouseenter', bubble ,function(data) {
        startAnimation('#bubble'+data.data,'animation-enlarge-top',2000);
      });
    }
  };

  //When the main DIV is ready...
  $( ".js-bubbles" ).ready(function() {
    console.log('JSBubbles loaded!');

    //complete given params and send them for rendering
    renderParams(readParams( this.params ));
  }.bind(this));

}
