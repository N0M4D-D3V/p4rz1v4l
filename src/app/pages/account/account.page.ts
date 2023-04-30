import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "@interfaces/user.interface";
import { UserService } from "@services/user/user.service";
import { Subscription, filter, map } from "rxjs";
import { MIN_PASS_LENGTH } from "./config";

@Component({
  selector: "app-account",
  templateUrl: "./account.page.html",
  styleUrls: ["./account.page.scss"],
})
export class AccountPage implements OnInit, OnDestroy {
  private subUser: Subscription;
  private profileImage: File;

  public userForm: FormGroup;
  public userImg: string | ArrayBuffer;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService
  ) {}

  ngOnInit() {
    this.subUser = this.userService
      .getObservable()
      .pipe(
        filter((user: User[]) => !!user),
        map((user: User[]) => user?.[0])
      )
      .subscribe((user: User) => this.createForm(user));
  }

  public onSave(): void {
    const user: User = {
      ...(this.userForm.value as User),
      image: this.userImg,
    };
    this.userService.updateObservable(user);
  }

  public onUploadImage(event): void {
    const file = event?.target?.files[0];

    if (file) {
      this.profileImage = file;

      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.userImg = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

  private createForm(user: User): void {
    this.userImg = user ? user.image : "assets/images/users/user4.jpg";
    this.userForm = this.fb.group({
      nickname: [user?.nickname || "", Validators.required],
      name: [user?.name || "", Validators.required],
      surname: [user?.surname || "", Validators.required],
      email: [user?.email || "", [Validators.required, Validators.email]],
      pass: [
        user?.pass || "",
        [Validators.required, Validators.minLength(MIN_PASS_LENGTH)],
      ],
      pub: [user?.pub || ""],
      prib: [user?.prib || ""],
    });
  }

  ngOnDestroy(): void {
    this.subUser.unsubscribe();
  }
}
