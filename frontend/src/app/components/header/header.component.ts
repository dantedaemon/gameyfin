import {Component, Inject} from '@angular/core';
import {LibraryService} from "../../services/library.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import {timeInterval} from "rxjs";
import {Router} from "@angular/router";
import {GamesService} from "../../services/games.service";
import {ThemingService} from "../../services/theming.service";
import {DOCUMENT, Location} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  // Maybe bad practice? IDK, but I need to access the document from the template of this component
  document: Document = document;

  constructor(private libraryService: LibraryService,
              private gameService: GamesService,
              private themingService: ThemingService,
              private snackBar: MatSnackBar,
              private router: Router,
              private location: Location) {
  }

  scanLibrary(): void {
    this.libraryService.scanLibrary().pipe(timeInterval()).subscribe({
      next: value => {
        // Refresh the current page "angular style"
        this.router.navigate([this.router.url]).then(() =>
          this.snackBar.open(`Library scan completed in ${Math.trunc(value.interval / 1000)} seconds.`, undefined, {duration: 5000})
        )
      },
      error: error => this.snackBar.open(`Error while scanning library: ${error.error.message}`, undefined, {duration: 5000})
    })
    this.snackBar.open('Library scan started in the background. This could take some time.\nYou will get another notification once it\'s done', undefined, {duration: 5000})
  }

  reloadLibrary(): void {
    this.gameService.getAllGames(true).subscribe(() => this.router.navigate(['/library']));
  }

  goToLibraryScreen(): void {
    this.location.back();
  }

  goToLibraryManagementScreen(): void {
    this.router.navigate(['/library-management']);
  }

  onLibraryScreen(): boolean {
    return this.router.url === "/library";
  }

  onLibraryManagementScreen(): boolean {
    return this.router.url === "/library-management";
  }

  toggleTheme(): void {
    this.themingService.toggleTheme();
  }
}
