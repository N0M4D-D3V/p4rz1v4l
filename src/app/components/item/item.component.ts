import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IndicatorInfo } from "@interfaces/indicator.interface";
import { NgbPopover } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"],
})
export class ItemComponent<T> {
  @Input() item: IndicatorInfo;

  @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();
  @Output() onEdit: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  public onDeleteTouched(): void {
    this.onDelete.emit();
  }

  public onEditTouched(popover: NgbPopover): void {
    popover.open(this.item);
    // this.onEdit.emit(this.label);
  }
}
