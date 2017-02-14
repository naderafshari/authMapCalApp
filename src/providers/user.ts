import * as firebase from 'firebase';
export class User {
  public provider: string;
  public fullName: string;
  public email: string;
  public avatar: string;

  userRef: any;

  constructor(public uid : string) {
    this.userRef = firebase.database().ref('users/' + uid);
    console.debug("Load user using uid " + this.constructor.name);
    this.userRef.on('value', (snapshot) => {
      if (snapshot.val() === null) { return; }
      this.uid = uid;
      this.provider = this.getProvider(snapshot.val().provider);
      this.fullName = snapshot.val().fullName ? snapshot.val().fullName : this.provider;
      this.email = snapshot.val().email;
      this.avatar = this.loadAvatar(snapshot.val().avatar);
    });
  }

  // Wrap firebase update
  update(object: any) {
    console.debug("update user details " + this.constructor.name);
    return this.userRef.update(object);
  }

  // Verify if there is an avatar, if not assign a default one
  loadAvatar(avatarUrl) {
    return avatarUrl ? avatarUrl : 'assets/icon/no-avatar.png';
  }

  // Resolve provider ids
  getProvider(id) {
    var providerNames = [
      '',
      'Twitter',                //1
      'Facebook',               //2
      'GooglePlus',             //3
      'Firebase user/password', //4
      'Anonymous'               //5
    ];
    return providerNames[id];
  }
}
