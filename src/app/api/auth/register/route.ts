import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from '@/models/User';
import bcrypt from "bcryptjs";

export async function POST(req: Request){
    try{
        const{firstName, lastName, email, password} = await req.json();

        if(!firstName || !lastName || !email || !password){
            return NextResponse.json(
                {message: "Wszystkie pola są wymagane."},
                {status : 400}
            );
        }
        await connectDB();

        //sprawdzenie czy istnieje juz taki mail
        const existingUser = await User.findOne({email});
        if(existingUser){
            return NextResponse.json(
                {message: "Użytkownik z takim mailem już istnieje."},
                {status : 400}
            );
        }

        const hashedPassword = await bcrypt.hash(password,10);

        await User.create({
            firstName,
            lastName,
            email,
            password : hashedPassword,
        });
        return NextResponse.json(
            {message: "Konto zostało pomyślnie utworzone!"},
            {status : 201}
        );
    }catch(error){
        console.error('Błąd rejestracji:', error);
        return NextResponse.json(
            {message: "Wystąpił błąd serwera przy rejestracji."},
            {status : 500}
        );
    }
}