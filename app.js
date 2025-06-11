import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

async function main() {
  console.log("🧠 Loading COCO-SSD model...");
  const model = await cocoSsd.load();
  console.log("✅ COCO-SSD model loaded!");

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'blue';
  ctx.fillRect(150, 100, 300, 200);

  const predictions = await model.detect(canvas);
  console.log("🔍 Predictions:", predictions);
}

main().catch(console.error);
