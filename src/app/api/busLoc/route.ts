import { connectDB } from '@/lib/connectDB';
import { Bus } from '@/schemas';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const longitude = searchParams.get('lng');
    const latitude = searchParams.get('lat');

    if (id === null && latitude === null && longitude === null) return getBusLoc();

    if (id === null || latitude === null || longitude === null)
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });

    await connectDB();
    const bus = await Bus.findOne({ id: id });

    if (!bus) return NextResponse.json({ message: 'No bus found' }, { status: 404 });

    const modBus = await Bus.updateOne({ id: id }, { $set: { position: [longitude, latitude] } });

    if (modBus.acknowledged) return NextResponse.json({ message: 'Bus location updated' }, { status: 200 });
    else return NextResponse.json({ message: 'Failed to update bus location' }, { status: 500 });
  } catch (error) {
    let message = 'Something went wrong';
    if (error instanceof Error) message = error.message;
    return NextResponse.json({ message }, { status: 500 });
  }
}

async function getBusLoc() {
  try {
    await connectDB();
    const buses = await Bus.find({});

    if (buses.length < 1) return NextResponse.json({ message: 'No buses found' }, { status: 404 });

    const busLoc = buses.map((bus) => ({
      id: bus.id,
      longitude: bus.position[0],
      latitude: bus.position[1],
      lastUpdateTime: bus.updatedAt,
    }));

    return NextResponse.json({ busLoc }, { status: 200 });
  } catch (error) {
    let message = 'Something went wrong';
    if (error instanceof Error) message = error.message;
    return NextResponse.json({ message }, { status: 500 });
  }
}
