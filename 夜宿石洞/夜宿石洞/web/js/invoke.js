var backstageObject = { reuslt: ""}

function invoke(method, params) {
	var event = new MessageEvent(method, {data: params});
	document.dispatchEvent(event);
}

function PlayMusic(params) {
	invoke("PlayMusic", "audio/" + params);
}

function StandJump() {
	invoke("GetStandbyPage");
	window.location.href = backstageObject.reuslt;
}

function getFile(params) {
	invoke("GetFile", params);
	return backstageObject.reuslt;	
}


function getDirectoryFile(params) {
	invoke("GetDirectoryFile", params);
	return backstageObject.reuslt;	
}

function getAllContent(params) {
	invoke("getAllContent", params);
	return backstageObject.reuslt;	
}

function GetChildDirectory(params) {
	invoke("GetChildDirectory", params);
	return backstageObject.reuslt;	
}

function excuteBat(params) {
	invoke("ExcuteBat", params);
	return backstageObject.reuslt;	
}

function openApp(params) {
	invoke("OpenApp", params);
}


// 获取URL参数 
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) {
		var para = decodeURI(r[2]);
		return para;
	} else {
		return '';
	}
}