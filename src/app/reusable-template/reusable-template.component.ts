import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-reusable-template',
  templateUrl: './reusable-template.component.html',
  styleUrls: ['./reusable-template.component.css'],
})
export class ReusableTemplateComponent implements OnInit {
  constructor() {}

  public template: TemplateRef<any>;
  public context: any = {};

  ngOnInit() {}

  // gets called once before the renderer is used
  agInit(params: ICellRendererParams) {
    this.setTemplateAndParams(params);
  }

  // gets called whenever the cell refreshes
  refresh(params: ICellRendererParams) {
    this.setTemplateAndParams(params);
  }

  isPopup() {
    console.log('popup');
    return true;
  }

  setTemplateAndParams(params) {
    console.log(params.node.id);
    this.template = params['ngTemplate'];
    this.context = {
      rowInfo: {
        rowData: params.data,
        rowId: params.node.id,
        columnName: params.colDef.headerName,
      },
    };
  }
}
