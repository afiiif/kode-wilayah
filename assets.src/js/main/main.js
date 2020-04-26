$(() => {

	const $el = {
		body: $('body'),
		search: $('#search'),
		result: $('#result'),
		result_loading: $('#result-loading'),
		result_summary: $('#result-summary'),
		result_table: $('#result-table'),
		result_table_body: $('#result-table-body'),
	}

	var mfd = [],
		slided = false,
		setting = {
			level: [0, 1, 2, 3],
			prov: null,
		};

	$.ajax({
		url: 'assets/csv/mfd.csv',
		success: res => {
			dbg('Response:', 2);
			console.info(res);
			if (res.startsWith('11,')) {
				res.split('\n').forEach(a => {
					let [full_id, name] = a.split(','),
						id = '',
						parent_id = '';
					if (full_id.length === 2) {
						id = full_id;
						parent_id = '';
					}
					else if (full_id.length === 4) {
						id = full_id.substr(2, 2);
						parent_id = full_id.substr(0, 2);
					}
					else if (full_id.length === 7) {
						id = full_id.substr(4, 3);
						parent_id = full_id.substr(0, 4);
					}
					else if (full_id.length === 10) {
						id = full_id.substr(7, 3);
						parent_id = full_id.substr(0, 7);
					}
					else return false;
					mfd.push({ id, parent_id, name });
				});
				console.info({ mfd });
				$('#loading').hide();
				$('#search-form-wrapper-outer').toggleClass('d-none animated animated-1s bounceIn');
				$('#explore-wrapper').toggleClass('d-none animated animated-1s bounceInUp');
				$('#search').focus();
			}
			else {
				console.error('Invalid response :(');
				$('#loading').html('<div class="animated animated-1s swing delay-1s"><i class="icon-exclamation mr-35"></i>Terjadi kesalahan :(</div>');
				setTimeout(() => { $('header').toggleClass('bg-primary-gradient bg-danger-gradient'); }, 1000);
			}
		},
		error: e => {
			console.warn(e.status, e.statusText);
			if (DEV) console.error({ responseText: e.responseText });
			console.error('Invalid response :(');
			$('#loading').html('<div class="animated animated-1s swing delay-1s"><i class="icon-exclamation mr-35"></i>Terjadi kesalahan :(</div>');
			setTimeout(() => { $('header').toggleClass('bg-primary-gradient bg-danger-gradient'); }, 1000);
		}
	});

	{
		$el.search.keypress(function (e) {
			if (e.which === 13) search($el.search.val());
		});

		$('#search-btn').click(function () {
			search($el.search.val());
		});

		$('#explore-btn').click(function () {
			dbg('Explore...');
			$el.search.val('');
			loading();
			setTimeout(() => {
				generateResult({ mfd, expand: false });
			}, slided ? 100 : 500);
		});

		$el.result_table_body.on('click', 'td', function () {
			let id = $(this).parent().data('id'),
				collapsed = !$(this).parent().toggleClass('toggle-expanded').hasClass('toggle-expanded');
			if (collapsed) $(`[data-parent-id^="${id}"]`).removeClass('toggle-expanded').hide();
			else $(`[data-parent-id="${id}"]`).show();
		});
	}

	const search = keyword => {

		dbg('Search: ' + keyword);

		// TODO: Sanitize keyword
		keyword = keyword.toLocaleLowerCase();



		// TODO: Check if keyword valid



		if (true) { // if valid
			loading();
			setTimeout(() => {
				let mfd_filtered = mfd.filter(a => a.name.toLocaleLowerCase().includes(keyword));
				generateResult({ mfd: mfd_filtered, highlight: [keyword] });
				// $('.lv-1,.lv-2,.lv-3').hide();
				$el.result_summary.html(`<div>Menemukan ... hasil</div>`).show();
			}, slided ? 100 : 500);
		}
		else { // if invalid
		}

	}

	const loading = (a = true) => {
		if (a) {
			$el.result_loading.show();
			$el.result_summary.hide();
			$el.result_table.hide();
			$el.body.addClass('search-active');
			$el.result.slideDown();
		}
		else {
			$el.result_loading.hide();
			$el.result_table.show();
			slided = true;
		}
	}

	const generateResult = ({ mfd, highlight = [], expand = true }) => {
		let collapsed = [],
			getProps = expand ?
				(lv, { expand = true, show = true }) => (lv < 3 ? `class="lv-${lv} toggle${expand ? ' toggle-expanded' : ''}"${show ? '' : ' style="display:none"'}` : `class="lv-3"${show ? '' : ' style="display:none"'}`) :
				lv => (lv ? (lv < 3 ? `class="lv-${lv} toggle" style="display: none"` : 'class="lv-3" style="display: none"') : `class="lv-0 toggle"`),
			html = mfd.map(a => /*html*/`
				<tr ${getProps(({ 0: 0, 2: 1, 4: 2, 7: 3 })[a.parent_id.length], { expand: a.expand, show: a.show })} data-id="${a.parent_id + a.id}" data-parent-id="${a.parent_id}">
					<td>${a.parent_id}<b>${a.id}</b></td>
					<td>${a.name}</td>
				</tr>
			`).join('');
		$el.result_table_body.html(html);
		highlight.forEach(a => { $el.result_table_body.mark(a); });
		loading(false);
	}

	{
		$('#setting-btn').click(function () {

			dbg('Setting button clicked!');

			// TODO: Open setting popup



		});

		const updateSetting = (newSetting = false) => {
			if (newSetting) {

				// TODO: Update setting



			}
			else {
				setting = {
					level: [0, 1, 2, 3],
					prov: null,
				}
			}
		}
	}

});
