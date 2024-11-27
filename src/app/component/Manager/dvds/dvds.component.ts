import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ManagerService } from '../../../Services/Manager/manager.service';
import { CloudinaryServiceService } from '../../../Services/Storecloud/cloudinary-service.service';
import { Dvd, DvdRequest } from '../../modals/customer';
import { ToastrService } from 'ngx-toastr';
import { DVD } from '../../landingpage/landingpage.component';

@Component({
  selector: 'app-dvds',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dvds.component.html',
  styleUrls: ['./dvds.component.css']
})
export class DvdsComponent implements OnInit {
deleteDvd(arg0: string) {
throw new Error('Method not implemented.');
}
editDvd(_t16: Dvd) {
throw new Error('Method not implemented.');
}
  dvdForm: FormGroup;
  imagePreview: string | null = null;
  dvds: Dvd[] = [];
  genres: any[] = [];
  directors: any[] = [];
  showAddModal = false;
  showAddGenre = false;
  showAddDirector = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService, // Inject ToastrService
    private managerService: ManagerService,
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
    this.loadDvds();
    this.loadGenres();
    this.loadDirectors();
  }

  loadDvds(): void {
    this.managerService.GetAllDvds().subscribe(
      (data) => (this.dvds = data),
      (error) => this.toastr.error('Failed to load DVDs.', 'Error')

    );
    console.log(this.dvds);

  }

  loadGenres(): void {
    this.managerService.GetAllGenare().subscribe(
      (data) => (this.genres = data),
      (error) => this.toastr.error('Failed to load genres.', 'Error')
    );
  }

  loadDirectors(): void {
    this.managerService.GetAllDirector().subscribe(
      (data) => (this.directors = data),
      (error) => this.toastr.error('Failed to load directors.', 'Error')
    );
  }

  toggleAddDvdModal(): void {
    this.showAddModal = !this.showAddModal;
  }

  toggleAddGenre(): void {
    this.showAddGenre = !this.showAddGenre;
  }

  toggleAddDirector(): void {
    this.showAddDirector = !this.showAddDirector;
  }

  onGenreSelect(event: any): void {
    if (event.target.value) this.showAddGenre = false;
  }

  onDirectorSelect(event: any): void {
    if (event.target.value) this.showAddDirector = false;
  }

  triggerFileInput(): void {
    document.getElementById('imageUpload')?.click();
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
      console.log(formData);
      
  
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
      
      this.managerService.AddDvd(payload).subscribe(
        () => {
          this.toastr.success('DVD added successfully!', 'Success');
          
          this.loadDvds();
          this.toggleAddDvdModal();
        },
        (error) => this.toastr.error('Failed to add DVD.', 'Error')
      );
    } else {
      this.toastr.warning('Please fill out all required fields.', 'Warning');
    }
  }

    
  resetForm(): void {
    this.dvdForm.reset();
    this.imagePreview = null;
  }
  
}
