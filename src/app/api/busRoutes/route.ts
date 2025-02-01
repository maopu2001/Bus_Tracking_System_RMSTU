import { connectDB } from '@/lib/connectDB';
import { BusRoute } from '@/schemas';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const busRoutes = await BusRoute.find({});

    if (busRoutes.length < 1) return NextResponse.json({ message: 'No bus routes found' }, { status: 404 });

    return NextResponse.json({ busRoutes }, { status: 200 });
  } catch (error) {
    let message = 'Something went wrong';
    if (error instanceof Error) message = error.message;
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { busRoute } = await req.json();

    await connectDB();
    await BusRoute.insertMany(busRoute);

    return NextResponse.json({ message: 'Successfully added bus routes' }, { status: 200 });
  } catch (error) {
    let message = 'Something went wrong';
    if (error instanceof Error) message = error.message;
    return NextResponse.json({ message }, { status: 500 });
  }
}
