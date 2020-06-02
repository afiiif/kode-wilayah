document.addEventListener('DOMContentLoaded', function () {

	const $$ = {
		search: document.getElementById('search'),
		search_tooltip: $('#search-form-tooltip'),
		result_loading: document.getElementById('result-loading'),
		result_summary: document.getElementById('result-summary'),
		result_table: document.getElementById('result-table'),
		result_table_body: document.getElementById('result-table-body'),
	}

	var mfd = [];

	{
		const success = text => {
			dbg(`Success read ${FILE}.csv`, 0);
			let i = -1, j = -1, k = -1;
			const getName = (a, b) => b[0] ? [a].concat(b).join(',').replace(/"/g, '') : a;
			text.split('\n').forEach(a => {
				let [full_id, name, ...name_contains_comma] = a.split(',');

				if (full_id.length === 2) { // Provinsi
					mfd.push({ id: full_id, parent_id: '', full_id, name: name.replace('Dki J', 'DKI J').replace('Di Y', 'DI Y'), name_lc: name.toLowerCase(), lv: 0, ch: [] });
					i++; j = -1; k = -1;
				}
				else if (full_id.length === 4) { // Kabupaten/kota
					name = getName(name, name_contains_comma);
					let id = full_id.substr(2, 2);
					mfd[i].ch.push({ kota: id > 70, id, parent_id: full_id.substr(0, 2), full_id, name, name_lc: name.toLowerCase(), lv: 1, ch: [] });
					j++; k = -1;
				}
				else if (full_id.length === 7) { // Kecamatan
					name = getName(name, name_contains_comma);
					mfd[i].ch[j].ch.push({ id: full_id.substr(4, 3), parent_id: full_id.substr(0, 4), full_id, name, name_lc: name.toLowerCase(), lv: 2, ch: [] });
					k++;
				}
				else if (full_id.length === 10) { // Desa/Keluarahan
					name = getName(name, name_contains_comma);
					let id = full_id.substr(2, 2);
					mfd[i].ch[j].ch[k].ch.push({ kota: id > 70, id: full_id.substr(7, 3), parent_id: full_id.substr(0, 7), full_id, name, name_lc: name.toLowerCase(), lv: 3 });
				}
			});

			dbg(mfd);
			document.getElementById('loading').style.display = 'none';
			document.getElementById('search-form-wrapper-outer').className = 'search-form-wrapper-outer animated animated-1s bounceIn';
			document.getElementById('explore-wrapper').className = 'explore-wrapper animated animated-1s bounceInUp';

			let params = (new URL(location.href)).searchParams;
			if (params.get('q')) {
				$$.search.value = params.get('q');
				document.getElementById('search-btn').click();
			}
			else if (params.get('explore')) {
				document.getElementById('explore-btn').click();
			}
			else $$.search.focus();
		}

		const error = err => {
			console.error(err);
			document.getElementById('loading').innerHTML = '<div class="animated animated-1s swing"><i class="icon-exclamation mr-35"></i>Terjadi kesalahan :(</div><div class="animated fast fadeInUp delay-1s fz-14 fw-4 mt-45 px-a"><div class="fz-20">Silakan coba refresh halaman ini.</div>Jika masih terjadi masalah, hubungi Admin (<span class="text-warning">muhammad.afifudin@bps.go.id</span>)</div>';
			document.getElementsByTagName('header')[0].className = 'header bg-danger-gradient pb-6';
		}

		dbg('Requesting zipped CSV...\nassets/csv/' + FILE, 2);
		let promise = new JSZip.external.Promise(function (resolve, reject) {
			JSZipUtils.getBinaryContent(`assets/csv/${FILE}.zip`, function (err, data) {
				if (err) reject(err);
				else resolve(data);
			});
		});

		promise.then(JSZip.loadAsync)
			.then(function (zip) {
				dbg(zip);
				return zip.file(`${FILE}.csv`).async('string');
			})
			.then(success, error);
	}

	// Search
	{
		var setting = { lv: '3', pr: [], dark: false, prefix: false };

		if (typeof (Storage) !== 'undefined') {
			if (localStorage.getItem('dark')) {
				document.body.classList.add('dark-mode');
				document.querySelector('meta[name="theme-color"]').setAttribute('content', '#202124');
				setting.dark = true;
			}
			if (localStorage.getItem('prefix')) {
				$$.result_table_body.classList.add('with-prefix');
				setting.prefix = true;
			}
		}

		const markInstance = new Mark($$.result_table_body);

		$$.search.addEventListener('keypress', function (e) {
			$$.search_tooltip.tooltip('hide');
			if (e.which === 13) {
				window.scrollTo(0, 0);
				search($$.search.value);
			}
		}, false);
		$$.search.addEventListener('blur', function () { $$.search_tooltip.tooltip('hide'); }, false);
		document.getElementById('search-btn').addEventListener('click', function () {
			window.scrollTo(0, 0);
			search($$.search.value);
		}, false);
		const search = keyword => {

			let keys = [...new Set(keyword.trim().toLowerCase().split(/[\s,]+/))].filter(a => a.length),
				findById = keys.length === 1 && /^\d{2,10}$/.test(keys[0]);
			dbg('Search: ' + keyword, 0);
			dbg(keys);

			if (keys.filter(a => a.length > 2).length || keys.filter(a => a.length > 1).length > 1 || keys.length > 3 || findById) {
				dbg('Good keyword :)', 1);

				setTimeout(() => {
					let tree = $.extend(true, [], mfd),
						counter = { pr: 0, kb: 0, kc: 0, ds: 0 };
					if (keys.length > 1 && keys.every(a => /^\d{2,7}$/.test(a))) {
						keys = [keys.join('')];
						findById = true;
					}
					tree.forEach(a => {
						if (findById && a.full_id == keys[0]) { a.display = 1; a.ch.forEach(b => b.display = 0); counter.pr++; }
						else {
							if (setting.pr.length && !setting.pr.includes(a.id)) return false;
							if (keys.every(key => a.name_lc.includes(key))) { a.display = 0; a.match = 1; counter.pr++; }
							a.ch.forEach(b => {
								if (findById && b.full_id == keys[0]) { a.display = 1; b.display = 1; b.ch.forEach(c => c.display = 0); counter.kb++; }
								else {
									if (keys.every(key => b.name_lc.includes(key))) { a.display = 1; b.display = 0; b.match = 1; counter.kb++; }
									if (setting.lv > 1) b.ch.forEach(c => {
										if (findById && c.full_id == keys[0]) { a.display = 1; b.display = 1; c.display = 1; c.ch.forEach(d => d.display = 0); counter.kc++; }
										else {
											if (keys.every(key => c.name_lc.includes(key))) { a.display = 1; b.display = 1; c.display = 0; c.match = 1; counter.kc++; }
											if (setting.lv > 2) c.ch.forEach(d => {
												if (findById && d.full_id == keys[0]) { a.display = 1; b.display = 1; c.display = 1; d.display = 0; counter.ds++; }
												else if (keys.every(key => d.name_lc.includes(key))) { a.display = 1; b.display = 1; c.display = 1; d.display = 0; d.match = 1; counter.ds++; };
											});
										}
									});
								}
							});
						}
					});

					let html = '';
					const getTr = ({ display, full_id, parent_id, id, name, lv, kota, match }) => {
						if (display === 0) return `<tr${kota ? ' data-kota="1"' : ''} class="lv-${lv}" data-fid="${full_id}" data-parent="${parent_id}"><td>${parent_id}<b>${id}</b></td><td>${name}</td></tr$>`;
						if (display === 1) return `<tr${kota ? ' data-kota="1"' : ''} class="lv-${lv} toggle toggle-expanded${match ? '' : ' unmark'}" data-fid="${full_id}" data-parent="${parent_id}"><td>${parent_id}<b>${id}</b></td><td>${name}</td></tr$>`;
						return ``;
					}
					tree.forEach(a => {
						html += getTr(a);
						a.ch.forEach(b => {
							html += getTr(b);
							b.ch.forEach(c => {
								html += getTr(c);
								c.ch.forEach(d => {
									html += getTr(d);
								});
							});
						});
					});

					const b = text => `<b class="fw-6">${text}</b>`;
					let { pr, kb, kc, ds } = counter;
					if (pr + kb + kc + ds) {
						let counter_kc = setting.lv > 1 ? `, <span class="${kc ? 'text-info' : ''}">${b(kc)} kecamatan</span>` : '',
							counter_ds = setting.lv > 2 ? `, <span class="${ds ? 'text-info' : ''}">${b(ds)} desa/kelurahan</span>` : '';
						$$.search.blur();
						$$.result_summary.innerHTML = findById ?
							`<div>Menampilkan hasil pencarian wilayah dengan kode <span class="text-info">${b(keyword)}</span></div>` :
							`<div class="text-muted">Menemukan <span class="${pr ? 'text-info' : ''}">${b(pr)} provinsi</span>, <span class="${kb ? 'text-info' : ''}">${b(kb)} kabupaten/kota</span>${counter_kc}${counter_ds}.</div>`;
						$$.result_table_body.innerHTML = html;
						$$.result_table.style.display = '';
						if (!findById) keys.forEach(a => markInstance.mark(a));
					}
					else {
						$$.result_summary.innerHTML = `<div class="text-danger text-center pt-45 pt-sm-5 pl-md-55"><div class="mb-4 fz-72 fz-sm-80"><span class="fa-stack animated animated-1s swing"><i class="fas icon-ban fa-stack-2x op-3"></i><i class="fas fa-map-marker-alt fa-stack-1x fz-80 fz-sm-96"></i></span></div>Tidak ada hasil untuk pencarian ${b(keyword)}</div>`;
					}

					$$.result_loading.style.display = 'none';
					$$.result_summary.style.display = '';

				}, document.body.classList.contains('search-active') ? 200 : 600);

				$$.result_table.style.display = 'none';
				$$.result_summary.style.display = 'none';
				$$.result_loading.style.display = '';
				document.body.classList.add('search-active');
				$('#result').slideDown();
				$$.search_tooltip.tooltip('hide');
			}
			else {
				if (keyword) {
					dbg('Bad keyword :(', 1);
					$$.search_tooltip.tooltip('show');
				}
				$$.search.focus();
			}
		}

		const updateSetting = (newSetting = false) => {
			if (newSetting) setting = newSetting;
			else setting = { lv: '3', pr: [], dark: false, prefix: false };
			document.getElementById('setting-btn').classList[setting.lv === '3' && setting.pr.length === 0 || setting.pr.length === 34 ? 'remove' : 'add']('text-success');
		}
		document.getElementById('setting-btn').addEventListener('click', function () {
			$$.search_tooltip.tooltip('hide');
			let { lv, pr, dark, prefix } = setting;
			utils.modal.init({
				title: 'Pengaturan',
				body: /*html*/`
					<div class="fw-6 mb-2">Cari sampai tingkat:</div>
					<div>
						<div class="custom-control custom-radio custom-control-inline d-block d-sm-inline-flex">
							<input type="radio" id="setting-lv-1" name="setting-lv" value="1" class="custom-control-input"${lv === '1' ? ' checked' : ''}>
							<label class="custom-control-label d-block cur-p" for="setting-lv-1">Kabupaten/Kota</label>
						</div>
						<div class="custom-control custom-radio custom-control-inline d-block d-sm-inline-flex">
							<input type="radio" id="setting-lv-2" name="setting-lv" value="2" class="custom-control-input"${lv === '2' ? ' checked' : ''}>
							<label class="custom-control-label d-block cur-p" for="setting-lv-2">Kecamatan</label>
						</div>
						<div class="custom-control custom-radio custom-control-inline d-block d-sm-inline-flex">
							<input type="radio" id="setting-lv-3" name="setting-lv" value="3" class="custom-control-input"${lv === '3' ? ' checked' : ''}>
							<label class="custom-control-label d-block cur-p" for="setting-lv-3">Desa/Kelurahan</label>
						</div>
					</div>
					<div class="fw-6 mt-4 mb-2">Cari di:</div>
					<div>
						<select id="setting-pr" class="selectpicker" title="Semua Provinsi" data-width="100%" data-live-search="true" multiple>${mfd.map(a => `<option value="${a.id}" data-subtext="(${a.id})"${pr.includes(a.id) ? ' selected' : ''}>${a.name}</option>`).join('')}</select>
					</div>
					<div class="mx--3 mt-3 mb--3 py-3 border-top" id="dark-mode-wrapper">
						<div class="px-3">
							<div class="fw-6 mb-2">Tampilan:</div>
							<div class="custom-control custom-switch">
								<input type="checkbox" class="custom-control-input" id="dark-mode-toggle"${dark ? ' checked' : ''}>
								<label class="custom-control-label cur-p d-block" for="dark-mode-toggle">Mode gelap</label>
							</div>
							<div class="custom-control custom-switch">
								<input type="checkbox" class="custom-control-input" id="prefix-toggle"${prefix ? ' checked' : ''}>
								<label class="custom-control-label cur-p d-block" for="prefix-toggle">Tampilkan prefix<div class="fz-12 fw-3">(Misal: "Kayong Utara" ditampilkan dengan "<span class="fw-4">Kabupaten</span> Kayong Utara")</div></label>
							</div>
						</div>
					</div>
				`,
				btnLabel: 'Simpan',
				show: () => {
					document.getElementById('dark-mode-toggle').addEventListener('change', function (e) {
						if (this.checked) {
							document.body.classList.add('dark-mode');
							document.querySelector('meta[name="theme-color"]').setAttribute('content', '#202124');
						} else {
							document.body.classList.remove('dark-mode');
							document.querySelector('meta[name="theme-color"]').setAttribute('content', '#1572e8');
						}
					}, false);
				},
				action: () => {
					updateSetting({
						lv: $('[name="setting-lv"]:checked').val(),
						pr: $('#setting-pr').val(),
						dark: document.getElementById('dark-mode-toggle').checked,
						prefix: document.getElementById('prefix-toggle').checked,
					});
					utils.modal.hide();
					dbg(setting);
				},
				hide: () => {
					if ($$.result_summary.style.display === '') search($$.search.value);
					if (setting.dark) {
						document.body.classList.add('dark-mode');
						document.querySelector('meta[name="theme-color"]').setAttribute('content', '#202124');
						if (typeof (Storage) !== 'undefined') localStorage.setItem('dark', 1);
					} else {
						document.body.classList.remove('dark-mode');
						document.querySelector('meta[name="theme-color"]').setAttribute('content', '#1572e8');
						if (typeof (Storage) !== 'undefined') localStorage.removeItem('dark');
					}
					if (setting.prefix) {
						$$.result_table_body.classList.add('with-prefix');
						if (typeof (Storage) !== 'undefined') localStorage.setItem('prefix', 1);
					} else {
						$$.result_table_body.classList.remove('with-prefix');
						if (typeof (Storage) !== 'undefined') localStorage.removeItem('prefix');
					}
				},
			});
		}, false);
	}

	// Explore
	document.getElementById('explore-btn').addEventListener('click', function () {
		window.scrollTo(0, 0);
		$$.search.value = '';
		$$.result_summary.style.display = 'none';
		$$.result_table.style.display = 'none';
		$$.result_loading.style.display = '';
		$$.search_tooltip.tooltip('hide');
		setTimeout(() => {
			$$.result_table_body.innerHTML = mfd.map((a, i) => `<tr class="lv-0 toggle toggle-explore" data-i="${i}" data-j="" data-k="" data-fid="${a.full_id}"><td><b>${a.id}</b></td><td>${a.name}</td></tr>`).join('');
			$$.result_loading.style.display = 'none';
			$$.result_table.style.display = '';
		}, document.body.classList.contains('search-active') ? 200 : 600);
		document.body.classList.add('search-active');
		$('#result').slideDown();
	}, false);

	// Toggle
	$$.result_table_body.addEventListener('click', function (e) {
		for (var target = e.target; target && target != this; target = target.parentNode) {
			if (target.matches('tr')) {
				let d = target.dataset;
				dbg(d);
				if (target.classList.contains('toggle-expanded')) document.querySelectorAll(`[data-parent^="${d.fid}"]`).forEach(a => { a.classList.remove('toggle-expanded'); a.style.display = 'none'; });
				else if (target.classList.contains('toggle-explore')) {
					target.classList.remove('toggle-explore');
					target.classList.add('toggle-expanded');
					let ch = [];
					if (d.k.length) ch = mfd[d.i].ch[d.j].ch[d.k].ch;
					else if (d.j.length) ch = mfd[d.i].ch[d.j].ch;
					else ch = mfd[d.i].ch;
					const getTr = ({ full_id, parent_id, id, name, lv, kota }, { i, j, k }) => `<tr${kota ? ' data-kota="1"' : ''} class="lv-${lv}${lv === 3 ? '' : ` toggle toggle-explore" data-i="${i}" data-j="${j}" data-k="${k}`}" data-fid="${full_id}" data-parent="${parent_id}"><td>${parent_id}<b>${id}</b></td><td>${name}</td></tr$>`;
					target.outerHTML += ch.map((a, i) => getTr(a, d.j ? { ...d, k: i } : { ...d, j: i })).join('');
					break;
				}
				else document.querySelectorAll(`[data-parent="${d.fid}"]`).forEach(a => { a.style.display = ''; });
				target.classList.toggle('toggle-expanded');
				break;
			}
		}
	}, false);

	// Tooltip
	$$.search_tooltip.tooltip({
		title: 'Gunakan kata kunci yang lebih spesifik',
		trigger: 'manual',
		placement: 'bottom',
	});

	// About
	document.getElementById('about-btn').addEventListener('click', function () {
		utils.modal.init({
			title: 'Tentang',
			body: document.getElementById('about').innerHTML,
			btnCloseLabel: 'Tutup',
			btnClass: 'd-none',
		});
	}, false);

	// Shortcut
	document.addEventListener('keypress', function (e) {
		if (e.target !== $$.search && e.key.toLocaleLowerCase() === 'f') $$.search.select();
	});

});