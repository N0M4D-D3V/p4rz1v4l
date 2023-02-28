import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"],
})
export class ItemComponent {
  @Input() label: string;

  @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();
  @Output() onEdit: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  public onDeleteTouched(): void {
    this.onDelete.emit();
  }

  public onEditTouched(): void {
    this.onEdit.emit(this.label);
  }
}
