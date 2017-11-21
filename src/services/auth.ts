import firebase from 'firebase';

export class authService{
    signup(email : string, password: string){
        return firebase.auth().createUserWithEmailAndPassword(email,password);
    }

    signin(email:string, password: string){
        return firebase.auth().signInWithEmailAndPassword(email,password);
    }

    getActiveUser(){
        return firebase.auth().currentUser;
    }

    logout(){
        return firebase.auth().signOut();
    }
}