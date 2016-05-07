import {Component, OnInit} from "angular2/core";
import {Response} from "angular2/http";
import {StatusReportService} from "./status-report.service";
import {HttpService} from "../utilities/HttpService";
import {SpinnerComponent} from "../utilities/spinner/spinner.component";
import {ShowError} from "../utilities/messageBox";

declare var Gauge: any;

export interface StatusReport {

}

@Component({
    templateUrl: "app/status-report/status-report.component.html",
    styleUrls: ["app/status-report/styles.css"],
    providers: [StatusReportService, HttpService],
    directives: [SpinnerComponent]
})
export class StatusReportComponent implements OnInit {

    private isRequesting: boolean;

    constructor(private service: StatusReportService) {

    }

    ngOnInit(): void {

        this.isRequesting = true;
        this.service.getStatusReport().subscribe((response: StatusReport) => {
            this.buildChart();
        },
            (error: any) => {
                ShowError("Unable to get status report, please try again later.", error);
                this.isRequesting = false;
            },
            () => {
                this.isRequesting = false;
            });
    }

    buildChart() {
        var data = [{
            value: 1044,
            color: "#09355C",
            label: "Adam Borrett"
        }, {
                value: 693,
                color: "#CBCBCB",
                label: "Scot Austin"
            },];
        var ctx = (<HTMLCanvasElement>document.getElementById("piechart")).getContext("2d");
        var myChart = new Chart(ctx).Pie(data, {
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%> (<%=segments[i].value%>)<%}%></li><%}%></ul>",
        });
        document.getElementById('js-legend').innerHTML = myChart.generateLegend();
        var opts = {
            lines: 12,
            angle: 0.15,
            lineWidth: 0.44,
            pointer: {
                length: 0.9,
                strokeWidth: 0.035,
                color: '#000000'
            },
            limitMax: 'false',
            colorStart: '#FF8C00',
            colorStop: '#FF8C00',
            strokeColor: '#E0E0E0',
            generateGradient: true
        };
        var target = document.getElementById('overall-status');
        var gauge = new Gauge(target).setOptions(opts);
        gauge.maxValue = 100;
        gauge.animationSpeed = 32;
        gauge.set(75);
        
        var ctx = (<HTMLCanvasElement>document.getElementById("barchart")).getContext("2d");
        new Chart(ctx).Bar(<LinearChartData>{
            labels: [
                "Jun 15",
                "Jul 15",
                "Aug 15",
                "Sep 15",
                "Oct 15",
                "Nov 15",
                "Dec 15",
                "Jan 16",
                "Feb 16",
                "Mar 16",
                "Apr 16",
                "May 16",
            ],
            datasets: [{
                label: "Jobs Completed",
                fillColor: "#09355C",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: [
                    174, 170, 87, 26, 182, 188, 163, 192, 183, 190, 182, 0,
                ]
            }]
        }, { barShowStroke: false });
    }

}
