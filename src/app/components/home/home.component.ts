import { appService } from './../../services/mahaliServices/mahali.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsData } from '../../services/productsdata';
import { ProductService } from '../../services/productservice';
// import { Lightbox } from 'angular2-lightbox';
import { Lightbox } from 'angular2-lightbox';
import swal from 'sweetalert';
declare var jQuery: any;
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
    private skuArr: Array<any> = [];

    product: ProductsData = {
        name: "Utpal Kumar Das"
    };
    constructor(private router: Router, public productService: ProductService, private appService: appService, private _lightbox: Lightbox) {
        this.getWholeSellers();
        this.getBanners();
        this.dealOfDay();
        this.getJewel();
        this.getCloth();
        this.getEcom();
    }
    showAllProducts = true;
    showVegetablesScreen = false;
    showFruitScreen = false;
    showTeaScreen = false;
    showBreadScreen = false;
    showJuiceScreen = false;

    showVegetables() {
        this.showVegetablesScreen = true;
        this.showAllProducts = false;
        this.showFruitScreen = false;
        this.showTeaScreen = false;
        this.showBreadScreen = false;
        this.showJuiceScreen = false;
    }
    showFruits() {
        this.showVegetablesScreen = false;
        this.showAllProducts = false;
        this.showFruitScreen = true;
        this.showTeaScreen = false;
        this.showBreadScreen = false;
        this.showJuiceScreen = false;
    }
    showTea() {
        this.showVegetablesScreen = false;
        this.showAllProducts = false;
        this.showFruitScreen = false;
        this.showTeaScreen = true;
        this.showBreadScreen = false;
        this.showJuiceScreen = false;
    }
    showBread() {
        this.showVegetablesScreen = false;
        this.showAllProducts = false;
        this.showFruitScreen = false;
        this.showTeaScreen = false;
        this.showBreadScreen = true;
        this.showJuiceScreen = false;
    }
    showJuices() {
        this.showVegetablesScreen = false;
        this.showAllProducts = false;
        this.showFruitScreen = false;
        this.showTeaScreen = false;
        this.showBreadScreen = false;
        this.showJuiceScreen = true;
    }
    ngOnInit() {
        this.productService.product = this.product;
        this.getWholeSellers();
        this.getBanners();
        this.dealOfDay();
        this.getJewel();
        this.getCloth();
        this.getEcom();
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


    showProduxtDetails(prodId) {
        this.router.navigate(['/productdetails'], { queryParams: { prodId: prodId } });
    }

    showStore() {
        this.router.navigate(['/store'], { queryParams: { order: 'popular' } });
    }
    getWholeSellers() {
        this.appService.getWholeSellers().subscribe(resp => {

        })
    }
    bannerData = [];
    offerBan = [];
    dummyBan = [];
    bannersTotalData = [];
    getBanners() {
        this.appService.getBanners().subscribe(res => {
            this.bannersTotalData = res.json().result;
            for (var i = 0; i < this.bannersTotalData.length; i++) {
                if (this.bannersTotalData[i].banner_position === 'Main Banners') {
                    this.bannerData = this.bannersTotalData[i].banner_details;
                } else if (this.bannersTotalData[i].banner_position === 'Feature brands') {
                    this.offerBan = this.bannersTotalData[i].banner_details;
                } else if (this.bannersTotalData[i].banner_position === "Dummy Banner") {
                    this.dummyBan = this.bannersTotalData[i].banner_details[0].website_banner;
                }
            }



            // if (res.json().result[6] !== undefined) {
            //     this.offerBan = res.json().result[6].banner_details;
            // }
            // if (res.json().result[7] !== undefined) {
            //     this.dummyBan = res.json().result[7].banner_details[0].website_banner;
            // }
            console.log(this.dummyBan);
        })
    }
    dealData = [];
    skuData = [];
    // skuArr = [];
    prodName;
    ImageLarge;
    topOfrs = [];
    topsku = [];
    topArr = [];
    dealOfDay() {
        this.appService.dealOfDay().subscribe(res => {
            this.dealData = res.json().data.deals_of_the_day;
            this.ImageLarge = res.json().data.deals_of_the_day[0].sku_details[0].image;
            this.topOfrs = res.json().data.top_offers;
            for (var i = 0; i < this.dealData.length; i++) {
                // this.prodName = this.dealData[i].product_name;
                for (var j = 0; j < this.dealData[i].sku_details.length; j++) {
                    this.dealData[i].sku_details[j].product_name = this.dealData[i].product_name;
                    this.dealData[i].sku_details[j].product_id = this.dealData[i].product_id;
                    this.skuData = this.dealData[i].sku_details[j];
                    this.skuArr.push(this.skuData);
                }

            }
            for (var i = 0; i < this.topOfrs.length; i++) {
                // this.prodName = this.dealData[i].product_name;
                for (var j = 0; j < this.topOfrs[i].sku_details.length; j++) {
                    this.topOfrs[i].sku_details[j].product_name = this.topOfrs[i].product_name;
                    this.topOfrs[i].sku_details[j].product_id = this.topOfrs[i].product_id;
                    this.topsku = this.dealData[i].sku_details[j];
                    this.topArr.push(this.topsku);
                }

            }
        })
    }
    enlargeImg;
    open(skid): void {
        // alert(skid);
        for (var i = 0; i < this.dealData.length; i++) {
            for (var j = 0; j < this.dealData[i].sku_details.length; j++) {
                if (skid === this.dealData[i].sku_details[j].skid) {
                    this.enlargeImg = this.dealData[i].sku_details[j].image;
                    jQuery("#enlargeImg").modal("show");
                }
            }

        }
    }

    jewelData = [];
    jewelArr = [];
    jewlsku = [];
    getJewel() {
        this.appService.getJewel().subscribe(res => {
            this.jewelData = res.json().data;
            for (var i = 0; i < this.jewelData.length; i++) {
                // this.prodName = this.dealData[i].product_name;
                for (var j = 0; j < this.jewelData[i].sku_details.length; j++) {
                    this.jewelData[i].sku_details[j].product_name = this.jewelData[i].product_name;
                    this.jewelData[i].sku_details[j].product_id = this.jewelData[i].product_id;
                    this.jewlsku = this.jewelData[i].sku_details[j];
                    this.jewelArr.push(this.jewlsku);
                }

            }
        })
    }
    jewellery(skid): void {
        // alert(skid);
        for (var i = 0; i < this.jewelData.length; i++) {
            // this.prodName = this.dealData[i].product_name;
            for (var j = 0; j < this.jewelData[i].sku_details.length; j++) {
                if (skid === this.jewelData[i].sku_details[j].skid) {
                    this.enlargeImg = this.jewelData[i].sku_details[j].image;
                    jQuery("#enlargeImg").modal("show");
                }
            }

        }
    }

    clothData = [];
    clothsku = [];
    clothArr = [];
    getCloth() {
        this.appService.getCloth().subscribe(res => {
            this.clothData = res.json().data;
            for (var i = 0; i < this.clothData.length; i++) {
                // this.prodName = this.dealData[i].product_name;
                for (var j = 0; j < this.clothData[i].sku_details.length; j++) {
                    this.clothData[i].sku_details[j].product_name = this.clothData[i].product_name;
                    this.clothData[i].sku_details[j].product_id = this.clothData[i].product_id;
                    this.clothsku = this.clothData[i].sku_details[j];
                    this.clothArr.push(this.clothsku);
                }

            }
        })
    }
    clothes(skid) {
        for (var i = 0; i < this.clothData.length; i++) {
            // this.prodName = this.dealData[i].product_name;
            for (var j = 0; j < this.clothData[i].sku_details.length; j++) {
                if (skid === this.clothData[i].sku_details[j].skid) {
                    this.enlargeImg = this.clothData[i].sku_details[j].image;
                    jQuery("#enlargeImg").modal("show");
                }
            }

        }

    }
    seeAll(type) {
        this.router.navigate(['/products'], { queryParams: { action: type } });
    }
    ecomProds = [];
    ecomsku = [];
    ecomArr = [];
    getEcom() {
        this.appService.ecomProducts().subscribe(res => {
            this.ecomProds = res.json().products;
            for (var i = 0; i < this.ecomProds.length; i++) {
                // this.prodName = this.dealData[i].product_name;
                for (var j = 0; j < this.ecomProds[i].sku_details.length; j++) {
                    this.ecomProds[i].sku_details[j].product_name = this.ecomProds[i].product_name;
                    this.ecomProds[i].sku_details[j].product_id = this.ecomProds[i].product_id;
                    this.ecomsku = this.ecomProds[i].sku_details[j];
                    this.ecomArr.push(this.ecomsku);
                }

            }
        })
    }
    recently(skid) {
        for (var i = 0; i < this.ecomProds.length; i++) {
            // this.prodName = this.dealData[i].product_name;
            for (var j = 0; j < this.ecomProds[i].sku_details.length; j++) {
                if (skid === this.ecomProds[i].sku_details[j].skid) {
                    this.enlargeImg = this.ecomProds[i].sku_details[j].image;
                    jQuery("#enlargeImg").modal("show");
                }
            }

        }

    }

    cartDetails = [];
    cartCount;
    addtoCart(Id, skId) {
        if (localStorage.userId === undefined) {
            swal('Please Login', '', 'warning');
            return;
        }
        var inData = {
            "products": [{
                product_id: Id,
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
    getCart() {
        var inData = localStorage.getItem('userId');
        this.appService.getCart(inData).subscribe(res => {
            this.cartDetails = res.json().cart_details;
            this.cartCount = res.json().count;
        }, err => {

        })
    }
    addtoWish(Id, skId) {
        if (localStorage.userId === undefined) {
            swal("Please Login", "", "warning");
        } else {
            var inData = {
                "user_id": JSON.parse(localStorage.userId),
                "product_id": Id,
                "sku_id": skId,
                "item_type": "ecommerce"
            }
            this.appService.addToWish(inData).subscribe(res => {
                console.log(res.json());
                swal(res.json().message, "", "success");
                this.getWish();
            }, err => {

            })
        }

    }
    getWish() {
        this.appService.getWish().subscribe(res => {
            console.log(res.json());
        }, err => {

        })
    }
}
