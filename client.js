var shaderID;

function save() {
	var shader = document.getElementById("shadercode").value;
	var URL = "http://localhost:8080/save";
	$.ajax({
		type: "POST",
		url: URL,
		data: {
			"code": shader,
			"id": shaderID
		},
		error: function(jgXHR, textStatus, thrownError) {
			alert("Error: " + textStatus + " " + thrownError);
			return;
		}
	});
}

function homePage() {
	var URL = "http://localhost:8080/home";
	$.ajax({
		type: "GET",
		url: URL,
		dataType: "html",
		success: function(msg) {
			$('#pagecontent').html(msg);
			populatePreviews();
		},
		error: function(jgXHR, textStatus, thrownError) {
			alert("Error: " + textStatus + " " + thrownError);
			return;
		}
	});
}

function editorPage() {
	var URL = "http://localhost:8080/editor";
	$.ajax({
		type: "GET",
		url: URL,
		dataType: "html",
		success: function(msg) {
			var newdiv = document.createElement('div');
			newdiv.innerHTML = msg;
			var page = document.getElementById("pagecontent");
			page.innerHTML = "";
			var newscript = document.createElement('script');
			newscript.src = "shader.js";
			page.appendChild(newdiv);
			page.appendChild(newscript);
		},
		error: function(jgXHR, textStatus, thrownError) {
			alert("Error: " + textStatus + " " + thrownError);
			return;
		}
	});
}
 
function populatePreviews() {
	var URL = "http://localhost:8080/populate";
	var shaders = [];
	$.ajax({
		type: "GET",
		url: URL,
		success: function(msg) {
			shaders = msg;
			var str = ""; //string for tablehtml
			for (i = 0; i < shaders.length; i++) //each row has one element; the shader in question
			{
				if(shaders[i][0] != ".") //ignore hidden files starting with "."
				{
					str += "<tr><td>"
						+ "<button onclick=\"loadshader(" + shaders[i] + ")\" class=\"button buttonlist\">"
						+ shaders[i]
						+ "</button>"
						+ "</td></tr>";
				}
			}
			$("#shaderlist").html(str);
		},
		error: function(jgXHR, textStatus, thrownError) {
			alert("Error: " + textStatus + " " + thrownError);
			return;
		}
	});
}

function newShader() {
	var URL = "http://localhost:8080/new";
	$.ajax({
		type: "GET",
		url: URL,
		success: function(msg) {
			var json = JSON.parse(msg);
			shaderID = json.id;
			editorPage();
		},
		error: function(jgXHR, textStatus, thrownError) {
			alert("Error: " + textStatus + " " + thrownError);
			return;
		}
	});
}

function loadshader(id) {
	editorPage();
	var URL = "http://localhost:8080/load";
	$.ajax({
		type: "GET",
		url: URL,
		data: {
			"id": id
		},
		success: function(msg) {
			document.getElementById("shadercode").innerHTML = msg;
			shaderID = id;
		},
		error: function(jgXHR, textStatus, thrownError) {
			alert("Error: " + textStatus + " " + thrownError);
			return;
		}
	});
}

$(document).ready(function() {
	homePage();
});
