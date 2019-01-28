import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appService } from './../../services/mahaliServices/mahali.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-useraccount',
    templateUrl: './useraccount.component.html',
    styleUrls: ['./useraccount.component.less']
})
export class UseraccountComponent implements OnInit {
    product;
    constructor(
        private route: ActivatedRoute, public appService: appService, private formBuilder: FormBuilder, private router: Router) {
        this.page = this.route.snapshot.data[0]['page'];
        if (this.page === 'profile') {
            this.showProfile = true;
            this.getProfile();
        } else if (this.page === 'myproduct') {
            this.showMyProducts = true;
            this.showProfile = false;
        } else if (this.page === 'addProduct') {
            this.showAddProducts = true;
            this.showProfile = false;
            this.addProducts();
        }
        else if (this.page === 'orders') {
            this.showMyOrders = true;
            this.showProfile = false;
            this.getOrders();
        } else if (this.page === 'changePw') {
            this.showChangePassword = true;
            this.showProfile = false;
        } else if (this.page === 'deliveryaddr') {
            this.showDeliveryAddress = true;
            this.showProfile = false;
        } else if (this.page === 'notifications') {
            this.showNotifications = true;
            this.showProfile = false;
        } else if (this.page === 'wishlist') {
            this.showWishlist = true;
            this.showProfile = false;
            this.getWish();
        }
    }
    addressForm: FormGroup;
    resetForm: FormGroup;
    productForm: FormGroup
    submitted = false;
    editDel = false;
    ngOnInit() {
        this.addressForm = this.formBuilder.group({
            full_name: ['', Validators.required],
            mobile_number: ['', Validators.required],
            house_no: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            landmark: ['', Validators.required],
            pin_code: ['', Validators.required],
        });
        this.resetForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            new_password: ['', [Validators.required, Validators.minLength(6)]],
        });
        this.productForm = this.formBuilder.group({
            deal_price: ['', Validators.required],
            status: ['', Validators.required],
            discount: ['', Validators.required],
            vendor_id: localStorage.userId,
            product_id: this.productId
        });
        // this.editAddForm = this.formBuilder.group({
        //     full_name:['', Validators.required]
        // })
        this.getProfile();
        this.dealOfDay();
        this.getCloth();
        this.getJewel();
    }

    page;
    showNotifications = false;
    showOrderDetails = false;
    showMyOrders = false;
    showChangePassword = false;
    showWishlist = false;
    showAddAddress = false;
    showDeliveryAddress = false;
    editUserProfile = false;
    showProfile = true;
    showAccountDetails = false;
    editAccount = false;
    showAddProducts = false;
    showAddProducts5 = false;
    showOfferZone = false;
    showMyProducts = false;
    showRequestAdmin = false;
    showEditAddress = false;
    showManageUserOrders = false;
    profile() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showChangePassword = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = true;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showOfferZone = false;
        this.showMyProducts = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
        this.getProfile();
    }

    editProfile() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showChangePassword = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = true;
        this.showProfile = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showOfferZone = false;
        this.showMyProducts = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
    }

    deliveryAddress() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showChangePassword = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = true;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showOfferZone = false;
        this.showMyProducts = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
        this.getAdd();
    }
    addAddress() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showChangePassword = false;
        this.showWishlist = false;
        this.showAddAddress = true;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showOfferZone = false;
        this.showMyProducts = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
    }

    wishList() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showChangePassword = false;
        this.showWishlist = true;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.getWish();
    }

    changePassword() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showChangePassword = true;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showOfferZone = false;
        this.showMyProducts = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
    }

    myOrder() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = true;
        this.showChangePassword = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showOfferZone = false;
        this.showMyProducts = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
        this.getOrders();
    }

    notifications() {
        this.showNotifications = true;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showChangePassword = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showOfferZone = false;
    }

    showOrderDetailsEcom(ordId) {
        this.showNotifications = false;
        this.showOrderDetails = true;
        this.showMyOrders = false;
        this.showChangePassword = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showOfferZone = false;
        this.showMyProducts = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
        this.ordDetails(ordId);
    }
    accountDetails() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        // this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        // this.showOfferZone = false;
        // this.showAddProducts = false;
        // this.showAddProducts5 = false;
        this.showManageUserOrders = false;
        this.showAccountDetails = true;
        this.editAccount = false;
        this.showAddProducts = false;
        this.showOfferZone = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.getAccDet();
    }
    editAccountDetails() {
        this.showNotifications = false;
        // this.showOrderDetails = true;
        this.showMyOrders = false;
        this.showChangePassword = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showAccountDetails = false;
        this.editAccount = true;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showOfferZone = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
    }
    cancelAdd() {
        this.showDeliveryAddress = true;
        this.showAddAddress = false;
        this.showEditAddress = false;
    }
    addProducts() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        // this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        // this.showOfferZone = false;
        // this.showAddProducts = true;
        // this.showAddProducts5 = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showAddProducts = true;
        this.showAddProducts5 = false;
        this.showOfferZone = false;
        this.showMyProducts = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
        this.getCategories();
    }
    showAddProducts2(Id) {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        // this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        // this.showOfferZone = false;
        this.showAddProducts = false;
        // this.showAddProducts5 = true;
        // this.showManageUserOrders = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showAddProducts5 = true;
        this.showOfferZone = false;
        this.showMyProducts = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
        this.getProducts(Id);
    }
    offerZone() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        // this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showOfferZone = true;
        this.showAddProducts = false;
        // this.showAddProducts5 = false;
        // this.showManageUserOrders = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showRequestAdmin = false;
        this.showMyProducts = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
        this.showChangePassword = false;
    }
    myProducts() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showMyProducts = true;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showOfferZone = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        // this.showManageUserOrders = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
    }
    requestAdmin() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showOfferZone = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        // this.showManageUserOrders = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showRequestAdmin = true;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
    }
    showEditAdd(addId) {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showOfferZone = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showManageUserOrders = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showRequestAdmin = false;
        this.showEditAddress = true;
        this.editAdd(addId);
    }
    showBukedOrderDetails(ordId) {
        this.showNotifications = false;
        this.showOrderDetails = true;
        this.showMyOrders = false;
        this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showOfferZone = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showManageUserOrders = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.ordDetails(ordId);
    }
    email;
    profileData;
    ordId;
    ordData = [];
    orderDet = [];
    count;
    ordDetails(ordId) {
        this.ordId = ordId;
        this.appService.orderById(ordId).subscribe(resp => {
            this.ordData = resp.json().Order.products;
            for (var i = 0; i < this.ordData.length; i++) {
                this.ordData[i].size = this.ordData[i].sku_details[0].size;
                this.ordData[i].selling_price = this.ordData[i].sku_details[0].selling_price;
            }
            this.orderDet = resp.json().Order.details[0];
            this.count = resp.json().Order.total_selling_price;

        })
    }
    getProfile() {
        this.email = (localStorage.email);
        this.appService.loginDetailsbyEmail(this.email).subscribe(response => {
            this.profileData = response.json().data[0];
            localStorage.removeItem('userName');
            localStorage.setItem('userName', (response.json().data[0].first_name) + " " + (response.json().data[0].last_name));
        })
    }
    updateProfile() {
        var inDate = {
            first_name: this.profileData.first_name,
            email: this.profileData.email,
            mobile_number: this.profileData.mobile_number,
            area: this.profileData.area,
            city: this.profileData.city
        }
        this.appService.updateProfile(inDate).subscribe(response => {
            console.log(response.json());
            swal(response.json().message, "", "success");
            this.ngOnInit();
            this.getProfile();
            this.cancel();
        })
    }
    cancel() {
        this.showProfile = true;
        this.editUserProfile = false;

    }
    get f1() { return this.addressForm.controls; }

    saveAddress() {

        this.submitted = true;
        // stop here if form is invalid
        if (this.addressForm.invalid) {
            return;
        }
        this.appService.addaddress(this.addressForm.value).subscribe(res => {
            this.addressForm.reset();
            swal(res.json().message, "", "success");
            this.showDeliveryAddress = true;
            this.showAddAddress = false;
            this.getAdd();
            //   this.addressForm.reset();
            // this.showAddresses = true;
            //     this.addresses = false;

        })
    }

    return;
    getAddData = [];
    getAdd() {
        this.appService.getAddress().subscribe(res => {
            this.getAddData = res.json().delivery_address;
        })
    }
    delAdd(delId) {
        this.appService.delAddress(delId).subscribe(res => {
            swal(res.json().message, "", "success");
            this.getAdd();
        })
    }
    get f() { return this.resetForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.resetForm.invalid) {
            return;
        } else if (this.resetForm.value.password != this.resetForm.value.new_password) {
            swal("Passwords doesn't matched", "", "warning");
            return;
        }
        this.appService.changePwd(this.resetForm.value).subscribe(resp => {
            if (resp.json().status === 200) {
                swal(resp.json().message, "", "success");
                this.router.navigate(['/'])
            } else {
                swal(resp.json().message, "", "error");
            }

        }, err => {
            swal(err.json().message, "", "error");
        })


    }
    cancelChange() {
        this.showChangePassword = false;
        this.showProfile = true;
    }
    seleOpt;
    addId;
    seleAddOptn(index, addId) {
        this.seleOpt = index;
        this.editDel = true;
        this.addId = addId;
    }
    accDet: any;
    getAccDet() {
        this.appService.getAccDetails().subscribe(res => {
            this.accDet = res.json().data[0];
        }, err => {

        })
    }
    saveDetails() {
        var inData = {
            account_holder_name: this.accDet.account_holder_name,
            account_number: this.accDet.account_number,
            bank_area: this.accDet.bank_area,
            bank_branch: this.accDet.bank_branch,
            bank_city: this.accDet.bank_city,
            bank_name: this.accDet.bank_name,
            ifsc_code: this.accDet.ifsc_code
        }
        this.appService.updateAcc(inData).subscribe(res => {
            swal(res.json().message, "", "success");
            this.getAccDet();
        }, err => {

        })
    }
    cancelDetails() {
        this.showAccountDetails = true;
        this.editAccount = false;
    }
    category = [];
    getCategories() {
        this.appService.getCategories().subscribe(resp => {
            this.category = resp.json().categories;
        })
    }
    prodId;
    reqProds = [];
    orders = [];
    getOrders() {
        this.appService.getPlaceOrder().subscribe(res => {
            this.orders = res.json().Orders;
        }, err => {

        })
    }
    getProducts(Id) {
        this.prodId = Id;
        this.appService.reqOrder(Id).subscribe(resp => {
            this.reqProds = resp.json().Order;

        })
    }
    get f2() { return this.productForm.controls; }
    productId;
    save(prodId) {
        this.productId = prodId;
        this.submitted = true;
        // stop here if form is invalid
        if (this.productForm.invalid) {
            return;
        }
        this.appService.update(this.productForm.value).subscribe(resp => {
            swal("Your order under process for Approvel", "", "success");

        })

    }
    editAddData = {
        full_name: '',
        mobile_number: '',
        house_no: '',
        landmark: '',
        city: '',
        state: '',
        pin_code: '',

    };
    // get f3() { return this.editAddForm.controls; }
    editAdd(addId) {
        this.appService.update(addId).subscribe(resp => {
            this.editAddData = resp.json().delivery_address[0];
        }, err => {

        })
    }
    UpdateAdd(addId) {
        var indata = {
            "full_name": this.editAddData.full_name,
            "mobile_number": this.editAddData.mobile_number,
            "house_no": this.editAddData.house_no,
            "city": this.editAddData.city,
            "state": this.editAddData.state,
            "landmark": this.editAddData.landmark,
            "pin_code": this.editAddData.pin_code,
            "address_type": this.type
        }
        this.appService.updateAddData(indata, addId).subscribe(resp => {
            console.log(resp.json());
            this.getAdd();
        }, err => {

        })
    }
    fromDt;
    toDt;
    type;
    Type(type) {
        this.type = type;
    }
    filterVendor() {
        var inData = {
            "from_date": this.fromDt,
            "to_date": this.toDt
        }
        this.appService.filterVendor(inData).subscribe(resp => {
            this.orders = resp.json().products;

        }, err => {

        })
    }
    wishData = [];
    wishListData = [];
    wishArr = [];
    getWish() {
        this.wishArr = [];
        this.appService.getWish().subscribe(res => {
            if (res.json().message === "Success") {
                this.wishData = res.json().wishlist;
                for (var i = 0; i < this.wishData.length; i++) {
                    this.wishData[i].sku_details.wishlist_id = this.wishData[i].wishlist_id;
                    this.wishData[i].sku_details.product_name = this.wishData[i].product_details[0].product_name;
                    this.wishData[i].sku_details.product_id = this.wishData[i].product_id;
                    this.wishArr.push(this.wishData[i].sku_details);
                }
            }

        }, err => {

        })
    }
    delWish(wishId) {
        this.appService.delWishList(wishId).subscribe(res => {
            if (res.json().message === "Success") {
                this.getWish();
                swal(res.json().message, "", "success");
            }

        })
    }
    cartDetails = [];
    cartCount;
    addtoCart(Id, skId) {
        var inData = {
            "products": [{
                product_id: Id,
                sku_id: skId
            }],
            "user_id": JSON.parse(localStorage.getItem('userId')),
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
    addtoWish(Id, skId) {
        var inData = {
            "user_id": JSON.parse(localStorage.userId),
            "product_id": Id,
            "sku_id": skId,
            "item_type": "ecommerce"
        }
        this.appService.addToWish(inData).subscribe(res => {
            console.log(res.json());
            swal(res.json().message, "", "success");
            //   this.getWish();
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
    dealData = [];
    skuData = [];
    skuArr = [];
    prodName;
    topOfrs = [];
    topsku = [];
    topArr = [];
    dealOfDay() {
        this.skuArr = [];
        this.appService.dealOfDay().subscribe(res => {
            this.dealData = res.json().data.deals_of_the_day;
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

        })
    }
    clothData = [];
    clothsku = [];
    clothArr = [];
    getCloth() {
        this.clothArr = [];
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
    jewelData = [];
    jewelArr = [];
    jewlsku = [];
    getJewel() {
        this.jewelArr = [];
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
    showProduxtDetails(prodId) {
        this.router.navigate(['/productdetails'], { queryParams: { prodId: prodId } });
    }
}
