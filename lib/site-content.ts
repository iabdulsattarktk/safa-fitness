import { db } from "@/lib/db"

// ── Default gallery arrays (JSON stringified) ─────────────────────────────
const GALLERY_DEFAULTS = {
  gallery_gym: JSON.stringify([
    { src: "/images/gallery/gym-floor.webp",    alt: "Gym Floor" },
    { src: "/images/gallery/gym-strength.webp", alt: "Strength Training" },
    { src: "/images/gallery/gym-amenity.webp",  alt: "Gym Equipment" },
    { src: "/images/gallery/gym-2.webp",        alt: "Gym Interior" },
    { src: "/images/gallery/running.webp",      alt: "Run With Us" },
    { src: "/images/gallery/kishwar-pose.webp", alt: "Trainer – Kishwar Ali" },
  ]),
  gallery_pool: JSON.stringify([
    { src: "/images/gallery/pool-1.webp", alt: "Swimming Pool Banner" },
    { src: "/images/gallery/pool-2.webp", alt: "Pool Amenity" },
    { src: "/images/gallery/pool-3.webp", alt: "Swimming Pool" },
    { src: "/images/gallery/pool-4.webp", alt: "Swimming Pool" },
  ]),
  gallery_boxing: JSON.stringify([
    { src: "/images/gallery/boxing-1.webp", alt: "Boxing Ring" },
    { src: "/images/gallery/boxing.webp",   alt: "Boxing Training" },
  ]),
  gallery_sauna: JSON.stringify([
    { src: "/images/gallery/sauna-1.webp", alt: "Sauna" },
    { src: "/images/gallery/sauna-2.webp", alt: "Sauna Amenity" },
    { src: "/images/gallery/sauna-3.webp", alt: "Steam Sauna Jacuzzi" },
  ]),
  gallery_spa: JSON.stringify([
    { src: "/images/gallery/spa-1.webp", alt: "Massage & Spa" },
    { src: "/images/gallery/spa-2.webp", alt: "Massage Amenity" },
  ]),
  gallery_snooker: JSON.stringify([
    { src: "/images/gallery/snooker-1.webp",    alt: "Snooker Lounge" },
    { src: "/images/gallery/snooker-2.webp",    alt: "Snooker Amenity" },
    { src: "/images/gallery/snooker-3.webp",    alt: "Snooker Lounge Banner" },
  ]),
  gallery_salon: JSON.stringify([
    { src: "/images/gallery/salon-1.webp",   alt: "Men's Beauty Salon" },
    { src: "/images/facilities/salon.webp",  alt: "Salon Interior" },
  ]),
  gallery_lockers: JSON.stringify([
    { src: "/images/gallery/locker-1.webp", alt: "VIP Lockers & Showers" },
    { src: "/images/gallery/locker-2.webp", alt: "Lockers Banner" },
    { src: "/images/gallery/locker-3.webp", alt: "VIP Lockers" },
  ]),
  gallery_bar: JSON.stringify([
    { src: "/images/gallery/bar-1.webp", alt: "Safa Bar" },
    { src: "/images/gallery/bar-2.webp", alt: "Safa Bar Amenity" },
    { src: "/images/gallery/bar-3.webp", alt: "Safa Bar Banner" },
  ]),
  gallery_team: JSON.stringify([
    { src: "/images/gallery/team-1.webp",           alt: "Safa Elite Team" },
    { src: "/images/gallery/team-2.webp",           alt: "Meet Our Team" },
    { src: "/images/trainers/kishwar-ali.webp",     alt: "Kishwar Ali" },
    { src: "/images/trainers/trainer-1.webp",       alt: "Trainer" },
    { src: "/images/trainers/trainer-2.webp",       alt: "Trainer" },
    { src: "/images/trainers/kishwar-trainer.webp", alt: "Trainer in Action" },
  ]),
}

export const CONTENT_DEFAULTS: Record<string, { value: string; label: string; type: string }> = {
  // ── Pricing ──────────────────────────────────────────────────────────────
  "price_gym_monthly":    { value: "18,000", label: "Gym Only — Monthly Price (PKR)", type: "NUMBER" },
  "price_gym_original":   { value: "20,000", label: "Gym Only — Original/Crossed Price (PKR)", type: "NUMBER" },
  "price_pool_monthly":   { value: "12,000", label: "Swimming Pool — Monthly Price (PKR)", type: "NUMBER" },
  "price_pool_original":  { value: "15,000", label: "Swimming Pool — Original/Crossed Price (PKR)", type: "NUMBER" },
  "price_combo_monthly":  { value: "28,000", label: "Gym + Pool — Monthly Price (PKR)", type: "NUMBER" },
  "price_combo_original": { value: "30,000", label: "Gym + Pool — Original/Crossed Price (PKR)", type: "NUMBER" },
  "price_day_pass":       { value: "2,500",  label: "Day Pass — Price (PKR)", type: "NUMBER" },
  "price_gym_vip_monthly":  { value: "24,000", label: "Gym + VIP Lockers — Monthly Price (PKR)", type: "NUMBER" },
  "price_gym_vip_original": { value: "26,000", label: "Gym + VIP Lockers — Original/Crossed Price (PKR)", type: "NUMBER" },
  "price_kids_monthly":     { value: "18,000", label: "Kids — Monthly Price (PKR)", type: "NUMBER" },
  "price_kids_reg":         { value: "10,000", label: "Kids — One-time Registration Fee (PKR)", type: "NUMBER" },

  // ── Contact ───────────────────────────────────────────────────────────────
  "contact_phone":    { value: "+92 311 5122277", label: "Phone Number", type: "TEXT" },
  "contact_whatsapp": { value: "923115122277",    label: "WhatsApp Number (digits only)", type: "TEXT" },
  "contact_address":  { value: "F-7 Markaz, Safa Gold Mall, 2nd Floor, Islamabad", label: "Address", type: "TEXT" },
  "contact_email":    { value: "info@safafitnessclub.com", label: "Email Address", type: "TEXT" },

  // ── Hours ─────────────────────────────────────────────────────────────────
  "hours_weekday": { value: "6:00 AM – 10:00 PM", label: "Mon–Fri Hours", type: "TEXT" },
  "hours_weekend": { value: "7:00 AM – 9:00 PM",  label: "Sat–Sun Hours", type: "TEXT" },

  // ── Hero text ─────────────────────────────────────────────────────────────
  "hero_tagline": { value: "Transform Your Body. Elevate Your Life.", label: "Hero Tagline Text", type: "TEXT" },

  // ── HOME — Single images ──────────────────────────────────────────────────
  "img_hero":             { value: "",                                    label: "Home · Hero background image (leave blank = video)", type: "IMAGE_URL" },
  "img_parallax_boxing":  { value: "/images/gallery/boxing.webp",         label: "Home · Parallax banner 1 (boxing/fitness)",          type: "IMAGE_URL" },
  "img_parallax_running": { value: "/images/gallery/running.webp",        label: "Home · Parallax banner 2 (running)",                 type: "IMAGE_URL" },

  // ── FACILITIES — Individual card images (used on Home + About) ────────────
  "img_gym":     { value: "/images/facilities/gym.webp",           label: "Facility · Gym & Fitness",          type: "IMAGE_URL" },
  "img_pool":    { value: "/images/facilities/swimming-pool.webp", label: "Facility · Swimming Pool",          type: "IMAGE_URL" },
  "img_boxing":  { value: "/images/facilities/boxing.webp",        label: "Facility · Boxing Ring",            type: "IMAGE_URL" },
  "img_spa":     { value: "/images/facilities/massage-spa.webp",   label: "Facility · Massage & Spa",          type: "IMAGE_URL" },
  "img_sauna":   { value: "/images/facilities/sauna.webp",         label: "Facility · Steam, Sauna & Jacuzzi", type: "IMAGE_URL" },
  "img_salon":   { value: "/images/facilities/salon.webp",         label: "Facility · Beauty Salon – Men",     type: "IMAGE_URL" },
  "img_lockers": { value: "/images/facilities/lockers.webp",       label: "Facility · VIP Lockers & Shower",   type: "IMAGE_URL" },
  "img_snooker": { value: "/images/facilities/snooker.webp",       label: "Facility · Snooker Lounge",         type: "IMAGE_URL" },
  "img_bar":     { value: "/images/facilities/safa-bar.webp",      label: "Facility · Safa Bar",               type: "IMAGE_URL" },

  // ── TRAINERS — Individual photos ──────────────────────────────────────────
  "img_trainer_rahila":  { value: "/images/trainers/trainer-1.webp",   label: "Trainer · Rahila Sher",       type: "IMAGE_URL" },
  "img_trainer_huma":    { value: "/images/trainers/trainer-2.webp",   label: "Trainer · Huma Mumtaz",       type: "IMAGE_URL" },
  "img_trainer_kishwar": { value: "/images/trainers/kishwar-ali.webp", label: "Trainer · Kishwar Ali",       type: "IMAGE_URL" },
  "img_trainer_danish":  { value: "/images/trainers/trainer-3.webp",   label: "Trainer · Danish Masih Gill", type: "IMAGE_URL" },
  "img_trainer_sohail":  { value: "/images/trainers/trainer-4.webp",   label: "Trainer · Muhammad Sohail",   type: "IMAGE_URL" },

  // ── ABOUT PAGE ────────────────────────────────────────────────────────────
  "img_about_banner": { value: "/images/team-banner.webp",  label: "About · Hero/Team Banner image",   type: "IMAGE_URL" },
  "img_about_us":     { value: "/images/about-us.webp",     label: "About · Our Story side image",     type: "IMAGE_URL" },

  // ── TRAINERS PAGE ─────────────────────────────────────────────────────────
  "img_trainers_banner": { value: "/images/team-banner2.webp", label: "Trainers · Page hero banner image", type: "IMAGE_URL" },

  // ── GALLERY PAGE — Arrays (add/remove images per category) ───────────────
  "gallery_gym":     { value: GALLERY_DEFAULTS.gallery_gym,     label: "Gallery · Gym & Fitness",         type: "JSON" },
  "gallery_pool":    { value: GALLERY_DEFAULTS.gallery_pool,    label: "Gallery · Swimming Pool",         type: "JSON" },
  "gallery_boxing":  { value: GALLERY_DEFAULTS.gallery_boxing,  label: "Gallery · Boxing Ring",           type: "JSON" },
  "gallery_sauna":   { value: GALLERY_DEFAULTS.gallery_sauna,   label: "Gallery · Steam, Sauna & Jacuzzi", type: "JSON" },
  "gallery_spa":     { value: GALLERY_DEFAULTS.gallery_spa,     label: "Gallery · Massage & Spa",         type: "JSON" },
  "gallery_snooker": { value: GALLERY_DEFAULTS.gallery_snooker, label: "Gallery · Snooker Lounge",        type: "JSON" },
  "gallery_salon":   { value: GALLERY_DEFAULTS.gallery_salon,   label: "Gallery · Beauty Salon – Men",    type: "JSON" },
  "gallery_lockers": { value: GALLERY_DEFAULTS.gallery_lockers, label: "Gallery · VIP Lockers & Shower",  type: "JSON" },
  "gallery_bar":     { value: GALLERY_DEFAULTS.gallery_bar,     label: "Gallery · Safa Bar",              type: "JSON" },
  "gallery_team":    { value: GALLERY_DEFAULTS.gallery_team,    label: "Gallery · Our Team",              type: "JSON" },

  // ── HOME PAGE — Hero ──────────────────────────────────────────────────────
  "home_hero_badge":   { value: "Islamabad's Premier Fitness Destination", label: "Hero · Badge text",              type: "TEXT" },
  "home_hero_title1":  { value: "Elite",        label: "Hero · Headline line 1",              type: "TEXT" },
  "home_hero_title2":  { value: "Performance",  label: "Hero · Headline line 2 (orange)",     type: "TEXT" },
  "home_hero_sub":     { value: "Where Wellness meets Elegance in the Heart of Islamabad. Transforming lives for 8+ years with state-of-the-art facilities and expert trainers.", label: "Hero · Sub-heading", type: "TEXT" },
  "home_hero_btn1":    { value: "Join Now",      label: "Hero · Primary button label",         type: "TEXT" },
  "home_hero_btn2":    { value: "Explore Club",  label: "Hero · Secondary button label",       type: "TEXT" },

  // ── HOME PAGE — Facilities section ────────────────────────────────────────
  "home_fac_tag":      { value: "What We Offer",             label: "Facilities · Section badge",    type: "TEXT" },
  "home_fac_h2":       { value: "Premium Fitness Amenities", label: "Facilities · Section heading",  type: "TEXT" },
  "home_fac_0_title":  { value: "Gym & Fitness",             label: "Facility 1 (Gym) · Title",      type: "TEXT" },
  "home_fac_0_desc":   { value: "Boost your strength and endurance with expert-guided training in a premium environment.", label: "Facility 1 (Gym) · Description", type: "TEXT" },
  "home_fac_0_badge":  { value: "★ Most Used",               label: "Facility 1 (Gym) · Badge (blank = hidden)", type: "TEXT" },
  "home_fac_1_title":  { value: "Swimming Pool",             label: "Facility 2 (Pool) · Title",     type: "TEXT" },
  "home_fac_1_desc":   { value: "Enjoy a luxurious heated indoor pool for fitness, strength, relaxation, and swim classes.", label: "Facility 2 (Pool) · Description", type: "TEXT" },
  "home_fac_1_badge":  { value: "Heated Indoor",             label: "Facility 2 (Pool) · Badge",     type: "TEXT" },
  "home_fac_2_title":  { value: "Boxing Ring",               label: "Facility 3 (Boxing) · Title",   type: "TEXT" },
  "home_fac_2_desc":   { value: "Step into the ring for professional-level boxing, kickboxing, and combat training.", label: "Facility 3 (Boxing) · Description", type: "TEXT" },
  "home_fac_2_badge":  { value: "High Demand",               label: "Facility 3 (Boxing) · Badge",   type: "TEXT" },
  "home_fac_3_title":  { value: "Massage & Spa",             label: "Facility 4 (Spa) · Title",      type: "TEXT" },
  "home_fac_3_desc":   { value: "Unwind with therapeutic massages and rejuvenating spa treatments.", label: "Facility 4 (Spa) · Description", type: "TEXT" },
  "home_fac_3_badge":  { value: "",                          label: "Facility 4 (Spa) · Badge",      type: "TEXT" },
  "home_fac_4_title":  { value: "Steam, Sauna & Jacuzzi",   label: "Facility 5 (Sauna) · Title",    type: "TEXT" },
  "home_fac_4_desc":   { value: "Detox and relax with our wellness-focused heat and hydrotherapy zone.", label: "Facility 5 (Sauna) · Description", type: "TEXT" },
  "home_fac_4_badge":  { value: "Recovery Zone",            label: "Facility 5 (Sauna) · Badge",    type: "TEXT" },
  "home_fac_5_title":  { value: "Beauty Salon – Men",       label: "Facility 6 (Salon) · Title",    type: "TEXT" },
  "home_fac_5_desc":   { value: "Modern grooming and styling services tailored for the modern gentleman.", label: "Facility 6 (Salon) · Description", type: "TEXT" },
  "home_fac_5_badge":  { value: "",                         label: "Facility 6 (Salon) · Badge",    type: "TEXT" },
  "home_fac_6_title":  { value: "VIP Lockers & Shower",     label: "Facility 7 (Lockers) · Title",  type: "TEXT" },
  "home_fac_6_desc":   { value: "Spacious private lockers and premium showers for your comfort and security.", label: "Facility 7 (Lockers) · Description", type: "TEXT" },
  "home_fac_6_badge":  { value: "VIP Access",               label: "Facility 7 (Lockers) · Badge",  type: "TEXT" },
  "home_fac_7_title":  { value: "Snooker Lounge",           label: "Facility 8 (Snooker) · Title",  type: "TEXT" },
  "home_fac_7_desc":   { value: "Chill and compete in a lounge designed for snooker lovers.", label: "Facility 8 (Snooker) · Description", type: "TEXT" },
  "home_fac_7_badge":  { value: "",                         label: "Facility 8 (Snooker) · Badge",  type: "TEXT" },
  "home_fac_8_title":  { value: "Safa Bar",                 label: "Facility 9 (Bar) · Title",      type: "TEXT" },
  "home_fac_8_desc":   { value: "Refuel with healthy drinks, smoothies, and premium refreshments in style.", label: "Facility 9 (Bar) · Description", type: "TEXT" },
  "home_fac_8_badge":  { value: "",                         label: "Facility 9 (Bar) · Badge",      type: "TEXT" },

  // ── HOME PAGE — Featured Split Sections ───────────────────────────────────
  "home_split_0_tag":   { value: "Premium Facility",    label: "Featured 1 (Pool) · Tag",   type: "TEXT" },
  "home_split_0_title": { value: "Heated Indoor Swimming Pool", label: "Featured 1 (Pool) · Title", type: "TEXT" },
  "home_split_0_body":  { value: "Islamabad's finest indoor heated pool — open year-round. Perfect for lap swimming, aqua fitness, or simply unwinding. Professional swim coaching available for all levels.", label: "Featured 1 (Pool) · Body text", type: "TEXT" },
  "home_split_1_tag":   { value: "Combat Zone",          label: "Featured 2 (Boxing) · Tag",   type: "TEXT" },
  "home_split_1_title": { value: "Professional Boxing Ring", label: "Featured 2 (Boxing) · Title", type: "TEXT" },
  "home_split_1_body":  { value: "A full-size boxing ring with professional coaching from Rahila Sher — Pakistan Army veteran and national medal winner. Open to complete beginners and competitive athletes alike.", label: "Featured 2 (Boxing) · Body text", type: "TEXT" },
  "home_split_2_tag":   { value: "Recovery & Wellness",  label: "Featured 3 (Sauna) · Tag",    type: "TEXT" },
  "home_split_2_title": { value: "Steam · Sauna · Jacuzzi", label: "Featured 3 (Sauna) · Title", type: "TEXT" },
  "home_split_2_body":  { value: "Recover faster, sleep deeper, and de-stress completely. Our wellness zone combines dry sauna, steam room, and a heated jacuzzi — the ideal post-workout ritual.", label: "Featured 3 (Sauna) · Body text", type: "TEXT" },

  // ── HOME PAGE — Classes section ───────────────────────────────────────────
  "home_cls_tag":       { value: "Train With The Best",  label: "Classes · Section badge",    type: "TEXT" },
  "home_cls_h2":        { value: "Our MasterClasses",    label: "Classes · Section heading",  type: "TEXT" },
  "home_cls_0_name":    { value: "Strength Training",    label: "Class 1 · Name",    type: "TEXT" },
  "home_cls_0_trainer": { value: "Kishwar Ali",          label: "Class 1 · Trainer", type: "TEXT" },
  "home_cls_0_level":   { value: "All Levels",           label: "Class 1 · Level",   type: "TEXT" },
  "home_cls_0_proof":   { value: "28+ yrs experience",  label: "Class 1 · Proof badge", type: "TEXT" },
  "home_cls_1_name":    { value: "Boxing & Kickboxing",  label: "Class 2 · Name",    type: "TEXT" },
  "home_cls_1_trainer": { value: "Rahila Sher",          label: "Class 2 · Trainer", type: "TEXT" },
  "home_cls_1_level":   { value: "Beginner–Advanced",   label: "Class 2 · Level",   type: "TEXT" },
  "home_cls_1_proof":   { value: "National Gold Medalist", label: "Class 2 · Proof badge", type: "TEXT" },
  "home_cls_2_name":    { value: "Body Transformation",  label: "Class 3 · Name",    type: "TEXT" },
  "home_cls_2_trainer": { value: "Huma Mumtaz",          label: "Class 3 · Trainer", type: "TEXT" },
  "home_cls_2_level":   { value: "All Levels",           label: "Class 3 · Level",   type: "TEXT" },
  "home_cls_2_proof":   { value: "ISSA Certified USA",   label: "Class 3 · Proof badge", type: "TEXT" },
  "home_cls_3_name":    { value: "HIIT & CrossFit",      label: "Class 4 · Name",    type: "TEXT" },
  "home_cls_3_trainer": { value: "Huma Mumtaz",          label: "Class 4 · Trainer", type: "TEXT" },
  "home_cls_3_level":   { value: "Intermediate",         label: "Class 4 · Level",   type: "TEXT" },
  "home_cls_3_proof":   { value: "10+ yrs experience",  label: "Class 4 · Proof badge", type: "TEXT" },
  "home_cls_4_name":    { value: "Swimming",             label: "Class 5 · Name",    type: "TEXT" },
  "home_cls_4_trainer": { value: "Muhammad Sohail",      label: "Class 5 · Trainer", type: "TEXT" },
  "home_cls_4_level":   { value: "All Levels",           label: "Class 5 · Level",   type: "TEXT" },
  "home_cls_4_proof":   { value: "BLS Certified Coach",  label: "Class 5 · Proof badge", type: "TEXT" },
  "home_cls_5_name":    { value: "Combat Training",      label: "Class 6 · Name",    type: "TEXT" },
  "home_cls_5_trainer": { value: "Kishwar Ali",          label: "Class 6 · Trainer", type: "TEXT" },
  "home_cls_5_level":   { value: "All Levels",           label: "Class 6 · Level",   type: "TEXT" },
  "home_cls_5_proof":   { value: "200+ clients trained", label: "Class 6 · Proof badge", type: "TEXT" },

  // ── HOME PAGE — Journey Steps ─────────────────────────────────────────────
  "home_steps_tag":    { value: "Your Path to Success",  label: "Steps · Section badge",   type: "TEXT" },
  "home_steps_h2":     { value: "Stop Wishing. Start Doing.", label: "Steps · Heading",    type: "TEXT" },
  "home_steps_sub":    { value: "Your transformation journey in 4 simple steps", label: "Steps · Sub-heading", type: "TEXT" },
  "home_step_0_title": { value: "Movement", label: "Step 1 · Title", type: "TEXT" },
  "home_step_0_desc":  { value: "Every great journey begins with a single step. Lace up and get moving — walk, run, or hit the gym.", label: "Step 1 · Description", type: "TEXT" },
  "home_step_1_title": { value: "Time",     label: "Step 2 · Title", type: "TEXT" },
  "home_step_1_desc":  { value: "Consistency is key. Make time for your fitness, even if it's just a few minutes a day — it all adds up!", label: "Step 2 · Description", type: "TEXT" },
  "home_step_2_title": { value: "Practise", label: "Step 3 · Title", type: "TEXT" },
  "home_step_2_desc":  { value: "Push your limits, challenge yourself, and improve every day. Progress comes with persistence.", label: "Step 3 · Description", type: "TEXT" },
  "home_step_3_title": { value: "Results",  label: "Step 4 · Title", type: "TEXT" },
  "home_step_3_desc":  { value: "Stay dedicated and the results will follow. A healthier, stronger you is just around the corner.", label: "Step 4 · Description", type: "TEXT" },

  // ── HOME PAGE — Parallax Quotes ───────────────────────────────────────────
  "home_para1_quote": { value: "Push Your Limits Every Single Day",                  label: "Parallax 1 · Quote",    type: "TEXT" },
  "home_para1_sub":   { value: "Safa Fitness Club — Islamabad",                      label: "Parallax 1 · Sub text", type: "TEXT" },
  "home_para2_quote": { value: "Your Only Competition Is Who You Were Yesterday",    label: "Parallax 2 · Quote",    type: "TEXT" },

  // ── HOME PAGE — Trainers section heading ──────────────────────────────────
  "home_tr_tag": { value: "The Safa Elite Team", label: "Trainers Section · Badge",   type: "TEXT" },
  "home_tr_h2":  { value: "Meet Your Trainers",  label: "Trainers Section · Heading", type: "TEXT" },

  // ── HOME PAGE — Pricing section heading ───────────────────────────────────
  "home_pricing_tag": { value: "Choose Your Level",  label: "Pricing Section · Badge",   type: "TEXT" },
  "home_pricing_h2":  { value: "Membership Plans",   label: "Pricing Section · Heading", type: "TEXT" },

  // ── HOME PAGE — Testimonials ──────────────────────────────────────────────
  "home_test_tag":     { value: "Real Members",    label: "Testimonials · Badge",   type: "TEXT" },
  "home_test_h2":      { value: "What They Say",   label: "Testimonials · Heading", type: "TEXT" },
  "home_test_0_name":  { value: "Rana Samreen",    label: "Testimonial 1 · Name",   type: "TEXT" },
  "home_test_0_since": { value: "Member since 2016", label: "Testimonial 1 · Since", type: "TEXT" },
  "home_test_0_text":  { value: "Now it is the best gym of Islamabad having best hygiene, latest and advanced equipment, experienced trainers with decent secure environment.", label: "Testimonial 1 · Review", type: "TEXT" },
  "home_test_1_name":  { value: "Umer AbdurRehman", label: "Testimonial 2 · Name",  type: "TEXT" },
  "home_test_1_since": { value: "6 months member",  label: "Testimonial 2 · Since", type: "TEXT" },
  "home_test_1_text":  { value: "This place is just love. It offers lockers, towels, shower, swimming pool, jacuzzi, weight area, cardio area, exceptional trainers, sauna, steam, massage, and many more.", label: "Testimonial 2 · Review", type: "TEXT" },
  "home_test_2_name":  { value: "Ayesha Tariq",    label: "Testimonial 3 · Name",   type: "TEXT" },
  "home_test_2_since": { value: "Member since 2021", label: "Testimonial 3 · Since", type: "TEXT" },
  "home_test_2_text":  { value: "The swimming pool and sauna facilities are absolutely top notch. Staff is very professional and the trainers are extremely knowledgeable. Best investment I have made for my health.", label: "Testimonial 3 · Review", type: "TEXT" },
  "home_test_3_name":  { value: "Bilal Hussain",   label: "Testimonial 4 · Name",   type: "TEXT" },
  "home_test_3_since": { value: "Member since 2020", label: "Testimonial 4 · Since", type: "TEXT" },
  "home_test_3_text":  { value: "Came for the gym, stayed for everything else. The boxing ring, steam room, and jacuzzi make this far more than just a gym. Kishwar sir's training completely transformed my fitness.", label: "Testimonial 4 · Review", type: "TEXT" },

  // ── HOME PAGE — Gallery strip & CTA ──────────────────────────────────────
  "home_gal_tag":      { value: "Inside Safa Fitness",  label: "Gallery Strip · Badge",   type: "TEXT" },
  "home_gal_h2":       { value: "See Our World",         label: "Gallery Strip · Heading", type: "TEXT" },
  "home_cta_heading":  { value: "Ready to Join the Elite?", label: "Home CTA · Heading",   type: "TEXT" },
  "home_cta_sub":      { value: "Visit us at Safa Gold Mall, F-7 Markaz, Islamabad. Walk-ins welcome.", label: "Home CTA · Sub-heading", type: "TEXT" },
  "home_cta_btn1":     { value: "View Memberships",      label: "Home CTA · Primary button",   type: "TEXT" },
  "home_cta_btn2":     { value: "Contact Us",            label: "Home CTA · Secondary button", type: "TEXT" },

  // ── ABOUT PAGE — Hero ─────────────────────────────────────────────────────
  "about_hero_badge":    { value: "Who We Are",   label: "About Hero · Badge text",          type: "TEXT" },
  "about_hero_h1":       { value: "About",         label: "About Hero · Headline word 1",     type: "TEXT" },
  "about_hero_h1_orange":{ value: "Us",            label: "About Hero · Headline word 2 (orange)", type: "TEXT" },

  // ── ABOUT PAGE — Our Story ────────────────────────────────────────────────
  "about_story_tag":  { value: "Our Story",         label: "Our Story · Badge",       type: "TEXT" },
  "about_story_h2a":  { value: "8 Years of Transforming", label: "Our Story · Heading line 1", type: "TEXT" },
  "about_story_h2b":  { value: "Lives in Islamabad",      label: "Our Story · Heading line 2 (orange)", type: "TEXT" },
  "about_story_p1":   { value: "Safa Fitness Club was founded with a single vision — to bring world-class fitness and wellness to Islamabad. Located at the 5th Floor of Safa Gold Mall in F-7 Markaz, we have spent 8+ years building a community of health-conscious individuals who refuse to settle for less.", label: "Our Story · Paragraph 1", type: "TEXT" },
  "about_story_p2":   { value: "From our state-of-the-art gym floor to our heated indoor swimming pool, professional boxing ring, spa, sauna, and more — every corner of Safa Fitness Club is designed for one purpose: your transformation.", label: "Our Story · Paragraph 2", type: "TEXT" },
  "about_story_p3":   { value: "We believe fitness is not just physical. It is mental strength, discipline, and community. Our certified trainers, premium facilities, and welcoming environment make us Islamabad's most complete fitness destination.", label: "Our Story · Paragraph 3", type: "TEXT" },

  // ── ABOUT PAGE — Core Values ──────────────────────────────────────────────
  "about_values_tag":    { value: "What Drives Us",  label: "Core Values · Badge",   type: "TEXT" },
  "about_values_h2":     { value: "Our Core Values", label: "Core Values · Heading",  type: "TEXT" },
  "about_val_0_title":   { value: "Excellence",      label: "Value 1 · Title",       type: "TEXT" },
  "about_val_0_desc":    { value: "State-of-the-art equipment and world-class facilities that match international fitness standards.", label: "Value 1 · Description", type: "TEXT" },
  "about_val_0_img":     { value: "/images/facilities/gym.webp",             label: "Value 1 · Image", type: "IMAGE_URL" },
  "about_val_1_title":   { value: "Community",       label: "Value 2 · Title",       type: "TEXT" },
  "about_val_1_desc":    { value: "A welcoming environment where members of all fitness levels feel motivated and supported.", label: "Value 2 · Description", type: "TEXT" },
  "about_val_1_img":     { value: "/images/team-banner2.webp",               label: "Value 2 · Image", type: "IMAGE_URL" },
  "about_val_2_title":   { value: "Expertise",       label: "Value 3 · Title",       type: "TEXT" },
  "about_val_2_desc":    { value: "Certified trainers with decades of combined experience delivering personalized programs.", label: "Value 3 · Description", type: "TEXT" },
  "about_val_2_img":     { value: "/images/trainers/kishwar-trainer.webp",   label: "Value 3 · Image", type: "IMAGE_URL" },
  "about_val_3_title":   { value: "Wellness",        label: "Value 4 · Title",       type: "TEXT" },
  "about_val_3_desc":    { value: "Holistic approach to health — from gym and pool to spa, sauna, and nutrition guidance.", label: "Value 4 · Description", type: "TEXT" },
  "about_val_3_img":     { value: "/images/facilities/sauna.webp",           label: "Value 4 · Image", type: "IMAGE_URL" },

  // ── ABOUT PAGE — Meet the Team ────────────────────────────────────────────
  "about_team_tag":  { value: "The Safa Elite Team", label: "Meet Team · Badge",   type: "TEXT" },
  "about_team_h2":   { value: "Meet Our Experts",    label: "Meet Team · Heading", type: "TEXT" },

  // ── ABOUT PAGE — Trainer cards (name/role/cert/bio) ───────────────────────
  "about_tr_0_name":  { value: "Rahila Sher",        label: "About Trainer 1 · Name",  type: "TEXT" },
  "about_tr_0_role":  { value: "Professional Boxer", label: "About Trainer 1 · Role",  type: "TEXT" },
  "about_tr_0_cert":  { value: "2 Gold, 1 Silver, 1 Bronze medals", label: "About Trainer 1 · Cert", type: "TEXT" },
  "about_tr_0_bio":   { value: "A champion boxer who brings professional-level boxing and kickboxing training to Safa Fitness Club.", label: "About Trainer 1 · Bio", type: "TEXT" },
  "about_tr_1_name":  { value: "Huma Mumtaz",        label: "About Trainer 2 · Name",  type: "TEXT" },
  "about_tr_1_role":  { value: "Transformation Expert", label: "About Trainer 2 · Role", type: "TEXT" },
  "about_tr_1_cert":  { value: "ISSA Certified – USA", label: "About Trainer 2 · Cert", type: "TEXT" },
  "about_tr_1_bio":   { value: "Internationally certified transformation specialist helping hundreds achieve their body and health goals.", label: "About Trainer 2 · Bio", type: "TEXT" },
  "about_tr_2_name":  { value: "Kishwar Ali",        label: "About Trainer 3 · Name",  type: "TEXT" },
  "about_tr_2_role":  { value: "Combat Trainer & Floor In-Charge", label: "About Trainer 3 · Role", type: "TEXT" },
  "about_tr_2_cert":  { value: "Senior Fitness Specialist", label: "About Trainer 3 · Cert", type: "TEXT" },
  "about_tr_2_bio":   { value: "With nearly three decades of experience, Kishwar is the backbone of Safa Fitness Club's training floor.", label: "About Trainer 3 · Bio", type: "TEXT" },
  "about_tr_3_name":  { value: "Danish Masih Gill",  label: "About Trainer 4 · Name",  type: "TEXT" },
  "about_tr_3_role":  { value: "Personal Trainer",   label: "About Trainer 4 · Role",  type: "TEXT" },
  "about_tr_3_cert":  { value: "200+ Clients Transformed", label: "About Trainer 4 · Cert", type: "TEXT" },
  "about_tr_3_bio":   { value: "A dedicated personal trainer with a proven track record of helping clients achieve consistent, lasting results.", label: "About Trainer 4 · Bio", type: "TEXT" },
  "about_tr_4_name":  { value: "Muhammad Sohail",    label: "About Trainer 5 · Name",  type: "TEXT" },
  "about_tr_4_role":  { value: "Swimming Coach",     label: "About Trainer 5 · Role",  type: "TEXT" },
  "about_tr_4_cert":  { value: "BLS Certified",      label: "About Trainer 5 · Cert",  type: "TEXT" },
  "about_tr_4_bio":   { value: "Expert swimming coach offering structured aquatic fitness programs for beginners to advanced swimmers.", label: "About Trainer 5 · Bio", type: "TEXT" },

  // ── ABOUT PAGE — Facility Tour ────────────────────────────────────────────
  "about_fac_tag":    { value: "Explore the Club",  label: "Facilities Tour · Badge",    type: "TEXT" },
  "about_fac_h2":     { value: "Our Facilities",    label: "Facilities Tour · Heading",  type: "TEXT" },
  "about_fac_sub":    { value: "Every facility is maintained to the highest standards of cleanliness, safety, and performance.", label: "Facilities Tour · Sub-heading", type: "TEXT" },
  "about_fac_0_title":{ value: "Gym & Fitness",     label: "About Facility 1 (Gym) · Title",     type: "TEXT" },
  "about_fac_0_desc": { value: "Fully equipped with premium machines and free weights for strength, cardio, and functional training.", label: "About Facility 1 (Gym) · Description", type: "TEXT" },
  "about_fac_1_title":{ value: "Swimming Pool",     label: "About Facility 2 (Pool) · Title",    type: "TEXT" },
  "about_fac_1_desc": { value: "A heated indoor pool for lap swimming, aqua fitness, and relaxation.", label: "About Facility 2 (Pool) · Description", type: "TEXT" },
  "about_fac_2_title":{ value: "Boxing Ring",       label: "About Facility 3 (Boxing) · Title",  type: "TEXT" },
  "about_fac_2_desc": { value: "Professional-grade boxing ring for combat training, sparring, and kickboxing sessions.", label: "About Facility 3 (Boxing) · Description", type: "TEXT" },
  "about_fac_3_title":{ value: "Massage & Spa",     label: "About Facility 4 (Spa) · Title",     type: "TEXT" },
  "about_fac_3_desc": { value: "Therapeutic massages and rejuvenating spa treatments to help you recover and relax.", label: "About Facility 4 (Spa) · Description", type: "TEXT" },
  "about_fac_4_title":{ value: "Steam, Sauna & Jacuzzi", label: "About Facility 5 (Sauna) · Title", type: "TEXT" },
  "about_fac_4_desc": { value: "Detox and unwind with our dedicated heat therapy and hydrotherapy zone.", label: "About Facility 5 (Sauna) · Description", type: "TEXT" },
  "about_fac_5_title":{ value: "Beauty Salon – Men", label: "About Facility 6 (Salon) · Title",  type: "TEXT" },
  "about_fac_5_desc": { value: "Premium grooming and styling services for the modern gentleman.", label: "About Facility 6 (Salon) · Description", type: "TEXT" },
  "about_fac_6_title":{ value: "VIP Lockers & Shower", label: "About Facility 7 (Lockers) · Title", type: "TEXT" },
  "about_fac_6_desc": { value: "Spacious private lockers and premium shower facilities for your comfort.", label: "About Facility 7 (Lockers) · Description", type: "TEXT" },
  "about_fac_7_title":{ value: "Snooker Lounge",   label: "About Facility 8 (Snooker) · Title", type: "TEXT" },
  "about_fac_7_desc": { value: "A relaxed lounge space to unwind and enjoy a game of snooker after your workout.", label: "About Facility 8 (Snooker) · Description", type: "TEXT" },
  "about_fac_8_title":{ value: "Safa Bar",          label: "About Facility 9 (Bar) · Title",    type: "TEXT" },
  "about_fac_8_desc": { value: "Healthy smoothies, protein shakes, and premium refreshments to fuel your fitness journey.", label: "About Facility 9 (Bar) · Description", type: "TEXT" },

  // ── ABOUT PAGE — Visit Us & CTA ───────────────────────────────────────────
  "about_visit_tag":   { value: "Find Us",           label: "Visit Us · Badge",            type: "TEXT" },
  "about_visit_h2":    { value: "Visit the Club",    label: "Visit Us · Heading",           type: "TEXT" },
  "about_cta_heading": { value: "Ready to Start Your Journey?", label: "About CTA · Heading",   type: "TEXT" },
  "about_cta_sub":     { value: "Join Islamabad's most complete fitness club. Walk-ins welcome at Safa Gold Mall, F-7 Markaz.", label: "About CTA · Sub-heading", type: "TEXT" },
  "about_cta_btn1":    { value: "View Memberships",  label: "About CTA · Primary button",  type: "TEXT" },
  "about_cta_btn2":    { value: "Contact Us",        label: "About CTA · Secondary button", type: "TEXT" },

  // ── CLASSES PAGE — Hero ───────────────────────────────────────────────────
  "classes_hero_badge":    { value: "Train With The Best", label: "Classes Hero · Badge text",          type: "TEXT" },
  "classes_hero_h1":       { value: "Our",                  label: "Classes Hero · Headline word 1",     type: "TEXT" },
  "classes_hero_h1_orange":{ value: "Classes",              label: "Classes Hero · Headline word 2 (orange)", type: "TEXT" },
  "classes_hero_img":      { value: "/images/facilities/boxing.webp", label: "Classes Hero · Banner image", type: "IMAGE_URL" },

  // ── CLASSES PAGE — Grid section ───────────────────────────────────────────
  "classes_grid_tag": { value: "Expert-Led Sessions", label: "Classes Grid · Badge",       type: "TEXT" },
  "classes_grid_h2":  { value: "Master Classes",       label: "Classes Grid · Heading",     type: "TEXT" },
  "classes_grid_sub": { value: "Every class is led by a certified expert. Whether you are a beginner or a seasoned athlete, there is a program for you.", label: "Classes Grid · Sub-heading", type: "TEXT" },

  // ── CLASSES PAGE — Class cards (6 cards) ─────────────────────────────────
  "classes_0_name":     { value: "Strength Training",       label: "Class 1 · Name",     type: "TEXT" },
  "classes_0_category": { value: "Gym",                     label: "Class 1 · Category", type: "TEXT" },
  "classes_0_trainer":  { value: "Kishwar Ali",             label: "Class 1 · Trainer",  type: "TEXT" },
  "classes_0_level":    { value: "All Levels",              label: "Class 1 · Level",    type: "TEXT" },
  "classes_0_duration": { value: "60 min",                  label: "Class 1 · Duration", type: "TEXT" },
  "classes_0_desc":     { value: "Build raw strength and muscle with our progressive training system. Suitable for beginners and advanced athletes alike, with expert guidance on form and technique.", label: "Class 1 · Description", type: "TEXT" },
  "classes_0_proof":    { value: "28+ years experience · 200+ clients", label: "Class 1 · Social proof", type: "TEXT" },
  "classes_0_img":      { value: "/images/facilities/gym.webp",          label: "Class 1 · Image",        type: "IMAGE_URL" },
  "classes_1_name":     { value: "Boxing & Kickboxing",     label: "Class 2 · Name",     type: "TEXT" },
  "classes_1_category": { value: "Combat",                  label: "Class 2 · Category", type: "TEXT" },
  "classes_1_trainer":  { value: "Rahila Sher",             label: "Class 2 · Trainer",  type: "TEXT" },
  "classes_1_level":    { value: "Beginner – Advanced",     label: "Class 2 · Level",    type: "TEXT" },
  "classes_1_duration": { value: "60 min",                  label: "Class 2 · Duration", type: "TEXT" },
  "classes_1_desc":     { value: "Train with a 2-time gold medal boxer. Learn proper footwork, combinations, and defensive techniques in Safa's professional-grade boxing ring.", label: "Class 2 · Description", type: "TEXT" },
  "classes_1_proof":    { value: "National Boxer · 2 Gold, 1 Silver, 1 Bronze", label: "Class 2 · Social proof", type: "TEXT" },
  "classes_1_img":      { value: "/images/facilities/boxing.webp",        label: "Class 2 · Image",        type: "IMAGE_URL" },
  "classes_2_name":     { value: "Body Transformation",     label: "Class 3 · Name",     type: "TEXT" },
  "classes_2_category": { value: "Fitness",                 label: "Class 3 · Category", type: "TEXT" },
  "classes_2_trainer":  { value: "Huma Mumtaz",             label: "Class 3 · Trainer",  type: "TEXT" },
  "classes_2_level":    { value: "All Levels",              label: "Class 3 · Level",    type: "TEXT" },
  "classes_2_duration": { value: "60 min",                  label: "Class 3 · Duration", type: "TEXT" },
  "classes_2_desc":     { value: "A results-focused program designed by ISSA-certified trainer Huma Mumtaz. Combines resistance training, cardio, and nutrition guidance for visible transformation.", label: "Class 3 · Description", type: "TEXT" },
  "classes_2_proof":    { value: "ISSA Certified USA · 10+ years",         label: "Class 3 · Social proof", type: "TEXT" },
  "classes_2_img":      { value: "/images/classes/transformation.jpg",     label: "Class 3 · Image",        type: "IMAGE_URL" },
  "classes_3_name":     { value: "HIIT & CrossFit",          label: "Class 4 · Name",     type: "TEXT" },
  "classes_3_category": { value: "Cardio",                   label: "Class 4 · Category", type: "TEXT" },
  "classes_3_trainer":  { value: "Huma Mumtaz",              label: "Class 4 · Trainer",  type: "TEXT" },
  "classes_3_level":    { value: "Intermediate",             label: "Class 4 · Level",    type: "TEXT" },
  "classes_3_duration": { value: "45 min",                   label: "Class 4 · Duration", type: "TEXT" },
  "classes_3_desc":     { value: "High-intensity interval training that torches calories and builds endurance. Each session is different — keeping you challenged and your body adapting.", label: "Class 4 · Description", type: "TEXT" },
  "classes_3_proof":    { value: "Burns up to 600 kcal/session",           label: "Class 4 · Social proof", type: "TEXT" },
  "classes_3_img":      { value: "/images/classes/hiit.jpg",               label: "Class 4 · Image",        type: "IMAGE_URL" },
  "classes_4_name":     { value: "Swimming",                 label: "Class 5 · Name",     type: "TEXT" },
  "classes_4_category": { value: "Aquatics",                 label: "Class 5 · Category", type: "TEXT" },
  "classes_4_trainer":  { value: "Muhammad Sohail",          label: "Class 5 · Trainer",  type: "TEXT" },
  "classes_4_level":    { value: "All Levels",               label: "Class 5 · Level",    type: "TEXT" },
  "classes_4_duration": { value: "60 min",                   label: "Class 5 · Duration", type: "TEXT" },
  "classes_4_desc":     { value: "Structured swimming programs from beginner stroke mechanics to advanced lap training. BLS-certified coach Muhammad Sohail ensures safe and effective sessions.", label: "Class 5 · Description", type: "TEXT" },
  "classes_4_proof":    { value: "BLS Certified · Heated indoor pool",     label: "Class 5 · Social proof", type: "TEXT" },
  "classes_4_img":      { value: "/images/facilities/swimming-pool.webp",  label: "Class 5 · Image",        type: "IMAGE_URL" },
  "classes_5_name":     { value: "Combat Training",          label: "Class 6 · Name",     type: "TEXT" },
  "classes_5_category": { value: "Combat",                   label: "Class 6 · Category", type: "TEXT" },
  "classes_5_trainer":  { value: "Kishwar Ali",              label: "Class 6 · Trainer",  type: "TEXT" },
  "classes_5_level":    { value: "All Levels",               label: "Class 6 · Level",    type: "TEXT" },
  "classes_5_duration": { value: "60 min",                   label: "Class 6 · Duration", type: "TEXT" },
  "classes_5_desc":     { value: "28+ years of martial arts expertise condensed into focused combat sessions. MMA fundamentals, self-defense, and conditioning for all levels.", label: "Class 6 · Description", type: "TEXT" },
  "classes_5_proof":    { value: "IFA & ISSA Certified · All levels",      label: "Class 6 · Social proof", type: "TEXT" },
  "classes_5_img":      { value: "/images/trainers/kamran-mma.webp",       label: "Class 6 · Image",        type: "IMAGE_URL" },

  // ── CLASSES PAGE — Hours section ──────────────────────────────────────────
  "classes_hours_tag":  { value: "Plan Your Visit",   label: "Club Hours · Badge",   type: "TEXT" },
  "classes_hours_h2":   { value: "Club Hours",         label: "Club Hours · Heading", type: "TEXT" },
  "classes_hours_mon":  { value: "7:00 AM – 11:00 PM", label: "Hours · Monday",    type: "TEXT" },
  "classes_hours_tue":  { value: "7:00 AM – 11:00 PM", label: "Hours · Tuesday",   type: "TEXT" },
  "classes_hours_wed":  { value: "7:00 AM – 11:00 PM", label: "Hours · Wednesday", type: "TEXT" },
  "classes_hours_thu":  { value: "7:00 AM – 11:00 PM", label: "Hours · Thursday",  type: "TEXT" },
  "classes_hours_fri":  { value: "7:00 AM – 11:00 PM", label: "Hours · Friday",    type: "TEXT" },
  "classes_hours_sat":  { value: "7:00 AM – 11:00 PM", label: "Hours · Saturday",  type: "TEXT" },
  "classes_hours_sun":  { value: "12:00 PM – 10:00 PM", label: "Hours · Sunday",   type: "TEXT" },

  // ── CLASSES PAGE — Book & Walk-ins ────────────────────────────────────────
  "classes_book_title":   { value: "Book a Class",    label: "Book a Class · Title", type: "TEXT" },
  "classes_book_desc":    { value: "To find out class timings, book a personal training session, or enquire about any program — contact us directly. Walk-ins are always welcome.", label: "Book a Class · Description", type: "TEXT" },
  "classes_walkin_title": { value: "Walk-ins Welcome", label: "Walk-ins · Title",       type: "TEXT" },
  "classes_walkin_desc":  { value: "Bring a valid ID for first-time registration. Our team will guide you through the facilities and match you with the right class.", label: "Walk-ins · Description", type: "TEXT" },

  // ── CLASSES PAGE — Why Train With Us ──────────────────────────────────────
  "classes_why_tag":      { value: "What Sets Us Apart", label: "Why Train · Badge",   type: "TEXT" },
  "classes_why_h2":       { value: "Why Train With Us",  label: "Why Train · Heading", type: "TEXT" },
  "classes_why_0_title":  { value: "Certified Trainers", label: "Why Feature 1 · Title", type: "TEXT" },
  "classes_why_0_desc":   { value: "All coaches are internationally certified with years of real-world experience.", label: "Why Feature 1 · Description", type: "TEXT" },
  "classes_why_0_img":    { value: "/images/trainers/kishwar-trainer.webp", label: "Why Feature 1 · Image", type: "IMAGE_URL" },
  "classes_why_1_title":  { value: "Premium Equipment", label: "Why Feature 2 · Title", type: "TEXT" },
  "classes_why_1_desc":   { value: "State-of-the-art machines and equipment maintained to the highest standards.", label: "Why Feature 2 · Description", type: "TEXT" },
  "classes_why_1_img":    { value: "/images/facilities/gym.webp",           label: "Why Feature 2 · Image", type: "IMAGE_URL" },
  "classes_why_2_title":  { value: "All Levels Welcome", label: "Why Feature 3 · Title", type: "TEXT" },
  "classes_why_2_desc":   { value: "From complete beginners to competitive athletes — every class adapts to you.", label: "Why Feature 3 · Description", type: "TEXT" },
  "classes_why_2_img":    { value: "/images/team-banner2.webp",             label: "Why Feature 3 · Image", type: "IMAGE_URL" },
  "classes_why_3_title":  { value: "Personalized Plans", label: "Why Feature 4 · Title", type: "TEXT" },
  "classes_why_3_desc":   { value: "Your trainer builds a program around your specific goals and fitness level.", label: "Why Feature 4 · Description", type: "TEXT" },
  "classes_why_3_img":    { value: "/images/trainers/trainer-2.webp",       label: "Why Feature 4 · Image", type: "IMAGE_URL" },

  // ── CLASSES PAGE — Personal Training strip & CTA ──────────────────────────
  "classes_pt_title":     { value: "Want 1-on-1 Personal Training?",           label: "PT Strip · Title",      type: "TEXT" },
  "classes_pt_desc":      { value: "Our trainers offer private sessions tailored entirely to your goals.", label: "PT Strip · Description", type: "TEXT" },
  "classes_cta_heading":  { value: "Ready to Start Training?",                  label: "Classes CTA · Heading",         type: "TEXT" },
  "classes_cta_sub":      { value: "Join Safa Fitness Club and attend your first class today. Walk-ins welcome.", label: "Classes CTA · Sub-heading", type: "TEXT" },
  "classes_cta_btn1":     { value: "View Memberships",                           label: "Classes CTA · Primary button",   type: "TEXT" },
  "classes_cta_btn2":     { value: "Contact Us",                                 label: "Classes CTA · Secondary button", type: "TEXT" },

  // ── CONTACT PAGE — Hero & sections ───────────────────────────────────────
  "contact_hero_badge":    { value: "We Are Here for You", label: "Contact Hero · Badge text",                   type: "TEXT" },
  "contact_hero_h1":       { value: "Contact",             label: "Contact Hero · Headline word 1",              type: "TEXT" },
  "contact_hero_h1_orange":{ value: "Us",                  label: "Contact Hero · Headline word 2 (orange)",     type: "TEXT" },
  "contact_hero_img":      { value: "/images/facilities/contact-banner.webp", label: "Contact Hero · Banner image", type: "IMAGE_URL" },
  "contact_form_tag":      { value: "Send a Message",      label: "Form Section · Badge",                        type: "TEXT" },
  "contact_form_h2a":      { value: "Get in",              label: "Form Section · Heading word 1",               type: "TEXT" },
  "contact_form_h2b":      { value: "Touch",               label: "Form Section · Heading word 2 (orange)",      type: "TEXT" },
  "contact_form_desc":     { value: "Fill in the form below and your message will be sent directly to us on WhatsApp. We typically reply within a few hours.", label: "Form Section · Description", type: "TEXT" },
  "contact_info_tag":      { value: "Find Us",             label: "Contact Info Panel · Badge",                  type: "TEXT" },
  "contact_info_h2a":      { value: "Contact",             label: "Contact Info Panel · Heading word 1",         type: "TEXT" },
  "contact_info_h2b":      { value: "Info",                label: "Contact Info Panel · Heading word 2 (orange)", type: "TEXT" },
  "contact_phone2":        { value: "+92-330-0007232",     label: "Second Phone Number",                         type: "TEXT" },
  "contact_map_tag":       { value: "5th Floor, Safa Gold Mall", label: "Map Section · Badge",                   type: "TEXT" },
  "contact_map_h2a":       { value: "F-7 Markaz,",         label: "Map Section · Heading word 1",                type: "TEXT" },
  "contact_map_h2b":       { value: "Islamabad",           label: "Map Section · Heading word 2 (orange)",       type: "TEXT" },
  "contact_visit_0_img":   { value: "/images/facilities/gym.webp",              label: "Visit Card 1 · Image",   type: "IMAGE_URL" },
  "contact_visit_0_title": { value: "Walk-ins Welcome",    label: "Visit Card 1 · Title",                        type: "TEXT" },
  "contact_visit_0_desc":  { value: "No appointment needed. Visit us any time during opening hours and our team will be happy to show you around.", label: "Visit Card 1 · Description", type: "TEXT" },
  "contact_visit_1_img":   { value: "/images/facilities/services-banner.webp",  label: "Visit Card 2 · Image",   type: "IMAGE_URL" },
  "contact_visit_1_title": { value: "Bring Valid ID",      label: "Visit Card 2 · Title",                        type: "TEXT" },
  "contact_visit_1_desc":  { value: "First-time visitors need a valid CNIC or ID card for registration. The process takes just a few minutes.", label: "Visit Card 2 · Description", type: "TEXT" },
  "contact_visit_2_img":   { value: "/images/trainers/kishwar-trainer.webp",    label: "Visit Card 3 · Image",   type: "IMAGE_URL" },
  "contact_visit_2_title": { value: "Free Tour",           label: "Visit Card 3 · Title",                        type: "TEXT" },
  "contact_visit_2_desc":  { value: "Ask for a free facility tour on your first visit. Our team will walk you through everything and match you with the right plan.", label: "Visit Card 3 · Description", type: "TEXT" },
  "contact_cta_heading":   { value: "Ready to Join?",      label: "Contact CTA · Heading",                       type: "TEXT" },
  "contact_cta_sub":       { value: "Walk in to Safa Fitness Club today at Safa Gold Mall, 5th Floor, F-7 Markaz, Islamabad.", label: "Contact CTA · Sub-heading", type: "TEXT" },
  "contact_cta_btn1":      { value: "WhatsApp Us",         label: "Contact CTA · Primary button",                type: "TEXT" },
  "contact_cta_btn2":      { value: "View Memberships",    label: "Contact CTA · Secondary button",              type: "TEXT" },

  // ── PRICING PAGE — Hero ───────────────────────────────────────────────────
  "pricing_hero_badge":     { value: "Join the Club",  label: "Pricing Hero · Badge text",                    type: "TEXT" },
  "pricing_hero_h1":        { value: "Membership",     label: "Pricing Hero · Headline word 1",               type: "TEXT" },
  "pricing_hero_h1_orange": { value: "Plans",          label: "Pricing Hero · Headline word 2 (orange)",      type: "TEXT" },
  "pricing_hero_img":       { value: "/images/facilities/pricing-banner.webp", label: "Pricing Hero · Banner image", type: "IMAGE_URL" },

  // ── PRICING PAGE — Plans section header ───────────────────────────────────
  "pricing_plans_tag":  { value: "Choose Your Plan",      label: "Plans Section · Badge",     type: "TEXT" },
  "pricing_plans_h2a":  { value: "Membership",            label: "Plans Section · Heading word 1", type: "TEXT" },
  "pricing_plans_h2b":  { value: "Options",               label: "Plans Section · Heading word 2 (orange)", type: "TEXT" },
  "pricing_plans_sub":  { value: "Flexible plans to match your goals. All prices in PKR. Discounts available for 3, 6 & 12-month commitments.", label: "Plans Section · Sub-heading", type: "TEXT" },
  "pricing_reg_notice": { value: "All plans require a one-time registration fee of PKR 18,000 (Kids: PKR 10,000). Monthly rates shown below.", label: "Registration Notice · Text", type: "TEXT" },

  // ── PRICING PAGE — Plan 1: Day Pass ───────────────────────────────────────
  "pricing_p0_name":     { value: "Day Pass",              label: "Plan 1 (Day Pass) · Name",      type: "TEXT" },
  "pricing_p0_badge":    { value: "No Commitment",         label: "Plan 1 (Day Pass) · Badge",     type: "TEXT" },
  "pricing_p0_period":   { value: "per visit",             label: "Plan 1 (Day Pass) · Price period", type: "TEXT" },
  "pricing_p0_features": { value: "Full gym access for 1 day\nBoxing ring access\nSnooker lounge\nSafa Bar (beverages)\nStandard locker use\nNo commitment required", label: "Plan 1 (Day Pass) · Features (one per line)", type: "TEXTAREA" },
  "pricing_p0_cta":      { value: "Walk In Today",         label: "Plan 1 (Day Pass) · CTA button", type: "TEXT" },
  "pricing_p0_note":     { value: "No booking required — bring valid ID", label: "Plan 1 (Day Pass) · CTA note", type: "TEXT" },
  "pricing_p0_img":      { value: "/images/facilities/gym.webp", label: "Plan 1 (Day Pass) · Card image", type: "IMAGE_URL" },

  // ── PRICING PAGE — Plan 2: Swimming Pool ──────────────────────────────────
  "pricing_p1_name":     { value: "Swimming Pool",         label: "Plan 2 (Swimming) · Name",     type: "TEXT" },
  "pricing_p1_badge":    { value: "Aquatics",              label: "Plan 2 (Swimming) · Badge",    type: "TEXT" },
  "pricing_p1_savings":  { value: "Save PKR 36,000/year",  label: "Plan 2 (Swimming) · Savings tag", type: "TEXT" },
  "pricing_p1_reg":      { value: "18,000",                label: "Plan 2 (Swimming) · Registration fee", type: "TEXT" },
  "pricing_p1_features": { value: "Heated indoor pool access\nProfessional swimming coach\nBeginner to advanced programs\nAquatic fitness sessions\nLocker & shower access\nBLS-certified lifeguard on duty", label: "Plan 2 (Swimming) · Features (one per line)", type: "TEXTAREA" },
  "pricing_p1_cta":      { value: "Join Now",              label: "Plan 2 (Swimming) · CTA button", type: "TEXT" },
  "pricing_p1_note":     { value: "One-time registration: PKR 18,000", label: "Plan 2 (Swimming) · CTA note", type: "TEXT" },
  "pricing_p1_img":      { value: "/images/facilities/swimming-pool.webp", label: "Plan 2 (Swimming) · Card image", type: "IMAGE_URL" },

  // ── PRICING PAGE — Plan 3: Gym Only ───────────────────────────────────────
  "pricing_p2_name":     { value: "Gym Only",              label: "Plan 3 (Gym Only) · Name",     type: "TEXT" },
  "pricing_p2_badge":    { value: "Top Pick",              label: "Plan 3 (Gym Only) · Badge",    type: "TEXT" },
  "pricing_p2_savings":  { value: "Save PKR 24,000/year",  label: "Plan 3 (Gym Only) · Savings tag", type: "TEXT" },
  "pricing_p2_reg":      { value: "18,000",                label: "Plan 3 (Gym Only) · Registration fee", type: "TEXT" },
  "pricing_p2_features": { value: "Full gym & fitness floor\nBoxing ring access\nSnooker lounge\nSafa Bar (beverages)\nStandard locker & shower\nCertified trainer guidance", label: "Plan 3 (Gym Only) · Features (one per line)", type: "TEXTAREA" },
  "pricing_p2_cta":      { value: "Join Now",              label: "Plan 3 (Gym Only) · CTA button", type: "TEXT" },
  "pricing_p2_note":     { value: "One-time registration: PKR 18,000", label: "Plan 3 (Gym Only) · CTA note", type: "TEXT" },
  "pricing_p2_img":      { value: "/images/facilities/gym.webp", label: "Plan 3 (Gym Only) · Card image", type: "IMAGE_URL" },

  // ── PRICING PAGE — Plan 4: Gym + VIP Lockers ──────────────────────────────
  "pricing_p3_name":     { value: "Gym + VIP Lockers",     label: "Plan 4 (Gym+VIP) · Name",      type: "TEXT" },
  "pricing_p3_badge":    { value: "Enhanced",              label: "Plan 4 (Gym+VIP) · Badge",     type: "TEXT" },
  "pricing_p3_savings":  { value: "Save PKR 2,000/mo vs. separate add-on", label: "Plan 4 (Gym+VIP) · Savings tag", type: "TEXT" },
  "pricing_p3_reg":      { value: "18,000",                label: "Plan 4 (Gym+VIP) · Registration fee", type: "TEXT" },
  "pricing_p3_features": { value: "Everything in Gym Only\nDedicated VIP locker\nPremium shower facilities\nSecure personal storage\nPriority locker room access\nCertified trainer guidance", label: "Plan 4 (Gym+VIP) · Features (one per line)", type: "TEXTAREA" },
  "pricing_p3_cta":      { value: "Join Now",              label: "Plan 4 (Gym+VIP) · CTA button", type: "TEXT" },
  "pricing_p3_note":     { value: "One-time registration: PKR 18,000", label: "Plan 4 (Gym+VIP) · CTA note", type: "TEXT" },
  "pricing_p3_img":      { value: "/images/gallery/locker-1.webp", label: "Plan 4 (Gym+VIP) · Card image", type: "IMAGE_URL" },

  // ── PRICING PAGE — Plan 5: Gym + Pool (Most Popular) ─────────────────────
  "pricing_p4_name":     { value: "Gym + Pool",            label: "Plan 5 (Gym+Pool) · Name",     type: "TEXT" },
  "pricing_p4_badge":    { value: "Most Popular",          label: "Plan 5 (Gym+Pool) · Badge",    type: "TEXT" },
  "pricing_p4_savings":  { value: "Save PKR 24,000/year vs. buying separately", label: "Plan 5 (Gym+Pool) · Savings tag", type: "TEXT" },
  "pricing_p4_proof":    { value: "Most chosen plan by Safa Fitness members", label: "Plan 5 (Gym+Pool) · Social proof text", type: "TEXT" },
  "pricing_p4_reg":      { value: "18,000",                label: "Plan 5 (Gym+Pool) · Registration fee", type: "TEXT" },
  "pricing_p4_features": { value: "Full gym & fitness floor\nHeated indoor swimming pool\nBoxing ring access\nSteam, Sauna & Jacuzzi\nVIP lockers & premium showers\nSnooker lounge & Safa Bar", label: "Plan 5 (Gym+Pool) · Features (one per line)", type: "TEXTAREA" },
  "pricing_p4_cta":      { value: "Join Now — Best Value", label: "Plan 5 (Gym+Pool) · CTA button", type: "TEXT" },
  "pricing_p4_note":     { value: "One-time registration: PKR 18,000", label: "Plan 5 (Gym+Pool) · CTA note", type: "TEXT" },
  "pricing_p4_img":      { value: "/images/facilities/swimming-pool.webp", label: "Plan 5 (Gym+Pool) · Card image", type: "IMAGE_URL" },

  // ── PRICING PAGE — Plan 6: Kids ───────────────────────────────────────────
  "pricing_p5_name":     { value: "Kids",                  label: "Plan 6 (Kids) · Name",         type: "TEXT" },
  "pricing_p5_badge":    { value: "Ages 6–16",             label: "Plan 6 (Kids) · Badge",        type: "TEXT" },
  "pricing_p5_features": { value: "Supervised gym access\nSwimming pool sessions\nAge-appropriate training\nProfessional coach guidance\nSafe and structured environment\nLower one-time registration", label: "Plan 6 (Kids) · Features (one per line)", type: "TEXTAREA" },
  "pricing_p5_cta":      { value: "Enroll Now",            label: "Plan 6 (Kids) · CTA button",   type: "TEXT" },
  "pricing_p5_note":     { value: "One-time registration: PKR 10,000", label: "Plan 6 (Kids) · CTA note", type: "TEXT" },
  "pricing_p5_img":      { value: "/images/facilities/swimming-pool.webp", label: "Plan 6 (Kids) · Card image", type: "IMAGE_URL" },

  // ── PRICING PAGE — Discount banner ────────────────────────────────────────
  "pricing_disc_tag":    { value: "Save More",             label: "Discount Banner · Badge",      type: "TEXT" },
  "pricing_disc_h2a":    { value: "3, 6 & 12 Month",       label: "Discount Banner · Heading word 1", type: "TEXT" },
  "pricing_disc_h2b":    { value: "Discounts",             label: "Discount Banner · Heading word 2 (orange)", type: "TEXT" },
  "pricing_disc_desc":   { value: "Pay upfront for 3, 6, or 12 months on any monthly plan and receive a discount. Contact us to get the current rates before signing up.", label: "Discount Banner · Description", type: "TEXT" },

  // ── PRICING PAGE — FAQ ────────────────────────────────────────────────────
  "pricing_faq_tag":  { value: "Got Questions?",           label: "FAQ Section · Badge",          type: "TEXT" },
  "pricing_faq_h2a":  { value: "Frequently Asked",         label: "FAQ Section · Heading word 1", type: "TEXT" },
  "pricing_faq_h2b":  { value: "Questions",                label: "FAQ Section · Heading word 2 (orange)", type: "TEXT" },
  "pricing_faq_0_q":  { value: "Is there a one-time registration fee?", label: "FAQ 1 · Question", type: "TEXT" },
  "pricing_faq_0_a":  { value: "Yes. All plans (except the Day Pass) require a one-time registration fee of PKR 18,000. The Kids plan has a reduced registration fee of PKR 10,000. This is a one-time payment per member.", label: "FAQ 1 · Answer", type: "TEXTAREA" },
  "pricing_faq_1_q":  { value: "Can I pay for 3, 6, or 12 months at once?", label: "FAQ 2 · Question", type: "TEXT" },
  "pricing_faq_1_a":  { value: "Yes — discounts are available when you pay for 3, 6, or 12 months upfront on all monthly plans. Contact us directly to get the current discount rates.", label: "FAQ 2 · Answer", type: "TEXTAREA" },
  "pricing_faq_2_q":  { value: "Do you offer day passes for visitors?", label: "FAQ 3 · Question", type: "TEXT" },
  "pricing_faq_2_a":  { value: "Yes. A Day Pass is available for PKR 2,500 per visit and gives you full access to the gym for that day. No booking required — just walk in with a valid ID.", label: "FAQ 3 · Answer", type: "TEXTAREA" },
  "pricing_faq_3_q":  { value: "What facilities are shared across all memberships?", label: "FAQ 4 · Question", type: "TEXT" },
  "pricing_faq_3_a":  { value: "The Snooker Lounge and Safa Bar (fresh juices, smoothies, and beverages) are accessible to all members. The Boxing Ring is also available to all gym plan members.", label: "FAQ 4 · Answer", type: "TEXTAREA" },
  "pricing_faq_4_q":  { value: "Is the Massage & Spa included in memberships?", label: "FAQ 5 · Question", type: "TEXT" },
  "pricing_faq_4_a":  { value: "Massage & Spa services are available at the club but are charged separately from memberships. Please speak to our front desk staff for session pricing.", label: "FAQ 5 · Answer", type: "TEXTAREA" },
  "pricing_faq_5_q":  { value: "How do I sign up or upgrade my membership?", label: "FAQ 6 · Question", type: "TEXT" },
  "pricing_faq_5_a":  { value: "Walk in to Safa Fitness Club at Safa Gold Mall, 5th Floor, F-7 Markaz, Islamabad, and bring a valid ID. You can also call us to enquire or arrange a visit.", label: "FAQ 6 · Answer", type: "TEXTAREA" },
  "pricing_faq_6_q":  { value: "Are there female-only gym hours?", label: "FAQ 7 · Question", type: "TEXT" },
  "pricing_faq_6_a":  { value: "Yes — dedicated hours are available for female members. Contact us directly for the current schedule as timings may vary.", label: "FAQ 7 · Answer", type: "TEXTAREA" },

  // ── PRICING PAGE — CTA ────────────────────────────────────────────────────
  "pricing_cta_heading": { value: "Ready to Join the Club?",                                        label: "Pricing CTA · Heading",          type: "TEXT" },
  "pricing_cta_sub":     { value: "Walk in to Safa Fitness Club today. Our team will help you find the right plan and get you started immediately.", label: "Pricing CTA · Sub-heading", type: "TEXT" },
  "pricing_cta_btn1":    { value: "WhatsApp Us",           label: "Pricing CTA · Primary button",   type: "TEXT" },
  "pricing_cta_btn2":    { value: "Contact Us",            label: "Pricing CTA · Secondary button", type: "TEXT" },

  // ── TRAINERS PAGE — Hero ──────────────────────────────────────────────────
  "trainers_hero_badge":     { value: "The Safa Elite Team", label: "Trainers Hero · Badge text",                    type: "TEXT" },
  "trainers_hero_h1":        { value: "Our",                 label: "Trainers Hero · Headline word 1",               type: "TEXT" },
  "trainers_hero_h1_orange": { value: "Trainers",            label: "Trainers Hero · Headline word 2 (orange)",      type: "TEXT" },

  // ── TRAINERS PAGE — Stats bar ─────────────────────────────────────────────
  "trainers_stat_0_val":   { value: "5",    label: "Stat 1 · Value",  type: "TEXT" },
  "trainers_stat_0_label": { value: "Expert Trainers",             label: "Stat 1 · Label", type: "TEXT" },
  "trainers_stat_1_val":   { value: "28+",  label: "Stat 2 · Value",  type: "TEXT" },
  "trainers_stat_1_label": { value: "Years of Experience",          label: "Stat 2 · Label", type: "TEXT" },
  "trainers_stat_2_val":   { value: "300+", label: "Stat 3 · Value",  type: "TEXT" },
  "trainers_stat_2_label": { value: "Clients Transformed",          label: "Stat 3 · Label", type: "TEXT" },
  "trainers_stat_3_val":   { value: "10+",  label: "Stat 4 · Value",  type: "TEXT" },
  "trainers_stat_3_label": { value: "International Certifications", label: "Stat 4 · Label", type: "TEXT" },

  // ── TRAINERS PAGE — Cards section heading ─────────────────────────────────
  "trainers_section_tag":  { value: "Certified Professionals", label: "Trainer Cards · Badge",                   type: "TEXT" },
  "trainers_section_h2a":  { value: "Meet the",                label: "Trainer Cards · Heading word 1",          type: "TEXT" },
  "trainers_section_h2b":  { value: "Team",                    label: "Trainer Cards · Heading word 2 (orange)", type: "TEXT" },

  // ── TRAINERS PAGE — Kishwar Ali ───────────────────────────────────────────
  "tr_kishwar_exp":   { value: "28+ Years", label: "Kishwar · Experience badge",           type: "TEXT" },
  "tr_kishwar_quote": { value: "Strength is sculpted through discipline. Control the mind, master the body.", label: "Kishwar · Quote", type: "TEXT" },
  "tr_kishwar_certs": { value: "IFA Level 01 & 02 Certified – Pakistan\nISSA Level 03 Certified – USA\nISSA Nutrition Certified – USA\nIFPA Sports & Nutrition Certified\nFirst Aid & CPR/AED Certified\nB.Com Graduate", label: "Kishwar · Certifications (one per line)", type: "TEXTAREA" },
  "tr_kishwar_specs": { value: "Body Transformation (Fat Loss, Muscle Gain, Toning)\nStrength & Conditioning\nAge-Specific Training (Youth to 40+)\nHIIT, CrossFit, Circuit & Resistance Training\nYoga & Core Strength Development\nFunctional Fitness & Flexibility", label: "Kishwar · Specializations (one per line)", type: "TEXTAREA" },

  // ── TRAINERS PAGE — Huma Mumtaz ───────────────────────────────────────────
  "tr_huma_exp":   { value: "10+ Years", label: "Huma · Experience badge",           type: "TEXT" },
  "tr_huma_quote": { value: "Control your mind, not just your body. Train like a pro, live like a champion.", label: "Huma · Quote", type: "TEXT" },
  "tr_huma_certs": { value: "IFA Level 01 & 02 Certified – Pakistan\nISSA Level 03 Certified – USA\nISSA Nutrition Training – USA\nIFPA Sports & Nutrition (PS Certified)\nFirst Aid with CPR/AED Certified", label: "Huma · Certifications (one per line)", type: "TEXTAREA" },
  "tr_huma_specs": { value: "Body Transformation (Weight Loss, Fat Loss, Toning & Shaping)\nStrength Training & Bodybuilding\nAerobic & Anaerobic Conditioning\nFlexibility & Mobility Training\nHIIT, CrossFit, Yoga & Functional Training\nGroup & Circuit Classes", label: "Huma · Specializations (one per line)", type: "TEXTAREA" },

  // ── TRAINERS PAGE — Rahila Sher ───────────────────────────────────────────
  "tr_rahila_exp":   { value: "6+ Years", label: "Rahila · Experience badge",           type: "TEXT" },
  "tr_rahila_quote": { value: "Boxer strong, train smart.", label: "Rahila · Quote",    type: "TEXT" },
  "tr_rahila_certs": { value: "Level 1 & Level 2 Certified Personal Trainer\nNational-Level Boxer – Certified & Recognized\nPakistan Army – Physical Instructor", label: "Rahila · Certifications (one per line)", type: "TEXTAREA" },
  "tr_rahila_specs": { value: "Boxing & Kickboxing (Combat Sports)\nWeight Loss & Fat Reduction\nStrength & Conditioning\nAthletic Performance & Functional Training\nMilitary-Grade Endurance Training", label: "Rahila · Specializations (one per line)", type: "TEXTAREA" },

  // ── TRAINERS PAGE — Danish Masih Gill ────────────────────────────────────
  "tr_danish_exp":   { value: "8+ Years", label: "Danish · Experience badge",           type: "TEXT" },
  "tr_danish_quote": { value: "You are what you eat. Discipline in the kitchen reflects results in the mirror.", label: "Danish · Quote", type: "TEXT" },
  "tr_danish_certs": { value: "IFA Certified Personal Trainer – Level 2\nContinuing Professional Development – Exercise Science", label: "Danish · Certifications (one per line)", type: "TEXTAREA" },
  "tr_danish_specs": { value: "Fat Loss & Muscle Hypertrophy\nPersonalized Training Programs\nNutrition Guidance for Body Composition\nFunctional & Resistance Training", label: "Danish · Specializations (one per line)", type: "TEXTAREA" },

  // ── TRAINERS PAGE — Muhammad Sohail ──────────────────────────────────────
  "tr_sohail_exp":   { value: "8+ Years", label: "Sohail · Experience badge",           type: "TEXT" },
  "tr_sohail_quote": { value: "Health is Wealth.", label: "Sohail · Quote",             type: "TEXT" },
  "tr_sohail_certs": { value: "BLS (Basic Life Support) Certified\nCertified Swimming Personal Trainer\nCertified Lifeguard", label: "Sohail · Certifications (one per line)", type: "TEXTAREA" },
  "tr_sohail_specs": { value: "Swimming Instruction – Beginner to Advanced\nAquatic Fitness & Water Safety\nStroke Mechanics & Lap Training\nEmergency Life Support Protocols", label: "Sohail · Specializations (one per line)", type: "TEXTAREA" },

  // ── TRAINERS PAGE — Personal Training section ─────────────────────────────
  "trainers_pt_tag":     { value: "One-on-One",     label: "Personal Training · Badge",                     type: "TEXT" },
  "trainers_pt_h2a":     { value: "Personal",       label: "Personal Training · Heading word 1",             type: "TEXT" },
  "trainers_pt_h2b":     { value: "Training",       label: "Personal Training · Heading word 2 (orange)",    type: "TEXT" },
  "trainers_pt_desc":    { value: "Get a fully customized program built around your body, goals, and schedule. Our trainers work with you one-on-one to maximize results — whether you want to lose weight, build muscle, improve performance, or learn a skill like boxing or swimming.", label: "Personal Training · Description", type: "TEXT" },
  "trainers_pt_bullets": { value: "Program tailored specifically to your goals\nExpert form correction and injury prevention\nNutrition guidance included\nProgress tracking every session\nFlexible scheduling — morning, evening, or weekend", label: "Personal Training · Bullet points (one per line)", type: "TEXTAREA" },
  "trainers_pt_img":     { value: "/images/trainers/kishwar-trainer.webp", label: "Personal Training · Side image", type: "IMAGE_URL" },
  "trainers_pt_btn1":    { value: "Book a Session", label: "Personal Training · Primary button",              type: "TEXT" },
  "trainers_pt_btn2":    { value: "View Pricing",   label: "Personal Training · Secondary button",            type: "TEXT" },

  // ── TRAINERS PAGE — CTA ───────────────────────────────────────────────────
  "trainers_cta_heading": { value: "Ready to Train With the Best?",                                          label: "Trainers CTA · Heading",          type: "TEXT" },
  "trainers_cta_sub":     { value: "Join Safa Fitness Club and start your transformation journey with Islamabad's most certified training team.", label: "Trainers CTA · Sub-heading", type: "TEXT" },
  "trainers_cta_btn1":    { value: "View Memberships", label: "Trainers CTA · Primary button",               type: "TEXT" },
  "trainers_cta_btn2":    { value: "Contact Us",        label: "Trainers CTA · Secondary button",             type: "TEXT" },
}

export type SiteContentMap = Record<string, string>

export async function getSiteContent(): Promise<SiteContentMap> {
  const rows = await db.siteContent.findMany()
  const overrides = Object.fromEntries(rows.map((r) => [r.key, r.value]))
  const result: SiteContentMap = {}
  for (const key of Object.keys(CONTENT_DEFAULTS)) {
    result[key] = overrides[key] ?? CONTENT_DEFAULTS[key].value
  }
  return result
}

export type GalleryImage = { src: string; alt: string }

export function parseGalleryImages(value: string): GalleryImage[] {
  try { return JSON.parse(value) } catch { return [] }
}
