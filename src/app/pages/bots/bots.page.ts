import { Component, OnInit } from "@angular/core";
import { EditBotModal } from "@modals/edit-bot/edit-bot.modal";
import { BsModalService } from "ngx-bootstrap/modal";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  AbstractControl,
} from "@angular/forms";
import { DataModalSelectionService } from "@services/modals/data-modals";
import { Bot } from "@interfaces/bots.interface";

let NAME_MODULE: string = "Bot ";

@Component({
  selector: "app-bots",
  templateUrl: "./bots.page.html",
  styleUrls: ["./bots.page.scss"],
})
export class BotsPage  implements OnInit {
  public botForm: FormGroup;

  public deleteButtonLiteral: string = "Eliminar";
  public addButtonLiteral: string = "Agregar bot";

  constructor(private readonly modalService: BsModalService,
    private botSelectionService: DataModalSelectionService,
    private fb: FormBuilder) {}

    get bot(): FormArray {
      return this.botForm.get("bots") as FormArray;
    }
  
    ngOnInit(): void {
      this.createBot();
    }
    private createBot(): void {
      this.botForm = this.fb.group({
        bots: this.fb.array<Bot>([]),
      });
    }

  public onBotTouched(index: number): void {
    const selectedBot = this.bot.at(index).value;
    this.botSelectionService.setSelectedDataModal(index, selectedBot);
    this.modalService.show(EditBotModal);
  }


  public trackByBot(index: number, bot: AbstractControl) {
    return bot.value;
  }

  public addBot(): void {
    const numberOfBot = this.bot.length + 1;
    const newControl = this.fb.control(NAME_MODULE + numberOfBot);
    this.bot.push(newControl);
  }

  public removeBot(control: AbstractControl): void {
    const index = this.bot.controls.indexOf(control);
    this.bot.removeAt(index);
    this.resetNumberBot(control);
  }

  private resetNumberBot(control: AbstractControl): void {
    const index = this.bot.controls.indexOf(control);
    const lastIndex = this.bot.length - 1;
    for (let i = index; i <= lastIndex; i++) {
      const numberOfBot = i + 1;
      const controlEvaluator = this.bot.at(i);
      controlEvaluator.setValue(NAME_MODULE + numberOfBot);
    }
  }
}