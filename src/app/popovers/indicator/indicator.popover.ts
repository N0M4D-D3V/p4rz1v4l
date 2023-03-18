import { Component, EventEmitter, Output } from "@angular/core";
import { AVAILABLE_INDICATORS } from "@common/available-indicator.list";
import { IndicatorInfo } from "@interfaces/indicator.interface";

@Component({
  selector: "app-indicator-popover",
  templateUrl: "./indicator.popover.html",
  styleUrls: ["./indicator.popover.scss"],
})
export class IndicatorPopoverComponent {
  @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();
  @Output() onSave: EventEmitter<void> = new EventEmitter<void>();

  public indicators: IndicatorInfo[] = AVAILABLE_INDICATORS;

  constructor() {}

  public onDeleteTouched(): void {
    this.onDelete.emit();
  }

  public onSaveTouched(): void {
    this.onSave.emit();
  }
}
