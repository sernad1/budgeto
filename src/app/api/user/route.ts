import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from '@/models/User';
import bcrypt from "bcryptjs";

export async function PUT(req :Request) {
    try{
        const{userId,name,currentPassword,newPassword} = await req.json();

        if(!userId){
            return NextResponse.json({message : 'Brak ID użytkownika.'}, {status : 400});

        }

        await connectDB();
        const user = await User.findById(userId);

        if(!user){
            return NextResponse.json({message : 'Nie znaleziono użytkownika.'}, {status:404 });

        }

        //zmiana hasla uzytkownika
        if (newPassword){
            if(!currentPassword){
                return NextResponse.json({message : " Wymagane jest podanie obecnego hasła"}, {status : 400});
            }
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if(!isMatch){
                return NextResponse.json({message : "Obecne hasło jest nieprawidłowe."}, {status : 400});
            }
            user.password = await bcrypt.hash(newPassword, 10);
        }

        //zmiana nazwy uzytkownika
        if ( name && name !== user.name){
            user.name = name;
        }

        await user.save();

        return NextResponse.json (
            {
                message : "Dane zostały poprawnie zaktualizowane.",
                user : {
                    id : user._id,
                    name : user.name ,
                    firstName: user.name,
                    email : user.email,
                },
            },
            {status : 200}
        );
    }catch (error){
        console.error('Błąd aktualizacji użytkownika: ', error);
        return NextResponse.json({message: "Błąd podczas zapisywania zmuian."}, {status :400 });
    }
    
}