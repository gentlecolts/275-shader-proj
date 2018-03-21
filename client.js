var shaderID = 0;

function save() {
	var shader = $('#shadercode').value;
	var URL = "http://localhost:8080/save";
	$.ajax({
		type: "POST",
		url: URL,
		dataType: "jsonp",
		data: {
			"shader": shader
		},
		success: function(msg) {
			if (msg.success) {
				shaderID = msg.id;
				alert("Shader " + shaderID + " saved successfully!");
			} else {
				alert("Shader was unable to be saved");
			}
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
	//
	// populate the shaderlist table in the homePage
	//
}

function loadshader()
{
	//
}

$(document).ready(function() {
	homePage();
}
