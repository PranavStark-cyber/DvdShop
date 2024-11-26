import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ManagerService } from '../../../Services/Manager/manager.service';
import { CloudinaryServiceService } from '../../../Services/Storecloud/cloudinary-service.service';
import { DvdRequest } from '../../modals/customer';

@Component({
  selector: 'app-dvds',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dvds.component.html',
  styleUrls: ['./dvds.component.css']
})
export class DvdsComponent implements OnInit {
  dvdForm: FormGroup;
  imagePreview: string | null = null;
  genres: any = [];
  directors: any = [];
  showAddGenre = false;
  showAddDirector = false;
  
  constructor(
    private fb: FormBuilder,
    private managerservices: ManagerService,
    private cloudinaryService: CloudinaryServiceService
  ) {
    this.dvdForm = this.fb.group({
      title: ['', Validators.required],
      genreId: [null],  
      genreName: [null],  
      directorId: [null],  
      directorName: [null], 
      directorDescription: [null],  
      releaseDate: ['', Validators.required],
      price: [0, Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      imageUrl: ['', Validators.required], // Store the uploaded image URL
      totalCopies: [0, Validators.required]
    });
  }
  
  ngOnInit(): void {
    this.fetchGenres();
    this.fetchDirectors();
  }
  
  fetchGenres() {
    this.managerservices.GetAllGenare().subscribe({
      next: (data: any) => {
        this.genres = data;
      },
      error: (err) => {
        console.error('Error fetching genres:', err);
      }
    });
  }
  
  fetchDirectors() {
    this.managerservices.GetAllDirector().subscribe({
      next: (data: any) => {
        this.directors = data; 
      },
      error: (err) => {
        console.error('Error fetching directors:', err);
      }
    });
  }
  
  toggleAddGenre() {
    this.showAddGenre = !this.showAddGenre;
    this.dvdForm.patchValue({ genreId: null }); 
  }
  
  toggleAddDirector() {
    this.showAddDirector = !this.showAddDirector;
    this.dvdForm.patchValue({ directorId: null }); 
  }
  
  onGenreSelect(event: any) {
    const selectedGenreId = event.target.value;
    if (selectedGenreId) {
      this.showAddGenre = false;
      this.dvdForm.patchValue({ genreName: null }); 
    }
  }
  
  onDirectorSelect(event: any) {
    const selectedDirectorId = event.target.value;
    if (selectedDirectorId) {
      this.showAddDirector = false;  
      this.dvdForm.patchValue({ directorName: null, directorDescription: null }); 
    }
  }
  
  triggerFileInput(): void {
    const fileInput = document.getElementById('imageUpload') as HTMLInputElement;
    if (fileInput) {
      fileInput.click(); 
    }
  }
  
  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
  
      this.cloudinaryService.uploadImage(file).subscribe({
        next: (response: any) => {
          this.dvdForm.patchValue({ imageUrl: response.secure_url }); 
          console.log('Image uploaded:', response.secure_url);
        },
        error: (err) => {
          console.error('Image upload failed:', err);
        },
      });
    }
  }
  
  Dvdadd(): void {
    if (this.dvdForm.valid) {
      const formData = this.dvdForm.value;
  
      // Prepare payload for backend
      const payload: DvdRequest = {
        title: formData.title,
        genreName: formData.genreId ? null : formData.genreName,
        directorName: formData.directorId ? null : formData.directorName,
        directorDescription: formData.directorDescription,
        releaseDate: formData.releaseDate,
        price: formData.price,
        description: formData.description,
        imageUrl: formData.imageUrl,
        totalCopies: formData.totalCopies,
      };
  
      this.managerservices.AddDvd(payload).subscribe({
        next: (response) => {
          console.log('DVD submitted successfully:', response);
          this.resetForm();
        },
        error: (err) => {
          console.error('Error submitting DVD:', err);
        },
      });
    }
  }
  
  
  resetForm(): void {
    this.dvdForm.reset();
    this.imagePreview = null;
  }
  
}
