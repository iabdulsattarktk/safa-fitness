export function GET() {
  const content = `# Safa Fitness Club

> Premier fitness destination in Islamabad, Pakistan. Located at Safa Gold Mall, 5th Floor, F-7 Markaz, Islamabad.

## Facilities
- State-of-the-art gym floor with commercial-grade equipment
- Heated indoor swimming pool with certified lifeguard
- Professional boxing ring
- Steam room, sauna, and jacuzzi
- Men's beauty salon
- VIP locker rooms with showers
- Snooker lounge
- Safa Bar (juices, protein shakes, beverages)

## Trainers
- Kishwar Ali — 28 years experience, ISSA certified
- Huma Mumtaz — ISSA Level 3, body transformation specialist
- Rahila Sher — national boxer, 5x National Games, Pakistan Army instructor
- Danish Masih Gill — strength and conditioning coach
- Muhammad Sohail — BLS-certified swimming coach

## Membership Plans
- Day Pass: PKR 2,500
- Swimming Pool: PKR 12,000/month
- Gym Only: PKR 18,000/month
- Gym + VIP Lockers: PKR 24,000/month
- Gym + Pool: PKR 28,000/month
- Kids: PKR 18,000/month
- Registration fee: PKR 18,000 (one-time, all monthly plans)

## Opening Hours
- Monday to Saturday: 7:00 AM – 11:00 PM
- Sunday: 12:00 PM – 10:00 PM

## Contact
- WhatsApp: +92 311 5156949
- Email: info@safafitnessclub.com
- Address: 5th Floor, Safa Gold Mall, College Road, F-7 Markaz, Islamabad, Pakistan

## Pages
- Home: https://safafitnessclub.com
- About: https://safafitnessclub.com/about
- Classes: https://safafitnessclub.com/classes
- Trainers: https://safafitnessclub.com/trainers
- Gallery: https://safafitnessclub.com/gallery
- Pricing: https://safafitnessclub.com/pricing
- Free Tools: https://safafitnessclub.com/tools
- Blog: https://safafitnessclub.com/blog
- Contact: https://safafitnessclub.com/contact
`

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
