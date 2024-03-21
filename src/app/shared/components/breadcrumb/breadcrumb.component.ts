import { Component, OnInit, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { MatButtonModule } from '@angular/material/button';

import { filter, map } from 'rxjs/operators';

import { Breadcrumb } from 'src/app/core/interfaces/breadcrumb.interface';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, TranslateModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  private readonly _route: Router = inject(Router);
  private readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  breadcrumbs: Breadcrumb[] = [];

  ngOnInit(): void {
    this._route.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.buildBreadcrumbs(this._activatedRoute.root)),
      )
      .subscribe((breadcrumbs) => {
        this.breadcrumbs = breadcrumbs;
      });
  }

  private buildBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = [],
  ): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');

      if (routeURL !== '') url += `/${routeURL}`;

      const label = child.snapshot.data['breadcrumb'] ?? '';
      const id = child.snapshot.paramMap.get('id');

      if (id != null && id != '' && label !== '')
        breadcrumbs.push({ label, url, id });
      else if (label !== '') breadcrumbs.push({ label, url });

      return this.buildBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
