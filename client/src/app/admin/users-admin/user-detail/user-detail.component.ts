import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { AdminService } from 'src/app/core/services/admin.service';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user : User;
  orders = [];
 constructor(private route: ActivatedRoute,private adminService: AdminService,private orderService:OrderService) { 
  
   }
 ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  console.log(id);
  
   this.adminService.getUserById(id).subscribe(rep => {
     this.orderService.getOrdersByUser(id).subscribe((rep)=>{
       this.orders = rep;
     })
     this.user= rep
    });
  
   
 }
 }

    
    


    

