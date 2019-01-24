import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ItemsComponent } from '../../components/items/items.component';
import { PromocodesComponent } from '../../components/promocodes/promocodes.component';
@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.less']
})
export class MycartComponent implements OnInit {
  showCartItems = true;
  showDeliveryAddress = false;
  showAddresses = true;
  showPaymentMethode = false;
  showDeliveryType = false;
  addresses = false;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {

  }

  showCart() {
    this.showCartItems = !this.showCartItems;
    this.showDeliveryAddress = false;
    this.showPaymentMethode = false;
  }

  //show addrss
  showAddress() {
    this.showCartItems = false;
    this.showDeliveryAddress = !this.showDeliveryAddress;
    this.showPaymentMethode = false;
    this.addresses = false;
    this.showAddresses = true;
    this.showDeliveryType = false;
    window.scrollTo(0, 0);
  }

  //add address
  addAddress() {
    this.addresses = true;
    this.showAddresses = false;
  }

  //save address
  saveAddress() {
    this.showAddresses = true;
    this.addresses = false;

  }
  billing;
  getCart() {
    var inData = localStorage.getItem('userId');
    this.appService.getCart(inData).subscribe(res => {
      this.cartDetails = res.json().cart_details;
      this.cartCount = res.json().count;
      this.billing = res.json().selling_Price_bill;
    }, err => {

    })
  }
  cartDetails
  cartCount;
  addtoCart(Id, skId) {
    var inData = {
      "products": [{
        product_id: Id,
        sku_id: skId
      }],
      "vendor_id": JSON.parse(localStorage.getItem('userId')),
      "item_type": "ecommerce"
    }
    this.appService.addtoCart(inData).subscribe(res => {
      this.getCart();
      this.cartDetails = res.json().selling_price_total;
      this.cartCount = res.json().count;
      swal(res.json().message, "", "success");
    }, err => {

    })
  }
  //showPayment
  showPayment() {
    this.showPaymentMethode = !this.showPaymentMethode;
    this.showCartItems = false;
    this.showAddresses = false;
    this.showDeliveryAddress = false;
    window.scrollTo(0, 0);
  }
  // show shipment type
  shipmentType() {
    this.addresses = false;
    this.showAddresses = false;
    this.showDeliveryType = true;
  }

  //items popup
  showItems() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(ItemsComponent, dialogConfig);

  }
  showPromos() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(PromocodesComponent, dialogConfig);

  }
}
