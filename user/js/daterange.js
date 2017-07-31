function dateRange(table,getData) {
	var initFlag = false;
	$('#start').datepicker({
		language: 'zh-CN',
		autoclose: true
	}).on('changeDate', function(event) {
		var start = $('#start').datepicker('getDate');
		if(start) {
			if(!initFlag) {
				initEnd(start);
				initFlag = true;
			} else {
				var end = $('#end').datepicker('getDate');
				updateEnd(start, end);
			}
		} else {
			$('#end').datepicker('update', '');
			$('#end').datepicker('destroy');
			document.getElementById('end').disabled = true;
			initFlag = false;
		}

	});

	function initEnd(start) {
		document.getElementById('end').disabled = false;
		createEnd(start);
		$('#end').datepicker('show');
	}

	function updateEnd(start, end) {
		if(!end || start.getTime() > end.getTime()) {
			$('#end').datepicker('update', '');
			$('#end').datepicker('destroy');
			createEnd(start, start);
			$('#end').datepicker('show');
		} else {
			if(end)
				table.bootstrapTable('load', getData(start, end));
			$('#end').datepicker('destroy');
			createEnd(start, end);
		}

	}

	function createEnd(start, end) {
		$('#end').datepicker({
			startDate: start,
			defaultViewDate: end,
			language: 'zh-CN',
			autoclose: true
		}).on('changeDate', function(event) {
			var start = $('#start').datepicker('getDate');
			var end = $('#end').datepicker('getDate');
			table.bootstrapTable('load', getData(start, end));
		});
	}
}