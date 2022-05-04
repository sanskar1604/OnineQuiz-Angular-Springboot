import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

   categories=[
     {
      cid:'',
       title:'',
       description:''
     }
    
   ];
   categoryId={
     id:''
   }


  constructor(private _category:CategoryService,private snack:MatSnackBar) { }

  ngOnInit(): void {
    this._category.categories().subscribe((data:any)=>{
      this.categories=data;
      console.log(this.categories); 

    },
    (error)=>{
      console.log(error);
      Swal.fire("Error !! ","Error in loading data","error");
    }
    );
    
  }
  // deleteCategory(cid:any){
  //   console.log("category id :"+this.categoryId.id);
  //  this._category.deleteCategory(cid).subscribe(
  //    (data:any)=>{
  //      Swal.fire('success','error in deleting quiz','success');
  //    },
  //    (error)=>{
  //      Swal.fire('error','error in deleting quiz','error');
  //    }
  //  )

  // }

  
  deleteCategory(cid:any){
   console.log("category id :"+this.categoryId.id);
   Swal.fire({
    title: 'Do you want to save the changes?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Yes',
    denyButtonText: 'No',
    customClass: {
      actions: 'my-actions',
      cancelButton: 'order-1 right-gap',
      confirmButton: 'order-2',
      denyButton: 'order-3',
    }
  }).then((result) => {
    if (result.isConfirmed) {
        this._category.deleteCategory(cid).subscribe(
      
        (data)=>{
          
          console.log(data)
          // alert('sucess');
        },
        (error)=>{
          console.log(error);
          // alert('somthing went wrong');
          Swal.fire("Error !! ","Error in loading data","error");
          this.snack.open('something went wrong ','',{duration:3000})
        }
      )
      Swal.fire('Deleted !', '', 'success')
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  }
  )
    // Swal.fire("Error !! ","Error in loading data","error");
  }
}
