import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-character-status',
  standalone: true,
  imports: [NgClass],
  templateUrl: './character-status.component.html',
  styleUrls: ['./character-status.component.scss'],
})
export class CharacterStatusComponent implements OnInit {
  @Input() status: string = '';

  constructor() {}

  ngOnInit() {}
}
