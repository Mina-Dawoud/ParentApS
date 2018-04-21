import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable()
export class UtilitiesService {

  constructor(private toastr: ToastrService) { }
  showToast(title: string, content: string) {
    this.toastr.clear();
    this.toastr.success(content, title);
  }
}
