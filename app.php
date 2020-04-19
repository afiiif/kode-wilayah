<?php

include 'config.php';

define('PATH', strtok($_SERVER['REQUEST_URI'], '?'));

if (PATH === '/kode-wilayah/') {
	include 'views/main.php';
}

else {
	http_response_code(404);
	include 'views/404.php';
}
