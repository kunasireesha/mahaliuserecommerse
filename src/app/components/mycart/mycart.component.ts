import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ItemsComponent } from '../../components/items/items.component';
import { PromocodesComponent } from '../../components/promocodes/promocodes.component';
import { appService } from './../../services/mahaliServices/mahali.service';
import { Router } from '@angular/router';
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
  payment_option;
  addId;
  constructor(public dialog: MatDialog, public appService: appService, private router: Router) { }

  ngOnInit() {
    this.getCart();
    this.getAdd();
    this.paymentOptions();
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
  selectAdd() {
    this.appService.setDelAdd(this.addId).subscribe(res => {
      swal("Selected successfully", "", "success");
      this.getAdd();
      // this.getSlots();
    })
  }
  //add address
  //add address
  addAddress() {
    this.addresses = true;
    this.showAddresses = false;
  }
  addData = {
    full_name: "",
    mobile_number: "",
    house_no: "",
    city: "",
    state: "",
    landmark: "",
    pin_code: "",
    address_type: "",
    vendor_id: 44
  }
  type;
  Type(type) {
    this.type = type;
  }
  //save address
  saveAddress() {
    this.showAddresses = true;
    this.addresses = false;
    var inData = {
      "full_name": this.addData.full_name,
      "mobile_number": this.addData.mobile_number,
      "house_no": this.addData.house_no,
      "city": this.addData.city,
      "state": this.addData.state,
      "landmark": this.addData.landmark,
      "pin_code": this.addData.pin_code,
      "address_type": this.type,

    }
    this.appService.addaddress(inData).subscribe(res => {
      this.getAdd();
      this.showAddresses = true;
      this.addresses = false;

    })

  }

  billing;
  cartData = [];
  getCart() {
    var inData = localStorage.getItem('userId');
    this.appService.getCart(inData).subscribe(res => {
      this.cartData = res.json().cart_details;
      for (var i = 0; i < this.cartData.length; i++) {
        this.cartData[i].prodName = this.cartData[i].products.product_name;
        for (var j = 0; j < this.cartData[i].products.sku_details.length; j++) {
          this.cartData[i].products.skuValue = this.cartData[i].products.sku_details[0].size;
          this.cartData[i].products.skuValue = this.cartData[i].products.sku_details[0].size;
          this.cartData[i].products.skid = this.cartData[i].products.sku_details[0].skid;
          this.cartData[i].products.selling_price = this.cartData[i].products.sku_details[0].selling_price;
          this.cartData[i].products.actual_price = this.cartData[i].products.sku_details[0].actual_price;
          this.cartData[i].products.img = this.cartData[i].products.sku_details[0].image;
        }
      }
      this.cartCount = res.json().count;
      this.billing = res.json().selling_Price_bill;
    }, err => {

    })
  }
  checkout() {
    this.showCartItems = false;
    this.showDeliveryAddress = true;
  }
  cartDetails = [];
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
  getAddData = [];
  getAdd() {
    this.appService.getAddress().subscribe(res => {
      this.getAddData = res.json().delivery_address;
    }, err => {

    })
  };
  delCart(cartId) {
    var inData = cartId;
    this.appService.delCart(inData).subscribe(res => {
      swal(res.json().message, "", "success");
      this.getCart();
    }, err => {
    })
  }
  //showPayment
  showPayment(Id) {
    this.showPaymentMethode = !this.showPaymentMethode;
    this.showCartItems = false;
    this.showAddresses = false;
    this.showDeliveryAddress = false;
    window.scrollTo(0, 0);
    this.addId = Id;
    this.selectAdd();
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
  seleOpt;
  payId;
  selePayOptn(index, Id) {
    this.seleOpt = index;
    this.payId = Id;
  }
  ordData = [];
  orderPlace() {
    var inData = {
      "delivery_address_id": this.addId,
      "billing_amount": this.billing,
      "payment_type": this.payId,
      "user_id": localStorage.getItem('userId'),
      "item_type": "grocery",
    }
    this.appService.palceOrder(inData).subscribe(res => {
      this.ordData = res.json().Order[0].order_id;
      swal(res.json().message, "", "success");
      this.router.navigate(['/Orderplaced'], { queryParams: { orderId: this.ordData } });
    }, err => {
    })
  }
  payOptions = [];
  paymentOptions() {
    this.appService.paymentType().subscribe(res => {
      this.payOptions = res.json().options;
    }, err => {

    })
  }
  selectAdd() {
    this.appService.setDelAdd(this.addId).subscribe(res => {
      swal("Selected successfully", "", "success");
      this.getAdd();
      // this.getSlots();
    })
  }
  itemIncrease(cartId) {

    for (var i = 0; i < this.cartData.length; i++) {
      if (this.cartData[i].cart_id === cartId) {
        this.cartData[i].quantity = this.cartData[i].quantity + 1;
        this.modifyCart(this.cartData[i].quantity, cartId);
        // this.getCart();
        return;
      }
    }
  }

  itemDecrease(cartId) {


    for (var i = 0; i < this.cartData.length; i++) {
      if (this.cartData[i].cart_id === cartId) {
        if (this.cartData[i].quantity === 1) {
          return;
        } else {
          this.cartData[i].quantity = this.cartData[i].quantity - 1;
          this.modifyCart(this.cartData[i].quantity, cartId);
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
        swal(resp.json().message, "", "success");
        jQuery("#signupmodal").modal("hide");
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
}
