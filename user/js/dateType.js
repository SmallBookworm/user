function dateType(button) {
	button.addEventListener('click', function(event) {
		if(this.innerText === '日') {
			this.innerHTML = '年<i class="glyphicon glyphicon-triangle-bottom"></i>';
			$('.datepicker').datepicker('update', '');
			$('.datepicker').datepicker('destroy');
			$('.datepicker').datepicker({
				language: 'zh-CN',
				format: "yyyy",
				minViewMode: 2,
				autoclose: true
			});
		} else if(this.innerText === '月') {
			this.innerHTML = '日<i class="glyphicon glyphicon-triangle-bottom"></i>';
			$('.datepicker').datepicker('update', '');
			$('.datepicker').datepicker('destroy');
			$('.datepicker').datepicker({
				language: 'zh-CN',
				format: "yyyy年mm月dd",
				minViewMode: 0,
				autoclose: true
			});
		} else if(this.innerText === '年') {
			this.innerHTML = '月<i class="glyphicon glyphicon-triangle-bottom"></i>';
			$('.datepicker').datepicker('update', '');
			$('.datepicker').datepicker('destroy');
			$('.datepicker').datepicker({
				language: 'zh-CN',
				format: "yyyy年mm",
				minViewMode: 1,
				autoclose: true
			});
		}
	});
}