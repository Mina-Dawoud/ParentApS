import { UtilitiesService } from './../../shared/utilities/utilities.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from '../user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  userForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private utilities: UtilitiesService) {
  }
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }
  onSubmit() {
    if (this.editMode) {
      this.userService.updateUser(this.id, this.userForm.value);
      this.utilities.showToast('User Data Updated Successfully', 'Update Message');
    } else {
      this.userService.addUser(this.userForm.value);
      this.utilities.showToast('User Added Successfully', 'Add Message');
    }
    this.onCancel();
  }
  initForm() {
    let user = new User();

    if (this.editMode) {
      user = this.userService.getUser(this.id);
    }
    this.userForm = new FormGroup({
      'firstName': new FormControl(user.firstName, Validators.required),
      'lastName': new FormControl(user.lastName, Validators.required),
      'imagePath': new FormControl(user.imagePath, Validators.required)
    });
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
