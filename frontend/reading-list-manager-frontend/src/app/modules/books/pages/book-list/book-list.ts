import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';

import { Book } from '../../../../shared/models/book.model';
import { BookService } from '../../../../core/services/book.service';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-list.html',
  styleUrls: ['./book-list.scss']
})
export class BookList {
  books: Book[] = [];
  loading = false;
  error = '';
  private eventsSub!: Subscription;

  constructor(private bookService: BookService, private router: Router, private cdr: ChangeDetectorRef) {
    this.loadBooks();

     this.eventsSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects || event.url;
        if (url === '/books' || url === '/books/' || url.endsWith('/books')) {
          
          this.loadBooks();
        }
      });
  }

  loadBooks() {
    this.loading = true;
    this.bookService.getAll().subscribe({
      next: (data) => {
        this.books = Array.isArray(data) ? data : [];
        this.loading = false;
        try { this.cdr.detectChanges(); } catch (e) { console.warn('detectChanges falhou:', e); }
      },
      error: () => {
        this.error = 'Erro ao carregar livros';
        this.loading = false;
      }
    });
  }

  
ngOnDestroy() {
    this.eventsSub?.unsubscribe();
  }

  onCreate() {
    this.router.navigate(['/books/new']);
  }

  onEdit(book: Book) {
    this.router.navigate(['/books', book.id, 'edit']);
  }

  onDelete(id: number) {
    if (confirm('Deseja excluir este livro?')) {
      this.bookService.delete(id).subscribe(() => this.loadBooks());
    }
  }
}
