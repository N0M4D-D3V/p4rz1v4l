import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy,
  Input,
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
  @Input() editableIndicator: IndicatorInfo;

  @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();
  @Output() onSave: EventEmitter<IndicatorInfo> =
    new EventEmitter<IndicatorInfo>();

  private subForm: Subscription;
  private subIndicatorName: Subscription;

  public indicators: IndicatorInfo[] = AVAILABLE_INDICATORS;
  public configVariables: string[];
  public form: FormGroup;

  public get config() {
    return this.form.get("config") as FormArray;
  }

  public isValid: boolean;

  constructor(
    private readonly fb: FormBuilder,
    private readonly indicatorFactory: IndicatorFactory
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.initFormSubscriptions();
  }

  private initFormSubscriptions(): void {
    this.subIndicatorName = this.form
      .get("indicatorName")
      .valueChanges.subscribe((changes: string) =>
        this.onIndicatorNameChange(changes)
      );

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
      provisionalID: this.editableIndicator?.provisionalID || undefined,
      name: name,
      symbol: formValue.indicatorName,
      operationType: formValue.operationType,
      config: config,
    };

    this.onSave.emit(response);
  }

  private onIndicatorNameChange(symbol: string): void {
    if (symbol) {
      this.configVariables = [];
      this.configVariables = this.indicatorFactory.getKeysBySymbol(symbol);

      this.resetConfig();
      this.configVariables.forEach(() => this.addConfig());
    }
  }

  private createForm(): void {
    if (this.editableIndicator) this.createFilledForm();
    else this.createEmptyForm();
  }

  private createFilledForm(): void {
    //set form
    this.form = this.fb.group({
      indicatorName: [this.editableIndicator?.symbol, Validators.required],
      operationType: [
        this.editableIndicator?.operationType,
        Validators.required,
      ],
      config: this.fb.array([]),
    });

    //disable indicator name
    this.form.controls["indicatorName"].disable();

    //get the keys
    this.configVariables = this.indicatorFactory.getKeysBySymbol(
      this.editableIndicator?.symbol
    );

    //set the variables and their values
    this.editableIndicator.config.forEach((option: IndicatorOption) => {
      this.addConfig(option.value);
    });
  }

  private createEmptyForm(): void {
    this.form = this.fb.group({
      indicatorName: ["", Validators.required],
      operationType: ["", Validators.required],
      config: this.fb.array([]),
    });
  }

  private addConfig(value?: number): void {
    this.config.push(this.fb.control(value || null, Validators.required));
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
