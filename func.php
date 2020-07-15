<?php

function dd($A, $dump = 0, $html = false)
{
	$A = $html ? htmlentities($A) : $A;
	echo '<pre>';
	$dump ? var_dump($A) : print_r($A);
	echo '</pre>';
}

function writeFile($filename, $content = '')
{
	$f = fopen($filename, 'w');
	fwrite($f, $content);
	fclose($f);
}

function getMfd($id = '')
{

	$url = 'https://mfdonline.bps.go.id/rekap/cetak/cetak_rekap_prov.php';
	if (strlen($id) === 2) $url = 'https://mfdonline.bps.go.id/rekap/cetak/cetak_rekap_kab.php?pr=' . substr($id, 0, 2);
	elseif (strlen($id) === 4) $url = 'https://mfdonline.bps.go.id/rekap/cetak/cetak_rekap_kec.php?pr=' . substr($id, 0, 2) . '&kb=' . substr($id, 2, 2);
	elseif (strlen($id) === 7) $url = 'https://mfdonline.bps.go.id/rekap/cetak/cetak_rekap_desa.php?pr=' . substr($id, 0, 2) . '&kb=' . substr($id, 2, 2) . '&kc=' . substr($id, -3);

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	$res = curl_exec($ch);

	preg_match_all('/<td( align="left")?>(\[|\d\d\d ).*<\/td>/U', $res, $matches);
	foreach ($matches[0] as $v) {
		$kode_wilayah = explode(' ', str_replace(['[', ']'], '', trim(strip_tags($v))), 2);
		// $mfd[$id . $kode_wilayah[0]] = ucwords(strtolower($kode_wilayah[1]));
		$mfd[$id . $kode_wilayah[0]] = $kode_wilayah[1];
	}

	return $mfd;
}

function updateMfd($pr_id = null)
{
	// $mfd = getMfd('6111020'); dd($mfd); die;

	if ($pr_id) {
		$kb = getMfd($pr_id);
		foreach ($kb as $kb_id => $kb_name) {
			$mfd .= "$kb_id ~ $kb_name\n";
			$kc = getMfd($kb_id);
			foreach ($kc as $kc_id => $kc_name) {
				$mfd .= "$kc_id ~ $kc_name\n";
				$ds = getMfd($kc_id);
				foreach ($ds as $ds_id => $ds_name) {
					$mfd .= "$ds_id ~ $ds_name\n";
				}
			}
		}
		writeFile('assets/txt/mfd/' . $pr_id . '.txt', $mfd);
		return $mfd;
	} else {
		$pr = getMfd();
		foreach ($pr as $id => $name) {
			$name = str_replace('Dki J', 'DKI J', str_replace('Di Y', 'DI Y', updateLetterCase($name)));
			$mfd .= "$id ~ $name\n";
			if (file_exists('assets/txt/mfd/' . $id . '.txt')) {
				$mfd_pr = explode("\r\n", file_get_contents('assets/txt/mfd/' . $id . '.txt'));
				foreach ($mfd_pr as $line) {
					$mfd .= updateLetterCase($line) . "\n";
				}
			} else $mfd .= "\n\n";
		}
		writeFile('assets/txt/mfd.txt', $mfd);
		return $mfd;
	}
}

function generateJson()
{
	$rows = explode("\n", file_get_contents('assets/txt/mfd.txt'));
	foreach ($rows as $row) {
		if ($row) {
			$col = explode(' ~ ', $row);
			$l = strlen($col[0]);
			$mfd_desa[] = ['id' => $col[0], 'name' => $col[1]];
			if ($l <= 7) $mfd_kec[] = ['id' => $col[0], 'name' => $col[1]];
			if ($l <= 4) $mfd_kabkot[] = ['id' => $col[0], 'name' => $col[1]];
			if ($l <= 2) $mfd_prov[] = ['id' => $col[0], 'name' => $col[1]];
		}
	}
	writeFile('assets/json/kode-wilayah-prov.json', json_encode($mfd_prov, JSON_PRETTY_PRINT));
	writeFile('assets/json/kode-wilayah-prov.min.json', json_encode($mfd_prov));
	writeFile('assets/json/kode-wilayah-kabkot.json', json_encode($mfd_kabkot, JSON_PRETTY_PRINT));
	writeFile('assets/json/kode-wilayah-kabkot.min.json', json_encode($mfd_kabkot));
	writeFile('assets/json/kode-wilayah-kec.json', json_encode($mfd_kec, JSON_PRETTY_PRINT));
	writeFile('assets/json/kode-wilayah-kec.min.json', json_encode($mfd_kec));
	writeFile('assets/json/kode-wilayah-desa.json', json_encode($mfd_desa, JSON_PRETTY_PRINT));
	writeFile('assets/json/kode-wilayah-desa.min.json', json_encode($mfd_desa));
}

function updateLetterCase($str)
{
	return preg_replace_callback(
		'/\b(?=[LXIVCDM]+\b)([a-z]+)\b/i',
		function ($matches) {
			return strtoupper($matches[0]);
		},
		preg_replace_callback(
			'!\b[a-z]!',
			function ($matches) {
				return strtoupper($matches[0]);
			},
			preg_replace(
				'/((?=\w)\/ )|( \/(?=\w))/',
				' / ',
				preg_replace_callback(
					'/(\w ){3,}\w/',
					function ($matches) {
						return str_replace(' ', '', $matches[0]);
					},
					preg_replace('/\s\s+/', ' ', strtolower($str))
				)
			)
		)
	);
}
