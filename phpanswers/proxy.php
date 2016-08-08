<?php 
	/**
	 * FB Graph API proxy
	 * Copy request options and sent it to FB api.
	 * Return FB response headers and body
	 *
	 * To run script: php -S ip:port proxy.php 
	 */

	header('content-type: application/json; charset=UTF-8');

	$options = [
		'http' => [
			'method'  => $_SERVER['REQUEST_METHOD'],
			'user_agent' => $_SERVER['HTTP_USER_AGENT'],
			'protocol_version' => 1.1,
			'follow_location' => 0,
			'ignore_errors' => 1
		],
	];

	if($_SERVER['REQUEST_METHOD'] == 'POST')
	{
		$options['http']['content'] = http_build_query($_POST);
	}

	$context  = stream_context_create($options);
	

	$connectionStream = fopen('https://graph.facebook.com' . $_SERVER['REQUEST_URI'], 'r', false, $context);

	
	$content = '';
	while (!feof($connectionStream)) {
	    $content .= fread($connectionStream, 8192);
	}

	$response = [
		'original_body' => json_decode($content),
		'original_headers' => stream_get_meta_data($connectionStream)['wrapper_data']
	];

	fclose($connectionStream);
	
	echo json_encode($response);