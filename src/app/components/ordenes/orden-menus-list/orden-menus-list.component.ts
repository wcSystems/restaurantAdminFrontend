import { Component, OnInit, Input } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'smart-orden-menus-list',
  templateUrl: './orden-menus-list.component.html',
  styleUrls: ['./orden-menus-list.component.scss']
})
export class OrdenMenusListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


}
