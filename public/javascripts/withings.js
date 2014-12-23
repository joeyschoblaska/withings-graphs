function zoomChart(event) {
  chart = event.chart

  lastDatum = chart.dataProvider[chart.dataProvider.length - 1];
  lastDatumDate = new Date(lastDatum.date);
  endDate = new Date(lastDatum.date + (1000 * 60 * 60 * 24));
  startDate = new Date(lastDatumDate - (1000 * 60 * 60 * 24 * 30 * 3))

  chart.zoomToDates(startDate, endDate);
}

$( document ).ready(function() {
  $.ajax({
    url: "/graph_data"
  }).done(function( data ) {
    chart = new AmCharts.AmSerialChart();
    chart.pathToImages = "/images/amcharts/";
    chart.dataProvider = JSON.parse(data);
    chart.marginLeft = 10;
    chart.categoryField = "date";
    chart.dataDateFormat = "YYYY-MM-DD";

    chart.addListener("dataUpdated", zoomChart);

    var categoryAxis = chart.categoryAxis;
    categoryAxis.parseDates = true;
    categoryAxis.minPeriod = "DD";
    categoryAxis.dashLength = 3;
    categoryAxis.minorGridEnabled = true;
    categoryAxis.minorGridAlpha = 0.1;

    var valueAxis = new AmCharts.ValueAxis();
    valueAxis.dashLength = 3;
    valueAxis.minMaxMultiplier = 1.1;
    valueAxis.title = "Weight (lb)";
    chart.addValueAxis(valueAxis);

    graph = new AmCharts.AmGraph();
    graph.type = "smoothedLine";
    graph.lineColor = "#d1655d";
    graph.negativeLineColor = "#637bb6";
    graph.bullet = "round";
    graph.bulletSize = 8;
    graph.bulletBorderColor = "#FFFFFF";
    graph.bulletBorderAlpha = 1;
    graph.bulletBorderThickness = 2;
    graph.lineThickness = 2;
    graph.valueField = "value";
    graph.balloonText = "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>";
    chart.addGraph(graph);

    var chartCursor = new AmCharts.ChartCursor();
    chartCursor.cursorAlpha = 0;
    chartCursor.cursorPosition = "mouse";
    chartCursor.categoryBalloonDateFormat = "YYYY-MM-DD";
    chart.addChartCursor(chartCursor);

    var chartScrollbar = new AmCharts.ChartScrollbar();
    chartScrollbar.autoGridCount = true
    chartScrollbar.scrollbarHeight = 40
    chart.addChartScrollbar(chartScrollbar);

    chart.creditsPosition = "bottom-right";

    chart.write("chartdiv");
  });
});
