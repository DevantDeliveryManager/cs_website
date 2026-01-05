import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactRequest, ContactService } from '../../../services/contact.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  formData: ContactRequest = {
    name: '',
    subject: 'Make An Appointment',
    email: '',
    phone: '',
    message: '',
  };

  submitting = false;
  submitError = '';
  submitSuccess = '';

  constructor(private readonly contactService: ContactService) {}

  onSubmit(form: NgForm): void {
    if (this.submitting) {
      return;
    }

    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.submitError = '';
    this.submitSuccess = '';

    this.contactService.submitContact(this.formData).subscribe({
      next: () => {
        this.submitSuccess = 'Appointment request sent!';
        this.formData = {
          name: '',
          subject: 'Make An Appointment',
          email: '',
          phone: '',
          message: '',
        };
        form.resetForm(this.formData);
        this.submitting = false;
      },
      error: () => {
        this.submitError = 'Unable to submit right now. Please try again.';
        this.submitting = false;
      },
      complete: () => {
        // handled above
      },
    });
  }
}
