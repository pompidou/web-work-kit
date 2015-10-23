# JavaScript code snippets

## Nice HTML string concatenation

Nice way to build a HTML string over multiple lines in JavaScript.

	var htmlString = [
		'<article>',
			'<h1>Title</h1>',
			'<p>Text lorem ipusm dolor sit amet.</p>',
		'</article>'
	].join('');
