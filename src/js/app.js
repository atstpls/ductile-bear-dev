/*
Template Name: HUD - Responsive Bootstrap 5 Admin Template
Version: 1.3.0
Author: Sean Ngu
Website: http://www.seantheme.com/hud/
	----------------------------
		APPS CONTENT TABLE
	----------------------------

	<!-- ======== GLOBAL SCRIPT SETTING ======== -->
	01. Global Variable
	02. Handle Scrollbar
	03. Handle Header Search Bar
	04. Handle Sidebar Menu
	05. Handle Sidebar Minify
	06. Handle Sidebar Minify Float Menu
	07. Handle Dropdown Close Option
	08. Handle Panel - Remove / Reload / Collapse / Expand
	09. Handle Tooltip & Popover Activation
	10. Handle Scroll to Top Button Activation
	11. Handle hexToRgba
	12. Handle Scroll to

	<!-- ======== APPLICATION SETTING ======== -->
	Application Controller
*/



/* 01. Global Variable
------------------------------------------------ */

var app = {
	id: '#app',
	isMobile: ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) || window.innerWidth < 992),
	bootstrap: {
		tooltip: {
			attr: 'data-bs-toggle="tooltip"'
		},
		popover: {
			attr: 'data-bs-toggle="popover"'
		},
		modal: {
			attr: 'data-bs-toggle="modal"',
			dismissAttr: 'data-bs-dismiss="modal"',
			event: {
				hidden: 'hidden.bs.modal'
			}
		},
		nav: {
			class: 'nav',
			tabs: {
				class: 'nav-tabs',
				activeClass: 'active',
				itemClass: 'nav-item',
				itemLinkClass: 'nav-link'
			}
		}
	},
	header: {
		id: '#header',
		class: 'app-header',
		hasScrollClass: 'has-scroll'
	},
	sidebar: {
		id: '#sidebar',
		class: 'app-sidebar',
		scrollBar: {
			localStorage: 'appSidebarScrollPosition',
			dom: ''
		},
		menu: {
			class: 'menu',
			animationTime: 0,
			itemClass: 'menu-item',
			itemLinkClass: 'menu-link',
			hasSubClass: 'has-sub',
			activeClass: 'active',
			expandingClass: 'expanding',
			expandClass: 'expand',
			submenu: {
				class: 'menu-submenu',
			}
		},
		mobile: {
			toggleAttr: 'data-toggle="app-sidebar-mobile"',
			dismissAttr: 'data-dismiss="app-sidebar-mobile"',
			toggledClass: 'app-sidebar-mobile-toggled',
			closedClass: 'app-sidebar-mobile-closed',
			backdrop: {
				class: 'app-sidebar-mobile-backdrop'
			}
		},
		minify: {
			toggleAttr: 'data-toggle="app-sidebar-minify"',
			toggledClass: 'app-sidebar-minified',
			cookieName: 'app-sidebar-minified'
		},
		floatSubmenu: {
			id: '#app-sidebar-float-submenu',
			dom: '',
			timeout: '',
			class: 'app-sidebar-float-submenu',
			container: {
				class: 'app-sidebar-float-submenu-container'
			},
			arrow: {
				id: '#app-sidebar-float-submenu-arrow',
				class: 'app-sidebar-float-submenu-arrow'
			},
			line: {
				id: '#app-sidebar-float-submenu-line',
				class: 'app-sidebar-float-submenu-line'
			},
			overflow: {
				class: 'overflow-scroll mh-100vh'
			}
		},
		search: {
			class: 'menu-search',
			toggleAttr: 'data-sidebar-search="true"',
			hideClass: 'd-none',
			foundClass: 'has-text'
		},
		transparent: {
			class: 'app-sidebar-transparent'
		}
	},
	scrollBar: {
		attr: 'data-scrollbar="true"',
		skipMobileAttr: 'data-skip-mobile',
		initAttr: 'data-init',
		heightAttr: 'data-height',
		wheelPropagationAttr: 'data-wheel-propagation'
	},
	content: {
		id: '#content',
		class: 'app-content',
		fullHeight: {
			class: 'app-content-full-height'
		},
		fullWidth: {
			class: 'app-content-full-width'
		}
	},
	layout: {
		sidebarLight: {
			class: 'app-with-light-sidebar'
		},
		sidebarEnd: {
			class: 'app-with-end-sidebar'
		},
		sidebarWide: {
			class: 'app-with-wide-sidebar'
		},
		sidebarMinified: {
			class: 'app-sidebar-minified'
		},
		sidebarTwo: {
			class: 'app-with-two-sidebar'
		},
		withoutHeader: {
			class: 'app-without-header'
		},
		withoutSidebar: {
			class: 'app-without-sidebar'
		},
		topMenu: {
			class: 'app-with-top-menu'
		},
		boxedLayout: {
			class: 'boxed-layout'
		}
	},
	scrollToTopBtn: {
		showClass: 'show',
		heightShow: 200,
		toggleAttr: 'data-toggle="scroll-to-top"',
		scrollSpeed: 500
	},
	scrollTo: {
		attr: 'data-toggle="scroll-to"',
		target: 'data-target',
		linkTarget: 'href'
	},
	// themePanel: {
	// 	class: 'app-theme-panel',
	// 	toggleAttr: 'data-toggle="theme-panel-expand"',
	// 	cookieName: 'app-theme-panel-expand',
	// 	activeClass: 'active',
	// 	themeListCLass: 'app-theme-list',
	// 	themeListItemCLass: 'app-theme-list-item',
	// 	themeCoverClass: 'app-theme-cover',
	// 	themeCoverItemCLass: 'app-theme-cover-item',
	// 	theme: {
	// 		toggleAttr: 'data-toggle="theme-selector"',
	// 		classAttr: 'data-theme-class',
	// 		cookieName: 'app-theme',
	// 		activeClass: 'active'
	// 	},
	// 	themeCover: {
	// 		toggleAttr: 'data-toggle="theme-cover-selector"',
	// 		classAttr: 'data-theme-cover-class',
	// 		cookieName: 'app-theme-cover',
	// 		activeClass: 'active'
	// 	}
	// },
	dismissClass: {
		toggleAttr: 'data-dismiss-class',
		targetAttr: 'data-dismiss-target'
	},
	toggleClass: {
		toggleAttr: 'data-toggle-class',
		targetAttr: 'data-toggle-target'
	},
	font: {
		family: getComputedStyle(document.body).getPropertyValue('--bs-body-font-family'),
		size: getComputedStyle(document.body).getPropertyValue('--bs-body-font-size'),
		weight: getComputedStyle(document.body).getPropertyValue('--bs-body-font-weight')
	},
	color: {
		theme: getComputedStyle(document.body).getPropertyValue('--bs-theme'),
		blue: getComputedStyle(document.body).getPropertyValue('--bs-blue'),
		green: getComputedStyle(document.body).getPropertyValue('--bs-green'),
		orange: getComputedStyle(document.body).getPropertyValue('--bs-orange'),
		red: getComputedStyle(document.body).getPropertyValue('--bs-red'),
		cyan: getComputedStyle(document.body).getPropertyValue('--bs-cyan'),
		purple: getComputedStyle(document.body).getPropertyValue('--bs-purple'),
		yellow: getComputedStyle(document.body).getPropertyValue('--bs-yellow'),
		indigo: getComputedStyle(document.body).getPropertyValue('--bs-indigo'),
		pink: getComputedStyle(document.body).getPropertyValue('--bs-pink'),
		black: getComputedStyle(document.body).getPropertyValue('--bs-black'),
		white: getComputedStyle(document.body).getPropertyValue('--bs-white'),
		gray: getComputedStyle(document.body).getPropertyValue('--bs-gray'),
		dark: getComputedStyle(document.body).getPropertyValue('--bs-dark'),
		gray100: getComputedStyle(document.body).getPropertyValue('--bs-gray-100'),
		gray200: getComputedStyle(document.body).getPropertyValue('--bs-gray-200'),
		gray300: getComputedStyle(document.body).getPropertyValue('--bs-gray-300'),
		gray400: getComputedStyle(document.body).getPropertyValue('--bs-gray-400'),
		gray500: getComputedStyle(document.body).getPropertyValue('--bs-gray-500'),
		gray600: getComputedStyle(document.body).getPropertyValue('--bs-gray-600'),
		gray700: getComputedStyle(document.body).getPropertyValue('--bs-gray-700'),
		gray800: getComputedStyle(document.body).getPropertyValue('--bs-gray-800'),
		gray900: getComputedStyle(document.body).getPropertyValue('--bs-gray-900'),

		themeRgb: getComputedStyle(document.body).getPropertyValue('--bs-theme-rgb'),
		blueRgb: getComputedStyle(document.body).getPropertyValue('--bs-blue-rgb'),
		greenRgb: getComputedStyle(document.body).getPropertyValue('--bs-green-rgb'),
		orangeRgb: getComputedStyle(document.body).getPropertyValue('--bs-orange-rgb'),
		redRgb: getComputedStyle(document.body).getPropertyValue('--bs-red-rgb'),
		cyanRgb: getComputedStyle(document.body).getPropertyValue('--bs-cyan-rgb'),
		purpleRgb: getComputedStyle(document.body).getPropertyValue('--bs-purple-rgb'),
		yellowRgb: getComputedStyle(document.body).getPropertyValue('--bs-yellow-rgb'),
		indigoRgb: getComputedStyle(document.body).getPropertyValue('--bs-indigo-rgb'),
		pinkRgb: getComputedStyle(document.body).getPropertyValue('--bs-pink-rgb'),
		blackRgb: getComputedStyle(document.body).getPropertyValue('--bs-black-rgb'),
		whiteRgb: getComputedStyle(document.body).getPropertyValue('--bs-white-rgb'),
		grayRgb: getComputedStyle(document.body).getPropertyValue('--bs-gray-rgb'),
		darkRgb: getComputedStyle(document.body).getPropertyValue('--bs-dark-rgb'),
		gray100Rgb: getComputedStyle(document.body).getPropertyValue('--bs-gray-100-rgb'),
		gray200Rgb: getComputedStyle(document.body).getPropertyValue('--bs-gray-200-rgb'),
		gray300Rgb: getComputedStyle(document.body).getPropertyValue('--bs-gray-300-rgb'),
		gray400Rgb: getComputedStyle(document.body).getPropertyValue('--bs-gray-400-rgb'),
		gray500Rgb: getComputedStyle(document.body).getPropertyValue('--bs-gray-500-rgb'),
		gray600Rgb: getComputedStyle(document.body).getPropertyValue('--bs-gray-600-rgb'),
		gray700Rgb: getComputedStyle(document.body).getPropertyValue('--bs-gray-700-rgb'),
		gray800Rgb: getComputedStyle(document.body).getPropertyValue('--bs-gray-800-rgb'),
		gray900Rgb: getComputedStyle(document.body).getPropertyValue('--bs-gray-900-rgb')
	}
};



/* 02. Handle Scrollbar
------------------------------------------------ */

var handleScrollbar = function() {
	"use strict";
	var elms = document.querySelectorAll('['+ app.scrollBar.attr +']');

	for (var i = 0; i < elms.length; i++) {
		generateScrollbar(elms[i])
	}
};
var generateScrollbar = function(elm) {
  "use strict";

	if ($(elm).attr(app.scrollBar.initAttr) || (app.isMobile && $(elm).attr(app.scrollBar.skipMobileAttr))) {
		return;
	}
	var dataHeight = (!$(elm).attr(app.scrollBar.heightAttr)) ? $(elm).height() : $(elm).attr(app.scrollBar.heightAttr);

	$(elm).css('height', dataHeight);

	if(app.isMobile) {
		$(elm).css('overflow-x','scroll');
	} else {
		var dataWheelPropagation = ($(elm).attr(app.scrollBar.wheelPropagationAttr)) ? $(elm).attr(app.scrollBar.wheelPropagationAttr) : false;

		if ($(elm).closest('.'+ app.sidebar.class).length !== 0) {
			app.sidebar.scrollBar.dom = new PerfectScrollbar(elm, {
				wheelPropagation: dataWheelPropagation
			});
		} else {
			new PerfectScrollbar(elm, {
				wheelPropagation: dataWheelPropagation
			});
		}
	}
	$(elm).attr(app.scrollBar.initAttr, true);
};



/* 03. Handle Sidebar Menu
------------------------------------------------ */

var handleSidebarMenu = function() {
	"use strict";
	$(document).on('click', '.'+ app.sidebar.class +' .'+ app.sidebar.menu.class +' > .'+ app.sidebar.menu.itemClass +'.'+ app.sidebar.menu.hasSubClass +' > .'+ app.sidebar.menu.itemLinkClass, function(e) {
		e.preventDefault();

		var target = $(this).next('.'+ app.sidebar.menu.submenu.class);
		var otherMenu = $('.'+ app.sidebar.class +' .'+ app.sidebar.menu.class +' > .'+ app.sidebar.menu.itemClass +'.'+ app.sidebar.menu.hasSubClass +' > .'+ app.sidebar.menu.submenu.class).not(target);

		$(otherMenu).slideUp(app.sidebar.menu.animationTime);
		$(otherMenu).closest('.'+ app.sidebar.menu.itemClass).removeClass(app.sidebar.menu.expandClass);

		$(target).slideToggle(app.sidebar.menu.animationTime);
		var targetElm = $(target).closest('.'+ app.sidebar.menu.itemClass);
		if ($(targetElm).hasClass(app.sidebar.menu.expandClass)) {
			$(targetElm).removeClass(app.sidebar.menu.expandClass);
		} else {
			$(targetElm).addClass(app.sidebar.menu.expandClass);
		}
	});
	$(document).on('click', '.'+ app.sidebar.class +' .'+ app.sidebar.menu.class +' > .'+ app.sidebar.menu.itemClass +'.'+ app.sidebar.menu.hasSubClass +' .'+ app.sidebar.menu.submenu.class +' .'+ app.sidebar.menu.itemClass +'.'+ app.sidebar.menu.hasSubClass +' > .'+ app.sidebar.menu.itemLinkClass, function(e) {
		e.preventDefault();

		var target = $(this).next('.' + app.sidebar.menu.submenu.class);
		$(target).slideToggle(app.sidebar.menu.animationTime);
	});
};



/* 04. Handle Sidebar Scroll Memory
------------------------------------------------ */

var handleSidebarScrollMemory = function() {
	if (!app.isMobile) {
		try {
			if (typeof(Storage) !== 'undefined' && typeof(localStorage) !== 'undefined') {
				$('.'+ app.sidebar.class +' ['+ app.scrollBar.attr +']').on('scroll', function() {
					localStorage.setItem(app.sidebar.scrollBar.localStorage, $(this).scrollTop());
				});

				var defaultScroll = localStorage.getItem(app.sidebar.scrollBar.localStorage);
				if (defaultScroll) {
					$('.'+ app.sidebar.class +' ['+ app.scrollBar.attr +']').animate({ scrollTop: defaultScroll + 'px'}, 0);
				}
			}
		} catch (error) {
			console.log(error);
		}
	}
};



/* 05. Handle Card Action
------------------------------------------------ */

var cardActionRunning = false;
var handleCardAction = function() {
	"use strict";

	if (cardActionRunning) {
		return false;
	}
	cardActionRunning = true;

	// expand
	$(document).on('mouseover', '[data-toggle=card-expand]', function(e) {
		if (!$(this).attr('data-init')) {
			$(this).tooltip({
				title: 'Expand / Compress',
				placement: 'bottom',
				trigger: 'hover',
				container: 'body'
			});
			$(this).tooltip('show');
			$(this).attr('data-init', true);
		}
	});
	$(document).on('click', '[data-toggle=card-expand]', function(e) {
		e.preventDefault();
		var target = $(this).closest('.card');
		var targetBody = $(target).find('.card-body');
		var targetClass = 'card-expand';
		var targetTop = 40;
		if ($(targetBody).length !== 0) {
			var targetOffsetTop = $(target).offset().top;
			var targetBodyOffsetTop = $(targetBody).offset().top;
			targetTop = targetBodyOffsetTop - targetOffsetTop;
		}

		if ($('body').hasClass(targetClass) && $(target).hasClass(targetClass)) {
			$('body, .card').removeClass(targetClass);
			$('.card').removeAttr('style');
			$(targetBody).removeAttr('style');
		} else {
			$('body').addClass(targetClass);
			$(this).closest('.card').addClass(targetClass);
		}
		$(window).trigger('resize');
	});
};



/* 06. Handle Tooltip & Popover Activation
------------------------------------------------ */

var handelTooltipPopoverActivation = function() {
	"use strict";

	if ($('['+ app.bootstrap.tooltip.attr +']').length !== 0) {
		var tooltipTriggerList = [].slice.call(document.querySelectorAll('['+ app.bootstrap.tooltip.attr +']'))
		var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
			return new bootstrap.Tooltip(tooltipTriggerEl)
		})
	}
	if ($('['+ app.bootstrap.popover.attr +']').length !== 0) {
		var popoverTriggerList = [].slice.call(document.querySelectorAll('['+ app.bootstrap.popover.attr +']'))
		var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
			return new bootstrap.Popover(popoverTriggerEl)
		})
	}
};



/* 07. Handle Scroll to Top Button
------------------------------------------------ */

var handleScrollToTopButton = function() {
	"use strict";

	$(document).scroll( function() {
		var totalScroll = $(document).scrollTop();

		if (totalScroll >= app.scrollToTopBtn.heightShow) {
			if (!$('['+ app.scrollToTopBtn.toggleAttr +']').hasClass(app.scrollToTopBtn.showClass)) {
				$('['+ app.scrollToTopBtn.toggleAttr +']').addClass(app.scrollToTopBtn.showClass);
			}
		} else {
			$('['+ app.scrollToTopBtn.toggleAttr +']').removeClass(app.scrollToTopBtn.showClass);
		}
	});

	$('['+ app.scrollToTopBtn.toggleAttr +']').click(function(e) {
		e.preventDefault();

		$('html, body').animate({
			scrollTop: $('body').offset().top
		}, app.scrollToTopBtn.scrollSpeed);
	});

};



/* 08. Handle hexToRgba
------------------------------------------------ */

var hexToRgba = function(hex, transparent = 1) {
	var c;
	if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
			c= hex.substring(1).split('');
			if(c.length== 3){
					c= [c[0], c[0], c[1], c[1], c[2], c[2]];
			}
			c= '0x'+c.join('');
			return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+ transparent +')';
	}
  throw new Error('Bad Hex');
};



/* 09. Handle Scroll To
------------------------------------------------ */

var handleScrollTo = function() {
	$(document).on('click', '['+ app.scrollTo.attr +']', function(e) {
		e.preventDefault();

		var targetElm = ($(this).attr(app.scrollTo.target)) ? $(this).attr(app.scrollTo.target) : $(this).attr(app.scrollTo.linkTarget);
		if (targetElm) {
			$('html, body').animate({
				scrollTop: $(targetElm).offset().top - $(app.header.id).height() - 24
			}, 0);
		}
	});
};



/* 10. Handle Page Scroll Class
------------------------------------------------ */

var handlePageScrollClass = function() {
	var checkScroll = function() {
		if ($(window).scrollTop() > 0) {
			$(app.id).addClass(app.header.hasScrollClass);
		} else {
			$(app.id).removeClass(app.header.hasScrollClass);
		}
	}

	$(window).on('scroll', function() {
		checkScroll();
	});

	checkScroll();
};



/* 11. Handle Toggle Class
------------------------------------------------ */

var handleToggleClass = function() {
	$(document).on('click', '['+ app.toggleClass.toggleAttr +']', function(e) {
		e.preventDefault();

		var targetToggleClass = $(this).attr(app.toggleClass.toggleAttr);
		var targetDismissClass = $(this).attr(app.dismissClass.toggleAttr);
		var targetToggleElm = $(this).attr(app.toggleClass.targetAttr);

		if (!targetDismissClass) {
			$(targetToggleElm).toggleClass(targetToggleClass);
		} else {
			if (!$(targetToggleElm).hasClass(targetToggleClass) && !$(targetToggleElm).hasClass(targetDismissClass)) {
				$(targetToggleElm).toggleClass(targetToggleClass);
			} else {
				$(targetToggleElm).toggleClass(targetToggleClass);
				$(targetToggleElm).toggleClass(targetDismissClass);
			}
		}
	});
}



/* 12. Handle Theme Panel
------------------------------------------------ */

var handleThemePanel = function() {
	"use strict";

	// 12.1 Theme Panel - Toggle / Dismiss
	$(document).on('click', '['+ app.themePanel.toggleAttr +']', function() {
		var targetContainer = '.'+ app.themePanel.class;
		var targetExpand = false;

		if ($(targetContainer).hasClass(app.themePanel.activeClass)) {
			$(targetContainer).removeClass(app.themePanel.activeClass);
		} else {
			$(targetContainer).addClass(app.themePanel.activeClass);
			targetExpand = true;
		}
		if (Cookies) {
			Cookies.set(app.themePanel.cookieName, targetExpand);
		}
	});

	// 12.2 Theme Panel - Page Load Cookies
	if (Cookies) {
		var themePanelExpand = Cookies.get(app.themePanel.cookieName);

		if (themePanelExpand == 'true' || typeof themePanelExpand == 'undefined') {
			$('['+ app.themePanel.toggleAttr +']').trigger('click');
		}
	}


	// 12.3 Theme Panel - Theme Selector
	$(document).on('click', '.'+ app.themePanel.class +' ['+ app.themePanel.theme.toggleAttr +']', function() {

		for (var x = 0; x < document.body.classList.length; x++) {
			var targetClass = document.body.classList[x];
			if (targetClass.search('theme-') > -1) {
				$('body').removeClass(targetClass);
			}
		}

		var targetTheme = $(this).attr(app.themePanel.theme.classAttr);

		$('body').addClass(targetTheme);
		$('.'+ app.themePanel.class +' ['+ app.themePanel.theme.toggleAttr +']').not(this).closest('.'+ app.themePanel.themeListItemCLass).removeClass(app.themePanel.theme.activeClass);
		$(this).closest('.'+ app.themePanel.themeListItemCLass).addClass(app.themePanel.theme.activeClass);

		if (Cookies) {
			Cookies.set(app.themePanel.theme.cookieName, targetTheme);
			app.color.theme = getComputedStyle(document.body).getPropertyValue('--bs-theme');
			app.color.themeRgb = getComputedStyle(document.body).getPropertyValue('--bs-theme-rgb');
			$(document).trigger('theme-reload');
		}
	});

	if (Cookies) {
		if (Cookies.get(app.themePanel.theme.cookieName)) {
			$('.'+ app.themePanel.class +' ['+ app.themePanel.theme.toggleAttr +']' + '['+ app.themePanel.theme.classAttr +'="'+ Cookies.get(app.themePanel.theme.cookieName) +'"]').trigger('click');

			app.color.theme = getComputedStyle(document.body).getPropertyValue('--bs-theme');
			app.color.themeRgb = getComputedStyle(document.body).getPropertyValue('--bs-theme-rgb');

			$(document).trigger('theme-reload');
		}
	}


	// // 12.4 Theme Panel - Background Selector
	// $(document).on('click', '.'+ app.themePanel.class +' ['+ app.themePanel.themeCover.toggleAttr +']', function(e) {
	// 	e.preventDefault();

	// 	for (var x = 0; x < document.documentElement.classList.length; x++) {
	// 		var targetClass = document.documentElement.classList[x];
	// 		if (targetClass.search('bg-cover-') > -1) {
	// 			$('html').removeClass(targetClass);
	// 		}
	// 	}

	// 	var targetTheme = $(this).attr(app.themePanel.themeCover.classAttr);

	// 	$('html').addClass(targetTheme);
	// 	$('.'+ app.themePanel.class +' ['+ app.themePanel.themeCover.toggleAttr +']').not(this).closest('.'+ app.themePanel.themeCoverItemCLass).removeClass(app.themePanel.themeCover.activeClass);
	// 	$(this).closest('.'+ app.themePanel.themeCoverItemCLass).addClass(app.themePanel.themeCover.activeClass);

	// 	if (Cookies) {
	// 		Cookies.set(app.themePanel.themeCover.cookieName, targetTheme);
	// 	}
	// });

	// if (Cookies) {
	// 	if (Cookies.get(app.themePanel.themeCover.cookieName)) {
	// 		$('.'+ app.themePanel.class +' ['+ app.themePanel.themeCover.toggleAttr +']' + '['+ app.themePanel.themeCover.classAttr +'="'+ Cookies.get(app.themePanel.themeCover.cookieName) +'"]').trigger('click');
	// 	}
	// }
};

/* Application Controller
------------------------------------------------ */
var App = function () {
	"use strict";

	return {
		//main function
		init: function () {
			this.initComponent();
			this.initSidebar();
		},
		initSidebar: function() {
			handleSidebarMenu();
			handleSidebarScrollMemory();
		},
		initComponent: function() {
			handleScrollbar();
			handleScrollToTopButton();
			handleScrollTo();
			handleCardAction();
			handelTooltipPopoverActivation();
			handlePageScrollClass();
			handleToggleClass();
			handleThemePanel();
		},
		scrollTop: function() {
			$('html, body, .content').animate({
				scrollTop: $('body').offset().top
			}, 0);
		}
	};
}();

$(document).ready(function() {
	App.init();
});