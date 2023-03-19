import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  combineLatest,
  debounceTime,
  map,
  Observable,
  startWith,
  switchMap,
} from "rxjs";

@Component({
  selector: "search-bar",
  templateUrl: "./searchbar.component.html",
  styleUrls: ["./searchbar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  @Input() dataSource: Observable<Array<any>>;
  @Input() searchBy: Array<string>;
  @Input() searchControl: FormControl = new FormControl("");
  @Input() filteredBots: Observable<Array<any>>;

  ngOnInit() {
    this.filteredBots = this.filtered$;
  }

  public filtered$: Observable<Array<any>> =
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      startWith(this.searchControl.value),
      switchMap((filter) => {
        return this.dataSource.pipe(
          map((data) => {
            if (!filter) {
              return data;
            }

            return data.filter((item) => {
              return this.searchBy.some((field) =>
                item[field].toLowerCase().includes(filter.toLowerCase())
              );
            });
          })
        );
      })
    );
}

export function filterObject(
  object: any,
  searchBy: Array<string>,
  filterValue: string
): boolean {
  return searchBy.some((field) => {
    const fieldParts = field.split(".");
    let value: any = object;

    for (const part of fieldParts) {
      value = value[part];
    }

    if (typeof value === "string") {
      return value.toLowerCase().includes(filterValue.toLowerCase());
    } else if (typeof value === "number") {
      return value.toString().includes(filterValue);
    }
    return false;
  });
}

export function createFilteredSearch$(
  orderBy$: Observable<any>,
  searchControl: FormControl,
  searchBy: Array<string>
): Observable<any> {
  return combineLatest([
    orderBy$,
    searchControl.valueChanges.pipe(debounceTime(300), startWith("")),
  ]).pipe(
    map(([bots, filterValue]) => {
      return bots.filter((bot) => {
        return filterObject(bot, searchBy, filterValue);
      });
    })
  );
}

export function sortByLastModified(a: any, b: any): number {
  return (
    new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime()
  );
}
