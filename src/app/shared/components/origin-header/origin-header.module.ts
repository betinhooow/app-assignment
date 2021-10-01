import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { OriginHeaderComponent } from './origin-header.component';

@NgModule({
  declarations: [OriginHeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
  exports: [OriginHeaderComponent]
})
export class OriginHeaderModule {}
