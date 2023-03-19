import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { EditBotModal } from "@modals/edit-bot/edit-bot.modal";
import { BsModalService } from "ngx-bootstrap/modal";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  AbstractControl,
  FormControl,
} from "@angular/forms";
import { Bot } from "@interfaces/bots.interface";
import { BotDetailService } from "@services/pages/bot/bot-page.service";
import { map } from "rxjs";
import {
  createFilteredSearch$,
  sortByLastModified,
} from "@components/search-bar/searchbar.component";
import { SearchBy } from "./config/interface";
import { DataTransferService } from "@services/modals/dara-transfer.service";

let NAME_MODULE: string = "Bot ";

@Component({
  selector: "app-bots",
  templateUrl: "./bots.page.html",
  styleUrls: ["./bots.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BotsPage implements OnInit, OnDestroy {
  public botForm: FormGroup;
  public searchControl = new FormControl("");
  public deleteButtonLiteral: string = "Eliminar";
  public addButtonLiteral: string = "Agregar bot";
  public searchBotInterface: Bot;
  public searchBy: Array<string> = SearchBy;

  constructor(
    private readonly modalService: BsModalService,
    private dataTransferService: DataTransferService<any>,
    private botDetailService: BotDetailService,
    private fb: FormBuilder
  ) {}

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

  public bots$ = this.botDetailService.bots$.pipe(
    map((bots) => bots.sort(sortByLastModified))
  );

  public filteredBots$ = createFilteredSearch$(
    this.bots$,
    this.searchControl,
    this.searchBy
  );

  public onBotTouched(index: number): void {
    const selectedBot = this.bot.at(index).value;
    this.dataTransferService.setSelectedDataModal({
      index: index,
      data: selectedBot,
    });
    this.modalService.show(EditBotModal);
  }

  public trackByBot(index: number, bot: AbstractControl) {
    return bot.value;
  }

  public addBot(): void {
    const numberOfBot = this.bot.length + 1;
    const newControl = this.fb.control(NAME_MODULE + numberOfBot);
    this.bot.push(newControl);
    const newBot = {
      id: numberOfBot,
      client: { name: NAME_MODULE + numberOfBot },
      total: 0,
      lastModified: new Date().toISOString(),
    };
    this.botDetailService.save(newBot).subscribe();
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

  ngOnDestroy(): void {
    this.dataTransferService.clear();
  }
}
