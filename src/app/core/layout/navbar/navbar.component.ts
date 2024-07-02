import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  sair: any;
  logo: any = '/assets/img/logo.png';
  logoDescricao: any = '/assets/img/Logo - original.png';
  visibleSidebar;
  menu;
  displayEmpresas: boolean;
  loading: boolean;
  ngOnInit() {

  }

  
}
