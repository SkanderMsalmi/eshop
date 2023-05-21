import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
   user : User;
   orders = [];

  constructor(private route: ActivatedRoute,private adminService: AdminService) { 
   
    }

  ngOnInit(): void {
    
    this.adminService.getUserById("645d064566b3b09f13f39a11").subscribe(rep => {
      this.user= rep

      
      
     });

    this.orders = [
      {
        id: 'e5dcdfsf',
        orderBy: 'Dean Lynch',
        productId: 'cdfsfe5d',
        created: '25.05.2021, 10:00',
        status: 'complated',
        price: 2145.0
      },
      {
        id: 'e5dcdfsf',
        orderBy: 'Lynch Dean',
        productId: 'cdfsfe5d',
        created: '25.05.2021, 10:00',
        status: 'pending',
        price: 2145.0
      },
      {
        id: 'e5dcdfsf',
        orderBy: 'Lynch Dean',
        productId: 'cdfsfe5d',
        created: '25.05.2021, 10:00',
        status: 'rejected',
        price: 2145.0
      },
      {
        id: 'e5dcdfsf',
        orderBy: 'Dean Lynch',
        productId: 'cdfsfe5d',
        created: '25.05.2021, 10:00',
        status: 'initialized',
        price: 2145.0
      },
      {
        id: 'e5dcdfsf',
        orderBy: 'Dean Lynch',
        productId: 'cdfsfe5d',
        created: '25.05.2021, 10:00',
        status: 'complated',
        price: 2145.0
      },
      {
        id: 'e5dcdfsf',
        orderBy: 'Lynch Dean',
        productId: 'cdfsfe5d',
        created: '25.05.2021, 10:00',
        status: 'pending',
        price: 2145.0
      },
      {
        id: 'e5dcdfsf',
        orderBy: 'Lynch Dean',
        productId: 'cdfsfe5d',
        created: '25.05.2021, 10:00',
        status: 'rejected',
        price: 2145.0
      },
      {
        id: 'e5dcdfsf',
        orderBy: 'Dean Lynch',
        productId: 'cdfsfe5d',
        created: '25.05.2021, 10:00',
        status: 'initialized',
        price: 2145.0
      },
      {
        id: 'e5dcdfsf',
        orderBy: 'Dean Lynch',
        productId: 'cdfsfe5d',
        created: '25.05.2021, 10:00',
        status: 'complated',
        price: 2145.0
      }
    ];
    console.log(this.orders);
    
  }
  }


    

