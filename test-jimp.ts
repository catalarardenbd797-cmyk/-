import { Jimp } from 'jimp';
async function test() {
  try {
    const img = new Jimp({ width: 100, height: 100, color: 0xff0000ff });
    await img.write('test.jpg');
    console.log('Success creating image');
  } catch (err: any) {
    console.error('Error:', err.message);
  }
}
test();
