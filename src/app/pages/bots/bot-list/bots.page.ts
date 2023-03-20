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
import { map, tap } from "rxjs";
import {
  createFilteredSearch$,
  sortByLastModified,
} from "@components/search-bar/searchbar.component";
import { SearchBy } from "./config/interface";
import { DataTransferService } from "@services/modals/data-transfer.service";
import { BotDetail } from "@interfaces/bot-detail.interface";
import { BehaviorSubject } from "rxjs";
import { Observable } from "rxjs";

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
  private botsSubject = new BehaviorSubject<any[]>([]);
  public searchStarted = false;

  constructor(
    private readonly modalService: BsModalService,
    private dataTransferService: DataTransferService<any>,
    private botDetailService: BotDetailService,
    private fb: FormBuilder
  ) {}

  get bot(): FormArray {
    return this.botForm.get("bots") as FormArray;
  }

  public ngOnInit(): void {
    this.createBotForm();
    this.searchControl.valueChanges.subscribe(() => {
      this.searchStarted = true;
    });
  }

  public onSearchBlur(): void {
    this.searchStarted = false;
  }

  private createBotForm(): void{
    const sortedBots$ = this.getSortedBots$();
    this.createSortedBotForm(sortedBots$);
  }

  private getSortedBots$(): Observable<BotDetail[]> {
    return this.botDetailService.bots$.pipe(
      map((bots) => bots.sort(sortByLastModified)),
      tap((bots) => this.botsSubject.next(bots))
    );
  }
  
  private createSortedBotForm(bots$: Observable<BotDetail[]>): void {
    bots$.subscribe((bots) => {
      this.botForm = this.fb.group({
        bots: this.fb.array(
          bots.map((bot) =>
            this.fb.group({
              id: [bot.id],
              client: this.fb.group({
                name: [bot.client.name],
              }),
              total: [bot.total],
              lastModified: [bot.lastModified],
            })
          )
        ),
      });
    });
  }

  public bots$ = this.botDetailService.bots$.pipe(
    map((bots) => bots.sort(sortByLastModified))
  );

  public filteredBots$ = createFilteredSearch$(
    this.bots$,
    this.searchControl,
    this.searchBy
  )

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

  public isBotVisible(filteredBots: any[], bot: any): boolean {
    return (
      !filteredBots ||
      filteredBots.some((filteredBot) => filteredBot.id === bot.value.id)
    );
  }

  public addBot(): void {
    const numberOfBot = this.bot.length + 1;
    const newBot = {
      id: numberOfBot,
      client: { name: NAME_MODULE + numberOfBot },
      total: 0,
      lastModified: new Date().toISOString(),
    };
    const newControl = this.fb.control(newBot);
    this.bot.push(newControl);
    this.botDetailService.save(newBot).subscribe();
    this.updateFilteredBots();
  }

  public removeBot(control: AbstractControl): void {
    const index = this.bot?.controls?.indexOf(control);
    this.bot?.removeAt(index);
    this.resetNumberBot(control);
    this.updateFilteredBots();
  }

  private updateFilteredBots(): void {
    this.botsSubject.next(this.bot.controls.map((control) => control.value));
  }

  private resetNumberBot(control: AbstractControl): void {
    const index = this.bot?.controls?.indexOf(control);
    const lastIndex = this.bot?.length - 1;
    for (let i = index; i <= lastIndex; i++) {
      const numberOfBot = i + 1;
      const controlEvaluator = this.bot?.at(i);
      controlEvaluator?.get('id')?.setValue(numberOfBot);
    }
  }

  ngOnDestroy(): void {
    this.dataTransferService.clear();
  }
}
