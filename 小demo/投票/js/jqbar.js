(function ($) {
    $.fn.extend({
        jqbar: function (options) {
            var settings = $.extend({
                src:null,
                animationSpeed: 2000,
                barLength: 300,
                orientation: 'h',
                barWidth: 50,
                barColor: 'red',
                label: '&nbsp;',
                value: 1500,
                duration:2000
            }, options);
            return this.each(function () {
                var valueLabelHeight = 0;
                var progressContainer = $(this);
               if (settings.orientation == 'v') {
                    progressContainer.addClass('jqbar vertical')
                    .append('<img src="'+settings.src+'"><span class="bar-percent"></span><span class="bar-level-wrapper"><span class="bar-level"></span></span><span class="bar-label"></span>');
                    var progressLabel = progressContainer.find('.bar-label').html(settings.label);
                    var progressBar = progressContainer.find('.bar-level').attr('data-value', settings.value);

                    var progressBarWrapper = progressContainer.find('.bar-level-wrapper');
                    progressContainer.css('height', settings.barLength);
                    progressBar.css({ height: settings.barLength, top: settings.barLength, width: settings.barWidth, backgroundColor: settings.barColor });
                    progressBarWrapper.css({ height: settings.barLength, width: settings.barWidth });
                    var valueLabel = progressContainer.find('.bar-percent');
                    valueLabel.html('0');
                    valueLabelHeight = parseInt(valueLabel.outerHeight());
                    valueLabel.css({ top: (settings.barLength - valueLabelHeight) + 'px' });
                }

                animateProgressBar(progressBar);
                function animateProgressBar(progressBar) {
                    var level = parseInt(progressBar.attr('data-value'));
                    if (level > 150) {
                        level = 150;
                        alert('max value cannot exceed 150 票');
                    }
                    if (settings.orientation == 'v'){
                        var h = settings.barLength - settings.barLength * level / 150;
                        progressBar.animate({ top: h }, {

                            duration: settings.duration,
                            step: function (currentValue) {
                                var percent = parseInt((settings.barLength - parseInt(currentValue))/ settings.barLength*150);
                                if (isNaN(percent))
                                    percent = 0;
                                progressContainer.find('.bar-percent').html(Math.abs(percent) + '票');
                            }
                        });
                        progressContainer.find('.bar-percent').animate({ top: (h - valueLabelHeight) }, settings.duration);
                    }
                }
            });
        }
    });
})(jQuery);