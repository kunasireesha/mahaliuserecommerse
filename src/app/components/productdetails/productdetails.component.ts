import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsData } from '../../services/productsdata';
import { ProductService } from '../../services/productservice';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.less']

})
export class ProductdetailsComponent implements OnInit {
  product: ProductsData;
  constructor(private route: ActivatedRoute, public productService: ProductService) {
  }
  sub;
  ngOnInit() {

    this.product = this.productService.product;
    console.log(this.product);
    this.sub = this.route
      .data
      .subscribe(v => console.log(v));



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
}
