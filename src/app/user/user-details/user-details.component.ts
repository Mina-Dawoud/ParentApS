import { UtilitiesService } from './../../shared/utilities/utilities.service';
import { ModalComponent } from './../../shared/components/modal/modal.component';
import { UserService } from './../user.service';
import { User } from './../user.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  currentUser: User;
  id: number;
  showSpinner: boolean;
  @ViewChild('modal') modal: ModalComponent;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private utilities: UtilitiesService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.currentUser = this.userService.getUser(this.id);
      }
    );
  }
  onEditUser() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  onDeleteUser() {
    this.modal.hide();
    this.showSpinner = true;
    this.userService.deleteUser(this.id).subscribe(() => {
      this.utilities.showToast('User Deleted Successfully', 'Delete Message');
      this.router.navigate(['../'], { relativeTo: this.route });
      this.showSpinner = false;
    });
  }

}
