import { authFeature} from "./firebaseApp";
import { signInWithEmailAndPassword,createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
export async function loginComponent(email,password){
    try{
        const result= await signInWithEmailAndPassword(authFeature,email,password);
        
            alert("You have logged in successfully!!!");
      
    }catch(err){
        console.log(JSON.stringify(err));
        alert("You have not registered yet.Kindly register to continue.")
        throw err;
    }
    }
  

export async function registerComponent(email,password){
    try{
        const result=await createUserWithEmailAndPassword(authFeature,email,password);
        alert("You have registered successfully!! Kindly Login to continue.");
        
    }catch(err){
        console.log(JSON.stringify(err));
        throw err;
    }
}