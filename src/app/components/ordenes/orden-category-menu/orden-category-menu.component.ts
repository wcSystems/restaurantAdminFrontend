import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  ElementRef
} from '@angular/core';

import { OrdenService } from '../../../services/orden.service';
import { CustomerService } from '../../../services/customer.service';
import { ResMenu } from '../../../models/res-menu.model';
import { BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { OrderService } from '../../../services/comunications/order.service';

@Component({
  selector: 'smart-orden-category-menu',
  templateUrl: './orden-category-menu.component.html',
  styleUrls: ['./orden-category-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdenCategoryMenuComponent implements OnInit {

  constructor(
    private ordenService: OrdenService,
    private customerService: CustomerService,
    private comunitacionsOrderServices: OrderService,
    public pComunitacionsOServices: OrderService,
    private modalService: BsModalService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) { }

  menusTF = false;
  vari: any;

  modalRef: BsModalRef;

  @ViewChild('paymentOrder', { static: false })
  paymentOrder: ElementRef;

  categoryMenuList: any;
  totalPagar: any;
  identityCard: any;
  firstname: any;
  lastname: any;
  phone: any;
  customerId: any;
  orderTipeId: any;
  comment: any;
  menuList: ResMenu[] = [];
  paymentMethodList: [];
  paymentMethodId: any;
  referencia: any;


  ngOnInit() {
    this.comunitacionsOrderServices.objObservable.subscribe(res => {
      this.identityCard = res.identityCard;
      this.firstname = res.firstname;
      this.lastname = res.lastname;
      this.phone = res.phone;
      this.customerId = res.customerId;
      this.orderTipeId = res.orderTipeId;
      this.comment = res.comment;
    });
    this.getAllCategoryMenu();
    this.getMenuAll();
    this.getPaymentMethodAll();
  }

  getAllCategoryMenu() {
    this.ordenService.getAllCategoryMenu().subscribe((res: any) => {
      this.menusTF = false;
      this.categoryMenuList = res.data.category_menu;
      this.categoryMenuList = (res.data.category_menu).filter(i => i.category_menu_id === null );
      this.cdr.detectChanges();
    });
  }

  getAllSubCategoryMenu(id) {
    const subMenu = {
      category_menu_id: id
    };
    this.ordenService.getAllSubCategoryMenu(subMenu).subscribe((res: any) => {
     if ((res.data.category_menu).length === 0) {
        const item = {
          id
        };
        this.ordenService.getAllMenuItem(item).subscribe((res2: any) => {
          if (res2.data !== undefined) {
            this.categoryMenuList = res2.data.rest_menu;
            this.menusTF = true;
            this.cdr.detectChanges();
          }
        });
      } else {
        this.categoryMenuList = res.data.category_menu;
      }
    });
  }

  pagar() {
    const pago = {
      customer_id: this.comunitacionsOrderServices.customerId,
      date_payment: '2020-10-01',
      amount: this.totalPagar,
      reference_number: this.referencia,
      payment_method_id: this.paymentMethodId
    };
    this.ordenService.postPayment(pago).subscribe((res: any) => {
      this.modalRef.hide();
      console.log(res.data);
      this.router.navigate(['/ordenList']);
    });
  }

  getMenuAll() {
    this.ordenService.getMenuAll().subscribe((res: any) => {
      this.menuList = res.data.rest_menu;
      this.cdr.detectChanges();
    });
  }

  onDrop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      if ( this.comunitacionsOrderServices.completed.find((i: { id: any; }) => i.id === event.container.data[event.currentIndex].id) ) {
        if (event.container.data[event.currentIndex].cantidadItem === undefined) {
          event.container.data[event.currentIndex].cantidadItem = 1;
          event.container.data[event.currentIndex].quantity = 1;
          event.container.data[event.currentIndex].sale_order_id = this.comunitacionsOrderServices.saleOrderId;
          event.container.data[event.currentIndex].rest_menu_id = event.container.data[event.currentIndex].id;
        }
        if (event.container.data[event.currentIndex].totalPago === undefined) {
          event.container.data[event.currentIndex].totalPago = event.container.data[event.currentIndex].price;
          event.container.data[event.currentIndex].quantity = 1;
          event.container.data[event.currentIndex].sale_order_id = this.comunitacionsOrderServices.saleOrderId;
          event.container.data[event.currentIndex].rest_menu_id = event.container.data[event.currentIndex].id;
        }
        const customer = {
          identity_card: this.identityCard,
          firstname: this.firstname,
          lastname: this.lastname,
          phone: this.phone
        };
        const saleOrder = {
          id: this.comunitacionsOrderServices.saleOrderId,
          status_order_id: 1,
          customer_id: this.customerId,
          comment: this.comment,
          order_type_id: this.orderTipeId
        };

        if (this.customerId === 0) {
          this.customerService.postCustomer(customer).subscribe((res: any) => {
            saleOrder.customer_id = res.data.customer.id;
            this.ordenService.updateOrderTable(saleOrder).subscribe((res2: any) => {
            });
          });
        } else {
          this.ordenService.updateOrderTable(saleOrder).subscribe((res: any) => {
          });
        }

        this.ordenService.postsaleOrderDetail(event.container.data[event.currentIndex]).subscribe((res: any) => {

        });

      } else {
        this.ordenService.deleteSaleOrderDetail(event.container.data[event.currentIndex].id).subscribe((res: any) => { });
      }
    }
    this.cdr.detectChanges();
  }

  eject(valor, method) {
    const saleOrder = {
      id: this.comunitacionsOrderServices.saleOrderId,
      status_order_id: valor,
      customer_id: this.customerId,
      comment: this.comment,
      order_type_id: this.orderTipeId
    };
    switch (method) {
      case 'pagar':
        this.modalRef = this.modalService.show(this.paymentOrder);
        break;
      case 'anular':
          this.ordenService.updateOrderTable(saleOrder).subscribe((res: any) => {
            this.router.navigate(['/ordenList']);
            console.log(res.data);
          });
          break;
      default:
        break;
    }
  }

  total(req) {
    let res: any = 0;
    if (req.obj) {
      const obj = req.obj;
      obj.forEach((element) => {
        res = res + (element[req.n1] * element[req.n2] );
      });
    }
    this.totalPagar = '$ ' + res;
    return res;
  }

  getPaymentMethodAll() {
    this.ordenService.getPaymentMethodAll().subscribe((res: any) => {
      this.paymentMethodList = res.data.payment_methods;
    });
  }


  cantidad(p, i) {
    switch (p) {
      case '+':
        this.categoryMenuList[i].order_restriction_id = this.categoryMenuList[i].order_restriction_id + 1;
        break;
      case '-':
        this.categoryMenuList[i].order_restriction_id = this.categoryMenuList[i].order_restriction_id - 1;
        break;
      default:
        break;
    }
    this.categoryMenuList[i].cantidadItem = this.categoryMenuList[i].order_restriction_id;
    this.categoryMenuList[i].totalPago = this.categoryMenuList[i].order_restriction_id * this.categoryMenuList[i].price;

    this.categoryMenuList[i].quantity = this.categoryMenuList[i].order_restriction_id;
    this.categoryMenuList[i].sale_order_id = this.comunitacionsOrderServices.saleOrderId;
    this.categoryMenuList[i].rest_menu_id = this.categoryMenuList[i].id;
  }







}
