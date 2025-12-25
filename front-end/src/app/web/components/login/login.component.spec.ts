import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, CommonModule, LoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with email and password controls', () => {
    expect(component.form.contains('email')).toBeTrue();
    expect(component.form.contains('password')).toBeTrue();
  });

  it('should mark email as invalid if empty', () => {
    const emailControl = component.form.get('email');
    emailControl?.setValue('');
    expect(emailControl?.errors?.['required']).toBeTruthy();
  });

  it('should invalidate incorrect email format', fakeAsync(() => {
    const emailControl = component.form.get('email');
    emailControl?.setValue('wrong-email');
    tick(); // resolve async validator
    fixture.detectChanges();
    expect(emailControl?.errors?.['invalidEmail']).toBeTrue();
  }));

  it('should validate correct email format', fakeAsync(() => {
    const emailControl = component.form.get('email');
    emailControl?.setValue('test@example.com');
    tick();
    fixture.detectChanges();
    expect(emailControl?.errors).toBeNull();
  }));

  it('should mark password as required if empty', () => {
    const passwordControl = component.form.get('password');
    passwordControl?.setValue('');
    expect(passwordControl?.errors?.['required']).toBeTruthy();
  });

  it('should invalidate weak password', fakeAsync(() => {
    const passwordControl = component.form.get('password');
    passwordControl?.setValue('weakpass'); // no number or special char
    tick();
    fixture.detectChanges();
    expect(passwordControl?.errors?.['invalidPassword']).toBeTrue();
  }));

  it('should validate strong password', fakeAsync(() => {
    const passwordControl = component.form.get('password');
    passwordControl?.setValue('Strong@123');
    tick();
    fixture.detectChanges();
    expect(passwordControl?.errors).toBeNull();
  }));

  it('should have invalid form if email or password is incorrect', fakeAsync(() => {
    component.form.get('email')?.setValue('invalid');
    component.form.get('password')?.setValue('weak');
    tick();
    fixture.detectChanges();
    expect(component.form.valid).toBeFalse();
  }));

  it('should have valid form if email and password are correct', fakeAsync(() => {
    component.form.get('email')?.setValue('test@example.com');
    component.form.get('password')?.setValue('Strong@123');
    tick();
    fixture.detectChanges();
    expect(component.form.valid).toBeTrue();
  }));
});
