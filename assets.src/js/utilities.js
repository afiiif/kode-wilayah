const utils = (function () {

	const notif = (message, type = 'info', close = false, settings, options) => {
		if (close) $.notifyClose();
		let icon = 'icon-info';
		if (type === 'wait') { icon = 'icon-hourglass'; type = 'info'; }
		if (type === 'success') { icon = 'icon-check'; }
		if (type === 'danger' || type === 'warning') { icon = 'icon-exclamation'; }
		$.notify({ message, icon, ...options }, { type, ...settings });
	}

	const getSlug = text => text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');

	return {
		notif,
		getSlug,
	}

})();



const dbg = (a = '!', c = 0) => {
	if (typeof DEV !== 'undefined') {
		if (DEV) console.info('%c' + a, `color: ${typeof c === 'number' ? ['#00ff7f', '#6495ed', '#ff0', '#fa8072', '#ffa500', '#f00'][c] : c}`);
	}
}



$(() => {

	console.log('© Muhammad Afifudin, 2020');
	console.log('%cVersion: ' + $('script[src*="assets/js"]').prop('src').split('?v=')[1], 'color: #6495ed');

	$('body').tooltip({ selector: '[data-toggle="tooltip"]', html: true });

});
