import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { iCourseInfo, iQualificationInfo } from '../../model/interface/courseinfo';
import { COURSE_INFO_TABLE_HEADERS, COURSE_API_URL } from '../../constant/Constant';
import { AuthService } from '../../services/guards/auth-guard.service';
import { CourseInfoService } from '../../services/course-info.service';

@Component({
  selector: 'app-course-info',
  imports: [CommonModule, RouterModule],
  templateUrl: './course-info.component.html',
  styleUrl: './course-info.component.scss'
})
export class CourseInfoComponent {

  tableHeaders = COURSE_INFO_TABLE_HEADERS;
  qualifications: iQualificationInfo[] = [];
  expandedCourse: string | null = null;
   downloadurl = `${COURSE_API_URL}/download?key=courseinfo-documents/`;
  router = inject(Router);

  toggle(code: string): void {
    this.expandedCourse = this.expandedCourse === code ? null : code;
  }
  
  constructor(
    private courseInfoService: CourseInfoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.currentUser;

    if (user?.userId) {
      this.courseInfoService.getQualificationInfo().subscribe((data: iQualificationInfo[]) => {
        this.qualifications = data;
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
