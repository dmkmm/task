<?php
	/**
	 * PHP console script to resize image
	 *
	 * Command to run script: php image.php -f="source file path" -w="new width" -h="new height" -o="output file path"
	 * Parameters: -f and -o both required
	 * Parameters: -w and -h required at least one of them
	 */


	/**
	 * Make readline works on OS Windows
	 */
	if(!function_exists('readline') && PHP_OS == 'WINNT')
	{
		function readline($prompt)
		{
			echo $prompt;

			return stream_get_line(STDIN, 1024, PHP_EOL);
		}
	}

	$options = getopt("f:w::h::o:");

	/**
	 * Checking for required input file path
	 */
	while(!array_key_exists('f', $options) || !file_exists($options['f']))
	{
		$options['f'] = readline('Enter source file path(q - for exit): ');

		if($options['f'] == 'q')
			exit;

		if(!file_exists($options['f']))
		{
			echo 'File not founded!' . PHP_EOL;
			unset($options['f']);
		}
	}

	$imageSize = getimagesize($options['f']);

	/**
	 * Check if file have image mimetype
	 * (if file is not an image getimagesize return false)
	 */
	if(!$imageSize)
	{
		exit('Given file is not an image! Or unsupported image type');
	}

	/**
	 * Output information about image file
	 */
	$pathInfo = pathinfo($options['f']);

	echo 'File name: ' . $pathInfo['filename'] . PHP_EOL;
	echo 'File extension: ' . $pathInfo['extension'] . PHP_EOL;

	/**
	 * Checking for specified output file name
	 */
	if(!array_key_exists('o', $options))
	{
		exit('Output file name not specified');
	}
	else if(!preg_match("/^.*\..{3,4}$/", $options['o']))
	{
		exit('Output filename is not in correct format [name.extension]');
	}


	/**
	 * Checking is output file extension correct
	 */
	$matches = [];
	preg_match("/\..{3,4}$/", $options['o'], $matches);

	if(!in_array(str_replace('.', '', $matches[0]), ['bmp', 'gif', 'jpg', 'png', 'jpeg']))
	{
		exit('Unsupported output filename extension');
	}


	/**
	 * Checking if any of parameters (width or height) of new file is specified
	 */
	if(!array_key_exists('w', $options) && !array_key_exists('h', $options))
	{
		exit('Neither width nor height specified');
	}

	/**
	 * Checking if only one of parameters (width or height) is specified
	 */
	if((array_key_exists('w', $options) && !array_key_exists('h', $options)) || (!array_key_exists('w', $options) && array_key_exists('h', $options)))
	{
		// Proportional resizing

		if(intval($options['w']) > 0)
		{
			$resizeProportion = intval($options['w']) / intval($imageSize[0]);
		}
		else if(intval($options['h']) > 0)
		{
			$resizeProportion = intval($options['h']) / intval($imageSize[1]);
		}
		else
		{
			exit('Neither width nor height aren\'t in correct format');
		}

		$newWidth = ceil($imageSize[0] * $resizeProportion);
		$newHeight = ceil($imageSize[1] * $resizeProportion);
	}
	else
	{
		// Hard resizing

		$newWidth = intval($options['w']);
		$newHeight = intval($options['h']);
	}

	$imageType = str_replace('image/', '', $imageSize['mime']);

	if(in_array($imageType, ['jpeg', 'pjpeg', 'x-jps']))
		$imageType = 'jpg';

	$oldImage = null;
	switch($imageType)
	{
		case 'bmp': $oldImage = imagecreatefromwbmp($options['f']); break;
		case 'gif': $oldImage = imagecreatefromgif($options['f']); break;
		case 'jpg': $oldImage = imagecreatefromjpeg($options['f']); break;
		case 'png': $oldImage = imagecreatefrompng($options['f']); break;
	}

	if(!$oldImage)
	{
		exit('Unsupported image type');
	}

	$newImage = imagecreatetruecolor($newWidth, $newHeight);

	// preserve transparency
	if($imageType == "gif" or $imageType == "png")
	{
		imagecolortransparent($newImage, imagecolorallocatealpha($newImage, 0, 0, 0, 127));
		imagealphablending($newImage, false);
		imagesavealpha($newImage, true);
	}

	imagecopyresampled($newImage, $oldImage, 0, 0, 0, 0, $newWidth, $newHeight, intval($imageSize[0]), intval($imageSize[1]));

	/**
	 * Make sure that destination folder exists
	 */
	if(!file_exists(dirname($options['o'])))
	{
		mkdir(dirname($options['o']));
	}

	switch($imageType)
	{
		case 'bmp': imagewbmp($newImage, $options['o']); break;
		case 'gif': imagegif($newImage, $options['o']); break;
		case 'jpg': imagejpeg($newImage, $options['o']); break;
		case 'png': imagepng($newImage, $options['o']); break;
	}

	echo 'Resized image saved in destination path!';
