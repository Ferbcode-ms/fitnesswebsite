import fs from 'fs';
import path from 'path';

const images = {
  'hero-bg.jpg': 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=80',
  'avatar-1.jpg': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
  'avatar-2.jpg': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&h=200&q=80',
  'avatar-3.jpg': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80',
  'avatar-4.jpg': 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&h=200&q=80',
  'card-foundations.jpg': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&h=800&q=80',
  'card-strength.jpg': 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&h=800&q=80',
  'card-hybrid.jpg': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&h=800&q=80',
  'callout-equipment.jpg': 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&h=750&q=80',
  'coach-portrait.jpg': 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=800&h=1067&q=80',
  'app-bg.jpg': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80',
  'guide-left.jpg': 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=600&h=900&q=80',
  'guide-right.jpg': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&h=750&q=80',
  'blog-1.jpg': 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=600&h=600&q=80',
  'blog-2.jpg': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&h=750&q=80',
  'split-cta-bg.jpg': 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=900&h=1350&q=80',
  'footer-1.jpg': 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=300&h=300&q=80',
  'footer-2.jpg': 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=300&h=300&q=80',
  'footer-3.jpg': 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=300&h=300&q=80',
  'footer-4.jpg': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=300&h=300&q=80',
};

const outputDir = path.resolve('public', 'images');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function downloadAll() {
  for (const [filename, url] of Object.entries(images)) {
    const dest = path.join(outputDir, filename);
    if (fs.existsSync(dest)) {
      console.log(`Skipping already present: ${filename}`);
      continue;
    }
    console.log(`Downloading ${filename}...`);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const arrayBuffer = await res.arrayBuffer();
      fs.writeFileSync(dest, Buffer.from(arrayBuffer));
      console.log(`Saved ${filename}`);
    } catch (err) {
      console.error(`Failed ${filename}:`, err);
    }
  }
  console.log('All image downloads complete!');
}

downloadAll();

