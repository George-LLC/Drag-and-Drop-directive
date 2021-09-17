import {Directive, Output, EventEmitter, HostBinding, HostListener, NgModule} from '@angular/core';

@Directive({
  selector: '[appDragAndDrop]'
})
export class DragAndDropDirective {

  @Output() onfileDropped = new EventEmitter();

  constructor() { }



  @HostBinding('style.background-color') private background = '#f5fcff';
  @HostBinding('style.opacity') private opacity = '1';

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#9ecbec';
    this.opacity = '0.8';
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff';
    this.opacity = '1';
  }

  // Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff';
    this.opacity = '1';
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.onfileDropped.emit(files);
    }
  }

}

@NgModule({
  declarations: [ DragAndDropDirective ],
  exports: [ DragAndDropDirective ],
  providers: [DragAndDropDirective ]

})

export class DragAndDropDirectiveModule {}


/**  add the selector "appDragAndDrop", and the outputed event emitter "(onfileDropped)" in the tag where you want have a Drag and Drop functionality, as in the following example:

 HTML file
     <input #inputFile multiple type="file" (change)="onUploadFiles(inputFile.files)"
     style="display: none;" accept="image/png, image/jpeg"/>
     <button (click)="inputFile.click()" mat-raised-button appDragAndDrop
     (onfileDropped)="onUploadFiles($event)" mat-button class="button-add-new">
     <mat-icon>upload</mat-icon>
     Upload image here
     </button>

 TS file
     onUploadFiles(files) {
        this.isUploading = true;
        for (let i = 0; i < files.length; i++) {
          const element = files[i];
          let imgURL;
          const reader = new FileReader();
          reader.readAsDataURL(element);
          reader.onload = (_event) => {
            imgURL = reader.result;
            const saveImage: any = {
              title: element.name,
              url: imgURL,
              size: element.size,
              deleted: 0,
            };
            this.images.push(saveImage)
            this.isUploading = false;
          }
        }
      }
 */