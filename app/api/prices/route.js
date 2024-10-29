import {NextResponse} from "next/server"

// Una pequeña muestra sobre como poner una ruta de backend en Next

export function GET() {
    return NextResponse.json({
        message: "Hello from /api/prices"
    })
}