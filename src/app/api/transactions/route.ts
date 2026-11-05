import {NextResponse} from "next/server";
import { connectDB } from "@/lib/db";
import  Transaction  from "@/models/Transaction";

export async function GET(req: Request) {
    try{
        const {searchParams} = new URL(req.url);
        const userId = searchParams.get("userId");

        if(!userId){
            return NextResponse.json({message: "Brak ID użytkownika"}, {status:400});

        }

        await connectDB();
        const transactions = (await Transaction.find({userId})).sort({createdAt: -1}as any);
        return NextResponse.json(transactions, {status:200});
    } catch(error){
        return NextResponse.json({message : "Błąd pobierania transakcji."}, {status:500});
    }
}

export async function POST(req: Request) {
    try{
        const{userId, title, amount, type, category, date} = await req.json();

        if(!userId || !title || !amount || !type || !category){
            return NextResponse.json({message: "Wszystkie pola są wymagane"}, {status:400});
        }

        await connectDB();
        const newTransaction = await Transaction.create({
            userId,
            title,
            amount,
            type,
            category,
            date : date || new Date().toISOString().split('T')[0],
        });
        return NextResponse.json(newTransaction, {status:201});
    } catch(error){
        return NextResponse.json({message : "Błąd tworzenia transakcji."}, {status:500});
    }
}
