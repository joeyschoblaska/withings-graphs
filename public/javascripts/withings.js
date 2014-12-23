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
        "dashLength": 3
      },

      "valueAxes": [
        {
          "id": "v1",
          "dashLength": 3,
          "minMaxMultiplier": 1.1,
          "title": "Weight (lb)"
        },
        {
          "id": "v2",
          "dashLength": 3,
          "minMaxMultiplier": 1.1,
          "title": "Bodyfat %",
          "position": "right"
        }
      ],

      "graphs": [
        {
          "valueAxis": "v1",
          "type": "smoothedLine",
          "lineColor": "#00A0B0",
          "hideBulletsCount": 25,
          "bullet": "round",
          "bulletColor": "#FFFFFF",
          "bulletBorderAlpha": 1,
          "lineThickness": 2,
          "valueField": "weight",
          "useLineColorForBulletBorder": true,
          "balloonText": "<b><span style='font-size:14px;'>[[value]] lb</span></b>"
        },
        {
          "valueAxis": "v2",
          "type": "smoothedLine",
          "lineColor": "#EB6841",
          "hideBulletsCount": 25,
          "bullet": "round",
          "bulletColor": "#FFFFFF",
          "bulletBorderAlpha": 1,
          "lineThickness": 2,
          "valueField": "bodyfat",
          "useLineColorForBulletBorder": true,
          "balloonText": "<b><span style='font-size:14px;'>[[value]]% bodyfat</span></b>"
        }
      ],

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
