import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  endWith,
  finalize,
  map,
  Subject,
  takeUntil,
  tap,
  withLatestFrom,
} from "rxjs";
import { BotDetailService } from "@services/pages/bot/bot-page.service";
import { BotDetail, BotItem } from "@interfaces/bot-detail.interface";
import { TabManagerService } from "@components/sidenav";
import { AppComponent } from "src/app/app.component";
import { SharedService } from "@services/routing/saved.services";

@Component({
  selector: "bot-detail",
  templateUrl: "./bot-detail.component.html",
  styleUrls: ["./bot-detail.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BotDetailsComponent implements OnInit {
  botDetailCopy!: BotDetail;
  form!: FormGroup;

  get items(): FormArray {
    return this.form.get("items") as FormArray;
  }

  private destroyNotifier$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private botService: BotDetailService,
    private fb: FormBuilder,
    private router: Router,
    private tabManager: TabManagerService,
    private appComponent: AppComponent,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.botDetailCopy = { ...this.route.snapshot.data?.["quotation"] };

    this.initForm(this.botDetailCopy);
    this.addOrUpdateSelfTab();
  }

  private initForm(initialValue: BotDetail): void {
    const { client, items } = initialValue;
    this.form = this.fb.group({
      client: this.fb.group(client),
      items: this.fb.array(
        (items ?? []).map((item) => this.createItemRow(item))
      ),
    });

    this.form
      .get("items")
      ?.valueChanges.pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (items: BotItem[]) =>
          (this.botDetailCopy.total = items.reduce(
            (acc, item) => (acc += Number(item.price)),
            0
          ))
      );
  }

  private createItemRow(item?: BotItem) {
    return this.fb.group({
      description: item?.description ?? "",
      price: item?.price ?? 0,
    });
  }

  private addOrUpdateSelfTab(): void {
    this.sharedService.isSaved$.next(true);
    const dirty$ = this.form.valueChanges.pipe(
      takeUntil(this.destroyNotifier$),
      map((_) => this.form.dirty),
      endWith(false)
    );

    const currentUrl = this.appComponent.currentRouteUrl;

    this.tabManager.addOrUpdate({
      url: this.router.url,
      title: String(this.botDetailCopy.client.name),
      dirty$: dirty$.pipe(
        withLatestFrom(this.appComponent.currentRouteUrl),
        map(([isDirty, url]) => {
          this.sharedService.isSaved$.next(false);
          return isDirty && url !== this.router.url;
        })
      ),
      isCurrentUrl: currentUrl === this.router.url,
    });
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  onSave(form: FormGroup): void {
    const botDetailToSave: BotDetail = {
      ...this.botDetailCopy,
      ...form.value,
    };

    this.botService
      .save(botDetailToSave)
      .pipe(
        tap((saveBotDetail) => (this.botDetailCopy = { ...saveBotDetail })),
        finalize(() => {
          form.reset(form.value);
          this.sharedService.isSaved$.next(true);
          this.sharedService.nameBot$.next(this.botDetailCopy.client.name)
          this.tabManager.setSavedState(true);
        })
      )
      .subscribe();
  }

  addRow(): void {
    const items = this.items;
    items.markAsDirty();
    items.push(this.createItemRow());
  }

  deleteRow(index: number): void {
    const items = this.items;
    items.markAsDirty();
    items.removeAt(index);
  }
}
