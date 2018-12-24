import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsData } from '../../services/productsdata';
import { ProductService } from '../../services/productservice';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  product: ProductsData = {
    name: "Utpal Kumar Das"
  };
  constructor(private router: Router, public productService: ProductService) { }

  ngOnInit() {
    this.productService.product = this.product;

  }


  starList: boolean[] = [true, true, true, true, true];       // create a list which contains status of 5 stars
  rating: number;
  //Create a function which receives the value counting of stars click, 
  //and according to that value we do change the value of that star in list.
  setStar(data: any) {
    this.rating = data + 1;
    for (var i = 0; i <= 4; i++) {
      if (i <= data) {
        this.starList[i] = false;
      }
      else {
        this.starList[i] = true;
      }
    }
  }


  showProduxtDetails() {
    this.router.navigate(['/productdetails'], { queryParams: { order: 'popular' } });
  }

}
