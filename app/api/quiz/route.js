import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

export async function GET() {
  const q = await getDocs(collection(db, "questions"));
  const questions = [];
  q.forEach((doc) => {
    questions.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  questions.sort(() => Math.random() - 0.5);
  const randomQuestions = questions.slice(0, 15);
  return NextResponse.json(randomQuestions);
}
