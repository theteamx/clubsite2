/*
Copyright (c) 2016 teqbees
------------------------------------------------------------------
[Master Javascript]
Project: infinity
-------------------------------------------------------------------*/
(function($) {
	"use strict";
	var infinity = {
		initialised: false,
		version: 1.0,
		mobile: false,
		init: function() {
			if (!this.initialised) {
				this.initialised = true;
			} else {
				return;
			}
			/*-------------- infinity Functions Calling ---------------*/
			this.RTL();
			this.smooth_scroll();
			this.slider();
			this.sliderheight();
			this.navigation_menu();
			this.skillbar();
			this.portfolio();
			this.team_crousel();
			this.in_testimonial_crousel();
			this.Twittercrousel();
			this.animation();
			this.ContactMailFunction();
		},
		/*-------------- infinity Functions definition ---------------*/
		RTL: function() {
			// On Right-to-left(RTL) add class 
			var rtl_attr = $("html").attr('dir');
			if (rtl_attr) {
				$('html').find('body').addClass("rtl");
			}
		},
		// smooth scroll on menu click
		smooth_scroll:function () {
			$('.in_navigation a[href]').on("click", function(){
				$('html, body').animate({
				scrollTop: $( $.attr(this, 'href') ).offset().top
				}, 1000);
				return false;
			});
		},
		//home slider
		slider: function(){
			if($(".home_slider").length > 0 ){
				var galleryTop = new Swiper('.home_slider', {
					loop:true,
					nextButton: '.button_next',
					prevButton: '.button_prev',
					autoplay: 2000,
					speed:1500,
					effect: 'coverflow',
					coverflow: {
						rotate: 50,
						stretch: 0,
						depth: 200,
						modifier: 1,
						slideShadows : true
					}
				});
			}
		},
		
		//this script for fullscreen slider
		sliderheight: function(){
		if($(window).width () > 1200 ){
			  var slider_height = $(window).outerHeight();
			  $(".home_slider").css("height", slider_height);
		  }
		},

		//navigation menu 
		navigation_menu: function() {
			//active menu on click
			$(".in_navigation ul li a").on("click", function(){
				$(".in_navigation ul li a").removeClass("active");
				$(this).addClass("active");
			});
			
			// navigation menu
			$(".nav_toggle").on("click", function(){
				$(this).toggleClass("toggle_open");
				$(".in_navigation").toggleClass("menu_open");
			});
			//dropdown menu
			$(".in_navigation ul li ul.sub-menu").parents("li").addClass("dropdown_toggle");
			$(".dropdown_toggle").append("<span class='caret_down'></span>");
			$(".in_navigation ul li").children(".caret_down").on("click",function(){
				$(this).toggleClass("caret_up");
				$(this).prev("ul").slideToggle();
			});
		},
		//this script for skill bar panel
		skillbar: function() {
			if ($(".skill_line").length > 0 ){
				$('.skill_line').appear(function() {
					$('.skill_line').each(function(){
						var percentage = $(this).attr('data-percentage');
						$(this).animate({'width':percentage+'%'}, 3000);
						$(this).parents('.panel_line').prev('.panel_bar').children('span')
						.animate({'left':percentage +'%'
						}, 3000);
					});
				});
			}
		},
		
		//this script for portfolio filter 
		portfolio: function(){
			$('#portfolio_filter').mixItUp();
			filterSelector: ".filter"
			$(".filter").on("click", function(e) {
				e.preventDefault()
			});
		},
		
		//team crousel slider
		team_crousel: function(){
			if($(".team_crousel").length > 0 ){
				$(".team_crousel").owlCarousel({
					loop:true,
					autoplay: false,
					autoplayTimeout:2000,
					items: 3,
					touchDrag: true,
					responsiveClass: true,
					dots: false,
					nav: true,
					navText: ['<i class="icon-arrow-left"></i>', '<i class="icon-arrow-right"></i>'],
					responsive: {
						0: {
							items: 1
						},
						480: {
							items: 1
						},
						600: {
							items: 2
						},
						1000: {
							items: 3
						}
					},
					paginationSpeed: 1000,
					slideSpeed: 500,
					smartSpeed: 1000,
				});
			}
		
		//change team on tab click
			$('.team_crousel .item').on('click', function(){
				var tab_id = $(this).attr('data-tab');
				$('.team_crousel .item').removeClass('current');
				$(this).addClass('current');
				$('.in_team_details').removeClass('current');
				$("#"+tab_id).addClass('current');
			});
		},
		
		//testimonial crousel slider
		in_testimonial_crousel: function(){
			if($(".in_testimonial_crousel").length > 0 ){
				$(".in_testimonial_crousel").owlCarousel({
					autoplay: true,
					items: 1,
					loop:true,
					singleitem:true,
					touchDrag: true,
					responsiveClass: true,
					dots: false,
					nav: false,
					responsive: {
						0: {
							items: 1
						},
						480: {
							items: 1
						},
						600: {
							items: 1
						},
						1000: {
							items: 1
						}
					},
					
						smartSpeed: 1000,
						autoplayTimeout:2000,
						autoplaySpeed:2000  
				});
			}
		},
		
		//twitter crousel slider
		Twittercrousel: function(){
			if($(".twitter_crousel").length > 0 ){
				$(".twitter_crousel").owlCarousel({
					autoplay: true,
					items: 1,
					loop:true,
					singleitem:true,
					touchDrag: true,
					responsiveClass: true,
					dots: false,
					nav: false,
					responsive: {
						0: {
							items: 1
						},
						480: {
							items: 1
						},
						600: {
							items: 1
						},
						1000: {
							items: 1
						}
					},
					smartSpeed: 1000,
					autoplayTimeout:2000,
					autoplaySpeed:2000,
					animateIn: 'zoom_middle',
					animateOut: 'zoomOut'
				});
			}
		},
		animation:function() {
			new WOW().init();
		},
		
		//this script for contact form 
		ContactMailFunction:function(){
			//contact mail function	
			$('.cont_send').on('click', function(){
				var un=$('#user_name').val();
				var em=$('#user_email').val();
				var wsub=$('#user_sub').val();
				var meesg=$('#user_msg').val();
				
				$.ajax({
					type: "POST",
					url: "ajaxmail.php",
					data: {
						'username':un,
						'useremail':em,
						'subject':wsub,
						'mesg':meesg,
						},
					success: function(msg) {
						var full_msg=msg.split("#");
						if(full_msg[0]=='1'){
							$('#user_name').val("");
							$('#user_email').val("");
							$('#user_sub').val("");
							$('#user_msg').val("");
							$('#err').html( full_msg[1] );
						}
						else{
							$('#user_name').val(un);
							$('#user_email').val(em);
							$('#user_sub').val(wsub);
							$('#user_msg').val(meesg);
							$('#err').html( full_msg[1] );
						}
					}
				});
			});
		
		},
		
	};
	infinity.init();
	// Scroll Event
	var scroll_hieght= $(".home_slider").outerHeight();
	$(window).on('bind scroll', function(e) {
		if (($(window).scrollTop() > scroll_hieght && $(window).width() > 991)) {
			$('.in_header_area').addClass('fixed_menu');
		} else {
			$('.in_header_area').removeClass('fixed_menu');
		}	
	}); 
	//load event
	$(window).on('load', function() {
		$(".in_preloader").delay(600).fadeOut("slow");		
	});
	//google map script
	$(document).ready(function() {
		var myCenter=new google.maps.LatLng(40.730610, -73.935242);
		function initialize()
		{
			var mapProp = {
				center:myCenter,
				zoom:7,
				scrollwheel: false,
				mapTypeId:google.maps.MapTypeId.ROADMAP
			};
			var map=new google.maps.Map(document.getElementById("big_googleMap"),mapProp);
			var icon = { 
				url: 'images/icons/map_pin.png'
			};
			var marker=new google.maps.Marker({
				position:myCenter,
				map: map,
				title: 'infinity Softtech',
				icon: icon
			});
			marker.setMap(map);
			var infowindow = new google.maps.InfoWindow({
				content:"<span> infinity Softtech </span>"
			});
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map,marker);
			});
		}
		google.maps.event.addDomListener(window, 'load', initialize);
	});
})(jQuery);