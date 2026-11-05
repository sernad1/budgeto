import {NextResponse} from "next/server";
import { connectDB } from "@/lib/db";
import  Transaction  from "@/models/Transaction";

export async function DELETE(
    req: Request,
    {params}:{params: Promise<{id: string}> | {id: string}}
){
    try{
        const resolvedParams = await params;
        const {id} = resolvedParams;

        if(!id){
            return NextResponse.json({message: "Brak ID transakcji"}, {status:400});
        }
        await connectDB();

        const deletedTransaction = await Transaction.findByIdAndDelete(id);
        if(!deletedTransaction){
            return NextResponse.json({message: "Nie znaleziono transakcji"}, {status:404});
        }

        return NextResponse.json({message: "Transakcja usunięta pomyślnie"}, {status:200});
    } catch(error){
        console.error("Błąd usuwania transakcji z bazy danych:", error);
        return NextResponse.json({message: "Błąd usuwania transakcji"}, {status:500});
    }
}