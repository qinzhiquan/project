////////////////////////////begin//////////////////////////////////////
//////以下代码为控制沙盘灯光插件/////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
function controlPlate() {
	// 操作占位符
	this.operateNum = "{N}";
	// 求和占位符
	this.operateTotal = "{T}";
	//全部开启
	this.allOpen = "85 1 19 255 255 255 255 101";
	//全部关闭
	this.allClose = "85 1 19 0 0 0 0 105";
	// 开启某一路
	this.openNum = "85 1 18 0 0 0 " + this.operateNum + " " +  this.operateTotal;
	// 关闭某一路
	this.closeNum = "85 1 17 0 0 0 " + this.operateNum + " " +  this.operateTotal;
	// 关闭剩余指令模板
	this.closeCurplus = "85 1 19 0 0 0 " + this.operateNum + " " +  this.operateTotal;
}

/**
 * 转换成16进制字符
 * @param {Object} value
 */
controlPlate.prototype.getValue16 = function(value){
	if (!value) {
		return "";
	}
	return value.toString(16).toUpperCase();
}

/**
 * 转换成10进制字符
 * @param {Object} value
 */
controlPlate.prototype.getValue10 = function(value){
	if (!value) {
		return "";
	}
	return parseInt(value, 16);
}

/**
 * 开启所有
 */
controlPlate.prototype.openAll = function(){
	snedSerialCommand(this.allOpen);
	//sendUdp("0|" + this.allOpen + "|1");
}

/**
 * 关闭所有
 */
controlPlate.prototype.closeAll = function(){
	snedSerialCommand(this.allClose);
	//sendUdp("0|" + this.allClose + "|1");
}

/**
 * 开启某一路
 * @param {Object} value 要开启的路数
 */
controlPlate.prototype.open = function(value){
	// 求和
	let total = 104 + value;
	// 替换占位符
	let command = this.openNum.replace(this.operateNum, value).replace(this.operateTotal, total);
	snedSerialCommand(command);
	//sendUdp("0|" + command + "|1");
}

/**
 * 关闭某一路
 * @param {Object} value 要关闭的路数
 */
controlPlate.prototype.close = function(value){
	// 求和
	let total = 103 + value;
	// 替换占位符
	let command = this.closeNum.replace(this.operateNum, value).replace(this.operateTotal, total);
	snedSerialCommand(command);
	//sendUdp("0|" + command + "|1");
}
////////////////////////////end////////////////////////////////////////
//////以下代码为控制沙盘灯光插件/////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
