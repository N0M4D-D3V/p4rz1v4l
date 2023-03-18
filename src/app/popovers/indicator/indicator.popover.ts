import { Component, EventEmitter, Output, OnInit } from "@angular/core";
import { AVAILABLE_INDICATORS } from "@common/available-indicator.list";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IndicatorInfo } from "@interfaces/indicator.interface";
import { IndicatorFactory } from "@services/factory/indicator-factory/indicator-factory.service";

@Component({
  selector: "app-indicator-popover",
  templateUrl: "./indicator.popover.html",
  styleUrls: ["./indicator.popover.scss"],
})
export class IndicatorPopoverComponent implements OnInit {
  @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();
  @Output() onSave: EventEmitter<void> = new EventEmitter<void>();

  public indicators: IndicatorInfo[] = AVAILABLE_INDICATORS;
  public form: FormGroup = this.fb.group({
    indicatorName: ["", Validators.required],
    operationType: ["", Validators.required],
    config: this.fb.array([]),
  });

  public get config() {
    return this.form.get("config") as FormArray;
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly indicatorFactory: IndicatorFactory
  ) {}

  ngOnInit(): void {
    this.form.get("indicatorName").valueChanges.subscribe((changes: string) => {
      if (changes) {
        const keys: string[] = this.indicatorFactory.getKeysBySymbol(changes);

        this.resetConfig();
        keys.forEach((key) => this.addConfig(key));
      }
    });
  }

  public onDeleteTouched(): void {
    this.onDelete.emit();
  }

  public onSaveTouched(): void {
    this.onSave.emit();
  }

  private addConfig(key: string): void {
    if (key.toLowerCase() === "change") return;

    this.config.push(this.fb.control(key));
  }

  private resetConfig(): void {
    for (let index = 0; index < this.config.length; index++)
      this.config.removeAt(index);
  }
}
