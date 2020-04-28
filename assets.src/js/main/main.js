document.addEventListener('DOMContentLoaded', function () {

	const ELM = {
		body: document.getElementsByTagName('body')[0],
		search: document.getElementById('search'),
		result_loading: document.getElementById('result-loading'),
		result_summary: document.getElementById('result-summary'),
		result_table: document.getElementById('result-table'),
		result_table_body: document.getElementById('result-table-body'),
	}

	var mfd = [],
		setting = {
			level: [0, 1, 2, 3],
			prov: null,
		},
		markInstance = new Mark(ELM.result_table_body);

	{
		let request = new XMLHttpRequest();
		request.open('GET', 'assets/csv/mfd.csv', true);
		request.onload = function () {
			let { response: res, status } = this;
			if (status >= 200 && status < 400 && res.startsWith('11,')) {

				let i = -1, j = -1, k = -1;
				res.split('\n').forEach(a => {
					let [full_id, name] = a.split(','),
						id = '',
						parent_id = '';

					if (full_id.length === 2) { // Provinsi
						mfd.push({ id: full_id, parent_id: 0, full_id, name: name.replace('Dki J', 'DKI J').replace('Di Y', 'DI Y'), name_lc: name.toLowerCase(), lv: 0, ch: [] });
						i++; j = -1; k = -1;
					}
					else if (full_id.length === 4) { // Kabupaten/kota
						let id = full_id.substr(2, 2);
						mfd[i].ch.push({ kota: id > 70, id, parent_id: full_id.substr(0, 2), full_id, name, name_lc: name.toLowerCase(), lv: 1, ch: [] });
						j++; k = -1;
					}
					else if (full_id.length === 7) { // Kecamatan
						mfd[i].ch[j].ch.push({ id: full_id.substr(4, 3), parent_id: full_id.substr(0, 4), full_id, name, name_lc: name.toLowerCase(), lv: 2, ch: [] });
						k++;
					}
					else if (full_id.length === 10) { // Desa/Keluarahan
						let id = full_id.substr(2, 2);
						mfd[i].ch[j].ch[k].ch.push({ kota: id > 70, id: full_id.substr(7, 3), parent_id: full_id.substr(0, 7), full_id, name, name_lc: name.toLowerCase(), lv: 3 });
					}

				});

				console.info(mfd);
				document.getElementById('loading').style.display = 'none';
				document.getElementById('search-form-wrapper-outer').className = 'search-form-wrapper-outer animated animated-1s bounceIn';
				document.getElementById('explore-wrapper').className = 'explore-wrapper animated animated-1s bounceInUp';
				ELM.search.focus();

			} else {
				document.getElementById('loading').innerHTML = '<div class="animated animated-1s swing delay-1s"><i class="icon-exclamation mr-35"></i>Terjadi kesalahan :(</div>';
				setTimeout(() => { document.getElementsByTagName('header')[0].className = 'bg-danger-gradient pb-6'; }, 1000);
			}
		};
		request.onerror = function () {
			document.getElementById('loading').innerHTML = '<div class="animated animated-1s swing delay-1s"><i class="icon-exclamation mr-35"></i>Terjadi kesalahan :(</div>';
			setTimeout(() => { document.getElementsByTagName('header')[0].className = 'bg-danger-gradient pb-6'; }, 1000);
		};
		request.send();
	}

	// Search
	ELM.search.addEventListener('keypress', function (e) { if (e.which === 13) search(ELM.search.value); }, false);
	document.getElementById('search-btn').addEventListener('click', function () { search(ELM.search.value); }, false);
	const search = keyword => {

		let keys = [...new Set(keyword.trim().toLowerCase().split(/[\s,]+/))].filter(a => a.length),
			findById = keys.length === 1 && /^\d{2,10}$/.test(keys[0]);
		dbg('Search: ' + keyword);
		console.info(keys);

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
						if (keys.every(key => a.name_lc.includes(key))) { a.display = 0; a.match = 1; counter.pr++; }
						a.ch.forEach(b => {
							if (findById && b.full_id == keys[0]) { a.display = 1; b.display = 1; b.ch.forEach(c => c.display = 0); counter.kb++; }
							else {
								if (keys.every(key => b.name_lc.includes(key))) { a.display = 1; b.display = 0; b.match = 1; counter.kb++; }
								b.ch.forEach(c => {
									if (findById && c.full_id == keys[0]) { a.display = 1; b.display = 1; c.display = 1; c.ch.forEach(d => d.display = 0); counter.kc++; }
									else {
										if (keys.every(key => c.name_lc.includes(key))) { a.display = 1; b.display = 1; c.display = 0; c.match = 1; counter.kc++; }
										c.ch.forEach(d => {
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
					ELM.result_summary.innerHTML = findById ?
						`<div>Menampilkan hasil pencarian wilayah dengan kode ${b(keyword)}</div>` :
						`<div class="text-success">Menemukan ${b(pr)} provinsi, ${b(kb)} kabupaten/kota, ${b(kc)} kecamatan, dan ${b(ds)} desa/kelurahan.</div>`;
					ELM.result_table_body.innerHTML = html;
					ELM.result_table.style.display = '';
					if (!findById) keys.forEach(a => markInstance.mark(a));
				}
				else {
					ELM.result_summary.innerHTML = `<div class="text-danger">Tidak ada hasil untuk pencarian ${b(keyword)}</div>`;
				}

				ELM.result_loading.style.display = 'none';
				ELM.result_summary.style.display = '';

			}, ELM.body.classList.contains('search-active') ? 200 : 600);

			ELM.search.blur();
			ELM.result_table.style.display = 'none';
			ELM.result_summary.style.display = 'none';
			ELM.result_loading.style.display = '';
			ELM.body.classList.add('search-active');
			$('#result').slideDown();
		}
		else {
			dbg('Bad keyword :(', 1);
			//
			// TODO: Error message
			//
		}
	}

	// Explore
	document.getElementById('explore-btn').addEventListener('click', function () {
		ELM.search.value = '';
		ELM.result_summary.style.display = 'none';
		ELM.result_table.style.display = 'none';
		ELM.result_loading.style.display = '';
		setTimeout(() => {
			ELM.result_table_body.innerHTML = mfd.map((a, i) => `<tr class="lv-0 toggle toggle-explore" data-i="${i}" data-j="" data-k="" data-fid="${a.full_id}"><td><b>${a.id}</b></td><td>${a.name}</td></tr>`).join('');
			ELM.result_loading.style.display = 'none';
			ELM.result_table.style.display = '';
		}, ELM.body.classList.contains('search-active') ? 200 : 600);
		ELM.body.classList.add('search-active');
		$('#result').slideDown();
	}, false);

	// Toggle
	ELM.result_table_body.addEventListener('click', function (e) {
		for (var target = e.target; target && target != this; target = target.parentNode) {
			if (target.matches('tr')) {
				let d = target.dataset;
				console.info(d);
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

});