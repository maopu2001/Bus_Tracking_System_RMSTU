export async function GET() {
  try {
    const buses = ['Furomon', 'Kachalong', 'Sajek', 'Subolong'];
    return Response.json(buses);
  } catch (error) {
    console.log(error);
  }
}
