import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from "@angular/core";
import { SharedService } from "@services/routing/saved.services";

import { Tab } from "./shared-tab/models";

@Component({
  selector: "nav-tab",
  templateUrl: "./tab.component.html",
  styleUrls: ["./tab.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent implements OnInit {
  @Input() tab!: Tab;
  @Output() closed = new EventEmitter<void>();

  public isSaved: boolean;
  public isDirty: boolean;
  public nameBot: string;

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.allSubscription();
  }

  private allSubscription() {
    this.nameServiceSubscription();
    this.savedServiceSubscription();
    this.modifiedServiceSubcription();
  }

  private nameServiceSubscription() {
    this.sharedService.nameBot$.subscribe((name) => (this.nameBot = name));
  }

  private savedServiceSubscription() {
    this.sharedService.isSaved$.subscribe(
      (isSaved) => (this.isSaved = isSaved)
    );
  }

  private modifiedServiceSubcription() {
    this.tab.dirty$.subscribe((isDirty) => {
      this.isDirty = !isDirty;
    });
  }

  onClosed(event: MouseEvent): void {
    event.stopPropagation();
    this.closed.emit();
  }
}
