var shaderID = 0;

function save() {
	var shader = $('#shadercode').value;
	var URL = "http://localhost:8080/save";
	$.ajax({
		type: "POST",
		url: URL,
		dataType: "jsonp",
		data: {
			"shader": shader,
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
			$('#pagecontent').html(msg);
			var codeMir = CodeMirror($('#shadercode'));
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
				str += "<tr><td>"
					+ "<button onclick=\"loadshader("shaders[i]\")" class=\"button buttonlist\">"
					+ shaders[i]
					+ "</button>"
					+ "</td></tr>";
			}
			$("homeshaderlist").html(str);
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
		dataType: "jsonp",
		success: function(msg) {
			shaderID = msg.id;
			editorPage();
		},
		error: function(jgXHR, textStatus, thrownError) {
			alert("Error: " + textStatus + " " + thrownError);
			return;
		}
	});
}

function loadshader(id) {
	//
}

$(document).ready(function() {
	homePage();
});
