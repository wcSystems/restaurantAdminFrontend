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
import { ProviderService } from '../../../services/provider.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'smart-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {

 
  constructor(
    private providerService: ProviderService,
    private cdr: ChangeDetectorRef
  ) {
    this.sizeLayout = window.screen.height / 3;
  }

  categoryProductsList: any;
  completed: any = [];
  menusTF = false;
  productsList: any;
  sizeLayout: any;

 
  ngOnInit() {



    this.categoryProducts();
    this.getAllProduct();
    
  }

  categoryProducts() {
    this.providerService.categoryProducts()
      .subscribe((res: any) => {
        this.categoryProductsList = res.category_products;
        // console.log(this.categoryProductsList.length);
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


      if ( this.completed.find((i: { id: any; }) => i.id === event.container.data[event.currentIndex].id) ) {
        if (this.completed[event.currentIndex].min_quantity === 0) {
          this.completed[event.currentIndex].min_quantity = 1;
        }
        /* if (event.container.data[event.currentIndex].totalPago === undefined) {
          event.container.data[event.currentIndex].totalPago = event.container.data[event.currentIndex].price;
          event.container.data[event.currentIndex].quantity = 1;
          event.container.data[event.currentIndex].sale_order_id = this.comunitacionsOrderServices.saleOrderId;
          event.container.data[event.currentIndex].rest_menu_id = event.container.data[event.currentIndex].id;
        } */
        /* const customer = {
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
        }; */

        /* if (this.customerId === 0) {
          this.customerService.postCustomer(customer).subscribe((res: any) => {
            saleOrder.customer_id = res.data.customer.id;
            this.ordenService.updateOrderTable(saleOrder).subscribe((res2: any) => {
            });
          });
        } else {
          this.ordenService.updateOrderTable(saleOrder).subscribe((res: any) => {
          });
        } */

        // this.ordenService.postsaleOrderDetail(event.container.data[event.currentIndex]).subscribe((res: any) => {

        // });

      } /* else {
        this.ordenService.deleteSaleOrderDetail(event.container.data[event.currentIndex].id).subscribe((res: any) => { });
      } */
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
    return res;
  }

  getAllSubCategoryMenu(id) {
    const idCategory = {
      category_product_id: id
    };
    this.providerService.getAllSubCategoryProduct(idCategory).subscribe((res: any) => {
     if ((res.category_product).length === 0) {
        const item = {
          id
        };
        this.providerService.getAllCategoryProduct(item).subscribe((res2: any) => {
          if (res2 !== undefined) {
            this.categoryProductsList = res2.category_product;
            this.menusTF = true;
            // console.log(this.categoryProductsList);
            this.cdr.detectChanges();
          }
        });
      } else {
        this.categoryProductsList = res.category_product;
      }
    });
  }
  getAllProduct() {
    this.providerService.getAllProduct().subscribe((res: any) => {
      this.productsList = res.products;
    });
  }

  cantidad(p, i) {
    if ( this.categoryProductsList[i].min_quantity === 0 ) {
      this.categoryProductsList[i].min_quantity = 1;
    }
    switch (p) {
      case '+':
        this.categoryProductsList[i].min_quantity = this.categoryProductsList[i].min_quantity + 1;
        break;
      case '-':
        this.categoryProductsList[i].min_quantity = this.categoryProductsList[i].min_quantity - 1;
        break;
      default:
        break;
    }
    this.categoryProductsList[i].cantidadItem = this.categoryProductsList[i].min_quantity;
    this.categoryProductsList[i].totalPago = this.categoryProductsList[i].min_quantity * this.categoryProductsList[i].purchase_value;

    this.categoryProductsList[i].min_quantity = this.categoryProductsList[i].min_quantity;
  }
  

}
