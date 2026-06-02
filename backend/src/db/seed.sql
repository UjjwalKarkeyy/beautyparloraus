INSERT INTO products (name, category, price, tag, description, image_url)
VALUES
('Eyebrow Gel', 'brow', 30.00, 'Bestseller', 'Professional styling gel for sculpted, defined brows all day long.', 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&q=80'),

('Brow Kit', 'brow', 30.00, NULL, 'Everything you need to shape and style your brows at home.', 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&q=80'),

('Dark Brown Powder', 'brow', 20.00, NULL, 'Pigmented brow powder for bold, defined arches with a soft finish.', 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&q=80'),

('Lash Growth Mascara', 'lash', 50.00, 'Bestseller', 'Nourishing mascara that conditions lashes while boosting length and volume.', 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=400&q=80'),

('FEGPLUS+ Eyelash Vitalised', 'lash', 65.00, 'New', 'Advanced lash serum formulated to revitalise and enhance lash growth.', 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=400&q=80'),

('Fake Lashes', 'lash', 15.00, NULL, 'Salon-quality strip lashes for an instant glamorous effect.', 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=400&q=80'),

('Simply Radiant Set', 'skin', 149.00, 'Top Pick', 'Complete brightening kit for glowing, even-toned skin.', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80'),

('Radiance Serum', 'skin', 120.00, NULL, 'Brightening vitamin serum targeting dullness and uneven skin tone.', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80'),

('A1 Super Serum 30ml', 'skin', 120.00, 'Bestseller', 'Multi-action serum targeting ageing, pigmentation, and hydration.', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80'),

('Hot Wax Beads', 'wax', 25.00, NULL, 'Salon-grade wax beads for smooth and precise waxing.', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80'),

('Vitamin D Ointment for Tattoo', 'tattoo', 10.00, NULL, 'Healing ointment to support skin recovery and colour retention.', 'https://images.unsplash.com/photo-1588776814546-ec7e55c5b7e7?w=400&q=80'),

('Natural Brown Henna', 'general', NULL, NULL, 'Natural brown henna for brows with long-lasting skin-staining colour.', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80');


INSERT INTO services (
  slug,
  title,
  label,
  service_number,
  short_description,
  image_url,
  paragraphs,
  includes
)
VALUES
(
  'threading',
  'Threading',
  'Brow Services',
  '01',
  'Precise brow and facial hair removal using cotton thread, ideal for clean shaping and sensitive skin.',
  'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=900&q=80',
  '[
    "Our expert threading technique uses a fine cotton thread twisted and rolled across the skin to precisely remove unwanted hair from the root.",
    "Unlike waxing, threading does not involve chemicals or heat, making it a gentle option for sensitive skin."
  ]',
  '[
    "Brow shaping and defining",
    "Upper lip threading",
    "Chin threading",
    "Full face threading",
    "Forehead and sides",
    "Suitable for sensitive skin"
  ]'
),
(
  'tinting',
  'Tinting',
  'Colour Services',
  '02',
  'Semi-permanent brow and lash colour enhancement for fuller, more defined features.',
  'https://images.unsplash.com/photo-1512207736890-6ffed8a84e8d?w=900&q=80',
  '[
    "Enhance the colour, depth, and definition of your brows and lashes with professional tinting.",
    "Results usually last several weeks and help reduce daily makeup effort."
  ]',
  '[
    "Brow tinting",
    "Lash tinting",
    "Brow and lash combo",
    "Custom shade matching",
    "Long-lasting colour",
    "Natural-looking finish"
  ]'
),
(
  'eyelash-extension',
  'Eyelash Extension',
  'Lash Services',
  '03',
  'Classic, hybrid, volume, wet look and ombre lash extensions customised to your eyes.',
  'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=900&q=80',
  '[
    "Wake up looking effortlessly beautiful with premium lash extensions applied by trained lash artists.",
    "Choose from natural classic sets to full volume styles based on your desired look."
  ]',
  '[
    "Classic extensions",
    "Hybrid extensions",
    "Volume lashes",
    "Wet look lashes",
    "Ombre styles",
    "Lash infills available"
  ]'
),
(
  'facial',
  'Facial',
  'Skin Treatments',
  '04',
  'Hydrafacial, dermaplaning, LED therapy, skin needling and classic cleansing treatments.',
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80',
  '[
    "Reveal fresh, radiant skin with facial treatments tailored to your skin type and concerns.",
    "Our facials can support hydration, glow, texture, and overall skin maintenance."
  ]',
  '[
    "Hydrafacial",
    "Dermaplaning",
    "LED light therapy",
    "Skin needling",
    "Classic cleansing facial",
    "Personalised skin care"
  ]'
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO client_reviews (
  client_name,
  service_name,
  location,
  rating,
  review_text,
  avatar_letter,
  is_featured,
  display_order
)
VALUES
(
  'Sophia Anderson',
  'Brow Lamination',
  'Roselands',
  5,
  'I have been coming to Brow Beauty Hub for over a year and the results are always flawless. My brow lamination lasts so long and the team really takes the time to shape them perfectly for my face.',
  'S',
  TRUE,
  1
),
(
  'Emily Chen',
  'Lash Extensions',
  'Hurstville',
  5,
  'I had my lash extensions done at the Hurstville branch and I am obsessed. They looked so natural yet full, exactly what I asked for.',
  'E',
  TRUE,
  2
),
(
  'Rachel Patel',
  'Facial',
  'Hornsby',
  5,
  'The deep cleanse facial at Brow Beauty Hub is incredible. My skin was glowing for weeks and the staff were very knowledgeable.',
  'R',
  TRUE,
  3
);

INSERT INTO homepage_stats (
  stat_value,
  stat_suffix,
  stat_label,
  display_order,
  is_active
)
VALUES
('5000', '+', 'Happy Clients', 1, TRUE),
('3', '', 'Locations in Sydney', 2, TRUE),
('10', '+', 'Specialist Therapists', 3, TRUE),
('20', '+', 'Beauty Treatments', 4, TRUE)
ON CONFLICT DO NOTHING;


INSERT INTO blogs (
  slug,
  title,
  category,
  excerpt,
  content,
  image_url,
  author,
  read_time,
  is_featured,
  display_order
)
VALUES
(
  'brow-lamination-vs-brow-tattoo',
  'Brow Lamination vs Brow Tattoo: Which One Is Right for You?',
  'Brow Care',
  'Two popular brow treatments, but each one fits a different lifestyle and beauty goal.',
  'Brow lamination and brow tattooing are both popular treatments, but they solve different beauty needs.

Brow lamination is best for people who want fuller, lifted, and styled brows without a permanent result. It works by relaxing and setting the brow hairs into a desired shape.

Brow tattooing is better for people who want a longer-lasting solution, especially if they have sparse brows or want to reduce daily makeup time.

The right choice depends on your lifestyle, budget, and how permanent you want the result to be.',
  'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=900&q=80',
  'Brow Beauty Hub',
  '5 min read',
  TRUE,
  1
),
(
  'pre-and-post-waxing-care',
  'Pre & Post Waxing Care: How to Get the Best Results',
  'Waxing',
  'Simple tips for preparing your skin before and after a waxing appointment.',
  'Waxing gives smooth, long-lasting results, but proper care before and after your appointment makes a big difference.

Before waxing, avoid heavy exfoliation, sunburn, and strong skin treatments. Make sure your skin is clean and dry before the session.

After waxing, avoid hot showers, sweating, swimming, and strong skincare products for at least 24 hours.

This helps reduce irritation and keeps your skin smoother for longer.',
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&q=80',
  'Brow Beauty Hub',
  '4 min read',
  FALSE,
  2
)
ON CONFLICT (slug) DO NOTHING;



