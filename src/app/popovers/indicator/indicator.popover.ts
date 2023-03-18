import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { AVAILABLE_INDICATORS } from "@common/available-indicator.list";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  IndicatorInfo,
  IndicatorOption,
} from "@interfaces/indicator.interface";
import { IndicatorFactory } from "@services/factory/indicator-factory/indicator-factory.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-indicator-popover",
  templateUrl: "./indicator.popover.html",
  styleUrls: ["./indicator.popover.scss"],
})
export class IndicatorPopoverComponent implements OnInit, OnDestroy {
  @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();
  @Output() onSave: EventEmitter<IndicatorInfo> =
    new EventEmitter<IndicatorInfo>();

  private subForm: Subscription;
  private subIndicatorName: Subscription;

  public indicators: IndicatorInfo[] = AVAILABLE_INDICATORS;
  public configVariables: string[];
  public form: FormGroup = this.fb.group({
    indicatorName: ["", Validators.required],
    operationType: ["", Validators.required],
    config: this.fb.array([]),
  });

  public get config() {
    return this.form.get("config") as FormArray;
  }

  public isValid: boolean;

  constructor(
    private readonly fb: FormBuilder,
    private readonly indicatorFactory: IndicatorFactory
  ) {}

  ngOnInit(): void {
    this.subIndicatorName = this.form
      .get("indicatorName")
      .valueChanges.subscribe((changes: string) => {
        if (changes) {
          this.configVariables = [];
          this.configVariables = this.indicatorFactory.getKeysBySymbol(changes);

          this.resetConfig();
          this.configVariables.forEach((key) => this.addConfig(key));
        }
      });

    this.subForm = this.form.valueChanges.subscribe(() => {
      this.isValid = this.form.valid;
    });
  }

  public onDeleteTouched(): void {
    this.onDelete.emit();
  }

  public onSaveTouched(): void {
    const formValue = this.form.value;

    //format config
    const config = formValue.config?.map((value: number, index: number) => {
      const json = `{"variable": "${this.configVariables[index]}", "value": ${value}}`;
      return JSON.parse(json) as IndicatorOption;
    });

    //find the complete name of the indicator
    const name: string = this.indicators.find(
      (ind: IndicatorInfo) => ind?.symbol === formValue.indicatorName
    )?.name;

    //build response
    const response: IndicatorInfo = {
      name: name,
      symbol: formValue.indicatorName,
      operationType: formValue.operationType,
      config: config,
    };

    this.onSave.emit(response);
  }

  private addConfig(key: string): void {
    this.config.push(this.fb.control(key, Validators.required));
  }

  private resetConfig(): void {
    for (let index = 0; index < this.config.length; index++)
      this.config.removeAt(index);

    this.config.reset();
  }

  ngOnDestroy(): void {
    this.subIndicatorName.unsubscribe();
    this.subForm.unsubscribe();
  }
}
