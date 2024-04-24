import {
  Component,
  ContentChildren,
  ElementRef,
  QueryList,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { books } from './books';
import { ReusableTemplateComponent } from './reusable-template/reusable-template.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public rowData = [];
  public gridApi: any;
  public columnDefs = [];

  @ViewChild('authorList', { static: true }) authorList: TemplateRef<any>;

  public defaultColDef = {
    autoHeight: true,
    resizable: true,
  };

  public allBooksFormGroup: any;

  ngOnInit() {
    books.books.forEach((data) => {
      data.authors.forEach((author: any) => {
        author.isSelected = false;
      });
    });
    this.allBooksFormGroup = new FormGroup({
      allBooks: new FormArray(this.loadData()),
    });
    this.rowData = books.books;
    this.columnDefs = [
      {
        headerName: 'Book Type',
        field: 'type',
      },
      {
        headerName: 'Authors',
        editable: true,
        cellRendererFramework: ReusableTemplateComponent,
        cellRendererParams: {
          ngTemplate: this.authorList,
        },
      },
      {
        headerName: 'Books',
        cellRendererFramework: ReusableTemplateComponent,
        cellRendererParams: {
          ngTemplate: this.authorList,
        },
      },
    ];
  }

  loadData() {
    let data: any = [];
    books.books.forEach((item) => {
      data.push(
        new FormGroup({
          bookType: new FormControl(item.type),
          authorsList: new FormArray(this.loadAuthors(item.authors)),
        })
      );
    });
    return data;
  }

  loadBooks(bookList) {
    let data: any = [];
    bookList.forEach((book: any) => {
      data.push(
        new FormGroup({
          bookName: new FormControl(''),
          bookPrice: new FormControl(book.price),
        })
      );
    });
    return data;
  }

  loadAuthors(authors) {
    let data: any = [];
    authors.forEach((author: any) => {
      data.push(
        new FormGroup({
          authorName: new FormControl(author.name),
          isSelected: new FormControl(author.isSelected),
          bookList: new FormArray(this.loadBooks(author.books)),
        })
      );
    });

    return data;
  }

  changeAuthor(bookTypeIndex, selectedAuthor) {
    this.allBooksFormGroup
      .get('allBooks')
      .controls.forEach((control, controlIndex) => {
        if (controlIndex === bookTypeIndex) {
          control
            .get('authorsList')
            .controls.forEach((authControl, authControlIndex) => {
              authControl.value.authorName === selectedAuthor
                ? authControl.get('isSelected').patchValue(true)
                : authControl.get('isSelected').patchValue(false);
            });
        }
      });
  }

  canShow(bookTypeIndex, bookDetail) {
    let canShow = false;
    let selectedAuthor: any = {};
    let allBookDetails = this.allBooksFormGroup.get('allBooks').controls;
    allBookDetails.forEach((formGroup, formGroupIndex) => {
      if (formGroupIndex === bookTypeIndex) {
        selectedAuthor = formGroup
          .get('authorsList')
          .value.find((item) => item.isSelected);
      }
    });
    if (selectedAuthor) {
      canShow =
        Array.isArray(selectedAuthor.bookList) &&
        Array.isArray(bookDetail.value) &&
        selectedAuthor.bookList.length === bookDetail.value.length &&
        selectedAuthor.bookList.every(
          (val, index) => val === bookDetail.value[index]
        );
    }
    return canShow;
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  dataRendered(params) {
    params.api.sizeColumnsToFit();
  }
}
