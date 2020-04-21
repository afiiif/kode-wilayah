$(() => {

	const $el = {
		body: $('body'),
		result: $('#result'),
	}

	var setting = {
		level: [1, 2, 3],
		prov: null,
	}

	$.ajax({
		url: '../_test/kode-wilayah.php',
		// url: '../_test/404',
		success: res => {
			dbg('Response:', 2);
			console.info(res);
			if (Array.isArray(res)) {
				$('#loading').hide();
				$('#search-form-wrapper-outer').toggleClass('d-none animated animated-1s bounceIn');
				$('#explore-wrapper').toggleClass('d-none animated animated-1s bounceInUp');
				$('#search').focus();
			}
			else console.info('NAY :(');
		},
		error: e => {
			console.warn(e.status, e.statusText);
			if (DEV) console.error({ responseText: e.responseText });
			console.info('NAY :(');
		}
	});

	$('#search').keypress(function (e) {
		if (e.which === 13) search();
	});

	$('#search-btn').click(function () {
		search();
	});

	$('#setting-btn').click(function () {

		dbg('Setting button clicked!');

		// TODO: Open setting popup

	});

	$('#explore-btn').click(function () {

		dbg('Explore button clicked!')

		// TODO: Show all nodes

		// TODO: Collapse all nodes

		// Show result section
		$el.body.addClass('search-active');
		$el.result.slideDown();

	});

	const search = (keywords = false) => {

		dbg('Search begin!');

		// TODO: Sanitize keyword

		// TODO: Check if keyword valid

		if (true) { // if valid

			// TODO: Filter nodes

			// TODO: Highlight matches

			// Show result section
			$el.body.addClass('search-active');
			$el.result.slideDown();

		}
		else { // if invalid
		}

	}

	const updateSetting = (newSetting = false) => {
		if (newSetting) {
			// TODO: Update setting
		}
		else {
			setting = {
				level: [1, 2, 3],
				prov: null,
			}
		}
	}

});
