<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8" />
	<?PHP
	    $pageTitle = "Hello-4"; // here we are declaring a variable
	?>
	<title>
		<?PHP
	    echo $pageTitle; 	// and we use that variable here
	?>
	</title>
	<style>
	*{
		font-family: sans-serif;
	}
	</style>
</head>

<body>
	<?PHP
	echo "<h1>$pageTitle</h1>"; // and we use that variable a second time here
	echo "<div>Content goes here!</div>";
	echo "<hr>";
	echo "<footer>";
	echo date('\i\t \i\s \t\h\e jS \d\a\y.');
	echo "</fotter>";
?>
</body>

</html>