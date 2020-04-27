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
		slided = false,
		setting = {
			level: [0, 1, 2, 3],
			prov: null,
		},
		mrk = new Mark(ELM.result_table_body);

	{
		let request = new XMLHttpRequest();
		request.open('GET', 'assets/csv/mfd.csv', true);
		request.onload = function () {
			let { response: res, status } = this;
			if (status >= 200 && status < 400 && res.startsWith('11,')) {
				res.split('\n').forEach(a => {
					let [full_id, name] = a.split(','),
						id = '',
						parent_id = '';
					if (full_id.length === 2) { id = full_id; parent_id = ''; }
					else if (full_id.length === 4) { id = full_id.substr(2, 2); parent_id = full_id.substr(0, 2); }
					else if (full_id.length === 7) { id = full_id.substr(4, 3); parent_id = full_id.substr(0, 4); }
					else if (full_id.length === 10) { id = full_id.substr(7, 3); parent_id = full_id.substr(0, 7); }
					else return false;
					mfd.push({ id, parent_id, name });
					document.getElementById('loading').style.display = 'none';
					document.getElementById('search-form-wrapper-outer').className = 'search-form-wrapper-outer animated animated-1s bounceIn';
					document.getElementById('explore-wrapper').className = 'explore-wrapper animated animated-1s bounceInUp';
					ELM.search.focus();
				});
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
		let keys = [...new Set(keyword.trim().toLowerCase().split(/[\s,]+/))].filter(a => a.length);
		dbg('Search: ' + keyword);
		console.info(keys);
		if (keys.filter(a => a.length > 2).length || keys.filter(a => a.length > 1).length > 1 || keys.length > 3) {
			dbg('Keyword valid :)', 1);
			let findById = keys.length === 1 && /^\d{4,10}$/.test(keys[0]);
			if (slided) {
				ELM.result_table.style.display = 'none';
				ELM.result_loading.style.display = '';
				mrk.unmark();
				setTimeout(() => {
					mfd.forEach((a, i) => {
						let nameLowerCase = a.name.toLocaleLowerCase();
						if (keys.every(k => nameLowerCase.includes(k))) {
							ELM.result_table_body.children[i].classList.remove('d-none');
							ELM.result_table_body.children[i].style.display = '';
						}
						else if (findById && keys[0] === a.id) {
							ELM.result_table_body.children[i].classList.remove('d-none');
							ELM.result_table_body.children[i].style.display = '';
						}
						else {
							ELM.result_table_body.children[i].classList.add('d-none');
						}
					});
					ELM.result_loading.style.display = 'none';
					ELM.result_table.style.display = '';
				}, 100);
			}
			else {
				// Generate DOM: all but not all displayed
			}
			keys.forEach(a => mrk.mark(a));
		}
		else {
			//
			// Error message
			//
		}
	}

	// Explore
	document.getElementById('explore-btn').addEventListener('click', function () {
		ELM.search.value = '';
		if (slided) {
			ELM.result_table.style.display = 'none';
			ELM.result_loading.style.display = '';
			mrk.unmark();
			setTimeout(() => {
				for (let a of ELM.result_table_body.children) {
					if (a.classList.contains('lv-0')) {
						a.classList.remove('toggle-expanded', 'd-none');
						a.style.display = '';
					}
					else {
						a.classList.remove('toggle-expanded', 'd-none');
						a.style.display = 'none';
					}
				}
				ELM.result_loading.style.display = 'none';
				ELM.result_table.style.display = '';
			}, 100);
		}
		else {
			ELM.body.classList.add('search-active');
			$('#result').slideDown();
			slided = true;
			setTimeout(() => {
				let html_tr = ({ id, parent_id, name }, lv) => `
					<tr ${lv === 0 ? 'class="lv-0 toggle"' : (lv === 3 ? 'class="lv-3" style="display:none"' : `class="lv-${lv} toggle" style="display:none"`)} data-id="${parent_id + id}" data-parent-id="${parent_id}">
						<td>${parent_id}<b>${id}</b></td>
						<td>${name}</td>
					</tr>`;
				ELM.result_table_body.innerHTML = mfd.map(a => html_tr(a, ({ 0: 0, 2: 1, 4: 2, 7: 3 })[a.parent_id.length])).join('');
				ELM.result_loading.style.display = 'none';
				ELM.result_table.style.display = '';
			}, 500);
		}
	}, false);

	// Toggle
	ELM.result_table_body.addEventListener('click', function (e) {
		for (var target = e.target; target && target != this; target = target.parentNode) {
			if (target.matches('tr')) {
				let id = target.dataset.id;
				target.classList.toggle('toggle-expanded');
				if (target.classList.contains('toggle-expanded')) document.querySelectorAll(`[data-parent-id="${id}"]`).forEach(a => { a.style.display = ''; });
				else document.querySelectorAll(`[data-parent-id^="${id}"]`).forEach(a => { a.classList.remove('toggle-expanded'); a.style.display = 'none'; });
				break;
			}
		}
	}, false);

});