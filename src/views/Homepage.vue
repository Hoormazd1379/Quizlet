<template>
    <h1>Wlecome to the Survey</h1>
	<p>Here we give you some text and we ask you to choose the right way of writing it the specific writing format </p>
	<h1>Instructions</h1>
	<ul>
		<li>You will be given text and you are asked to choose the same text written in either  CamelCase or in Kebab-case</li> <br>
		<li>camelCase is the way of writing text where words, instead of being separated by "space", are written together with every word starting with capital letter <br> 
			For example: "Hello world" in Camel case will be: "helloWorld".
			</li> <br> 

		<li>kebab-case is the way of writing text where words, instead of being separated by "space", are separated with '-': dash sign <br> 
			For example: "Hello world" in kebab-case will be: "hello-world".
			</li>
	</ul>

	<div style="text-align:center">
		<form action="/Survey">
    		<input type="submit" value="Start survey"/>
		</form>
	</div>
</template>

<style>

* {
	font-size: 1.1rem;
}

h1 {
    margin: 0;
	padding: 30px;
	text-align: center;
	box-sizing: border-box;
	font-family: 'Montserrat', sans-serif;
}

p {
	font-size: 1.5rem;
	text-align: center;
}

button {
	
}
</style>