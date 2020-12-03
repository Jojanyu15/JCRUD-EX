import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afa: AngularFireAuth, private router: Router) {}

  public async getUID() {
    return new Promise<any>((resolve, reject) => {
      this.afa.user.subscribe((user) => {
        resolve(user.uid);
      });
    });
  }

  public createUser(email, password) {
    return this.afa.createUserWithEmailAndPassword(email, password);
  }

  public sendVerificationEmail() {
    return this.afa.user.subscribe((user) => {
      return user.sendEmailVerification();
    });
  }
  public resetPassword(email: string): Promise<void> {
    return this.afa.sendPasswordResetEmail(email);
  }
  public getUser() {
    return this.afa.user;
  }
  public login(email, password): Promise<any> {
    return this.afa.signInWithEmailAndPassword(email, password);
  }

  public logout(): Promise<void> {
    return this.afa.signOut();
  }

  public async isLoggedIn(): Promise<boolean> {
    try {
      await new Promise((resolve, reject) =>
        this.afa.onAuthStateChanged(
          (user) => {
            if (user) {
              resolve(user);
            } else {
              reject('no user logged in');
              this.router.navigateByUrl('/crud/login');
            }
          },
          (error) => reject(error)
        )
      );
      return true;
    } catch (error) {
      return false;
    }
  }
}
