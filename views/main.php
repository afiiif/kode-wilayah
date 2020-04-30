<!DOCTYPE html>
<html lang="en" class="h-100">

<head>
<?php include 'views/partials/meta.php'; ?>
	<meta property="og:title" content="Kode Wilayah · Cari nama atau kode wilayah dengan lebih mudah!">
	<meta property="og:url" content="<?= SITE . PATH ?>/">
	<base href="<?= SITE ?>/kode-wilayah/">
	<title>Kode Wilayah · Cari nama atau kode wilayah dengan lebih mudah!</title>

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

<?php include 'views/partials/modal.php'; ?>

	<header class="bg-primary-gradient pb-6">
		<nav class="p-a p-md-3">
			<a id="nav-brand" href="" class="d-block lh-120 animated animated-1s bounceInDown">
				<i class="icon-location-pin mr-1"></i><span class="fw-8">KODE</span><span class="fw-3">WILAYAH</span>
			</a>
		</nav>
		<div id="search-form-wrapper-outer" class="search-form-wrapper-outer d-none"><!-- animated animated-1s bounceIn -->
			<div class="search-form-wrapper">
				<div id="search-form-tooltip" class="search-form-tooltip"></div>
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
		<div id="loading" class="text-white text-center fz-32 fw-3 animated animated-1s fadeIn"><i class="icon-refresh mr-35 fas fa-counter-spin"></i>
			<div class="d-inline-block dotty" style="width: 141px;">Memuat</div>
		</div>
	</header>

	<main>
		<div id="result" class="pt-4 pb-3" style="display: none;">
			<section id="result-loading">
				<div class="fz-20 mt-4 mt-md-5 text-center"><i class="icon-refresh mr-35 fas fa-counter-spin"></i>Memuat...</div>
			</section>
			<section id="result-summary" style="display: none;"></section>
			<section id="result-table" style="display: none;">
				<div class="table-tree-wrapper">
					<table class="table-tree">
						<thead><tr><th>Kode</th><th>Nama Wilayah</th></tr></thead>
						<tbody id="result-table-body"></tbody>
					</table>
				</div>
			</section>
		</div>
	</main>

	<footer class="footer">
		<a id="about-btn" class="p-2 px-md-3 text-reset" href="javascript:void(0)"><i class="fas fa-lightbulb mr-2" style="color: #ffc107;"></i>Tentang<b class="fw-8 text-primary ml-1">KODE</b><span class="fw-3 text-primary">WILAYAH</span></a>
	</footer>

	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.2/js/bootstrap-select.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/mark.js/8.11.1/mark.min.js"></script>
	<script src="lib/atlantis-lite/mod/atlantis.mod.js?v=<?php include 'views/partials/_version.php'; ?>"></script>
	<script src="assets/js/main.js?v=<?php include 'views/partials/_version.php'; ?>"></script>
	<script>
		const DEV = <?= json_encode(SITE === 'http://localhost' || $_GET['debug'] == 1) ?>,
			mfdUrl = ['https://docs.google.com/spreadsheets/d/e/2PACX-1vTMQBPE5fuSn_QsCm4VURF7UzEU29PeTmwSqiycT6au2mX6lKokcLccHJxEKmr8nu_DOfXWlv3hrrIL/pub?gid=1196175698&single=true&output=csv', 'assets/csv/mfd-20200429.csv'];
		</script>

</body>

</html>