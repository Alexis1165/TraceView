import {ChartGenerator} from './ChartGenerator';
import {Disposable, window} from 'vscode';

export class EventHandler {

    private chartInstance: ChartGenerator;
    private _disposable: Disposable;

    constructor(chartInstance: ChartGenerator) {
        this.chartInstance = chartInstance;

    let subscriptions: Disposable[] = [];
    window.onDidChangeTextEditorSelection(this._onEvent, this, subscriptions);
    window.onDidChangeActiveTextEditor(this._onEvent, this, subscriptions);

    this._disposable = Disposable.from(...subscriptions);
            
    }

    dispose() {
        this._disposable.dispose();
    }

    private _onEvent() {
        this.chartInstance.updateChart();
    }
}