import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../shared/models/user.model';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter, Subscription } from 'rxjs';



@Component({
  standalone: true,
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.scss']
})
export class UserList implements OnInit {

  users: User[] = [];
  loading = false;
  error = '';
  private eventsSub!: Subscription;

  constructor(
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    
  }


ngOnDestroy() {
    this.eventsSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.loadUsers();
    // Gerencia a assinatura de eventos de rota para recarregar quando voltar a /users
    this.eventsSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects || event.url;
        if (url === '/users' || url === '/users/' || url.endsWith('/users')) {
          
          this.loadUsers();
        }
      });
  }


  loadUsers() {
    this.loading = true;
    this.error = '';

    this.userService.getAll().subscribe({
      next: (data) => {
      
        this.users = Array.isArray(data) ? data : [];
        
        this.loading = false;
      
        try { this.cdr.detectChanges(); } catch (e) { console.warn('detectChanges falhou:', e); }
      },
      error: (err) => {
        
        this.error = 'Erro ao carregar usuários';
        this.loading = false;
      }
    });
  }

  onEdit(user: User) {
    this.router.navigate(['/users', user.id, 'edit']);
  }

  onDelete(id: number) {
    if (confirm('Deseja excluir esse usuário?')) {
      this.userService.delete(id).subscribe(() => {
        this.loadUsers(); 
      });
    }
  }

  onCreate() {
    this.router.navigate(['/users/new']);
  }
}
