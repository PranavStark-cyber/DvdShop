import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ManagerService } from '../../../Services/Manager/manager.service';
import { CloudinaryServiceService } from '../../../Services/Storecloud/cloudinary-service.service';
import { Dvd, DvdRequest } from '../../modals/customer';
import { ToastrService } from 'ngx-toastr';
import { DVD } from '../../landingpage/landingpage.component';
import { RouterLink } from '@angular/router';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-dvds',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterLink,MatTableModule,MatPaginatorModule,MatSortModule,MatInputModule],
  templateUrl: './dvds.component.html',
  styleUrls: ['./dvds.component.css']
})
export class DvdsComponent implements OnInit {
  // @ViewChild('modal', { static: false }) modal: ModalDirective;
  dvdForm: FormGroup;
  imagePreview: string | null = null;
  dvds: Dvd[] = [];
  genres: any[] = [];
  directors: any[] = [];
  showAddModal = false;
  showAddGenre = false;
  showAddDirector = false;
  showDeletePopup: boolean = false;
  selectedDvdId: string | null = null;
  deleteForm: FormGroup;
  selectedDvd: any = null;
  DID?: string;

  displayedColumns: string[] = ['image', 'title', 'genre', 'director', 'releaseDate', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService, // Inject ToastrService
    private managerService: ManagerService,
    private cloudinaryService: CloudinaryServiceService
  ) {
    
    this.deleteForm = this.fb.group({
      deleteCount: [0, [Validators.required, Validators.min(1)]],
    });
    
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

    this.dvdForm = this.fb.group({
      title: ['', Validators.required],
      releaseDate: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
      totalCopies: ['', [Validators.required, Validators.min(1)]],
      genreId: [''],
      genreName: [''],
      directorId: [''],
      directorName: [''],
      directorDescription: [''],
    });
  }


  ngAfterViewInit() {
    // Initialize paginator for the table after view is initialized
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  clearForm(): void {
    this.dvdForm.reset();
    this.imagePreview = null;
    this.DID = undefined; 
  }
  

  loadDvds(): void {
    this.managerService.GetAllDvds().subscribe(
      (data) => {
        this.dvds = data;  // Set the dvds array to the fetched data
        this.dataSource.data = this.dvds;  // Bind the fetched data to the table dataSource
      },
      (error) => this.toastr.error('Failed to load DVDs.', 'Error')

    );
   

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


    const payload: DvdRequest = {
      title: formData.title,
      releaseDate: formData.releaseDate,
      price: formData.price,
      description: formData.description,
      imageUrl: formData.imageUrl,
      totalCopies: formData.totalCopies,
      ...(formData.genreId ? { genreId: formData.genreId } : { genreName: formData.genreName }),
      ...(formData.directorId
        ? { directorId: formData.directorId }
        : {
            directorName: formData.directorName,
            directorDescription: formData.directorDescription,
          }),
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


UpdateDvd(): void {
  if (this.dvdForm.valid) {
    const formData = this.dvdForm.value;

    
    const payload: DvdRequest = {
      title: formData.title,
      releaseDate: formData.releaseDate,
      price: formData.price,
      description: formData.description,
      imageUrl: formData.imageUrl,
      totalCopies: formData.totalCopies,
      ...(formData.genreId ? { genreId: formData.genreId } : { genreName: formData.genreName }),
      ...(formData.directorId
        ? { directorId: formData.directorId }
        : {
            directorName: formData.directorName,
            directorDescription: formData.directorDescription,
          }),
    };
   

    this.managerService.updateDvd(this.DID!,payload).subscribe(
      () => {
        this.toastr.success('DVD updated successfully!', 'Success');
     this.loadDvds();
      },
      (error) => this.toastr.error('Failed to update DVD.', 'Error')
    );
  } else {
    this.toastr.warning('Please fill out all required fields.', 'Warning');
  }
}


loadDvdForUpdate(dvdId: string): void {
  this.managerService.getDvdById(dvdId).subscribe(
    (dvdData) => {
      // Populate the form with the DVD data
      this.imagePreview = dvdData.imageUrl
      this.dvdForm.patchValue({
        title: dvdData.title,
        releaseDate: new Date(dvdData.releaseDate).toLocaleDateString('en-CA'),
        price: dvdData.price,
        description: dvdData.description,
        imageUrl: dvdData.imageUrl,
        genreId: dvdData.genreId,
        genreName: dvdData.genre.name,
        directorId: dvdData.directorId,
        directorName: dvdData.director.name,
        directorDescription: dvdData.director.decriptions,
      });
      // Set the DVD ID for updating
      this.DID = dvdId;
      this.toggleAddDvdModal();
    },
    (error) => {
      this.toastr.error('Failed to fetch DVD data.', 'Error');
    }
  );
}

    
  resetForm(): void {
    this.dvdForm.reset();
    this.imagePreview = null;
  }


  openDeletePopup(dvdId: string): void {
    this.selectedDvdId = dvdId;


    this.managerService.getDvdById(this.selectedDvdId).subscribe(
      (dvd) => {
        this.selectedDvd = dvd;  // Set the selected DVD data
        this.showDeletePopup = true;  // Show the popup
      },
      (error) => {
        this.toastr.error('Error fetching DVD details.', 'Error');
      }
    );
  }

  closeDeletePopup(): void {
    this.showDeletePopup = false;
    this.selectedDvdId = null;
    this.deleteForm.reset();

    this.showDeletePopup = false;
    this.selectedDvd = null;
    this.selectedDvdId = null;
  }

submitDelete(): void {
  if (this.deleteForm.valid && this.selectedDvdId) {
    const deleteCount = this.deleteForm.value.deleteCount;
    console.log(deleteCount);

 
    if (deleteCount <= 0) {
      this.toastr.warning('Please provide a valid quantity greater than zero.', 'Warning');
      return;
    }

 
    this.managerService.deleteDvd(this.selectedDvdId, deleteCount).subscribe(
      (response) => {
        this.toastr.success('DVD(s) deleted successfully!', 'Success');
        this.closeDeletePopup();
      },
      (error) => {
        console.error('Error deleting DVD:', error);
        this.toastr.error('Failed to delete DVD(s).', 'Error');
      }
    );
  } else {
    this.toastr.warning('Invalid form or no DVD selected.', 'Warning');
  }
}

  
  
}
