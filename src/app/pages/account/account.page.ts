import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "@interfaces/user.interface";
import { MIN_PASS_LENGTH } from "./config";
import { UserService } from "@core/database/services/user.service";

@Component({
  selector: "app-account",
  templateUrl: "./account.page.html",
  styleUrls: ["./account.page.scss"],
})
export class AccountPage implements OnInit {
  private user: User;

  public userForm: FormGroup;
  public userImg: string | ArrayBuffer;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService
  ) {}

  ngOnInit() {
    this.userService.getById(1).then((user: User) => this.createForm(user));
  }

  public async onSave(): Promise<void> {
    const user: User = {
      ...(this.userForm.value as User),
      image: this.userImg.toString(),
    };
    if (this.user) user.id = this.user.id;

    await this.userService.update(user);
    window.location.reload();
  }

  public onUploadImage(event): void {
    const file = event?.target?.files[0];

    if (file) {
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.userImg = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

  private createForm(user: User): void {
    this.user = user;
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
}
