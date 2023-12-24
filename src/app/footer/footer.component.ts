import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentDate: Date = new Date();
  copyrightOwner: string = 'Som Nath'; 
  ContactNumberOwner:string = '+91 98778-53057';
  ContactEmailOwner:string = 'Somnath1512@yahoo.com';
}
