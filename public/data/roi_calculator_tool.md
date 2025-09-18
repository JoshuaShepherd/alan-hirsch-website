You are a React/Next.js/Tailwind/shadcn expert. Build an **ROI Calculator Tool** for our publishing stack vs. alternatives. 

### Requirements:
- Framework: Next.js + Tailwind + shadcn UI components.
- No existing code should be deleted; add this as a new standalone page/component (e.g., `/roi-calculator`).
- Use sliders and numeric inputs for key variables.
- Use comparison cards or a side-by-side chart to tell the ROI story.

---

### UX / Flow:
1. **Header**: Title ("Publishing ROI Calculator") + short explainer text ("See how different publishing models compare in reaching 1,000 paid subscribers at $10/month.").

2. **Inputs Section**:
   - Slider for **Target Subscribers** (default: 1,000, range: 100–10,000).
   - Slider for **Monthly Price per Subscriber** (default: $10, range: $5–$50).
   - Slider for **Estimated Website Visitors** (default: 50,000, range: 10,000–200,000).
   - Option to toggle between **TrailGuide**, **Agency**, and **DIY SaaS**.

3. **Output Section**:
   - Dynamic calculation boxes showing:
     - **Visitors Needed** (per model, based on conversion assumptions).
     - **Email List Size Needed**.
     - **Estimated Build Cost**.
     - **Ongoing Monthly Fees**.
     - **Revenue at Goal**.
     - **Net ROI** (Revenue – Costs).
   - Each model should have its own card:
     - **TrailGuide**: $1k upfront + 10% revenue share, conversion uplift 2–3% site, 6–8% email.
     - **Agency**: $50k–$100k upfront, standard conversion 1% site, 3% email.
     - **DIY SaaS**: $0 upfront, $200–$500/month SaaS, standard conversion.

4. **Storytelling Component**:
   - Below the numbers, include a "narrative comparison" section:
     - **TrailGuide** → "With our stack, you need ~40k visitors, not 120k."
     - **Agency** → "Pay $100k+ and still fight uphill with conversions."
     - **DIY SaaS** → "Cheap to start, but 3x harder to succeed."

5. **Visuals**:
   - Use shadcn `Card`, `Slider`, `Tabs`, and `Progress` components.
   - Add a comparison bar chart (Recharts or similar) to visually show visitors required vs. actual goal.

---

### Conversion Assumptions:
- **Agency/DIY**:
  - Site-to-subscriber: 1%
  - Email-to-subscriber: 3%
  - Visitor-to-email: 3%
- **TrailGuide**:
  - Site-to-subscriber: 2.5%
  - Email-to-subscriber: 7%
  - Visitor-to-email: 9%

---

### Deliverables:
- A functional ROI calculator at `/roi-calculator`.
- Fully responsive.
- Code structured in a modular, scalable way.
- Use dummy math for now, but code should allow swapping formulas later.

---

### Goal:
Tell the ROI story *visually* and interactively:
- Show how much easier it is to reach 1,000 paid subscribers with TrailGuide.
- Reinforce the pricing advantage ($1k + 10%) vs $50–100k agency builds.
- Make the value gap **immediately obvious**.