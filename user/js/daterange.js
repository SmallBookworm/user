function dateRange(startPicker, endPicker, func) {
	this.startPicker = startPicker;
	this.endPicker = endPicker;
	this.func = func;
	this.initFlag = false;
	this.format = "yyyy年mm月dd";
	this.minViewMode = 0;
}
dateRange.prototype.initRange = function() {
	if(!this.initFlag) {
		this.startPicker.datepicker('update', '');
		this.startPicker.off('changeDate');
		this.startPicker.datepicker('destroy');
		this.endPicker.datepicker('update', '');
		this.endPicker.off('changeDate');
		this.endPicker.datepicker('destroy');
		this.endPicker.attr('disabled', true);
	}
	var datef = this;
	this.startPicker.datepicker({
		language: 'zh-CN',
		format: this.format,
		minViewMode: this.minViewMode,
		autoclose: true
	}).on('changeDate', function(event) {
		var start = datef.startPicker.datepicker('getDate');
		if(start) {
			if(!datef.initFlag) {
				datef._initEnd(start);
				datef.initFlag = true;
			} else {
				var end = datef.endPicker.datepicker('getDate');
				datef._updateEnd(start, end);
			}
		} else {
			datef.endPicker.datepicker('update', '');
			datef.endPicker.datepicker('destroy');
			document.getElementById('end').disabled = true;
			datef.initFlag = false;
		}

	});
}
dateRange.prototype._initEnd = function(start) {
	this.endPicker.attr('disabled', false);
	this._createEnd(start);
	this.endPicker.datepicker('show');
}

dateRange.prototype._updateEnd = function _updateEnd(start, end) {
	if(!end || start.getTime() > end.getTime()) {
		this.endPicker.datepicker('update', '');
		this.endPicker.off('changeDate');
		this.endPicker.datepicker('destroy');
		this._createEnd(start, start);
		this.endPicker.datepicker('show');
	} else {
		this.func(start, end);
		this.endPicker.off('changeDate');
		this.endPicker.datepicker('destroy');
		this._createEnd(start, end);
	}

}
dateRange.prototype._createEnd = function _createEnd(start, end) {
	var datef = this;
	this.endPicker.datepicker({
		startDate: start,
		defaultViewDate: end,
		language: 'zh-CN',
		format: this.format,
		minViewMode: this.minViewMode,
		autoclose: true
	}).on('changeDate', function(event) {
		var start = datef.startPicker.datepicker('getDate');
		var end = datef.endPicker.datepicker('getDate');
		datef.func(start, end);
	});
}

dateRange.prototype.initRAT = function(button) {
	var datef = this;
	this.initRange();
	button.addEventListener('click', function(event) {
		if(this.innerText === '日') {
			this.innerHTML = '年<i class="glyphicon glyphicon-triangle-bottom"></i>';
			datef.format = "yyyy";
			datef.minViewMode = 2;

		} else if(this.innerText === '月') {
			this.innerHTML = '日<i class="glyphicon glyphicon-triangle-bottom"></i>';
			datef.format = "yyyy年mm月dd";
			datef.minViewMode = 0;

		} else if(this.innerText === '年') {
			this.innerHTML = '月<i class="glyphicon glyphicon-triangle-bottom"></i>';
			datef.format = "yyyy年mm";
			datef.minViewMode = 1;
		}
		datef.initFlag = false;
		datef.initRange();
	});

}