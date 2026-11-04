import express from 'express';
import 'dotenv/config';

const app = express();
const port = Number(process.env.PORT || 3001);
app.get('/api/reviews', async (_req, res) => {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return res.status(503).json({ configured: false });
  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      headers: { 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': 'rating,userRatingCount,reviews.rating,reviews.text.text,reviews.originalText.text,reviews.authorAttribution.displayName,reviews.authorAttribution.uri,reviews.relativePublishTimeDescription,reviews.publishTime,reviews.googleMapsUri,googleMapsUri,displayName' }
    });
    if (!response.ok) return res.status(502).json({ configured: true, error: 'Google Places API request failed' });
    const place = await response.json();
    res.set('Cache-Control', 'public, max-age=900');
    res.json({ rating: place.rating, userRatingCount: place.userRatingCount, reviews: place.reviews || [], reviewsReturned: Boolean(place.reviews?.length), googleMapsUri: place.googleMapsUri });
  } catch {
    res.status(502).json({ configured: true, error: 'Unable to fetch Google reviews' });
  }
});
app.listen(port, () => console.log(`TCM API listening on http://localhost:${port}`));
