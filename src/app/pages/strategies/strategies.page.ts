import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { EditStrategyModal } from "@modals/edit-strategy/edit-strategy.modal";
import { BsModalService } from "ngx-bootstrap/modal";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  AbstractControl,
} from "@angular/forms";
import { Strategy } from "@interfaces/strategies.interface";
import { DataModalSelectionService } from "@services/modals/data-modals";

let NAME_MODULE: string = "Estrategia ";

@Component({
  selector: "app-strategies",
  templateUrl: "./strategies.page.html",
  styleUrls: ["./strategies.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StrategiesPage implements OnInit {
  public strategyForm: FormGroup;

  public deleteButtonLiteral: string = "Eliminar";
  public addButtonLiteral: string = "Agregar estrategia";

  constructor(
    private readonly modalService: BsModalService,
    private strategySelectionService: DataModalSelectionService,
    private fb: FormBuilder
  ) {}

  get strategies(): FormArray {
    return this.strategyForm.get("strategies") as FormArray;
  }

  ngOnInit(): void {
    this.createStrategy();
  }

  private createStrategy(): void {
    this.strategyForm = this.fb.group({
      strategies: this.fb.array<Strategy>([]),
    });
  }

  public onStrategyTouched(index: number): void {
    const selectedStrategy = this.strategies.at(index).value;
    this.strategySelectionService.setSelectedDataModal(index, selectedStrategy);
    this.modalService.show(EditStrategyModal);
  }

  public trackByStrategy(index: number, strategy: AbstractControl) {
    return strategy.value;
  }

  public addStrategy(): void {
    const numberOfStrategies = this.strategies.length + 1;
    const newControl = this.fb.control(NAME_MODULE + numberOfStrategies);
    this.strategies.push(newControl);
  }

  public removeStrategy(control: AbstractControl): void {
    const index = this.strategies.controls.indexOf(control);
    this.strategies.removeAt(index);
    this.resetNumberStrategy(control);
  }

  private resetNumberStrategy(control: AbstractControl): void {
    const index = this.strategies.controls.indexOf(control);
    const lastIndex = this.strategies.length - 1;
    for (let i = index; i <= lastIndex; i++) {
      const numberOfStrategies = i + 1;
      const controlEvaluator = this.strategies.at(i);
      controlEvaluator.setValue(NAME_MODULE + numberOfStrategies);
    }
  }
}
