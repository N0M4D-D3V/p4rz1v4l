import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { EditBotModalComponent } from "@modals/edit-bot/edit-bot.modal";
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
import { map, take, tap } from "rxjs";
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
  private botsSubject = new BehaviorSubject<any[]>([]);
  public searchBy: Array<string> = SearchBy;
  private filteredIndexToId: { [index: number]: number } = {};
  private existingBotIds = new Set<number>();
  public searchBotInterface: Bot;
  public searchStarted = false;
  public lastUsedBotId = 0;

  constructor(
    private readonly modalService: BsModalService,
    private dataTransferService: DataTransferService<any>,
    private botDetailService: BotDetailService,
    private fb: FormBuilder
  ) {}

  get bot(): FormArray {
    return this.botForm.get("bots") as FormArray;
  }

  public bots$ = this.botDetailService.bots$.pipe(
    map((bots) => bots.sort(sortByLastModified))
  );

  public filteredBots$ = createFilteredSearch$(
    this.bots$,
    this.searchControl,
    this.searchBy
  );

  public ngOnInit(): void {
    this.createBotForm();
    this.onSearch();
  }

  public onSearch(): void {
    this.searchControl.valueChanges.subscribe(() => {
      this.searchStarted = true;
    });
  }

  public onSearchBlur(): void {
    this.searchStarted = false;
  }

  private createBotForm(): void {
    const sortedBots$ = this.getSortedBots$();
    this.createSortedBotForm(sortedBots$);
  }

  private getSortedBots$(): Observable<BotDetail[]> {
    return this.botDetailService.bots$.pipe(
      map((bots) => bots.sort(sortByLastModified)),
      tap((bots) => {
        bots.forEach((bot) => this.existingBotIds.add(bot.id));
        this.lastUsedBotId = Math.max(
          this.lastUsedBotId,
          ...bots.map((bot) => bot.id),
          0
        );
      })
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

  public onBotTouched(index: number): void {
    this.filteredBots$.pipe(take(1)).subscribe((filteredBots) => {
      const selectedBot = filteredBots.find((bot) => bot.id === index);
      this.dataTransferService.setSelectedDataModal({
        index: index,
        data: selectedBot,
      });
      this.modalService.show(EditBotModalComponent);
    });
  }

  public trackByBot(index: number, bot: AbstractControl) {
    return bot.value;
  }

  public isBotVisible(filteredBots: any[], bots: AbstractControl) {
    const searchTerm = this.searchControl.value;
    const botId = bots.value.id;
    const botName = bots.value.client.name;

    if (
      !searchTerm ||
      botName.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      this.filteredIndexToId[filteredBots.length] = botId;
      filteredBots.push(botId);
      return true;
    }

    return false;
  }

  public getNextBotId(): number {
    this.lastUsedBotId += 1;
    this.existingBotIds.add(this.lastUsedBotId);
    return this.lastUsedBotId;
  }

  public addBot(): void {
    const numberOfBot = this.getNextBotId();
    const newBot = {
      id: numberOfBot,
      client: { name: `${NAME_MODULE}${numberOfBot}` },
      total: 0,
      lastModified: new Date().toISOString(),
    };
    const newControl = this.fb.group({
      id: [newBot.id],
      client: this.fb.group({
        name: [newBot.client.name],
      }),
      total: [newBot.total],
      lastModified: [newBot.lastModified],
    });
    this.bot.push(newControl);
    this.botDetailService.save(newBot).subscribe();
    this.updateFilteredBots();
  }

  public removeBot(control: AbstractControl): void {
    const index = this.bot?.controls?.indexOf(control);
    this.bot?.removeAt(index);
    this.resetNumberBot(control);
    const botId = control.get("id")?.value;
    this.botDetailService.notifyBotRemoved(botId);
    this.botDetailService.deleteBot(botId).subscribe();
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
      controlEvaluator?.get("id")?.setValue(numberOfBot);
    }
  }

  ngOnDestroy(): void {
    this.dataTransferService.clear();
  }
}
