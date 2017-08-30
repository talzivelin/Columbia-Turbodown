jQuery(document).ready(function(){
	$("#fsForm1803072").submit(function(event) {
		event.preventDefault();
		
		var data = $(this).serialize() + '&ajax=1';
		
		$.ajax({
			url: 'index.php',
			type: 'POST',
			dataType: 'json',
			data: data,
			complete: function(xhr, textStatus) {
				console.log(textStatus)
			},
			success: function(data, textStatus, xhr) {

				if (data.success) {
					$('.modal-backdrop, #enternow').hide();
					$("#thankyou").modal();
					fireConversion();
				} else {
					$('.fsValidationError').removeClass('fsValidationError');
					$('.fsError').html('<ul></ul>')
				
					$.each(data.errors, function(index, val) {
						$('.fsError ul').append('<li>'+val+'</li>')
						$('*[name="'+index+'"]').closest('.fsCell, .fsOptionLabel').addClass('fsValidationError');
					});
				}
				    //called when successful
			},
			error: function(xhr, textStatus, errorThrown) {
				alert(errorThrown)
				    //called when there is an error
			}
		});
		
	});
})

			//rollover swap images with rel
			var img_src = "";
			var new_src = "";
			
			$(".imgrollover").hover(function(){
			//mouseover
			img_src = $(this).attr('src'); //grab original image
			new_src = $(this).attr('rel'); //grab rollover image
			$(this).attr('src', new_src); //swap images
			$(this).attr('rel', img_src); //swap images
			},
			function(){
			//mouse out
			$(this).attr('src', img_src); //swap images
			$(this).attr('rel', new_src); //swap images
			});
			
			//preload images
			var cache = new Array();
			//cycle through all rollover elements and add rollover img src to cache array
			$(".imgrollover").each(function(){
			var cacheImage = document.createElement('img');
			cacheImage.src = $(this).attr('rel');
			cache.push(cacheImage);
			});
        

        <!-- FlexSlider -->        
            /*$(window).load(function(){
              $('.flexslider01').flexslider({
                animation: "slide",
                start: function(slider){
                }
              });
            });
			*/
			
        $(window).load(function() {
			$('#main-slider').flexslider({
			  animation: 'slide',
			  controlsContainer: '.flex-container',
			  pauseOnAction: true,
			  pauseOnHover: true, 
			  slideshowSpeed: 8000,
			});
		
			$('#gallery-slider01').flexslider({
				pauseOnAction: true,
				pauseOnHover: true,
				slideshowSpeed: 8000, 
			});
			$('#gallery-slider02').flexslider({
				pauseOnAction: true,
				pauseOnHover: true,
				slideshowSpeed: 8000, 
			});
			$('#gallery-slider03').flexslider({
				pauseOnAction: true, 
				pauseOnHover: true,
				slideshowSpeed: 8000,
			});
			$('#gallery-slider04').flexslider({
				pauseOnAction: true,
				pauseOnHover: true, 
				slideshowSpeed: 8000,
			});
		  });
        
			$( ".mapitem01" ).hover(
				function() {
					$( ".mapitem01" ).addClass( "hover" );
					}, function() {
					$( ".mapitem01").removeClass( "hover" );
				}
			);
			
			$( ".mapitem02" ).hover(
				function() {
					$( ".mapitem02" ).addClass( "hover" );
					}, function() {
					$( ".mapitem02").removeClass( "hover" );
				}
			);
			
			$( ".mapitem03" ).hover(
				function() {
					$( ".mapitem03" ).addClass( "hover" );
					}, function() {
					$( ".mapitem03").removeClass( "hover" );
				}
			);
			
			$( ".mapitem04" ).hover(
				function() {
					$( ".mapitem04" ).addClass( "hover" );
					}, function() {
					$( ".mapitem04").removeClass( "hover" );
				}
			);
			
			$( ".mapitem05" ).hover(
				function() {
					$( ".mapitem05" ).addClass( "hover" );
					}, function() {
					$( ".mapitem05").removeClass( "hover" );
				}
			);
			
			$( ".mapitem06" ).hover(
				function() {
					$( ".mapitem06" ).addClass( "hover" );
					}, function() {
					$( ".mapitem06").removeClass( "hover" );
				}
			);
			
			$( ".mapitem07" ).hover(
				function() {
					$( ".mapitem07" ).addClass( "hover" );
					}, function() {
					$( ".mapitem07").removeClass( "hover" );
				}
			);
			
			$( ".mapitem08" ).hover(
				function() {
					$( ".mapitem08" ).addClass( "hover" );
					}, function() {
					$( ".mapitem08").removeClass( "hover" );
				}
			);
			
			$( ".mapitem09" ).hover(
				function() {
					$( ".mapitem09" ).addClass( "hover" );
					}, function() {
					$( ".mapitem09").removeClass( "hover" );
				}
			);
			
			$( ".mapitem10" ).hover(
				function() {
					$( ".mapitem10" ).addClass( "hover" );
					}, function() {
					$( ".mapitem10").removeClass( "hover" );
				}
			);
			
			$( ".mapitem11" ).hover(
				function() {
					$( ".mapitem11" ).addClass( "hover" );
					}, function() {
					$( ".mapitem11").removeClass( "hover" );
				}
			);
			
			$( ".mapitem12" ).hover(
				function() {
					$( ".mapitem12" ).addClass( "hover" );
					}, function() {
					$( ".mapitem12").removeClass( "hover" );
				}
			);
			
			
			$(document).ready(function(){
			  $(".tab01").click(function(){
				$(".part2").hide();
				$(".part1").show();
				$(".part2map").hide();
				$(".part1map").show();
				$(".tab01").addClass("active");
				$(".tab02").removeClass("active");
			  });
			  $(".tab02").click(function(){
				$(".part2").show();  
				$(".part1").hide();
				$(".part2map").show();
				$(".part1map").hide();
				$(".tab02").addClass("active");
				$(".tab01").removeClass("active");
			  });
			});
			
			
        
        
		
			
			
/* Image zoom */
			
$(document).ready(function(){
		 $(".galleryitem").hover(
		  function () {
			$(this).find(".zoomimage").addClass("result_hover");
		  },
		  function () {
			$(this).find(".zoomimage").removeClass("result_hover");
		  }
		);	
		
/* Thank you modal */

	$(function() {
		if (window.location.hash.indexOf("thankyou") !== -1) {
			$("#thankyou").modal();
		}
	});	

/* Pop Up windows */

   function popitup(url) {
	newwindow=window.open(url,'name','height=500,width=600, location=0');
}

});

/*$('[data-toggle="popover"]').popover();

$('body').on('click', function (e) {
    $('[data-toggle="popover"]').each(function () {
        //the 'is' for buttons that trigger popups
        //the 'has' for icons within a button that triggers a popup
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
            $(this).popover('hide');
        }
    });
});*/

$(function() {                      
  $(".enterbottom").click(function() {  
    $(".modal").addClass("modalbottom");    
  });
   $(".modalclose, .modal-backdrop").click(function() {  
    $(".modal").removeClass("modalbottom");    
  });
});


//-------- Code for communicating with parent
var turbodownSC = {
    messageTarget: null,
    origin: null
};

window.onmessage = function(event) {

    turbodownSC.messageTarget = event.source;
    turbodownSC.origin = event.origin;
};

turbodownSC.parentScrollTo = function(elSelector) {


if( turbodownSC.messageTarget === null ) {
    return;
}

var $element = jQuery(elSelector);

turbodownSC.messageTarget.postMessage({
                                          "command": "scrollTo",
                                          "childScrollCoords": $element.offset()
                                      }, turbodownSC.origin);
};