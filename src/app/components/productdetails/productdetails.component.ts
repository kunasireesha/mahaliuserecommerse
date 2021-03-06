import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsData } from '../../services/productsdata';
import { ProductService } from '../../services/productservice';
import { appService } from './../../services/mahaliServices/mahali.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-productdetails',
    templateUrl: './productdetails.component.html',
    styleUrls: ['./productdetails.component.less']
})

export class ProductdetailsComponent implements OnInit {
    product: ProductsData;
    constructor(private route: ActivatedRoute, public productService: ProductService, private appService: appService, private router: Router) {
        this.route.queryParams.subscribe(params => {
            this.prodId = params.prodId;
        });
    }
    item = {
        quantity: 1
    }
    sub;
    prodId;
    ngOnInit() {
        this.product = this.productService.product;
        this.sub = this.route
            .data
            .subscribe(v => console.log(v));
        this.getProductById();

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
    prodData = [];
    prodsData = [];
    skid;
    prodName;
    description;
    offer_price;
    actual_price;
    product_image;
    prodImages = [];
    productData = [];
    product_id: any;
    category_name;
    sub_name: any;
    getProductById() {
        this.appService.getProductById(this.prodId).subscribe(res => {
            this.productData = res.json().products;
            this.category_name = res.json().products.category_name;
            this.sub_name = res.json().products.sub_category_name;
            this.prodsData = res.json().products.sku_details;
            for (var j = 0; j < this.prodsData.length; j++) {
                for (var k = 0; k < this.prodsData[j].images.length; k++) {
                    this.prodImages.push(this.prodsData[j].images[k]);
                    // console.log(this.prodImages);
                }
            }
            this.prodData = res.json().products.sku_details;
            this.offer_price = this.prodData[0].offer_price;
            this.actual_price = this.prodData[0].actual_price;
            this.product_image = this.prodData[0].image;
            this.skid = this.prodData[0].skid;
            this.prodName = res.json().products.product_name;
            this.description = this.prodData[0].description;
            this.skid = this.prodData[0].skid;
            //   this.product_id = this.productData.product_id;
        }, err => {

        })
    }


    changeSize(skId) {
        for (var i = 0; i < this.prodData.length; i++) {
            if (parseInt(skId) === this.prodData[i].skid) {
                this.offer_price = this.prodData[i].offer_price;
                this.actual_price = this.prodData[i].actual_price;
                this.product_image = this.prodData[i].image;
                this.skid = this.prodData[i].skid;
                this.description = this.prodData[i].description;
            }
        }
    }
    cartDetails = [];
    cartCount;
    addtoCart(skId) {
        var inData = {
            "products": [{
                product_id: this.prodId,
                sku_id: skId
            }],
            "user_id": JSON.parse(localStorage.getItem('userId')),
            "item_type": "ecommerce"
        }
        this.appService.addtoCart(inData).subscribe(res => {
            if (res.json().status === 400) {
                swal(res.json().message, "", "error");
            } else {
                this.getCart();
                this.cartDetails = res.json().selling_price_total;
                this.cartCount = res.json().count;
                swal(res.json().message, "", "success");
            }

        }, err => {

        })
    }
    itemIncrease(cartId) {
        for (var i = 0; i < this.cartDetails.length; i++) {
            if (this.cartDetails[i].cart_id === cartId) {
                this.cartDetails[i].quantity = this.cartDetails[i].quantity + 1;
                this.modifyCart(this.cartDetails[i].quantity, cartId);
                // this.getCart();
                return;
            }
        }
    }

    itemDecrease(cartId) {
        for (var i = 0; i < this.cartDetails.length; i++) {
            if (this.cartDetails[i].cart_id === cartId) {
                if (this.cartDetails[i].quantity === 1) {
                    // this.delCart(cartId);
                    return;
                } else {
                    this.cartDetails[i].quantity = this.cartDetails[i].quantity - 1;
                    this.modifyCart(this.cartDetails[i].quantity, cartId);
                }
                // this.getCart();
                return;
            }
        }

    }

    //modify cart

    modifyCart(quantity, cartId) {
        var params = {
            "quantity": quantity
        }

        this.appService.modifyCart(params, cartId).subscribe(resp => {
            if (resp.json().status === 200) {
                // swal(resp.json().message, "", "success");
                // jQuery("#signupmodal").modal("hide");
                this.getCart();
                // this.showRegistration = false;
                // localStorage.setItem('userId', (resp.json().reg_id));
                // this.myAccount = true
                // this.showOpacity = false;
                // this.onCloseCancel();
                // this.router.navigate(['/address']);
            }
        }, err => {

        })
    }
    getCart() {
        var inData = localStorage.getItem('userId');
        this.appService.getCart(inData).subscribe(res => {
            this.cartDetails = res.json().cart_details;
            this.cartCount = res.json().count;
        }, err => {

        })
    }

    showProduxtDetails(prodId) {
        this.router.navigate(['/productdetails'], { queryParams: { prodId: prodId } });
    }
    showBigImage(image) {
        this.product_image = image;
    }
    addtoWish() {
        var inData = {
            "user_id": JSON.parse(localStorage.userId),
            "product_id": this.prodId,
            "sku_id": this.skid,
            "item_type": "ecommerce"
        }
        this.appService.addToWish(inData).subscribe(res => {
            console.log(res.json());
            swal(res.json().message, "", "success");
            // this.getWish();
        }, err => {

        })
    }
}
