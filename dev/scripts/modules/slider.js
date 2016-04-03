$(document).ready(function(){

	// HEADER SLIDER

	$('.header__main').slick({
		autoplay: true,
		autoplaySpeed: 7000,
		speed: 500,
		pauseOnHover: false,
		arrows: false,
		dots: true
	});

	// TESTIMONIALS SLIDER

	$('.testimonials__slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		asNavFor: '.testimonials__slider_img',
		autoplay: true,
		autoplaySpeed: 7000,
		speed: 500
	});
	$('.testimonials__slider_img').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		asNavFor: '.testimonials__slider',
		autoplay: false,
		centerMode: true,
		centerPadding: 0,
		focusOnSelect: true,
		prevArrow: '<button type="button" class="slick-prev"></button>',
		nextArrow: '<button type="button" class="slick-next"></button>'
	});
});