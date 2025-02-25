import { connectDB } from '@/lib/connectDB';
import { Bus } from '@/schemas';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const buses = await Bus.find({}).populate('routeId');

    if (buses.length < 1) return NextResponse.json({ message: 'No buses found' }, { status: 404 });

    return NextResponse.json({ buses }, { status: 200 });
  } catch (error) {
    let message = 'Something went wrong';
    if (error instanceof Error) message = error.message;
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { bus } = await req.json();

    await connectDB();
    await Bus.insertMany(bus);

    return NextResponse.json({ message: 'Successfully added buses' }, { status: 200 });
  } catch (error) {
    let message = 'Something went wrong';
    if (error instanceof Error) message = error.message;
    return NextResponse.json({ message }, { status: 500 });
  }
}
