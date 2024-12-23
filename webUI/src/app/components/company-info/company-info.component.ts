import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  NgbCarouselConfig,
  NgbCarouselModule,
} from '@ng-bootstrap/ng-bootstrap';
import { CompaniesService } from '../../services/companies.service';
import { Company } from '../../model/Company';
import { catchError, EMPTY, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-company-info',
  standalone: true,
  imports: [NgbCarouselModule,  CommonModule],
  templateUrl: './company-info.component.html',
  styleUrl: './company-info.component.scss',
  providers: [NgbCarouselConfig],
})
export class CompanyInfoComponent implements OnInit {
  private companiesService = inject(CompaniesService);
  private carouselConfig = inject(NgbCarouselConfig);
  private destroyRef = inject(DestroyRef);
  companies$: Observable<Company[]> = EMPTY;

  ngOnInit(): void {
    this.carouselConfig.interval = 3000; // (ms)
    this.companies$ = this.companiesService.getAllCompanies().pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    );
  }
}
