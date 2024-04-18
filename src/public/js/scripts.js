/*!
* Start Bootstrap - Clean Blog v6.0.9 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/

"use strict";

// When the DOM content is loaded
window.addEventListener('DOMContentLoaded', () => {
	// Initialize toast if exists
	if ($(".toast")) $(".toast").toast({ delay: 1500 });

	// Initialize variables
	let scrollPos = 0;
	const mainNav = document.getElementById('mainNav');
	const headerHeight = mainNav.clientHeight;

	// Event listener for scrolling
	window.addEventListener('scroll', function () {
		// Calculate current scroll position
		const currentTop = document.body.getBoundingClientRect().top * -1;
		// Check scroll direction
		if (currentTop < scrollPos) {
			// Scrolling Up
			if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
				mainNav.classList.add('is-visible');
			} else {
				mainNav.classList.remove('is-visible', 'is-fixed');
			}
		} else {
			// Scrolling Down
			mainNav.classList.remove(['is-visible']);
			if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
				mainNav.classList.add('is-fixed');
			}
		}
		// Update scroll position
		scrollPos = currentTop;
	});
});