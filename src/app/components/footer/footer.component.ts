import { Component, OnInit } from '@angular/core';
import {Router}from '@angular/router'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

  moveUp() {
    window.scrollTo(0, 0);
  }
  myaccount(){
    if(localStorage.token===undefined){
      swal('Please Login','','warning');
      return;
    }else{
      this.router.navigate(['/myaccount'])
    }
  }
}
