<!DOCTYPE html>
<html lang="en" class="h-100">

<head>
	<?php include 'views/partials/meta.php'; ?>
	<meta property="og:title" content="Kode Wilayah · Cari Kode Wilayah Lebih Mudah">
	<meta property="og:url" content="<?= SITE . PATH ?>">
	<base href="<?= SITE ?>/kode-wilayah/">
	<title>Kode Wilayah · Cari kode atau nama wilayah dengan lebih mudah!</title>

	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/css/simple-line-icons.min.css">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900&display=swap">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.2/css/bootstrap-select.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css">
	<link rel="stylesheet" href="lib/atlantis-lite/mod/atlantis.mod.css?v=<?php include 'views/partials/_version.php'; ?>">
	<link rel="stylesheet" href="assets/css/main.css?v=<?php include 'views/partials/_version.php'; ?>">

	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>
</head>

<body>

	<header class="bg-primary-gradient pb-6">
		<nav class="p-a p-md-3">
			<a id="nav-brand" href="" class="d-block lh-120 animated animated-1s bounceInDown">
				<i class="icon-location-pin mr-1"></i>
				<span class="fw-8">KODE</span>
				<span class="fw-3">WILAYAH</span>
			</a>
		</nav>
		<div id="search-form-wrapper-outer" class="search-form-wrapper-outer d-none"><!-- animated animated-1s bounceIn -->
			<div class="search-form-wrapper">
				<input id="search" type="search" class="search-form-input" placeholder="Cari kode atau nama wilayah">
				<button id="search-btn" type="button" class="search-form-btn"><i class="icon-magnifier"></i></button>
				<div class="search-form-setting-wrapper">
					<button id="setting-btn" type="button" class="search-form-setting-btn"><i class="icon-settings"></i></button>
				</div>
			</div>
		</div>
		<div id="explore-wrapper" class="explore-wrapper d-none"><!-- animated animated-1s bounceInUp delay-1s -->
			<button type="button" id="explore-btn" class="btn p-2 text-white"><i class="icon-map"></i><span>Eksplor</span></button>
		</div>
		<div id="loading" class="text-white fz-32 fw-3 animated animated-1s fadeIn"><i class="icon-refresh mr-35 fas fa-counter-spin"></i>
			<div class="d-inline-block dotty" style="width: 141px;">Memuat</div>
		</div>
	</header>

	<main>
		<div id="result" class="px-a pl-md-0 pr-md-6 pr-lg-7 py-4 py-md-45" style="display: none;">
			<section id="result-loading">
				<div class="fz-20 mt-4 mt-md-5 text-center"><i class="icon-refresh mr-35 fas fa-counter-spin"></i>Memuat...</div>
			</section>
			<section id="result-summary">
				<div>Menemukan ...</div>
			</section>
			<section id="result-table">
				<div class="table-tree-wrapper">
					<table class="table-tree">
						<thead>
							<tr><th>Kode</th><th>Nama Wilayah</th></tr>
						</thead>
						<tbody id="result-table-body">
							<tr class="lv-0 toggle toggle-expanded"><td><b>33</b></td><td>Jawa Tengah</tr>
							<tr class="lv-1 toggle"><td>33<b>08</b></td><td>Kabupaten Magelang</tr>
							<tr class="lv-0 toggle toggle-expanded"><td><b>61</b></td><td>Kalimantan Barat</tr>
							<tr class="lv-1 toggle toggle-expanded"><td>61<b>01</b></td><td>Kabupaten Sambas</tr>
							<tr class="lv-2"><td>6101<b>020</b></td><td>Kecamatan Pemangkat</tr>
							<tr class="lv-2 toggle toggle-expanded"><td>6101<b>030</b></td><td>Kecamatan Tebas</tr>
							<tr class="lv-1"><td>61<b>02</b></td><td>Kabupaten Bengkayang</tr>
							<tr class="lv-1 toggle toggle-expanded"><td>61<b>06</b></td><td>Kabupaten Ketapang</tr>
							<tr class="lv-1 toggle toggle-expanded"><td>61<b>11</b></td><td>Kabupaten Kayong Utara</tr>
							<tr class="lv-2"><td>6111<b>020</b></td><td>Kecamatan Sukadana</tr>
							<tr class="lv-3"><td>6111020<b>004</b></td><td>Desa Sutera</tr>
							<tr class="lv-3 toggle"><td>6111020<b>004</b></td><td>Desa Sutera</tr>
							<tr class="lv-0 toggle"><td><b>62</b></td><td>Kalimantan Tengah</tr>
							<tr class="lv-0 toggle"><td><b>63</b></td><td>Kalimantan Selatan</tr>
							<tr class="lv-0 toggle"><td><b>64</b></td><td>Kalimantan Timur</tr>
							<tr class="lv-0 toggle"><td><b>65</b></td><td>Kalimantan Utara</tr>
							<tr class="lv-0 toggle"><td><b>71</b></td><td>Sulawesi Utara</tr>
							<tr class="lv-0 toggle"><td><b>72</b></td><td>Sulawesi Tengah</tr>
						</tbody>
					</table>
				</div>
			</section>
		</div>
	</main>

	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.2/js/bootstrap-select.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/mark.js/8.11.1/jquery.mark.min.js"></script>
	<script src="lib/atlantis-lite/mod/atlantis.mod.js?v=<?php include 'views/partials/_version.php'; ?>"></script>
	<script src="assets/js/main.js?v=<?php include 'views/partials/_version.php'; ?>"></script>
	<script>
		const DEV = <?= json_encode(SITE === 'http://localhost') ?>;
	</script>

</body>

</html>