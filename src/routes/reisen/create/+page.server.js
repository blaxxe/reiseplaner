import { connectToDatabase, createReise } from '$lib/db';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const actions = {
  create: async ({ request }) => {
    try {
      const data = await request.formData();
      const image = data.get('image');

      if (image && image.size > 0) {
        const imageName = `${uuidv4()}-${image.name}`;
        const imagePath = path.join('static/images', imageName);

        // Save the image to the static/images directory
        const buffer = Buffer.from(await image.arrayBuffer());
        fs.writeFileSync(imagePath, buffer);

        let reise = {
          title: data.get('title'),
          destination: data.get('destination'),
          start_date: data.get('start_date'),
          end_date: data.get('end_date'),
          budget: parseFloat(data.get('budget')),
          description: data.get('description'),
          image: `/images/${imageName}`
        };

        console.log('Reise to be added:', reise);

        const db = await connectToDatabase();
        const result = await createReise(reise);

        console.log('Database insert result:', result);

        return { success: true };
      } else {
        throw new Error('Image upload failed');
      }
    } catch (error) {
      console.error('Error creating reise:', error);
      return {
        status: 500,
        error: 'Interner Serverfehler',
      };
    }
  },
};