-- ==============================================================================
-- PHASE 7: SEED DATA FOR CMS TABLES
-- Seeds existing verified website content into Supabase
-- ==============================================================================

-- 1. Site Settings
INSERT INTO public.site_settings (
  business_name,
  coach_name,
  tagline,
  description,
  contact_email,
  phone_number,
  location,
  online_coaching_available,
  online_coaching_summary,
  in_person_training_available,
  in_person_summary
) VALUES (
  '[Brand / Coaching Studio Name]',
  '[Coach Name]',
  '[Women''s Fitness Coaching Tagline Placeholder]',
  'Personalised women''s fitness coaching offering both online fitness coaching and in-person personal training to build strength, fitness, and confidence.',
  '[email@placeholder.com]',
  '[Phone Number Placeholder]',
  '[Studio Location / City Placeholder]',
  true,
  '[Online Fitness Coaching Availability Placeholder]',
  true,
  '[In-Person Personal Training Availability Placeholder]'
) ON CONFLICT DO NOTHING;

-- 2. Pages
INSERT INTO public.pages (slug, title, meta_title, meta_description, canonical_url, status)
VALUES
  ('home', 'Homepage', 'Women''s Fitness Coaching | Online & In-Person Personal Training', 'Personalised women''s fitness coaching offering evidence-based online coaching and in-person personal training.', '/', 'published'),
  ('about', 'About Us', 'About Our Coach & Philosophy | Women''s Fitness Coaching', 'Meet our head coach and founder. Learn our evidence-based female strength philosophy, qualifications, and methodology.', '/about', 'published'),
  ('classes', 'Programmes & Classes', 'Fitness Programmes & Memberships | Women''s Coaching', 'Explore our women''s strength coaching programmes: Foundations, Strength & Sculpt, and Hybrid Athlete.', '/classes', 'published'),
  ('services', 'Coaching Services', 'Coaching Services & Comparison | Women''s Fitness', 'Comprehensive female fitness services: 1-on-1 in-person personal training, online coaching, and nutrition design.', '/services', 'published'),
  ('single-service', '1:1 Private Mentorship', '1:1 Private Coaching Experience | Women''s Fitness', 'Apply for the comprehensive 1:1 private coaching experience with custom workout programming and direct coach access.', '/single-service', 'published'),
  ('contact', 'Contact', 'Contact & Studio Inquiries | Women''s Fitness Coaching', 'Get in touch with our coaching team. Inquire about 1-on-1 personal training or studio availability.', '/contact', 'published'),
  ('appointments', 'Appointments', 'Schedule A Consultation or Session | Women''s Fitness', 'Request your complimentary 15-minute discovery consultation or reserve an in-person movement screen.', '/appointments', 'published'),
  ('link-in-bio', 'Link in Bio', 'Quick Links & Featured Programs | Women''s Fitness Coaching', 'Direct links to book a discovery call, explore signature programmes, and access coaching resources.', '/link-in-bio', 'published')
ON CONFLICT (slug) DO NOTHING;

-- 3. Classes / Signature Programmes
INSERT INTO public.classes (title, subtitle, badge, description, specs, image_url, cta_text, cta_link, order_index, status)
VALUES
  (
    'FOUNDATIONS',
    '8-WEEK BEGINNER INTENSIVE',
    'PHASE 01',
    'Master compound lifts, establish bulletproof movement biomechanics, and banish gym anxiety in a structured, supportive atmosphere.',
    '["3 Sessions / Week", "Technique & Biomechanics", "Gym Anxiety Reset", "Video Form Feedback"]'::jsonb,
    '/images/card-foundations.jpg',
    'APPLY FOR PROGRAMME',
    '/appointments',
    1,
    'published'
  ),
  (
    'STRENGTH & SCULPT',
    'HYPERTROPHY & BODY RECOMPOSITION',
    'MOST POPULAR',
    'Progressive overload engineered for female physiology. Build metabolic muscle, bone density, and athletic definition.',
    '["4 Sessions / Week", "Hypertrophy & Overload", "Body Recomposition", "Macro Architecture"]'::jsonb,
    '/images/card-strength.jpg',
    'APPLY FOR PROGRAMME',
    '/appointments',
    2,
    'published'
  ),
  (
    'HYBRID ATHLETE',
    'ENDURANCE & CONDITIONING FUSION',
    'ADVANCED',
    'For women who want strength, stamina, and cardiovascular resilience without sacrificing muscle mass or joint health.',
    '["4–5 Sessions / Week", "Conditioning & Strength", "Lactate Threshold Work", "Heart Rate Tracking"]'::jsonb,
    '/images/card-hybrid.jpg',
    'APPLY FOR PROGRAMME',
    '/appointments',
    3,
    'published'
  )
ON CONFLICT DO NOTHING;

-- 4. Services
INSERT INTO public.services (title, service_type, badge, summary, features, pricing_tier, image_url, cta_text, cta_link, order_index, status)
VALUES
  (
    '1-on-1 In-Person Personal Training',
    'in_person',
    'IN-STUDIO',
    'Private 60-minute in-studio coaching sessions with hands-on form correction, real-time autoregulation, and specialized equipment.',
    '["Private suite access", "Hands-on barbell & kettlebell form cueing", "Mobility & biomechanical movement screen", "Post-session recovery protocol"]'::jsonb,
    'Studio Tier',
    '/images/service-collage-1.jpg',
    'BOOK STUDIO CONSULTATION',
    '/appointments',
    1,
    'published'
  ),
  (
    'Remote 1:1 Online Coaching',
    'online',
    'REMOTE',
    'Full-service custom workout programming delivered through our dedicated coaching app with weekly video form reviews and 24/7 direct coach chat.',
    '["Customised app programming with progressive overload", "Weekly asynchronous video form analysis", "Nutrition design & flexible macro coaching", "Direct coach messaging & weekly adjustments"]'::jsonb,
    'Online Tier',
    '/images/service-collage-2.jpg',
    'APPLY FOR ONLINE COACHING',
    '/appointments',
    2,
    'published'
  ),
  (
    'Hybrid Coaching Mentorship',
    'hybrid',
    'HYBRID',
    'The ultimate blend: fortnightly in-person technique check-ins combined with complete weekly remote programming and nutritional oversight.',
    '["2x monthly private studio technique clinics", "Full remote programming on our coaching app", "Custom nutrient timing & hormonal periodization", "Priority schedule booking & event prep"]'::jsonb,
    'Hybrid Tier',
    '/images/service-collage-3.jpg',
    'EXPLORE HYBRID MENTORSHIP',
    '/appointments',
    3,
    'published'
  )
ON CONFLICT DO NOTHING;

-- 5. Testimonials
INSERT INTO public.testimonials (quote, client_name, client_role, rating, avatar_url, page_placement, order_index, status)
VALUES
  (
    'I spent years spinning my wheels on cardio machines. Within 12 weeks of structured strength coaching, I hit a bodyweight squat and completely rebuilt my energy.',
    'Sarah J.',
    'Online Coaching Client',
    5,
    '/images/avatar-1.jpg',
    'all',
    1,
    'published'
  ),
  (
    'The form feedback and biomechanical adjustments were game-changing. I train 4 days a week now completely pain-free and stronger than ever.',
    'Rachel K.',
    'In-Person Training Client',
    5,
    '/images/avatar-2.jpg',
    'all',
    2,
    'published'
  ),
  (
    'Having a female coach who truly understands hormonal cycles and progressive overload made all the difference in my body composition results.',
    'Emma D.',
    'Hybrid Athlete Client',
    5,
    '/images/avatar-3.jpg',
    'all',
    3,
    'published'
  ),
  (
    'AFTER 6 MONTHS OF COACHING, I SQUATTED MY BODYWEIGHT FOR THE FIRST TIME AND HAVE ZERO BACK PAIN.',
    'Anna M.',
    'Online 1-on-1 Coaching Client',
    5,
    '/images/avatar-1.jpg',
    'about',
    4,
    'published'
  ),
  (
    'I FINALLY STOPPED OBSESSING OVER CALORIES AND STARTED CELEBRATING WHAT MY BODY CAN DO IN THE GYM.',
    'Danielle K.',
    'In-Person Personal Training',
    5,
    '/images/avatar-2.jpg',
    'about',
    5,
    'published'
  )
ON CONFLICT DO NOTHING;

-- 6. Bio Links
INSERT INTO public.bio_links (title, subtitle, href, image_url, is_primary, category, order_index, is_enabled)
VALUES
  ('Book A Free Discovery Call', 'Schedule a 15-minute consultation with our coaching team', '/appointments', NULL, true, 'quick_link', 1, true),
  ('Explore Coaching Services', 'Online coaching and private in-person personal training', '/services', NULL, false, 'quick_link', 2, true),
  ('1:1 Private Mentorship Deep-Dive', 'Comprehensive 1-on-1 coaching experience', '/single-service', NULL, false, 'quick_link', 3, true),
  ('Browse Training Programmes', 'Foundations, Strength & Sculpt, and Hybrid Athlete', '/classes', NULL, false, 'quick_link', 4, true),
  ('Meet The Coaches & Philosophy', 'Our evidence-based female strength philosophy', '/about', NULL, false, 'quick_link', 5, true),
  ('Get In Touch With Us', 'Send us an inquiry or question directly', '/contact', NULL, false, 'quick_link', 6, true),
  ('OUR SIGNATURE PROGRAMMES', 'Explore our Foundations, Strength & Sculpt, and Hybrid coaching splits.', '/classes', '/images/card-strength.jpg', false, 'featured_story', 7, true),
  ('REAL CLIENT RESULTS & CASE STUDIES', 'See how 500+ women built strength and banished gym intimidation.', '/about', '/images/service-collage-1.jpg', false, 'featured_story', 8, true),
  ('IN-PERSON STUDIO & MOVEMENT SCREEN', 'Tour our private training suite and reserve your biomechanical screen.', '/appointments', '/images/callout-equipment.jpg', false, 'featured_story', 9, true)
ON CONFLICT DO NOTHING;

-- 7. Navigation Items
INSERT INTO public.navigation_items (label, href, location, order_index, is_enabled)
VALUES
  ('Home', '/', 'both', 1, true),
  ('About', '/about', 'both', 2, true),
  ('Classes', '/classes', 'both', 3, true),
  ('Services', '/services', 'both', 4, true),
  ('Contact', '/contact', 'both', 5, true)
ON CONFLICT DO NOTHING;
