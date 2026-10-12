import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {

    const body = await request.json();

    // Check if the user filled all the fields
    if (!body.email || !body.password) {
        return NextResponse.json(
            { message: "Email and password are required."},
            { status: 400 }
        )
    }

    // Try to find a user with the login email
    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    })

    // Error message if the email is not found in the server
    if (!user) {
        return NextResponse.json(
            { message: "Invalid email or password."},
            {status: 401}
        )
    }

    // Compare the login password with the user's password
    const passwordMatches = await bcrypt.compare(
        body.password,
        user.passwordHash
    )
    
    // Error message if passwords don't match
    if (!passwordMatches) {
        return NextResponse.json(
            { message: "Invalid email or password."},
            { status: 401 }
        )
    }

    // Create a session for the logged in user
    const authSecret = process.env.AUTH_SECRET;

    if (!authSecret) {
        return NextResponse.json(
            { message: "Server configuration error." },
            { status: 500 }
        );
    }

    const secret = new TextEncoder().encode(authSecret);

    const token = await new SignJWT({
        userId: user.id,
        email: user.email,
    })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(secret);

    const loginResponse = NextResponse.json(
        {
            message: "Login successful.",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        },
        { status: 200 }
    );

    loginResponse.cookies.set("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/"
    });

    return loginResponse
}