import { Component, Inject, OnInit } from '@angular/core';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CompaniesService } from '../../services/companies.service';
import { Company } from '../../model/Company';

@Component({
  selector: 'app-company-info',
  standalone: true,
  imports: [NgbCarouselModule],
  templateUrl: './company-info.component.html',
  styleUrl: './company-info.component.scss',
  providers: [NgbCarouselConfig]
})
export class CompanyInfoComponent implements OnInit {
  private companiesService: CompaniesService = Inject(CompaniesService);
  private carouselConfig: NgbCarouselConfig = Inject(NgbCarouselConfig);
  companiesList: Company[] = [];

  ngOnInit(): void {
    this.carouselConfig.interval = 3000; // (ms)
    this.companiesService.getAllCompanies().subscribe({
      next: (res) => {
        this.companiesList = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
