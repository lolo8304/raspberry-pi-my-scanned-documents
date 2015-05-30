  String.prototype.mark = function(q) {
	q = q.trim();
	if (q == "") return this;
	if (q.indexOf(' ') !== -1) {
		var qList = q.trim().split(" ");
		var i;
		var s2 = this;
		for (i = 0; i < qList.length; ++i) {
		    s2 = s2.mark(qList[i]);
		}
		return s2;
	}
	var i = this.toLowerCase().indexOf(q);
	if (i != -1) {
		s2= this.substr(0, i)+"<mark>"+this.substr(i, q.length)+"</mark>";
		s3 = this.substr(i+q.length).mark(q);
		return s2+s3;
	}
	return this;
};

String.prototype.unmark = function() {
	return this.replace("<mark>","").replace("</mark>","");
};

String.prototype.markAndCut = function(q, len, separator) {
	var markedString = this.mark(q);
	var i = 0;
	i = markedString.indexOf("<mark>", i);
	var markedAndCutString = "";
	while (i > 0) {
		var startPos = Math.max(i - len, 0);
		var endPos = Math.min(markedString.indexOf("</mark>", i) + 7 + len, markedString.length-1);
		if (markedAndCutString !== "") {
			markedAndCutString = markedAndCutString+"&nbsp;&nbsp;&nbsp;&nbsp;";
		}
		markedAndCutString = markedAndCutString + separator+markedString.substr(startPos, endPos - startPos)+separator;
		i = markedString.indexOf("<mark>", endPos);
	}
	return markedAndCutString;
}

