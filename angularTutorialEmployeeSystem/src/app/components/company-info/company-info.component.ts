import { Component, inject, OnInit } from '@angular/core';
import {
  NgbCarouselConfig,
  NgbCarouselModule,
} from '@ng-bootstrap/ng-bootstrap';
import { CompaniesService } from '../../services/companies.service';
import { Company } from '../../model/Company';
import { catchError, EMPTY, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

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
  companies$: Observable<Company[]> = EMPTY;

  ngOnInit(): void {
    this.carouselConfig.interval = 3000; // (ms)
    this.companies$ = this.companiesService.getAllCompanies().pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    );
  }
}
