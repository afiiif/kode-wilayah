<?php

include 'config.php';
include 'func.php';

define('PATH', rtrim(strtok($_SERVER['REQUEST_URI'], '?'), '/'));



/*
------------------------------------------------------------------------
ROUTES
------------------------------------------------------------------------
*/

if (PATH === '/kode-wilayah') {
	include 'views/main.php'; die;
}

else if (PATH === '/kode-wilayah/update' && SITE === 'http://localhost') {
	if ($_GET['pr']) {
		$pr = explode(',', $_GET['pr']);
		foreach ($pr as $v) $mfd .= updateMfd($v);
	} else $mfd = updateMfd();
	echo "<pre>$mfd</pre>"; die;
}

else if (PATH === '/kode-wilayah/generate-json') {
	generateJson();
	die;
}

else {
	http_response_code(404);
	include 'views/404.php';
}
