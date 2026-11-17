import { Component, input } from '@angular/core';

@Component({
  selector: 'app-local-notes',
  templateUrl: './local-notes.html',
  styleUrl: './local-notes.css',
})
export class LocalNotes {
  readonly notes = input.required<string[]>();
}
