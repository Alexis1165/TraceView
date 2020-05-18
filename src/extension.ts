'use strict';

import * as vscode from 'vscode';
import {window} from 'vscode';
import {ChartGenerator} from './Models/ChartGenerator';
import {EventHandler} from './Models/EventHandler';
let panel;

export function activate(context: vscode.ExtensionContext) {
    
    let chartInstance = new ChartGenerator();    
    let controller = new EventHandler(chartInstance);
        
    let disposable = vscode.commands.registerCommand('extension.generateChart', () => {
        panel = vscode.window.createWebviewPanel('TraceView', "Trace View", vscode.ViewColumn.One, { 
            enableScripts: true
        });

        chartInstance.setPanel(panel);
        let editor = window.activeTextEditor;

        if (editor) {
            let doc = editor.document;
            let wCount = new ChartGenerator();
            let ticks = wCount.getXAxis(doc);
            let vars = wCount.getYAxis(doc);
            panel.webview.html = new ChartGenerator().getWebviewContent(ticks, vars);          
        }
    });

    context.subscriptions.push(disposable);
    context.subscriptions.push(controller);
    context.subscriptions.push(chartInstance);
}
