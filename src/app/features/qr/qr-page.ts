import { Component } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';
import { SITE_CONFIG } from '../../core/config/site.config';

@Component({
  selector: 'app-qr-page',
  imports: [QRCodeComponent],
  templateUrl: './qr-page.html',
  styleUrl: './qr-page.css',
})
export class QrPage {
  protected readonly menuUrl = SITE_CONFIG.menuUrl || window.location.origin;

  protected print(): void {
    window.print();
  }
}
