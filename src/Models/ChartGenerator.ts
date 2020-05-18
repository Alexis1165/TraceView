import {window, StatusBarAlignment, StatusBarItem, TextDocument} from 'vscode';

export class ChartGenerator {

    private _statusBarItem: StatusBarItem =  window.createStatusBarItem(StatusBarAlignment.Left);
    private panel: any;
    
    public setPanel(panel: any)
    {
        this.panel = panel;
    }

    public updateChart() {

        let editor = window.activeTextEditor;
        if (!editor) {
            this._statusBarItem.hide();
            return;
        }
       
        if (editor) {
            let doc = editor.document;
            let chartHelper = new ChartGenerator();
            let ticks = chartHelper.getXAxis(doc);
            let vars = chartHelper.getYAxis(doc);
            this.panel.webview.html = this.getWebviewContent(ticks, vars);        
            }        
    }

    public getXAxis(doc: TextDocument): string[] {

        let docContent = JSON.parse(doc.getText());
        let ticks = [];

        for (let trace of docContent.trace){ ticks.push(trace.tick); }

        return ticks;
    }   

    public getYAxis(doc: TextDocument): string[] {

        let docContent = JSON.parse(doc.getText());
        let vars = [];        

        for (let trace of docContent.trace){ vars.push(trace.vars); }

        return vars;
    }  

    dispose() {
        this._statusBarItem.dispose();
    }

    public createXAxisString(vars:string[]) : string{

        let xAxisString = "";
        let keys: any = Object.keys(vars[0]);
    
        for (var i = 0; i < keys.length; ++i) {
            xAxisString += "var " + keys[i] + " = [ ";
            for (let v of vars){
                xAxisString += v[keys[i]] + ",";
            }
            xAxisString += "];\n";
        }    
    
        return xAxisString;
    }    

    public getRandomColor()
    {
        return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
    }

    public getWebviewContent(ticks:string[], vars:string[]) {

        let yData = "";
        let xData = "";
        let dataSet = "";
    
        for (let trace of ticks){
            yData += trace + ",";
        }
    
        let keys = Object.keys(vars[0]);
        xData = this.createXAxisString(vars);  
        
        dataSet = "datasets: [\n";
    
        for (var i = 0; i < keys.length; ++i) {
            dataSet += "{";
            dataSet += "data: " + keys[i] + ",\n";
            dataSet += "label: \""  + keys[i] +  "\",\n";
            dataSet += "borderColor: \"" + this.getRandomColor() + "\",\n";
            dataSet += "fill: false\n";
            dataSet += "}";
    
            if (i !== keys.length - 1){ dataSet += ",";}
            dataSet += "\n";
        }
    
        dataSet += "]";
        console.log("dataset: ", dataSet);
        console.log("xdata yeh hai: ", xData);
        console.log("ydata yeh hai: ", yData);
    
    
        return `<!DOCTYPE html>
        <html>
          <head>
            <title>World population</title>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.3.0/Chart.min.js"></script>
            <script type="text/javascript" src="http://code.jquery.com/jquery-2.0.2.js"></script>        
            <style>
            body {
            font-family: Helvetica Neue, Arial, sans-serif;
            text-align: center;
            }
             
            .wrapper {
            max-width: 1000px;
            margin: 50px auto;
            }
             
            h1 {
            font-weight: 200;
            font-size: 3em;
            margin: 0 0 0.1em 0;
            }
             
            h2 {
            font-weight: 200;
            font-size: 0.9em;
            margin: 0 0 50px;
            color: #999;
            }
             
            a {
            margin-top: 50px;
            display: block;
            color: #3e95cd;
            }
            </style>
          </head>
          <body>
            <div class="wrapper">
        
              <canvas id="myChart" width="1600" height="900"></canvas>
            </div>
        
            <script>
    
            // Our labels along the x-axis
            var ticks = [`+yData+`];
            // For drawing the lines
            `+xData+`
        
            var ctx = document.getElementById("myChart");
            var myChart = new Chart(ctx, {
            type: 'line',
            data: {
            labels: ticks,
            `+dataSet+`
            }
            });   
            </script>
          </body>
        </html>
        `;
    }    
}



