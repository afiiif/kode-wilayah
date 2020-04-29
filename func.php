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
	if (strlen($id) === 2) $url = 'https://mfdonline.bps.go.id/rekap/cetak/cetak_rekap_kab.php?pr='.substr($id, 0, 2);
	elseif (strlen($id) === 4) $url = 'https://mfdonline.bps.go.id/rekap/cetak/cetak_rekap_kec.php?pr='.substr($id, 0, 2).'&kb='.substr($id, 2, 2);
	elseif (strlen($id) === 7) $url = 'https://mfdonline.bps.go.id/rekap/cetak/cetak_rekap_desa.php?pr='.substr($id, 0, 2).'&kb='.substr($id, 2, 2).'&kc='.substr($id, -3);

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	$res = curl_exec($ch);

	preg_match_all('/<td( align="left")?>(\[|\d\d\d ).*<\/td>/U', $res, $matches);
	foreach ($matches[0] as $v) {
		$kode_wilayah = explode(' ', str_replace(['[', ']'], '', trim(strip_tags($v))), 2);
		$mfd[$id . $kode_wilayah[0]] = ucwords(strtolower($kode_wilayah[1]));
	}

	return $mfd;
}

function updateMfd($pr_id = null)
{
	// $mfd = getMfd('6111020'); dd($mfd); die;

	if ($pr_id) {
		$kb = getMfd($pr_id);
		foreach ($kb as $kb_id => $kb_name) {
			$mfd .= "$kb_id,$kb_name\n";
			$kc = getMfd($kb_id);
			foreach ($kc as $kc_id => $kc_name) {
				$mfd .= "$kc_id,$kc_name\n";
				$ds = getMfd($kc_id);
				foreach ($ds as $ds_id => $ds_name) {
					$mfd .= "$ds_id,$ds_name\n";
				}
			}
		}
		writeFile('assets/csv/mfd/' . $pr_id . '.csv', $mfd);
		return $mfd;
	}
	else {
		$pr = getMfd();
		foreach ($pr as $id => $name) {
			$mfd .= "$id,$name\n";
			if (file_exists('assets/csv/mfd/' . $id . '.csv')) {
				$mfd_pr = file_get_contents('assets/csv/mfd/' . $id . '.csv');
				$mfd .= $mfd_pr;
			}
		}
		writeFile('assets/csv/mfd.csv', $mfd);
		return $mfd;
	}
}
