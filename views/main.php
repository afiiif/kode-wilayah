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
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.20/css/dataTables.bootstrap4.min.css">
	<link rel="stylesheet" href="lib/atlantis-lite/mod/atlantis.mod.css?v=<?php include 'views/partials/_version.php'; ?>">
	<link rel="stylesheet" href="assets/css/main.css?v=<?php include 'views/partials/_version.php'; ?>">

	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>
</head>

<body>

	<header class="bg-primary-gradient pb-6">
		<nav class="p-a p-sm-3">
			<a id="nav-brand" href="" class="d-block lh-120">
				<i class="icon-location-pin mr-1"></i>
				<span class="fw-8">KODE</span>
				<span class="fw-3">WILAYAH</span>
			</a>
		</nav>
		<div class="search-form-wrapper-outer">
			<div class="search-form-wrapper">
				<input id="search" type="search" class="search-form-input" placeholder="Cari kode atau nama wilayah" autofocus>
				<button type="button" class="search-form-btn"><i class="icon-magnifier"></i></button>
				<div class="search-form-setting-wrapper">
					<button type="button" class="search-form-setting-btn"><i class="icon-settings"></i></button>
				</div>
			</div>
		</div>
		<!-- <div class="arrow-down">
			<svg version="1.0" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
				<polygon points="0.645,10.383 16,23.871 31.355,10.383 29.375,8.129 16,19.878 2.625,8.129 "></polygon>
			</svg>
		</div> -->
	</header>

	<main>
		<div id="result" class="p-5" style="display: none;">
			<h1>Lorem Ipsum</h1>
			<hr>
			<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta obcaecati deleniti, voluptate, impedit atque aut sint itaque, enim minus eligendi suscipit adipisci? Nisi id accusantium asperiores amet ducimus voluptate illo.</p>
			<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta obcaecati deleniti, voluptate, impedit atque aut sint itaque, enim minus eligendi suscipit adipisci? Nisi id accusantium asperiores amet ducimus voluptate illo.</p>
			<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta obcaecati deleniti, voluptate, impedit atque aut sint itaque, enim minus eligendi suscipit adipisci? Nisi id accusantium asperiores amet ducimus voluptate illo.</p>
			<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta obcaecati deleniti, voluptate, impedit atque aut sint itaque, enim minus eligendi suscipit adipisci? Nisi id accusantium asperiores amet ducimus voluptate illo.</p>
			<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta obcaecati deleniti, voluptate, impedit atque aut sint itaque, enim minus eligendi suscipit adipisci? Nisi id accusantium asperiores amet ducimus voluptate illo.</p>
			<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta obcaecati deleniti, voluptate, impedit atque aut sint itaque, enim minus eligendi suscipit adipisci? Nisi id accusantium asperiores amet ducimus voluptate illo.</p>
			<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta obcaecati deleniti, voluptate, impedit atque aut sint itaque, enim minus eligendi suscipit adipisci? Nisi id accusantium asperiores amet ducimus voluptate illo.</p>
			<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta obcaecati deleniti, voluptate, impedit atque aut sint itaque, enim minus eligendi suscipit adipisci? Nisi id accusantium asperiores amet ducimus voluptate illo.</p>
			<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta obcaecati deleniti, voluptate, impedit atque aut sint itaque, enim minus eligendi suscipit adipisci? Nisi id accusantium asperiores amet ducimus voluptate illo.</p>
			<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta obcaecati deleniti, voluptate, impedit atque aut sint itaque, enim minus eligendi suscipit adipisci? Nisi id accusantium asperiores amet ducimus voluptate illo.</p>
		</div>
	</main>

	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.2/js/bootstrap-select.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.20/js/jquery.dataTables.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.20/js/dataTables.bootstrap4.min.js"></script>
	<script src="lib/atlantis-lite/mod/atlantis.mod.js?v=<?php include 'views/partials/_version.php'; ?>"></script>
	<script src="assets/js/main.js?v=<?php include 'views/partials/_version.php'; ?>"></script>
	<script>
		const DEV = <?= json_encode(SITE === 'http://localhost') ?>;
	</script>

	<script>
		$(() => {
			$('#search').keypress(function(e) {
				if (e.which === 13) {
					$('body').toggleClass('search-active');
					$('#result').slideToggle();
				}
			});
		});
	</script>

</body>

</html>