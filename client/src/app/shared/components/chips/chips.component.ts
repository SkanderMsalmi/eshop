import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { colors } from 'src/app/core/models/arrays';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent implements OnInit {
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  chipCtrl = new FormControl();
  filteredchips: Observable<string[]>;
  @Input() chips: string[];
  @Input() label: string;
  @Output() chipsOutput : EventEmitter<string[]> = new EventEmitter<string[]>();
  @Input() allchips: string[];

  @ViewChild('chipInput') chipInput: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredchips = this.chipCtrl.valueChanges.pipe(
        startWith(null),
        map((chip: string | null) => chip ? this._filter(chip) : this.allchips.slice()));
  }
  ngOnInit(){
  }

  add(event: MatChipInputEvent): void {
    console.log(event.value);
    
    const value = (event.value || '').trim();
    console.log(value);
    
    if (value) {
      this.chips.push(value);
      console.log("emitted");
      this.chipsOutput.emit(this.chips);
      
    }
    event.chipInput!.clear();

    this.chipCtrl.setValue(null);
  }

  remove(chip: string): void {
    const index = this.chips.indexOf(chip);

    if (index >= 0) {
      this.chips.splice(index, 1);
    }
    this.chipsOutput.emit(this.chips);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.chips.push(event.option.viewValue);
    this.chipInput.nativeElement.value = '';
    this.chipCtrl.setValue(null);
    this.chipsOutput.emit(this.chips);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allchips.filter(chip => chip.toLowerCase().includes(filterValue));
  }

}
