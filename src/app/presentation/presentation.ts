import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SoundService } from '../shared/services/sound.service';

@Component({
  selector: 'app-presentation',
  imports: [RouterModule],
  templateUrl: './presentation.html',
  styleUrl: './presentation.scss',
})
export class Presentation {
  constructor(public sound: SoundService) {}
}
