import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import 'd3';
import 'nvd3';
declare let d3: any;

@Component({
    selector: 'app-d3',
    template: `
        <div>
            <nvd3 [options]="options" [data]="data()"></nvd3>
        </div>
    `,
    // include original styles
    styleUrls: [
        '../../../../node_modules/nvd3/build/nv.d3.css'
    ],
    encapsulation: ViewEncapsulation.None,
})

export class D3Component implements OnInit {
    private _currentData;
    @Input()
    set currentData(currentData) {
        this._currentData = currentData;
    }
    currentDataFunc() {
        const data = [];
        for(let c of this._currentData) {
            data.push({label: c[0], value: c[1]});
        }
        return data;
    }
    public options;
    data() {
        return [{
            key: 'Cumulative Return',
            values: this.currentDataFunc()
        }];
    }

    ngOnInit() {
        this.options = {
            chart: {
                type: 'discreteBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 55
                },
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',.4f')(d);
                },
                duration: 200,
                xAxis: {
                    axisLabel: 'Date'
                },
                yAxis: {
                    // axisLabel: 'Price',
                    // axisLabelDistance: -10
                }
            }
        };
    }
}

