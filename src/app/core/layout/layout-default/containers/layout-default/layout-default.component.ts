import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-layout-default',
  standalone: true,
  imports: [RouterOutlet, SideMenuComponent, HeaderComponent],
  templateUrl: './layout-default.component.html',
  styleUrls: ['./layout-default.component.scss'],
})
export class LayoutDefaultComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
