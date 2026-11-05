import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from '@/models/User';
import bcrypt from "bcryptjs";
import { UNSTABLE_REVALIDATE_RENAME_ERROR } from "next/dist/lib/constants";

export async function POST(req: Request){
    try{
        const{ email, password} = await req.json();

        if(!email || !password){
            return NextResponse.json(
                {message: "Proszę podać email i hasło."},
                {status : 400}
            );
        }
        await connectDB();

        //szukamy user po emailu
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json(
                {message: "Nieprawidłowy email lub hasło."},
                {status : 400}
            );
        }

        //porownujemy haslo z tym co jest w bazie
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return NextResponse.json(
                {message : 'Nieprawidło email lub hasło'},
                {status:400}
            );
        }

        return NextResponse.json(
            {
                message : 'Zalogowano pomyślnie!',
                user:{
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                },
            },
            {status : 200}
        );
        
    }catch(error){
        console.error('Błąd logowania:', error);
        return NextResponse.json(
            {message: "Wystąpił błąd serwera podczas logowania."},
            {status : 500}
        );
    }
}