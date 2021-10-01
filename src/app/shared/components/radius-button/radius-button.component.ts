import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-radius-button',
  templateUrl: './radius-button.component.html',
  styleUrls: ['./radius-button.component.scss']
})
export class RadiusButtonComponent implements OnInit {
  @Input() label: string = '';
  constructor() {}

  ngOnInit(): void {}
}
