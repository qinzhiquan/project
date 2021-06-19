var backstageObject = { reuslt: ""}

function invoke(method, params) {
	var event = new MessageEvent(method, {data: params});
	document.dispatchEvent(event);
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