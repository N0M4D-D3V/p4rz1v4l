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

  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() onDelete: EventEmitter<IndicatorInfo> =
    new EventEmitter<IndicatorInfo>();
  @Output() onSave: EventEmitter<IndicatorInfo> =
    new EventEmitter<IndicatorInfo>();

  private subForm: Subscription;
  private subFormSymbol: Subscription;

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
    this.subFormSymbol = this.form
      .get("symbol")
      .valueChanges.subscribe((changes: string) =>
        this.onSymbolChange(changes)
      );

    this.subForm = this.form.valueChanges.subscribe(() => {
      this.isValid = this.form.valid;
    });
  }

  public onCloseTouched(): void {
    this.onClose.emit();
  }

  public onDeleteTouched(): void {
    this.onDelete.emit(this.editableIndicator);
  }

  public onSaveTouched(): void {
    const formValue = this.form.value;

    //format config
    const config = formValue.config?.map((value: number, index: number) => {
      const json = `{"variable": "${this.configVariables[index]}", "value": ${value}}`;
      return JSON.parse(json) as IndicatorOption;
    });

    //find the complete name of the indicator
    const name: string = this.editableIndicator?.name
      ? this.editableIndicator?.name
      : this.indicators.find(
          (ind: IndicatorInfo) => ind?.symbol === formValue.symbol
        )?.name;

    //build response
    const response: IndicatorInfo = {
      provisionalID: this.editableIndicator?.provisionalID || undefined,
      name: name,
      symbol: formValue.symbol,
      operationType: formValue.operationType,
      config: config,
    };

    this.onSave.emit(response);
  }

  private onSymbolChange(symbol: string): void {
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
      symbol: [this.editableIndicator.symbol],
      operationType: [
        this.editableIndicator?.operationType,
        Validators.required,
      ],
      config: this.fb.array([]),
    });

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
      symbol: ["", Validators.required],
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
  }

  ngOnDestroy(): void {
    this.subFormSymbol.unsubscribe();
    this.subForm.unsubscribe();
  }
}
