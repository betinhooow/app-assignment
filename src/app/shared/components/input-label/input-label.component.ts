import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-label',
  templateUrl: './input-label.component.html',
  styleUrls: ['./input-label.component.scss']
})
export class InputLabelComponent implements OnInit {
  @Input() label: string;
  constructor() { }

  ngOnInit(): void { }

}
