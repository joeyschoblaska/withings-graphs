$( document ).ready(function() {
  $.ajax({
    url: "/graph_data"
  }).done(function(data) {
    data = JSON.parse(data)

    var chart = AmCharts.makeChart("chartdiv", {
      "type": "serial",
      "pathToImages": "/images/amcharts/",
      "dataProvider": data,
      "marginLeft": 10,
      "categoryField": "date",
      "dataDateFormat": "YYYY-MM-DD",
      "creditsPosition": "bottom-right",

      "categoryAxis": {
        "parseDates": true,
        "minPeriod": "DD",
        "dashLength": 3,
        "minorGridEnabled": true,
        "minorGridAlpha": 0.1
      },

      "valueAxes": [{
        "dashLength": 3,
        "minMaxMultiplier": 1.1,
        "title": "Weight (lb)"
      }],

      "graphs": [{
        "type": "smoothedLine",
        "lineColor": "#d1655d",
        "negativeLineColor": "#637bb6",
        "bullet": "round",
        "bulletSize": 8,
        "bulletBorderColor": "#FFFFFF",
        "bulletBorderAlpha": 1,
        "bulletBorderThickness": 2,
        "lineThickness": 2,
        "valueField": "value",
        "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>"
      }],

      "chartCursor": {
        "cursorAlpha": 0,
        "cursorPosition": "mouse",
        "categoryBalloonDateFormat": "YYYY-MM-DD"
      },

      "chartScrollbar": {
        "autoGridCount": true,
        "scrollbarHeight": 40
      }
    });

    lastDatum = data[data.length - 1];
    lastDatumDate = new Date(lastDatum.date);
    endDate = new Date(lastDatum.date + (1000 * 60 * 60 * 24));
    startDate = new Date(lastDatumDate - (1000 * 60 * 60 * 24 * 30 * 3))

    chart.zoomToDates(startDate, endDate);
  });
});
