import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../shared/models/user.model';
import { CommonModule } from '@angular/common';



@Component({
  standalone: true,
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.scss']
})
export class UserForm implements OnInit {

  userForm!: FormGroup;
  id: number | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.id = +idParam;
        this.isEditMode = true;
        this.loadUser(this.id);
      }
    });
  }

  initForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  loadUser(id: number) {
    this.userService.getById(id).subscribe(user => {
      this.userForm.patchValue(user);
    });
  }

  onSubmit() {
    if (this.userForm.invalid) return;

    const user: User = this.userForm.value;

    if (this.isEditMode && this.id) {
      this.userService.update(this.id, user).subscribe(() => {
        this.router.navigate(['/users']);
      });
    } else {
      this.userService.create(user).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
  }

  onCancel() {
    this.router.navigate(['/users']);
  }
}
