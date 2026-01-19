import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../../../core/services/book.service';
import { Book } from '../../../../shared/models/book.model';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-form.html',
  styleUrls: ['./book-form.scss']
})
export class BookForm implements OnInit {
  bookForm!: FormGroup;
  isEditMode = false;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      publishedYear: [null, [Validators.required, Validators.min(0)]]
    });

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEditMode = true;
        this.id = +idParam;
        this.loadBook(this.id);
      }
    });
  }

  loadBook(id: number) {
    this.bookService.getById(id).subscribe(book => {
      this.bookForm.patchValue(book);
    });
  }

  onSubmit() {
    if (this.bookForm.invalid) return;

    const book: Book = this.bookForm.value;

    if (this.isEditMode && this.id) {
      this.bookService.update(this.id, book).subscribe(() => this.router.navigate(['/books']));
    } else {
      this.bookService.create(book).subscribe(() => this.router.navigate(['/books']));
    }
  }

  onCancel() {
    this.router.navigate(['/books']);
  }
}
