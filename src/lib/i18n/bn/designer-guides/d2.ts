import type { DesignerGuide } from "@/lib/designer-guides";
import type { Translation } from "@/lib/i18n/bn/tutorials";

export const BN_DESIGNER_GUIDES_D2: Partial<Record<string, Translation<DesignerGuide>>> = {
  'figma-for-ai-handoff': {
    sourceHash: "0d077267d4d71622",
    translatedAt: "2026-10-06",
    content: {
      title: 'AI handoff-এর জন্য আপনার Figma file গুছিয়ে নিন',
      slug: 'figma-for-ai-handoff',
      duration: '২০ মিনিট',
      difficulty: 'intermediate',
      availableRoutes: ['desktop'],
      description:
        'আপনার Figma file এমনভাবে গুছিয়ে নিন যাতে Claude সেটা ঠিকঠাক পড়তে পারে। Layer-এর ঠিক নাম, annotation আর token export থাকলে handoff-এ ভুল বোঝাবুঝি কমে।',
      intro:
        'এই guide সেই UX আর UI designer-দের জন্য, যারা Figma ব্যবহার করেন আর Claude Code ব্যবহার করা developer-দের কাছে design handoff করেন। পড়া শেষে আপনি layer-এর নাম এমনভাবে বদলাতে পারবেন যাতে নাম দেখেই বোঝা যায় সেটা কী, pixel দেখে Claude যে behaviour বুঝতে পারে না তার জন্য annotation যোগ করতে পারবেন, আর design token (আপনার color, spacing আর typography-র নাম দেওয়া variable) export করে code generation-এর source of truth হিসেবে ব্যবহার করতে পারবেন। Claude Code session-এ Figma-র layer name আর annotation paste করলে Claude সেগুলোকে code লেখার context হিসেবে পড়ে। যে file-এ layer-এর নাম "Rectangle 42" আর "Group 7", সেটা থেকে এলোমেলো code আসে। যে file-এ নামগুলো পরিষ্কার আর annotation-এ আসল মানে লেখা থাকে, সেটা থেকে এমন code আসে যা সত্যিই ship করা যায়। সবচেয়ে বেশি কাজে লাগে এমন তিনটা cleanup pass এই guide-এ ধাপে ধাপে দেখানো হয়েছে।',
      situation: {
        scene: 'আপনি Claude Code ব্যবহার করা একজন developer-কে একটা Figma file দিচ্ছেন। আপনার layer-গুলোর নাম "Frame 14" আর "Group 7"। গতবারের handoff-এ যে code এসেছিল, সেটা design-এর সঙ্গে একদমই মেলেনি, আর ঠিক করতে আসা-যাওয়ায় তিন দিন লেগে গিয়েছিল।',
        outcome: 'আপনি file-টা এমনভাবে গুছিয়ে নেবেন যাতে Claude Code সেটা ঠিকঠাক পড়ে, আর এমন code বানায় যেটা দেখে আপনি নিজের design চিনতে পারেন, দ্বিতীয় দফা correction ছাড়াই।',
      },
      outcomes: [
        'Layer-এর নাম বলবে component-টার কাজ কী, সেটার shape নয়, যাতে Claude-কে আন্দাজে কিছু ধরে নিতে না হয়',
        'Pixel যে behaviour দেখাতে পারে না, তার জন্য annotation: validation rule, transition আর error state',
        'একটা token export আর component spec, যা সরাসরি Claude Code session-এ paste করার জন্য ready',
      ],
      steps: [
        {
          title: 'Layer-এর নাম দিন কাজ দেখে, shape দেখে নয়',
          description:
            'Session-এ paste করলে Claude আপনার layer name আর annotation context হিসেবে পড়ে। "Frame 3"-এর মতো generic নাম থেকে generic code আসে। প্রতিটা interactive element-এর নাম এই pattern-এ বদলে দিন: component/state/variant। যেমন: button/primary/default, input/error/filled, card/product/selected।',
          code: {
            snippet: `# যে layer-গুলোর নাম ঠিক নেই (Claude-কে আন্দাজ করতে হয়):
Frame 14
Group 7
Rectangle 3
Vector 2

# যে layer-গুলোর নাম ঠিক আছে (Claude সরাসরি ব্যবহার করতে পারে):
button/primary/default
form/amount-entry
input/bkash-number
icon/chevron-right`,
            language: 'text',
          },
          appDemo: {
            steps: [
              { role: 'user', text: 'Figma-তে আমার একটা payment screen আছে। Layer-গুলোর নাম "Frame 14", "Group 7", "Rectangle 3" এই টাইপের। Claude Code ব্যবহার করে এমন dev-কে এটা দিলে Claude আসলে কী দেখে?' },
              { role: 'claude', text: 'Claude দেখে "Frame 14", তারপর আন্দাজ করতে হয় জিনিসটা কী। Context (position, size, color) দেখে একটা ধারণা করে নেয়, কিন্তু সেই ধারণা প্রায়ই ভুল হয়, বিশেষ করে complex component-এ।\n\nসমাধান সহজ: layer-এর নাম দিন সেটার কাজ দেখে। এই pattern ব্যবহার করুন: component/state/variant।\n\nযে "Frame 14"-এর ভেতরে pay button আছে, সেটা হবে: button/primary/default\nযে "Rectangle 3" আসলে amount input, সেটা হবে: input/amount/default\nযে "Group 7" একটা error message, সেটা হবে: alert/error/inline\n\nHandoff-এর আগে Figma-তে rename pass-টা করে নিন। ২০ মিনিট লাগে, আর developer-এর ২ ঘণ্টার আসা-যাওয়া বাঁচে।' },
            ],
          },
          desktopDemo: {
            steps: [
              { role: 'user', text: 'আমার Figma export-টা audit করুন। Code generate করার সময় যে layer-গুলো আপনাকে confuse করবে, সেগুলো flag করুন। Component-টা একটা mobile payment flow।' },
              { role: 'claude', text: 'Export দেখে বলছি, এই layer-গুলো ambiguity তৈরি করবে:\n\n- "Frame 14" (ভেতরে button shape আর label আছে, কোনো semantic নাম নেই)\n- "Group 7" (ভেতরে তিনটা text element, কী কাজে বোঝা যাচ্ছে না)\n- "Rectangle 3" (দেখতে input-এর মতো, কিন্তু নাম দেওয়া shape হিসেবে)\n- "Vector 2" (label ছাড়া একটা icon, কোন icon সেটা আমি বুঝতে পারছি না)\n\nCode generate করার আগে এগুলোর নাম বদলে দিন। এভাবে: button/primary/default, form/amount-entry, input/bkash-number, icon/chevron-right। নাম বদলানো হলে আবার export করুন, তখন আমি ঠিকঠাক component code বানিয়ে দেব।' },
            ],
          },
        },
        {
          title: 'Pixel দেখে Claude যে behaviour বুঝতে পারে না, তার annotation দিন',
          description:
            'Visual design state দেখায়, কিন্তু transition, error condition বা edge case দেখায় না। Figma annotation (অথবা "AI-NOTES" নামের একটা sticky note layer) দিয়ে লিখে রাখুন: কী কারণে state বদলায়, কোন validation rule খাটে, error হলে কী হয়, আর কোন field optional।',
          code: {
            snippet: `# AI-NOTES layer-এর content-এর উদাহরণ (Figma-তে sticky note হিসেবে paste করুন):

button/primary/default
- Disabled থাকবে যতক্ষণ না: amount > 0 AND phone field validation pass করে
- Tap করলে: button disable হবে, spinner দেখাবে, /api/send-money call হবে
- Loading state: API call চলার পুরো সময় label-এর জায়গায় spinner থাকবে

input/amount/default
- Min: 10 BDT, Max: 5000 BDT
- Error state: field-এর নিচে inline দেখাবে "Minimum is 10 BDT"
- On blur: সঙ্গে সঙ্গে validate করে error দেখাবে (submit-এর জন্য অপেক্ষা করবে না)

input/bkash-number/default
- Format: 11 digit, শুরু হতে হবে 01 দিয়ে
- Error: "Enter a valid 11-digit bKash number"`,
            language: 'text',
          },
          appDemo: {
            steps: [
              { role: 'user', text: 'Design দেখে Claude বুঝতে পারে না, এমন কী কী জিনিস Figma-তে annotate করা উচিত?' },
              { role: 'claude', text: 'চার ধরনের জিনিস pixel দেখে বোঝা যায় না:\n\n1. Trigger আর transition: "Amount > 0 আর phone field valid হলেই শুধু এই button চালু হবে।" Design-এ দুটো state-ই দেখা যায়, কিন্তু condition-টা দেখা যায় না।\n\n2. Validation rule: "Phone number হতে হবে 11 digit, শুরু 01 দিয়ে।" Validation কড়া হোক বা ঢিলা, text field দেখতে একই রকম লাগে।\n\n3. Error message: কোনো error state থাকলে, কী কারণে সেটা আসে তা annotate করুন। "API payment_failed code return করলে দেখাবে।"\n\n4. Loading আর async: "API call চলার সময় button label-এর জায়গায় spinner থাকবে। Double-submit আটকাতে tap-এর পর ৩ সেকেন্ড button disabled থাকবে।"\n\nএগুলো AI-NOTES নামের একটা layer-এ রাখুন, যে component-এর কথা বলছে ঠিক তার পাশে। কোনো logic লেখার আগে আমি ওই layer পড়ে নিই।' },
            ],
          },
          desktopDemo: {
            steps: [
              { role: 'user', text: 'আমার payment form-এ একটা AI-NOTES layer যোগ করেছি। ওখানে লেখা: "Amount field: min 10, max 5000 BDT। Phone: 11 digit, শুরু 01 দিয়ে। Submit: দুটোই valid না হওয়া পর্যন্ত disabled। Error: যে field fail করেছে তার নিচে inline দেখাবে।" Validation logic-টা generate করে দিন।' },
              { role: 'claude', text: 'Annotation অনুযায়ী:\n\n```typescript\nconst MIN_AMOUNT = 10;\nconst MAX_AMOUNT = 5000;\nconst PHONE_REGEX = /^01[3-9]\\d{8}$/;\n\nfunction validateAmount(value: string): string | null {\n  const n = Number(value);\n  if (!value) return "Enter an amount";\n  if (n < MIN_AMOUNT) return `Minimum is ${MIN_AMOUNT} BDT`;\n  if (n > MAX_AMOUNT) return `Maximum is ${MAX_AMOUNT} BDT`;\n  return null;\n}\n\nfunction validatePhone(value: string): string | null {\n  if (!value) return "Enter your bKash number";\n  if (!PHONE_REGEX.test(value)) return "Enter a valid 11-digit number starting with 01";\n  return null;\n}\n\nconst isFormValid = !validateAmount(amount) && !validatePhone(phone);\n```\n\nInline error দেখানো আর button-এর disable state `isFormValid`-এর সঙ্গে wire করা হয়েছে।' },
            ],
          },
        },
        {
          title: 'Token export করুন আর একটা component spec লিখুন',
          description:
            'Handoff-এর আগে আপনার design token (color, spacing, type) export করুন আর এক পাতার একটা component spec লিখুন। দুটোই Claude-এ paste করে code generate করতে বলুন। মুখে design বুঝিয়ে বলার চেয়ে এটা দ্রুত, আর screenshot দেখে Claude ঠিক বুঝবে এই আশায় থাকার চেয়ে অনেক বেশি accurate।',
          code: {
            snippet: `# Tokens Studio plugin দিয়ে Figma থেকে token export করুন
# অথবা নিজে হাতে একটা JSON file-এ copy করে নিন

{
  "colors": {
    "primary": "#E2136E",
    "error": "#D32F2F",
    "surface": "#F5F5F5"
  },
  "spacing": {
    "xs": "4px", "sm": "8px", "md": "16px", "lg": "24px"
  },
  "typography": {
    "body": { "size": "14px", "weight": "400", "lineHeight": "20px" },
    "label": { "size": "12px", "weight": "500", "lineHeight": "16px" }
  }
}`,
            language: 'json',
          },
          appDemo: {
            steps: [
              { role: 'user', text: 'এই যে আমার design token [JSON paste করুন]। Component spec: একটা bKash payment entry form। দুটো field: amount (number, BDT) আর phone (tel, 11 digit)। একটা CTA button। Inline validation error। Mobile-first। React component-টা generate করে দিন।' },
              { role: 'claude', text: 'আপনার token ব্যবহার করে:\n\n```tsx\nexport function PaymentForm() {\n  const [amount, setAmount] = useState("");\n  const [phone, setPhone] = useState("");\n  const [errors, setErrors] = useState<{amount?: string; phone?: string}>({});\n\n  return (\n    <div style={{ padding: "24px", background: "#F5F5F5" }}>\n      <label style={{ fontSize: "12px", fontWeight: 500 }}>Amount (BDT)</label>\n      <input type="number" value={amount} onChange={e => setAmount(e.target.value)}\n        style={{ display: "block", width: "100%", marginTop: "8px", padding: "16px" }} />\n      {errors.amount && <span style={{ color: "#D32F2F", fontSize: "12px" }}>{errors.amount}</span>}\n\n      <label style={{ fontSize: "12px", fontWeight: 500, marginTop: "16px", display: "block" }}>bKash Number</label>\n      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}\n        style={{ display: "block", width: "100%", marginTop: "8px", padding: "16px" }} />\n      {errors.phone && <span style={{ color: "#D32F2F", fontSize: "12px" }}>{errors.phone}</span>}\n\n      <button disabled={!isFormValid}\n        style={{ background: "#E2136E", color: "#fff", width: "100%", marginTop: "24px", padding: "16px" }}>\n        Pay Now\n      </button>\n    </div>\n  );\n}\n```\n\nCode DRY রাখতে inline style-গুলোর জায়গায় আপনার CSS/Tailwind token class বসিয়ে দিন।' },
            ],
          },
          desktopDemo: {
            steps: [
              { role: 'user', text: 'Figma token-গুলো project root-এ tokens.json-এ export করে রেখেছি। এগুলোকে source of truth ধরে, আমরা যে bKash flow বানাচ্ছি তার জন্য একটা PaymentForm component generate করুন।' },
              { role: 'claude', text: 'tokens.json পড়েছি, CSS custom property-তে map করেছি, PaymentForm generate করেছি:\n\n- colors.primary map হয়েছে --color-primary-এ\n- spacing.md map হয়েছে --space-md-এ\n- typography.body map হয়েছে body text style-এ\n\nComponent আছে src/components/PaymentForm.tsx-এ। Validation logic নেওয়া হয়েছে আপনার AI-NOTES annotation থেকে। Token-এর ব্যবহার আলাদা একটা tokens.css import-এ রাখা হয়েছে, তাই পরে brand বদলাতে হলে শুধু একটা file বদলালেই চলবে।' },
            ],
          },
        },
        {
          title: 'যে ভুলগুলো প্রায়ই হয়',
          description: 'Figma থেকে Claude-এ handoff-এর সময় এই চারটা ভুল সবচেয়ে বেশি হয়।',
          list: [
            'শুধু top-level frame-এর নাম বদলানো। Layer-এর নাম সবচেয়ে বেশি দরকার component আর element level-এ, page বা frame level-এ নয়। Frame-এর নাম "Payment Screen" দিলে কোনো লাভ নেই। ওই frame-এর ভেতরের "button/primary/disabled"-ই code বদলে দেয়।',
            'Simple component-এর জন্য AI-NOTES layer বাদ দেওয়া। Simple component-এরও এমন behaviour থাকে যা চোখে পড়ে না: hover state, disabled condition, error trigger। Annotate না করলে Claude common pattern দেখে ধরে নেয়, যা আপনার product-এর সঙ্গে না-ও মিলতে পারে।',
            'Codebase-এর সঙ্গে না মিলিয়েই token export করা। Export-এ যদি এমন Figma variable name থাকে যা আপনার codebase চেনে না, তাহলে developer-কে আরেক দফা নাম মেলাতে হয়। Handoff-এর আগে মিলিয়ে দেখুন, export-এর token name আর dev team যে নাম ব্যবহার করে, সেগুলো এক কি না।',
            'Design শেষ হওয়ার আগেই file handoff করা। যে file এখনও বদলাচ্ছে, তাতে annotation আর layer name যোগ করলে confusion তৈরি হয়। Design stable হলে handoff prep pass একবারই করুন।',
          ],
        },
      ],
      nextLink: {
        label: 'Claude Code দিয়ে আপনার প্রথম flow বানান',
        href: '/for-designers/build-your-first-flow',
      },
    },
  },

  'build-your-first-flow': {
    sourceHash: "98723a7e07281bd3",
    translatedAt: "2026-10-06",
    content: {
      title: 'Claude Code দিয়ে আপনার প্রথম flow বানান',
      slug: 'build-your-first-flow',
      duration: '৩০ মিনিট',
      difficulty: 'intermediate',
      availableRoutes: ['desktop'],
      usesCodeTab: true,
      description:
        'Claude Code দিয়ে একটা design-কে চালু UI prototype-এ বদলে ফেলুন। Frontend-এর অভিজ্ঞতা লাগবে না। শুধু একটা Figma file, একটা description আর একটা terminal।',
      intro:
        'এই guide সেই UX আর UI designer-দের জন্য, যারা একটা finished Figma screen developer-কে না দিয়ে নিজেই সেটাকে চালু, interactive code-এ বদলাতে চান। পড়া শেষে আপনি একটা design description থেকে reusable React component (UI code-এর একটা আলাদা, নিজে নিজে চলা অংশ) scaffold করতে পারবেন, validation আর interaction state যোগ করতে পারবেন, আর সহজ ভাষার prompt দিয়ে বারবার iterate করতে পারবেন। আপনি একটা flow design করেছেন। এখন সেটা কাজ করতে দেখতে চান, শুধু static prototype হিসেবে নয়, browser-এ আসল code হিসেবে। Developer-কে দিয়ে অপেক্ষা করার চেয়ে Claude Code এই দূরত্ব অনেক দ্রুত পার করে দিতে পারে। এই guide আপনাকে একটা finished Figma screen থেকে চালু একটা React component পর্যন্ত ধাপে ধাপে নিয়ে যাবে, শুধু সহজ ভাষা আর একটা terminal দিয়ে।',
      situation: {
        scene: 'আপনার কাছে একটা finished Figma screen আছে, আর আপনি সেটাকে browser-এ কাজ করতে দেখতে চান। Static prototype নয়। আসল interactive code। কিন্তু আপনি কখনো terminal খোলেননি, আর কোথা থেকে শুরু করবেন জানেন না।',
        outcome: 'আপনার design-এর সহজ ভাষার description থেকে আপনি একটা চালু React component বানাবেন, validation আর loading state সহ, নিজে একটা line code-ও edit না করে।',
      },
      outcomes: [
        'আপনার Figma design-এর সহজ ভাষার description থেকে scaffold করা একটা চালু React component',
        'Validation, interaction state আর loading behaviour, যা যোগ হয়েছে prompt দিয়ে, code edit করে নয়',
        'এমন একটা prototype যা developer-কে চালু starting point হিসেবে দিতে পারবেন, static file হিসেবে নয়',
      ],
      steps: [
        {
          title: 'আপনার design সহজ ভাষায় লিখে ফেলুন',
          description:
            'কোনো code ধরার আগে যে screen বানাতে চান, সেটা লিখে ফেলুন। Specific হোন: layout, component, interaction, state। Description যত precise হবে, আসা-যাওয়া তত কম লাগবে। এই description-টা আপনার project root-এ DESIGN.md নামের একটা file-এ লিখুন।',
          code: {
            snippet: `# DESIGN.md-এর উদাহরণ

## Screen: bKash Send Money

Layout: single-column, mobile (375px)। সাদা background।

Header
- Back arrow (বাঁয়ে), "Send Money" title (মাঝখানে), ডানে কোনো action নেই

Form
- Amount field: বড় number input, ডানে BDT label, placeholder "0"
- Phone field: tel input, label "bKash Number", placeholder "01XXXXXXXXX"
- Inline error: কোনো field invalid হলে তার নিচে দেখাবে, লাল #D32F2F

CTA
- "Send Money" button, full width, primary pink #E2136E
- দুটো field validation pass না করা পর্যন্ত disabled
- Loading state: API call চলার সময় label-এর জায়গায় spinner

States: default, field-error, loading, success`,
            language: 'markdown',
          },
          demo: {
            steps: [
              { type: 'cmd', text: 'mkdir bkash-flow && cd bkash-flow' },
              { type: 'cmd', text: 'touch DESIGN.md' },
              { type: 'cmd', text: 'claude' },
              { type: 'out', text: 'Reading DESIGN.md...' },
              { type: 'success', text: 'Claude Code session started. DESIGN.md loaded.' },
            ],
          },
          desktopDemo: {
            steps: [
              { role: 'user', text: 'Send Money screen-এর description দিয়ে DESIGN.md বানিয়েছি। এটা পড়ুন। কোনো code লেখার আগে confirm করুন যে layout আর state-গুলো বুঝেছেন।' },
              { role: 'claude', text: 'DESIGN.md পড়েছি। Confirm করছি:\n\n- Single-column mobile layout, 375px\n- তিনটা section: header (back + title), form (amount + phone, inline error সহ), CTA (primary button)\n- চারটা state: default, field-error, loading, success\n- Validation: amount > 0, phone মিলতে হবে 01XXXXXXXXX pattern-এর সঙ্গে\n- Token: primary #E2136E, error #D32F2F\n\nScaffold করার জন্য ready। আগে component shell দিয়ে শুরু করব, নাকি validation logic দিয়ে?' },
            ],
          },
        },
        {
          title: 'একবারে একটা করে component scaffold করুন',
          description:
            'পুরো screen একবারে বানাতে Claude-কে বলবেন না। আগে form field, তারপর validation, তারপর button state, তারপর loading state। ছোট request দিলে পরিষ্কার, review করার মতো output আসে। বড় request দিলে এমন code আসে যা আপনি বুঝে উঠতে পারবেন না।',
          code: {
            snippet: `Mobile checkout-এর জন্য একটা step indicator বানান। তিনটা step: Cart, Payment, Confirm।
Active step highlight করা থাকবে, শেষ হওয়া step-এ checkmark থাকবে,
সামনের step-গুলো dim থাকবে। Framework নিয়ে এখনো কোনো preference নেই।`,
            language: 'text',
          },
          demo: {
            steps: [
              { type: 'cmd', text: 'claude "SendMoneyForm.tsx scaffold করুন, amount আর phone field দিয়ে। Validation এখনই লাগবে না। Layout আর token value DESIGN.md থেকে নিন।"' },
              { type: 'out', text: 'Scaffolding SendMoneyForm.tsx...', delay: 600 },
              { type: 'out', text: 'Created: src/components/SendMoneyForm.tsx' },
              { type: 'out', text: 'Created: src/components/SendMoneyForm.css' },
              { type: 'success', text: 'Shell ready। Preview দেখতে চালান: npm start' },
            ],
          },
          desktopDemo: {
            steps: [
              { role: 'user', text: 'SendMoneyForm.tsx scaffold করুন, শুধু দুটো field আর button দিয়ে। DESIGN.md-এর token ব্যবহার করুন। Validation logic এখন না, ওটা পরের step-এ আমি যোগ করব।' },
              { role: 'claude', text: 'src/components/SendMoneyForm.tsx বানিয়েছি:\n\n- BDT label সহ amount input, useState দিয়ে controlled\n- Phone input, type="tel", useState দিয়ে controlled\n- Primary button, আপাতত সব সময় enabled (disable logic পরের step-এ wire করব)\n- প্রতিটা field-এর নিচে inline error-এর জায়গা, আপাতত খালি\n- Token বসানো হয়েছে: #E2136E button, #F5F5F5 background, 16px body type\n\nComponent render হচ্ছে। এবার validation যোগ করুন।' },
            ],
          },
        },
        {
          title: 'Validation আর loading state যোগ করুন, তারপর iterate করুন',
          description:
            'এবার ধাপে ধাপে behaviour যোগ করুন। আগে Claude-কে validation যোগ করতে বলুন, browser-এ test করুন, তারপর loading state চান। প্রতিটা iteration এত ছোট রাখুন যেন পরের ধাপে যাওয়ার আগে নিজে check করে নিতে পারেন কাজ হয়েছে কি না। Code বোঝার দরকার নেই। Structure দেখার জন্য পড়ুন: আপনি যা describe করেছিলেন, তার সঙ্গে মিলছে কি? কোনো অংশ verify করতে চাইলে Claude-কে explain করতে বলুন।',
          code: {
            snippet: `Mobile-এ active step indicator-এর spacing খুব চাপা লাগছে।
Padding একটু বাড়ান, আর checkmark icon-টা 4px বড় করুন।`,
            language: 'text',
          },
          demo: {
            steps: [
              { type: 'cmd', text: 'claude "SendMoneyForm-এ validation যোগ করুন: amount min 10 max 5000, phone 11 digit, শুরু 01 দিয়ে। Inline error দেখান। দুটো valid না হওয়া পর্যন্ত button disable রাখুন।"' },
              { type: 'out', text: 'Adding validation...', delay: 400 },
              { type: 'out', text: 'Updated: src/components/SendMoneyForm.tsx' },
              { type: 'success', text: 'Validation যোগ হয়েছে। সামনে যাওয়ার আগে browser-এ test করে নিন।' },
            ],
          },
          desktopDemo: {
            steps: [
              { role: 'user', text: 'Form কাজ করছে। এবার loading state যোগ করুন: button-এ tap করলে সেটা disable হবে, label-এর জায়গায় ২ সেকেন্ড spinner ঘুরবে, তারপর একটা success message দেখাবে।' },
              { role: 'claude', text: 'Loading state যোগ করেছি:\n\n- `isLoading` state দিয়ে button disable আর label বদলানো হয়\n- Spinner: CSS border-animation, 20px, সাদা, button-এর মাঝখানে\n- `setTimeout(2000)` দিয়ে API call simulate করা হয়েছে (ready হলে আসল fetch বসিয়ে দিন)\n- Success message: resolve হলে form-এর জায়গায় সবুজ checkmark + "Money sent!"\n\nDESIGN.md-এর চারটা state-ই এখন implement করা: default, field-error, loading, success। Component এখন আসল API-এর সঙ্গে wire করার জন্য ready।' },
            ],
          },
        },
        {
          title: 'যে ভুলগুলো প্রায়ই হয়',
          description: 'প্রথম flow বানানোর সময় এই চারটা ভুল সবচেয়ে বেশি হয়।',
          list: [
            'পুরো screen একবারে বানাতে Claude-কে বলা। বড় request দিলে বড়, পড়া যায় না এমন output আসে। Build-টা ভাগ করে নিন: আগে shell, তারপর validation, তারপর interaction state। প্রতিটা step-এর পর এমন কিছু থাকা উচিত যা browser-এ খুলে verify করা যায়।',
            'শুরুর আগে DESIGN.md না লেখা। লেখা description না থাকলে Claude-কে আপনার prompt থেকে তখনই তখনই আপনার intent আন্দাজ করতে হয়। Prompt-এ প্রতিটা অস্পষ্ট জায়গার জন্য এক দফা correction লাগে। আগে description লিখুন; ১০ মিনিট লাগে, আর ৩০ মিনিট বাঁচে।',
            'Prompt দিয়ে change না চেয়ে নিজে code edit করা। Generate হওয়া file খুলে হাতে edit করলে feedback loop ভেঙে যায়। আপনি কী বদলেছেন Claude জানে না, তাই পরের prompt-এ আপনার edit মুছে যেতে পারে। Change-টা সহজ ভাষায় বলুন, Claude-কে করতে দিন।',
            'Prototype-কে production code ভাবা। Design description থেকে Claude যে code বানায়, সেটা চালু prototype, production-ready নয়। Ship করার আগে Claude-কে বলুন TypeScript type যোগ করতে, placeholder API call-এর জায়গায় আসল call বসাতে, আর prototype যে edge case বাদ দিয়েছে সেগুলো handle করতে।',
          ],
        },
      ],
      nextLink: {
        label: 'Claude Design দিয়ে শুরু করুন',
        href: '/for-designers/get-started-with-claude-design',
      },
    },
  },

  'get-started-with-claude-design': {
    sourceHash: "7d90ea165386a46f",
    translatedAt: "2026-10-06",
    content: {
      title: 'Claude Design দিয়ে শুরু করুন',
      slug: 'get-started-with-claude-design',
      duration: '১৫ মিনিট',
      difficulty: 'beginner',
      availableRoutes: ['web', 'desktop'],
      description:
        'Claude Design হলো Anthropic-এর text-to-prototype tool। একটা screen describe করুন, ফেরত পাবেন চালু interactive prototype। এটাকে কীভাবে ঠিকমতো prompt করবেন, এই guide-এ তা দেখানো হয়েছে।',
      intro:
        'এই guide সেই UX আর UI designer-দের জন্য, যারা Claude Design দিয়ে একটা screen description-কে চালু interactive prototype-এ বদলাতে চান। পড়া শেষে আপনি এমন prompt লিখতে পারবেন যা কাজের, specific output দেয়, targeted change দিয়ে prototype-এ iterate করতে পারবেন, আর result-টা developer-দের জন্য একটা লেখা component specification (reference spec) হিসেবে export করতে পারবেন। Claude Design (launch হয়েছে এপ্রিল ২০২৬-এ) দিয়ে একটা UI describe করলে ফেরত পান চালু prototype: mockup নয়, wireframe নয়, browser-এ render হওয়া আসল interactive code। Designer-দের জন্য Figma না খুলে বা এক line code না লিখে কোনো idea test করার এটাই সবচেয়ে দ্রুত উপায়। কোন prompt pattern থেকে কাজের output আসে আর কোনটা থেকে generic জিনিস আসে, এই guide-এ সেটাই দেখানো হয়েছে।',
      situation: {
        scene: 'আপনি Claude Design ব্যবহার করে দেখেছেন। প্রতিটা prototype দেখতে হয়েছে একই রকম generic SaaS dashboard: নীল header আর card-এর grid। আপনি জানেন tool-টা এর চেয়ে ভালো পারে, কিন্তু আপনার prompt কাজ করছে না।',
        outcome: 'আপনি শিখবেন কোন prompt pattern থেকে specific, context বুঝে বানানো output আসে, আর যা আগে থেকে কাজ করছিল সেটা না হারিয়ে কীভাবে একবারে একটা জিনিস নিয়ে iterate করবেন।',
      },
      outcomes: [
        'যে prompt structure থেকে generic template-এর বদলে specific, context বুঝে বানানো prototype আসে',
        'পুরোটা নতুন করে লেখা না করিয়ে কীভাবে একবারে একটা change নিয়ে iterate করবেন',
        'একটা live prototype URL আর একটা লেখা component spec, যা developer-কে দেওয়ার জন্য ready',
      ],
      steps: [
        {
          title: 'এমন brief লিখুন যা শুধু চেহারা নয়, context বলে',
          description:
            'Claude Design নিয়ে সবচেয়ে common ভুল হলো screen দেখতে কেমন হবে সেটা বলা, কী কাজ করবে সেটা নয়। "clean, modern, minimal" লেখা prompt থেকে আর দশটা SaaS dashboard-এর মতোই জিনিস আসে। যে prompt-এ audience, flow আর constraint বলা থাকে, সেটা থেকে কাজের কিছু আসে।',
          code: {
            snippet: `একটা savings app-এর জন্য mobile onboarding screen design করুন।
Target: বাংলাদেশের যারা প্রথমবার smartphone ব্যবহার করছেন।
উপরে একটা progress bar (step 1 of 3), একটা friendly illustration-এর
placeholder, একটা headline ("Save a little every day"), এক line-এর subtext,
আর একটা বড় primary CTA button দেখান।`,
            language: 'text',
          },
          appDemo: {
            steps: [
              { role: 'user', text: 'বাংলাদেশের bKash user-দের জন্য একটা mobile payment confirmation screen design করুন। User এইমাত্র একটা amount (500 BDT) আর recipient-এর phone number দিয়েছে। টাকা যাওয়ার আগে তাকে confirm করতে হবে। Primary action: Confirm। Secondary: Go back। Recipient number আর amount পরিষ্কার দেখাতে হবে। Brand color #E2136E। User-রা low-end Android ব্যবহার করে, screen ছোট, প্রায়ই বাইরে থাকে।' },
              { role: 'claude', text: 'এই নিন আপনার payment confirmation screen:\n\n[Rendered prototype]\n\nDesign-এ যে decision নেওয়া হয়েছে:\n- Amount (500 BDT) বড়, মাঝখানে আর bold, যাতে বাইরে থেকেও এক নজরে মিলিয়ে নেওয়া যায়\n- ভুল পড়া কমাতে recipient number আলাদা একটা monospace block-এ\n- Confirm button full-width, primary pink, বড় tap target, যাতে বাইরে বা glove পরে থাকলেও tap করা যায়\n- Back link button-এর নিচে text হিসেবে, পাশে আরেকটা button হিসেবে নয় (ভুল করে tap কমে)\n- পুরোটা জুড়ে high contrast (ছোট screen-এ WCAG AA)\n\nLoading state বা error state যোগ করব?' },
            ],
          },
        },
        {
          title: 'একবারে একটা জিনিস নিয়ে iterate করুন',
          description:
            'Claude Design চালু code বানায়, তাই আপনি সেটার ওপর iterate করতে পারেন। একবারে একটা change চান: layout adjust করুন, color বদলান, একটা state যোগ করুন। একসঙ্গে পাঁচটা change চাইলে পুরোটা নতুন করে লেখা হয়, আর যা কাজ করছিল সেখান থেকে সরে যায়।',
          code: {
            snippet: `ছোট screen-এ illustration-টা অনেক বড় লাগছে। ওটার জায়গায় একটা icon দিন
(piggy bank বা এরকম কিছু)। Progress bar রাখুন, আর সব মিলিয়ে padding কমান,
যাতে 5-inch screen-এও CTA button scroll না করেই সব সময় দেখা যায়।`,
            language: 'text',
          },
          appDemo: {
            steps: [
              { role: 'user', text: 'Layout ঠিক আছে। এবার amount 2000 BDT-এর বেশি হলে একটা warning দিন: হলুদ একটা banner, লেখা থাকবে "Large transfer: verify the recipient number before confirming." বাকি সব যেমন আছে তেমন রাখুন।' },
              { role: 'claude', text: 'Warning banner যোগ করেছি। Amount > 2000 BDT হলেই শুধু এটা দেখা যাবে।\n\n[Updated rendered prototype]\n\nBanner-টা recipient info আর Confirm button-এর মাঝখানে বসানো, তাই tap করার আগেই user-এর চোখ এখানে আটকাবে। হলুদ #FFF3CD, সঙ্গে warning icon। Text হুবহু আপনার দেওয়া copy-র মতো।\n\nScreen-এর বাকি অংশ বদলানো হয়নি।' },
            ],
          },
        },
        {
          title: 'Prototype export করুন আর handoff দিন',
          description:
            'Prototype যখন আপনার দরকার মতো কাজ করে, তখন generate হওয়া code export করুন বা সরাসরি copy করে নিন। আরও development-এর জন্য এটা একটা Claude Code session-এ paste করতে পারেন, stakeholder review-এর জন্য live URL share করতে পারেন, অথবা development team-এর জন্য code-টা একটা লেখা component specification (reference spec) হিসেবে ব্যবহার করতে পারেন।',
          code: {
            snippet: `Developer-এর জন্য একটা লেখা spec generate করুন। এতে রাখুন: component list,
প্রতিটা text element-এর হুবহু copy, যে color token ব্যবহার হয়েছে (token-এর নাম
আমার working agreement থেকে নিন), আর mobile breakpoint নিয়ে কী ধরে নেওয়া হয়েছে।`,
            language: 'text',
          },
          appDemo: {
            steps: [
              { role: 'user', text: 'Prototype approve হয়ে গেছে। Developer-কে দেওয়ার জন্য code কীভাবে বের করব?' },
              { role: 'claude', text: 'দুটো option:\n\n1. Source code copy করুন: prototype panel-এর উপরে ডানদিকে code view icon-এ click করুন। পুরো component copy করে নিন।\n\n2. Live URL share করুন: prototype একটা share করার মতো URL-এ চলে। Live reference হিসেবে stakeholder বা developer-দের পাঠিয়ে দিন। এই conversation যতদিন থাকবে, URL-ও ততদিন active থাকবে।\n\nDeveloper যদি Claude Code ব্যবহার করেন, তাহলে সবচেয়ে efficient handoff হলো component code একটা নতুন Claude Code session-এ এই prompt সহ paste করা: "এটা একটা Claude Design prototype। Production-এর জন্য এটা clean up করে দিন: inline style-এর জায়গায় Tailwind দিন, ঠিকঠাক TypeScript type যোগ করুন, আর Confirm button-টা [আপনার API endpoint]-এর সঙ্গে wire করে দিন।" এতে আর এক ধাপেই prototype থেকে production-ready-তে পৌঁছে যাবেন।' },
            ],
          },
        },
        {
          title: 'যে ভুলগুলো প্রায়ই হয়',
          description: 'Claude Design ব্যবহারের সময় এই চারটা ভুল সবচেয়ে বেশি হয়।',
          list: [
            'কী কাজে লাগবে না বলে চেহারা describe করা। "Clean, modern, নীল header" দিলে Claude দেখতে কেমন হবে তার একটা direction পায়, কিন্তু কোনো functional constraint পায় না। বলুন কে এটা ব্যবহার করে, সে কী করতে চাইছে, আর তার কী কী constraint আছে। দেখতে কেমন হবে, সেটা এখান থেকেই আসে।',
            'একসঙ্গে অনেক change চাওয়া। একবারে পাঁচটা change চাইলে পুরোটা নতুন করে লেখা হয়। আপনার চাওয়া প্রতিটা change prototype-এর আলাদা আলাদা অংশে হাত দেয়। একবারে একটা করলে প্রতিটা iteration review করা যায়, দরকার হলে ফিরিয়েও নেওয়া যায়।',
            'Prototype-কে final ভাবা। Claude Design-এর prototype দ্রুত বানানো যায়, দ্রুত ফেলেও দেওয়া যায়। এগুলো idea test করার জন্য, product ship করার জন্য নয়। Code developer-এর কাছে যাওয়ার আগে একটা cleanup pass লাগবে: ঠিকঠাক type, আসল API call, accessibility attribute।',
            'Spec export না করা। Demo-র জন্য live prototype URL চলে, কিন্তু handoff document হিসেবে চলে না। লেখা component specification (reference spec) থেকেই developer prototype না খুলে বানাতে পারেন। Session বন্ধ করার আগে এটা generate করে নিন।',
          ],
        },
      ],
      nextLink: {
        label: 'Claude দিয়ে user research synthesize করুন',
        href: '/for-designers/research-synthesis',
      },
    },
  },

  'research-synthesis': {
    sourceHash: "0086d67c3c8b8771",
    translatedAt: "2026-10-06",
    content: {
      title: 'Claude দিয়ে user research synthesize করুন',
      slug: 'research-synthesis',
      duration: '২০ মিনিট',
      difficulty: 'beginner',
      availableRoutes: ['web', 'desktop'],
      description:
        'Raw interview note, session recording আর survey response থেকে এক session-এই priority অনুযায়ী সাজানো finding বের করুন। Pattern খোঁজার কাজ Claude করে; কোনটা ঠিক, সেই judgment আপনার।',
      intro:
        'এই guide সেই UX আর UI designer-দের জন্য, যারা user interview শেষ করেছেন আর এখন raw note থেকে একটা গোছানো findings report বানাতে হবে। পড়া শেষে আপনি synthesis-এর জন্য note format করতে পারবেন, Claude-কে দিয়ে একটা structured thematic analysis চালাতে পারবেন, আর present করার আগে output-কে challenge করতে পারবেন। আপনি পাঁচটা user interview নিয়েছেন। হাতে 40 পাতার raw note। শুক্রবারের মধ্যে findings report দিতে হবে। Claude ছাড়া এটা ঘণ্টার পর ঘণ্টা হাতে affinity mapping (একই রকম observation-গুলোকে theme-এ group করা) আর theme বের করার কাজ। Claude থাকলে এটা একটা focused session: raw material paste করবেন, synthesis চালাবেন, তারপর output review করে challenge করবেন। Review-এর ধাপটা জরুরি: Claude pattern খুঁজে বের করে, কিন্তু কোন pattern সত্যি আর কোনটা শুধু আপনি কাদের recruit করেছেন তার ফল, সেটা আপনি জানেন।',
      situation: {
        scene: 'আপনি পাঁচটা user interview নিয়েছেন। হাতে 40 পাতার raw note, আর findings report-এর deadline শুক্রবার। হাতে affinity mapping করতে যত ঘণ্টা লাগে, তত সময় আপনার নেই।',
        outcome: 'আপনি raw note থেকে theme, participant count আর হুবহু quote সহ একটা গোছানো findings report বানাবেন, তারপর কিছু present করার আগে সেটাকে challenge করবেন।',
      },
      outcomes: [
        'আপনার raw note-এর thematic synthesis, প্রতিটা theme-এর সঙ্গে participant count আর হুবহু quote',
        'Priority অনুযায়ী সাজানো তিন থেকে পাঁচটা design implication, sprint-এ নিয়ে যাওয়ার জন্য ready',
        'একটা challenge pass, যা stakeholder-দের সামনে present করার আগেই sample-এর কারণে তৈরি হওয়া ভুল pattern ধরিয়ে দেয়',
      ],
      promptContrast: {
        bad: 'এই user research note-গুলোর summary করে দিন।',
        good: 'এখানে ছয়টা user interview-এর হুবহু note আছে। Research question: user-রা checkout flow মাঝপথে কেন ছেড়ে দেয়? সবচেয়ে বড় তিনটা theme বের করুন। প্রতিটা theme-এর জন্য একটা হুবহু quote দিন। আর কোনো theme শুধু একজন participant বললে সেটা flag করুন।',
        why: 'Research question থাকলে synthesis একটা summary-তে না গিয়ে একটা decision-এর দিকে যায়। Quote count চাইলে দুর্বল theme-গুলো validated finding হিসেবে present করার আগেই চোখে পড়ে।',
      },
      steps: [
        {
          title: 'Paste করার জন্য raw note ready করুন',
          description:
            'Claude গোছানো raw material-এ সবচেয়ে ভালো কাজ করে। Paste করার আগে প্রতিটা participant-এর note-এর উপরে এক line-এর একটা header দিন: তার ID, role আর মূল context। Note-গুলো নিজে পরিষ্কার করার দরকার নেই: হুবহু quote আর ভাঙা ভাঙা observation থাকলেও সমস্যা নেই।',
          code: {
            snippet: `# Synthesis-এর জন্য paste করার format

## P01 | Role: ছোট ব্যবসার মালিক | Device: Android, 4G | Session: ৪৫ মিনিট
[এখানে হুবহু raw note]

## P02 | Role: Freelance driver | Device: Feature phone, 2G | Session: ৩০ মিনিট
[এখানে হুবহু raw note]

# Header-গুলো সব জায়গায় একই রকম রাখুন, participant-দের মধ্যে
# finding মিলিয়ে দেখতে Claude এগুলোই ব্যবহার করে`,
            language: 'markdown',
          },
          appDemo: {
            steps: [
              { role: 'user', text: 'bKash user-দের পাঁচটা interview transcript আমার কাছে আছে। কোন format-এ paste করলে আপনি ঠিকঠাক synthesis চালাতে পারবেন?' },
              { role: 'claude', text: 'এই structure ব্যবহার করুন: প্রতিটা participant-এর জন্য একটা section, উপরে এক line-এর header, যাতে থাকবে তার ID, role, আর note বুঝতে কাজে লাগে এমন যেকোনো context (device type, অভিজ্ঞতা, location)।\n\n## P01 | Role: বাজারের দোকানি | Device: Android, low-end | Location: ঢাকা\n[raw note]\n\n## P02 | Role: garment worker | Device: feature phone | Location: চট্টগ্রাম\n[raw note]\n\nPaste করার আগে note পরিষ্কার করবেন না। নিজের ভাষায় লেখা summary-র চেয়ে হুবহু quote বেশি কাজের, কারণ তখন আমি ধরতে পারি user-রা ঠিক কোন শব্দগুলো ব্যবহার করেন। ভাঙা ভাঙা observation থাকলেও সমস্যা নেই।\n\nPaste করার পর আমাকে বলুন: এই study কোন research question-এর উত্তর খুঁজছিল?' },
            ],
          },
          desktopDemo: {
            steps: [
              { role: 'user', text: 'পাঁচটা interview transcript-ই project root-এ all-notes.md নামে save করেছি। এটা পড়ুন, আর synthesis চালানোর আগে confirm করুন যে পাঁচজন participant-কেই দেখতে পাচ্ছেন।' },
              { role: 'claude', text: 'all-notes.md পড়েছি। পাঁচজন participant confirm:\n\n- P01: ছোট ব্যবসার মালিক, ঢাকা, Android\n- P02: garment worker, চট্টগ্রাম, feature phone\n- P03: freelance driver, সিলেট, Android\n- P04: বাজারের দোকানি, রাজশাহী, feature phone\n- P05: গৃহকর্মী, ঢাকা, Android\n\nমোট: 47 পাতার note। Synthesis-এর জন্য ready। Research question কী ছিল?' },
            ],
          },
        },
        {
          title: 'Synthesis prompt চালান',
          description:
            'Claude-কে "এই note-গুলোর summary করুন" টাইপের general request না দিয়ে একটা specific synthesis task দিন। কোন output structure লাগবে বলে দিন: theme, তার পক্ষে quote, participant count, আর severity বা frequency-র একটা marker। গোছানো output review করাও সহজ, present করাও সহজ।',
          code: {
            snippet: `এই যে আমার raw interview note। সবচেয়ে বড় পাঁচটা theme বের করুন।
প্রতিটা theme-এর জন্য: একটা নাম দিন, এক sentence-এ বুঝিয়ে লিখুন,
এর পক্ষে দুই-তিনটা quote দিন, আর confidence rate করুন
(কতজন participant বলেছে তার ভিত্তিতে high/medium/low)।
Note-এ নেই এমন কোনো theme বানাবেন না।`,
            language: 'text',
          },
          appDemo: {
            steps: [
              { role: 'user', text: 'Research question: bKash user-রা confirm করার আগেই Send Money flow কেন ছেড়ে দেয়? একটা thematic synthesis চালান। প্রতিটা theme-এর জন্য: নাম দিন, কোন কোন participant এটা বলেছে গুনে দিন, একটা হুবহু quote দিন, আর frequency rate করুন (all/most/some/one)। তারপর সবচেয়ে বড় তিনটা design implication লিখুন।' },
              { role: 'claude', text: 'Synthesis শেষ। চারটা theme পাওয়া গেছে:\n\n**Theme 1: Amount entry নিয়ে anxiety** (পাঁচজন participant-ই)\nAmount field-এ এসে user-রা থমকে যান, কারণ confirm করার আগে fee, limit বা টাকা ফেরতের policy নিয়ে কোনো ইঙ্গিত থাকে না।\nQuote (P03): "চার্জ কাটবে কি না শিওর না, তাই যত পাঠাতে চাই সব সময় তার চেয়ে কম লিখি।"\n\n**Theme 2: Recipient number নিয়ে সন্দেহ** (4/5 participant)\nConfirm চাপার আগে user-রা phone number 2-3 বার মিলিয়ে দেখেন। Number-টা ছোট, হালকা font-এ দেখানো হয়, বাইরে থেকে পড়া কঠিন।\nQuote (P01): "একবার ভুল নম্বরে টাকা চলে গেছিল। এখন আগে কাগজে লিখে নেই।"\n\n**Theme 3: Confirmation step-এ ভরসা নেই** (3/5 participant)\nConfirm চাপলেই কি টাকা চলে যায়, নাকি আরেকটা step আছে, user-রা নিশ্চিত নন। কয়েকজন tap করার পরপরই Cancel button খুঁজেছেন।\nQuote (P04): "চাপ দেওয়ার পর বুঝি না কাজ হয়ে গেল, নাকি এখনো থামানো যাবে।"\n\n**Theme 4: Success state নিয়ে confusion** (2/5 participant)\nSuccess screen-এ fee সহ final amount পরিষ্কার দেখায় না। আসলে কত কাটা গেল, user-রা বুঝতে পারেন না।\nQuote (P02): "সবুজ টিক আসে, কিন্তু কাজ হলো কি না জানতে আলাদা করে balance চেক করি।"\n\n**সবচেয়ে বড় তিনটা design implication:**\n1. Fee আর final amount confirm-এর আগে দেখান, পরে নয়\n2. Recipient number বড় করে, বেশি contrast দিয়ে দেখান\n3. পরিষ্কার একটা "Transfer in progress" state যোগ করুন, আর success-এ final কত কাটা গেল সেটা পরিষ্কার দেখান' },
            ],
          },
          desktopDemo: {
            steps: [
              { role: 'user', text: 'all-notes.md-এর ওপর thematic synthesis চালান। Research question: confirm করার আগেই user-রা Send Money কেন ছেড়ে দেয়? আমার লাগবে: theme-এর নাম, participant count, হুবহু quote, frequency। শেষে সবচেয়ে বড় তিনটা design implication।' },
              { role: 'claude', text: 'Synthesis শেষ। পাঁচজন participant-এর মধ্যে চারটা theme।\n\nReview-এর জন্য project root-এ synthesis-output.md-তে save করেছি।\n\nShort version:\n1. Amount entry নিয়ে anxiety (5/5): confirm-এর আগে fee দেখা যায় না\n2. Recipient নিয়ে সন্দেহ (4/5): বাইরে থেকে মিলিয়ে দেখার জন্য number খুব ছোট\n3. Confirmation-এ ভরসা নেই (3/5): tap-টাই শেষ, নাকি আরেকটা step আছে, বোঝা যায় না\n4. Success নিয়ে confusion (2/5): সবুজ টিকে final কাটা amount দেখায় না\n\nসবচেয়ে বড় তিনটা design implication: confirm-এর আগে fee দেখানো, high contrast দিয়ে বড় recipient number, আর পরিষ্কার success summary সহ একটা in-progress state।' },
            ],
          },
        },
        {
          title: 'Present করার আগে synthesis-কে challenge করুন',
          description:
            'আপনি যা দিয়েছেন, Claude তার মধ্যেই pattern খোঁজে। আপনার participant sample একদিকে হেলে ছিল কি না, কোনো quote context থেকে কেটে নেওয়া কি না, বা কোনো theme সত্যি নাকি শুধু আপনার recruitment criteria-র ফল, এসব Claude জানতে পারে না। Finding present করার আগে এগুলো নিয়ে কড়া প্রশ্ন করুন।',
          code: {
            snippet: `Theme 2-এর বিপক্ষে যুক্তি দিন। Note-এর কোন evidence এর উল্টো কথা বলে,
বা অন্যভাবে ব্যাখ্যা করার সুযোগ দেয়? একজন skeptic এই finding নিয়ে
কী বলবে?`,
            language: 'text',
          },
          appDemo: {
            steps: [
              { role: 'user', text: 'উল্টো দিক থেকে ভাবুন: এই চারটা theme-এর মধ্যে কোনটা আসল user problem না হয়ে শুধু sample-এর কারণে আসার সম্ভাবনা সবচেয়ে বেশি? আমার পাঁচজন participant-ই শহরের Android user, আগে থেকে bKash ব্যবহার করেন।' },
              { role: 'claude', text: 'Theme 4 (success state নিয়ে confusion) নিয়েই সন্দেহ সবচেয়ে বেশি।\n\nকারণ: শহরের অভিজ্ঞ Android user-দের মাথায় mobile payment কীভাবে কাজ করে তার একটা ধারণা আছে। এক-দুবার ঝামেলায় পড়ে তারা balance check করা শিখে গেছেন। শেখা এই অভ্যাসটা এমন একটা problem ঢেকে দেয়, যা প্রথমবারের বা গ্রামের user-দের অনেক বেশি ভোগাতে পারে।\n\nআপনার participant-রা এই সমস্যা এড়ানোর উপায় বের করে ফেলেছেন বলেই হয়তো আপনার sample-এ success state-এর signal দুর্বল এসেছে।\n\nRecommendation: Theme 4-কে confirmed finding না ধরে "প্রথমবারের user-দের সঙ্গে validate করতে হবে" হিসেবে রাখুন। বাদ দেবেন না, কিন্তু flag করুন। বাকি তিনটা theme (amount নিয়ে anxiety, recipient নিয়ে সন্দেহ, confirmation-এ ভরসা নেই) sample-এর কারণে আসার সম্ভাবনা কম, কারণ অভিজ্ঞ user-রাও এগুলো বলছেন, মানে friction-টা সত্যি, literacy-র সমস্যা নয়।' },
            ],
          },
          desktopDemo: {
            steps: [
              { role: 'user', text: 'আমার sample-এর সবাই শহরের, Android, অভিজ্ঞ bKash user। চারটা theme-এর মধ্যে কোনটা present করার আগে caveat লাগবে? আমি finding বাড়িয়ে বলতে চাই না।' },
              { role: 'claude', text: 'Theme 4 (success state নিয়ে confusion) flag করুন "preliminary, প্রথমবারের user-দের সঙ্গে validate করতে হবে" হিসেবে।\n\nঅভিজ্ঞ sample সম্ভবত এটা কম report করে, কারণ তাদের একটা বিকল্প উপায় আছে (আলাদা করে balance check করা)। প্রথমবারের user-দের সেই উপায় জানা নেই, তাদের দুশ্চিন্তা অনেক বেশি হতে পারে।\n\nTheme 1-3-এর ক্ষেত্রে: শহরের অভিজ্ঞ user-রা এগুলো বলছেন, এটা বরং আপনি যতটা ভাবছেন তার চেয়েও strong signal। এরা মাসের পর মাস app-এর friction এড়িয়ে চলছেন, তবুও এখানে আটকাচ্ছেন। আসল user base-এ severity সম্ভবত আরও বেশি।\n\nআপনার report-এর জন্য caveat-এর একটা suggestion: "Finding validate করা হয়েছে শহরের অভিজ্ঞ user-দের সঙ্গে। Theme 4-এর জন্য মফস্বল আর গ্রামের প্রথমবারের user-দের সঙ্গে follow-up session দরকার।"' },
            ],
          },
        },
        {
          title: 'যে ভুলগুলো প্রায়ই হয়',
          description: 'Claude দিয়ে research synthesis করার সময় এই চারটা ভুল সবচেয়ে বেশি হয়।',
          list: [
            'Paste করার আগে note পরিষ্কার করা। Synthesis-এর আগে নিজের note নিজের ভাষায় নতুন করে লিখলে participant-দের আসল শব্দগুলো হারিয়ে যায়, জায়গা নেয় আপনার নিজের ব্যাখ্যা। হুবহু paste করুন। এলোমেলো থাকলেও সমস্যা নেই।',
            'Research question না বলা। "এই note-গুলোর summary করুন" দিলে উপর উপর একটা summary আসে। "User-রা checkout flow কেন ছেড়ে দেয়, সেটার সঙ্গে জড়িত theme-গুলো বের করুন" দিলে এমন finding আসে যার ওপর কাজ করা যায়। Synthesis চালানোর আগে সব সময় Claude-কে research question বলে দিন।',
            'Challenge step ছাড়াই synthesis present করা। আপনার note-এ statistically সবচেয়ে চোখে পড়া pattern-গুলো Claude খুঁজে বের করবে। কোন pattern sample-এর কারণে এসেছে, কোন quote ব্যতিক্রম, বা কোন theme আপনার recruitment criteria-র কারণে বড় দেখাচ্ছে, সেটা Claude বলতে পারে না। Stakeholder-দের সামনে present করলে challenge step বাদ দেওয়ার উপায় নেই।',
            'Claude-এর বের করা theme নিজের analysis হিসেবে present করা। Synthesis আপনার judgment-এর শুরু, final analysis নয়। Session-এ নিজে থেকে যা দেখেছেন তার সঙ্গে Claude-এর কোনো theme না মিললে, সেটা tentative হিসেবে flag করুন বা বাদ দিন। Session-এ আপনার উপস্থিতিও এমন data, যা Claude-এর কাছে নেই।',
          ],
        },
      ],
      nextLink: {
        label: 'বারবার করা design-এর কাজ automate করুন',
        href: '/for-designers/automate-design-tasks',
      },
    },
  },

  'automate-design-tasks': {
    sourceHash: "77aa0eb9eaa3c737",
    translatedAt: "2026-10-06",
    content: {
      title: 'বারবার করা design-এর কাজ automate করুন',
      slug: 'automate-design-tasks',
      duration: '২০ মিনিট',
      difficulty: 'beginner',
      availableRoutes: ['web', 'desktop'],
      description:
        'প্রতি সপ্তাহে যে কাজগুলো করেন, তার জন্য নিজের একটা prompt library বানান: copy variant লেখা, spec format করা, accessibility checklist বানানো, আরও অনেক কিছু।',
      intro:
        'এই guide সেই UX আর UI designer-দের জন্য, যাদের প্রতি সপ্তাহে একই ধাঁচের mechanical কাজে সময় যায়: microcopy variant লেখা, spec format করা, accessibility checklist বানানো। পড়া শেষে আপনি বের করতে পারবেন কোন কাজগুলো সবচেয়ে বেশি repeat হয়, নিজের একটা prompt library বানাতে পারবেন, আর প্রতিটা কাজ কয়েক মিনিটের বদলে কয়েক সেকেন্ডে সারতে পারবেন। সম্ভবত প্রতিটা project-এ আপনি একই পাঁচটা কাজ করেন: microcopy variant লেখা, design spec format করা, accessibility check করা, handoff note লেখা, আর placeholder content বানানো। এগুলো creative কাজ নয়। Mechanical কাজ। Precise prompt দিলে Claude এগুলো কয়েক সেকেন্ডেই করে দেয়। এই guide-এর accessibility prompt-এ যে key term-গুলো আছে: WCAG AA (color contrast আর interaction-এর accessibility standard), ARIA label (interactive element-এর জন্য screen reader যে text label পড়ে শোনায়), CTA (call-to-action button বা link), focus order (keyboard user-রা যে ক্রমে interactive element-গুলোর মধ্যে যান)।',
      situation: {
        scene: 'প্রতি সপ্তাহে আপনার এক ঘণ্টা যায় একই ধরনের content লিখতে: error message-এর variant, accessibility rationale, handoff note। কাজগুলো mechanical, বারবার একই, আর প্রতিটা project-এ লাগে।',
        outcome: 'সবচেয়ে বেশি repeat হওয়া পাঁচটা কাজের জন্য আপনি নিজের একটা prompt library বানাবেন, আর প্রতিটা ৩০ সেকেন্ডের কম সময়ে চালাবেন।',
      },
      outcomes: [
        'সবচেয়ে বেশি repeat হওয়া পাঁচটা design-এর কাজ, reusable prompt template হিসেবে',
        'প্রতিটা prompt এতটা refine করা যে output ব্যবহারের আগে কোনো edit লাগে না',
        'একটা maintenance routine, যাতে library ছোট থাকে আর পুরনো হয়ে না যায়',
      ],
      promptContrast: {
        bad: 'এই form field-এর error message-টা লিখে দিন।',
        good: 'Invalid email field-এর inline error message-এর তিনটা variant লিখুন। Tone: direct, sorry-sorry ভাব নয়। প্রতিটা 12 word-এর মধ্যে। "Oops" বা "Sorry" দিয়ে শুরু করবেন না। Numbered list হিসেবে দিন।',
        why: 'Reusable prompt template-এ tone, length, constraint আর format বলা থাকে। এটা চালালে এমন output আসে যা edit ছাড়াই ব্যবহার করা যায়। একটা সাধারণ task আর prompt library-র একটা entry-র পার্থক্য এখানেই।',
      },
      steps: [
        {
          title: 'কোন কাজগুলো সবচেয়ে বেশি repeat হয়, খুঁজে বের করুন',
          description:
            'শেষ তিনটা project-এর কথা ভাবুন। কোন কাজগুলো দুবারের বেশি করেছেন, যেগুলোতে মনে হয়েছে সময় নষ্ট হচ্ছে? Common উত্তর: button label-এর তিনটা variant লেখা, design spec-কে dev ticket-এর জন্য নতুন করে format করা, layout-এ মাপমতো বসে এমন placeholder text বানানো, কোনো component-এর accessibility rationale লেখা। এখনই সেই file-টা বানান, আর প্রতি সপ্তাহে করেন এমন একটা কাজের জন্য একটা prompt যোগ করুন।',
          appDemo: {
            steps: [
              { role: 'user', text: 'আমি mid-level product designer, mobile fintech app নিয়ে কাজ করি। প্রতি সপ্তাহে সম্ভবত করি এমন সবচেয়ে common পাঁচটা design-এর কাজ কী, যেগুলো Claude প্রতিটা ৩০ সেকেন্ডের কম সময়ে করে দিতে পারে?' },
              { role: 'claude', text: '1. Microcopy variant: "এই error message-এর তিনটা version লিখুন। এখনকারটা: Transaction failed। প্রতিটা version-এ cause আর next step আগেরটার চেয়ে একটু বেশি specific করুন।"\n\n2. Placeholder content: "একটা bKash statement-এর জন্য আটটা realistic transaction label বানান। Merchant, transfer আর top-up মিশিয়ে দিন। Merchant-এর নাম বাংলা। Amount 50 থেকে 5000 BDT-এর মধ্যে।"\n\n3. Accessibility rationale: "এই component-এর accessibility rationale লিখুন: [description]। Cover করুন: touch target size, contrast ratio, screen reader label, আর keyboard navigation।"\n\n4. Handoff note: "এই component-এর জন্য developer handoff note লিখুন: [spec]। Cover করুন: state, transition, edge case, copy string, token reference।"\n\n5. Spec reformatting: "এই Figma spec-কে acceptance criteria আর definition of done সহ একটা Jira ticket description-এ বদলে দিন।"\n\nএগুলোর প্রতিটা আপনার project-এ নাম দিয়ে prompt হিসেবে save করুন। চালান, একবার edit করুন, ব্যস।' },
            ],
          },
          desktopDemo: {
            steps: [
              { role: 'user', text: 'আমি নিজের একটা prompt library বানাতে চাই। শুরুতে list করুন, প্রতি সপ্তাহে আমি সম্ভবত কোন পাঁচটা design-এর কাজ বারবার করি। আমি mobile fintech app-এ কাজ করি, mid-level designer, Figma ব্যবহার করি, React dev team-কে handoff দিই।' },
              { role: 'claude', text: 'আপনার context অনুযায়ী বেশি repeat হওয়া পাঁচটা কাজ:\n\n1. Microcopy variant (button label, error message, empty state): প্রতিটা string-এর তিনটা variant, প্রতিটার voice বা specificity আলাদা।\n\n2. Figma note থেকে dev handoff spec: state, copy string, token reference আর edge case সহ গোছানো Markdown।\n\n3. প্রতিটা component-এর accessibility checklist: touch target, contrast, ARIA label, keyboard nav, focus order।\n\n4. Placeholder transaction data: realistic বাংলা merchant name, নানা রকম amount, মেশানো category।\n\n5. Test scenario generation: একটা flow দিলে ছয়টা test scenario, happy path + পাঁচটা edge case।\n\nআপনার project-এ প্রতিটার জন্য prompt template বানিয়ে দিচ্ছি। এগুলো একটা PROMPTS.md file-এ save করুন, পরের বার দরকার হলে সরাসরি paste করবেন।' },
            ],
          },
        },
        {
          title: 'প্রতিটা prompt একবার লিখে refine করুন',
          description:
            'আপনার এখনকার project থেকে একটা specific উদাহরণ নিয়ে প্রতিটা task চালান। Output যতক্ষণ না এমন হয় যে edit ছাড়াই সত্যিই ব্যবহার করবেন, ততক্ষণ prompt refine করুন। সেই refine করা prompt-টাই save করবেন। যে prompt-এর output প্রতিবার edit করতে হয়, সেটা এখনো শেষ হয়নি।',
          appDemo: {
            steps: [
              { role: 'user', text: 'Microcopy variant-এর task-টা চালান। এখনকার error message: "Transaction failed." Product: bKash mobile app। User এইমাত্র 500 BDT পাঠাতে গিয়ে error পেয়েছে। তিনটা variant লিখুন: একটা network failure-এর জন্য, একটা balance কম থাকলে, একটা recipient registered না থাকলে।' },
              { role: 'claude', text: 'তিনটা variant:\n\n**Network failure**\nCould not connect. Check your internet and try again.\n[Retry] [Cancel]\n\n**Insufficient balance**\nYour bKash balance is too low for this transfer. Top up and try again.\n[Top Up] [Cancel]\n\n**Recipient not registered**\n01XXXXXXXXX is not registered on bKash. Check the number and try again.\n[Edit Number] [Cancel]\n\nপ্রতিটা variant-এ: সহজ ভাষায় cause, একটা পরিষ্কার next step, আর CTA label action-এর সঙ্গে মেলে। এগুলো ব্যবহারের মতো হলে এই prompt structure-টা আপনার library-তে save করুন।' },
              { role: 'user', text: 'Output ভালো হয়েছে। এই prompt-টা আমি save করব:\n\n"[product name]-এর জন্য তিনটা error message variant লিখুন। Context: [user কী করছিল]। Error: [error type 1], [error type 2], [error type 3]। Format: message + CTA label। সহজ ভাষায় cause, একটা next step।"' },
              { role: 'claude', text: 'Template-টা clean। Bracket-এর placeholder-গুলোর জন্য যেকোনো flow-তে এটা আবার ব্যবহার করা যাবে। একটা জিনিস যোগ করার কথা ভাবতে পারেন: parameter হিসেবে "Tone: [calm/urgent/neutral]", যাতে context অনুযায়ী message কতটা জরুরি শোনাবে ঠিক করতে পারেন। তবে আপনার product সব সময় একই tone ব্যবহার করলে এটা বাদ দিন। যে বড়, সব কিছু ধরা prompt আপনি এড়িয়ে যাবেন, তার চেয়ে যে সহজ prompt সত্যিই ব্যবহার করবেন সেটা ভালো।' },
            ],
          },
          desktopDemo: {
            steps: [
              { role: 'user', text: 'চালান: error message variant। Product: bKash। Action: 500 BDT পাঠানো। তিনটা error: network failure, balance কম, recipient registered না। সহজ ভাষা, প্রতিটায় cause + next step + CTA।' },
              { role: 'claude', text: 'তিনটা variant:\n\nNetwork failure: "Could not connect. Check your internet and try again." | [Retry]\n\nLow balance: "Your balance is too low for this transfer. Top up first." | [Top Up]\n\nNot registered: "01XXXXXXXXX is not on bKash. Check the number." | [Edit Number]\n\nতিনটাই এক নিয়মে: cause (সহজ ভাষায়) + action (specific) + CTA (action-এর সঙ্গে মেলে)। Edit ছাড়াই ব্যবহারের জন্য ready?' },
            ],
          },
        },
        {
          title: 'Prompt library বানান আর maintain করুন',
          description:
            'আপনার project-এ (অথবা নিজের notes app-এ) একটা PROMPTS.md file বানান। প্রতিটা prompt-এর জন্য: একটা নাম দিন, হুবহু text লিখে রাখুন, আর ভালো output দেখতে কেমন সেটা note করুন। প্রতি মাসে একবার review করুন। যে prompt আর কাজ করে না, বা যে কাজ Claude এখন instruction ছাড়াই করে দেয়, সেগুলো বাদ দিন। নতুন যে ধরনের কাজ বারবার করতে শুরু করেছেন, সেগুলোর prompt যোগ করুন। পুরনো হয়ে যাওয়া prompt library না থাকার চেয়েও খারাপ: এমন prompt চালাতে সময় নষ্ট হয় যার output আবার edit করতে হয়, তাহলে library রাখার মানেই থাকে না।',
          code: {
            snippet: `# PROMPTS.md: Design Prompt Library

## error-message-variants
**কখন ব্যবহার করবেন:** Mobile flow-এর error state লেখার সময়
**Prompt:**
[product]-এর জন্য তিনটা error message variant লিখুন।
Context: user [action] করছিল।
Error: [type 1], [type 2], [type 3]।
Format: message + CTA label। সহজ ভাষায় cause, প্রতিটায় একটা next step।
**ভালো output দেখতে কেমন:** specific cause, একটা CTA, কোনো jargon নেই

## a11y-checklist
**কখন ব্যবহার করবেন:** যেকোনো interactive component handoff করার আগে
**Prompt:**
এই component-এর জন্য একটা accessibility checklist লিখুন: [description]।
Cover করুন: touch target (min 44x44px), contrast (WCAG AA),
ARIA label, keyboard nav, focus order।
যে item-এ শুধু dev fix নয়, design decision লাগবে, সেটা flag করুন।
**ভালো output দেখতে কেমন:** প্রতিটা item-এ pass/flag/fix সহ checklist`,
            language: 'markdown',
          },
          appDemo: {
            steps: [
              { role: 'user', text: 'Library-টা সময়ের সঙ্গে বেশি বড় না করে maintain করতে চাই। Prompt library review করার ভালো process কী?' },
              { role: 'claude', text: 'প্রতি মাসে review, প্রতিটা prompt-এর জন্য তিনটা প্রশ্ন:\n\n1. গত ৩০ দিনে এটা ব্যবহার করেছি? না করলে [UNUSED] mark করুন। ৬০ দিন ব্যবহার না হলে delete করুন।\n\n2. Output-এ কখনো বড় edit লেগেছে? লাগলে prompt-টা এখনো শেষ হয়নি। Revise করুন, নয়তো বাদ দিন।\n\n3. Context এখনো ঠিক আছে? কোনো নির্দিষ্ট product বা team-এর সঙ্গে বাঁধা prompt, product বদলালে বদলায়। Context variable-গুলো update করুন।\n\nLibrary দশটা prompt-এর নিচে রাখুন। দশটার বেশি থাকা মানে, আপনি সত্যিই যা ব্যবহার করেন তার বদলে "হয়তো কাজে লাগবে" ভেবে prompt save করছেন। Library যত ছোট, তত বেশি সেটা কাজে লাগাবেন।' },
            ],
          },
          desktopDemo: {
            steps: [
              { role: 'user', text: 'PROMPTS.md পড়ুন। যে prompt-গুলো এত vague যে edit ছাড়া consistent output দেবে না, অথবা এত overlap করে যে merge করে ফেলা উচিত, সেগুলো flag করুন।' },
              { role: 'claude', text: 'PROMPTS.md পড়েছি। দুটো সমস্যা:\n\n1. `spec-writer` আর `handoff-notes` প্রায় একই output দেয়। পার্থক্য শুধু format-এ (Markdown বনাম Jira)। দুটো মিলিয়ে একটা prompt বানান, সঙ্গে `[format: markdown | jira]` parameter।\n\n2. `copy-review`-এ success criteria নেই: "copy-টা improve করুন" থেকে একেকবার একেক রকম result আসে, কারণ "improve" প্রতিবার আলাদা মানে দাঁড়ায়। যোগ করুন: "Flag: clarity, length, tone। প্রতিটা flag-এর জন্য একটা specific rewrite suggest করুন।"\n\nবাকি ছয়টা prompt tight। যেমন আছে তেমনই চালান।' },
            ],
          },
        },
        {
          title: 'যে ভুলগুলো প্রায়ই হয়',
          description: 'Prompt library বানানোর সময় এই চারটা ভুল সবচেয়ে বেশি হয়।',
          list: [
            'এমন prompt save করা যার output edit করতে হয়। Output যতক্ষণ না কোনো change ছাড়া ব্যবহারের মতো হয়, prompt ততক্ষণ শেষ হয়নি। Prompt save করার পর যদি প্রতিবার result edit করতে হয়, তাহলে prompt সমস্যার সমাধান করেনি। Clean output না আসা পর্যন্ত prompt-এ iterate করুন, তারপর save করুন।',
            'খুব তাড়াতাড়ি library বানানো। সব কাজ একসঙ্গে যোগ করলে এমন library দাঁড়ায় যা আপনি কখনো refine করেন না। একবারে একটা prompt যোগ করুন, আসল কোনো task-এ চালান, আর তখনই save করুন যখন output সত্যিই ব্যবহার করার মতো। সব কিছু রাখার চেয়ে quality বেশি জরুরি।',
            'অস্পষ্ট task name ব্যবহার করা। Deadline-এর চাপে আটটা prompt-এর list-এ চোখ বোলানোর সময় "Copy" আর "spec" নাম কোনো কাজে আসে না। এমন নাম দিন যা বলে prompt-টা কী করে: "error-message-variants" আর "a11y-checklist-per-component" খুঁজে পাওয়া যায়। "Copy" আর "Check" পাওয়া যায় না।',
            'মাসিক review কখনো না করা। ছয় মাস আগে যে prompt কাজ করত, সেটা এখন খারাপ output দিতে পারে, কারণ Claude আরও ভালো হয়েছে আর কিছু request এখন অন্যভাবে handle করে। যে কাজ Claude এখন instruction ছাড়াই ভালো করে, সেই prompt বাদ দিন, আর যেখানে output-এর quality আগের মতো নেই সেই prompt update করুন।',
          ],
        },
      ],
      nextLink: {
        label: 'সব designer guide-এ ফিরে যান',
        href: '/for-designers',
      },
    },
  },

  'git-for-designers': {
    sourceHash: "9d85d780c294ef54",
    translatedAt: "2026-10-06",
    content: {
      title: 'Designer-দের জন্য Git',
      slug: 'git-for-designers',
      duration: '২৫ মিনিট',
      difficulty: 'beginner',
      availableRoutes: ['desktop'],
      usesCodeTab: true,
      description:
        'Claude Code নিয়ে কাজ করা designer-দের জন্য commit, branch, pull request আর undo-র সহজ ব্যাখ্যা। Guide 07-এর আগে এটা পড়ে নিন।',
      intro:
        'এই guide সেই UX আর UI designer-দের জন্য, যাদের Git-এর কোনো অভিজ্ঞতা নেই। পড়া শেষে আপনি নতুন project repo শুরু করতে পারবেন, কাজ save আর share করতে পারবেন, একটা commit undo করতে পারবেন, আর developer-এর review-এর জন্য একটা pull request খুলতে পারবেন। Version control-এর theory বোঝার দরকার নেই। প্রতিটা command কী করে, সেটা সহজ ভাষায় বুঝলেই চলবে। Claude Code কাজ করতে করতে change commit করতে পারে, কিন্তু কখন সেটা হবে তা আপনি ঠিক করেন। ছয়টা concept: repo setup, commit, push, pull, ভুল undo করা, আর pull request। একদম শুরু থেকে শুরু করলে Step 1 থেকে শুরু করুন। আপনার project-এ আগে থেকেই repo থাকলে (একটা .git folder আছে), Step 2-তে চলে যান।',
      situation: {
        scene: 'আপনি Claude Code নিয়ে কাজ করছেন, আর এটা বারবার commit, branch, pull request-এর কথা বলছে। এগুলোর মানে আপনি জানেন না। ভয় পাচ্ছেন কিছু ভেঙে ফেলবেন বা কাজ হারিয়ে ফেলবেন।',
        outcome: 'Claude Code নিয়ে নিশ্চিন্তে কাজ করার মতো Git আপনি বুঝে যাবেন: কাজ save করা, ভুল undo করা, আর command মুখস্থ না করেই developer-এর সঙ্গে file share করা।',
      },
      outcomes: [
        'একটা চালু Git repo, setup করে GitHub-এর সঙ্গে connect করা, ৫ মিনিটের মধ্যে',
        'যে ছয়টা Git concept আপনার সত্যিই লাগবে: repo, commit, push, pull, undo আর pull request',
        'Claude Code কী করছে বুঝতে আর আপনি কী চান সেটা বলতে যতটুকু শব্দ জানা দরকার',
      ],
      steps: [
        {
          title: 'নতুন project repo শুরু করুন',
          description:
            'Claude Code আপনার কাজ save করার আগে একটা Git repository লাগবে। Terminal খুলুন (Mac: Command + Space চাপুন, Terminal লিখুন, Enter চাপুন। Windows: Windows key চাপুন, PowerShell লিখুন, Enter চাপুন)। এই guide-এর প্রতিটা command ওখানেই লিখে Enter চেপে চালাতে হবে। এছাড়া github.com-এ একটা free GitHub account লাগবে, আর git remote add চালানোর আগে সেখানে একটা নতুন খালি repo বানিয়ে রাখতে হবে (github.com/new-এ যান, New repository-তে click করুন, খালি রাখুন)। শেষ command, claude, আপনার Claude Code session শুরু করে। "command not found" দেখালে আগে claude.ai/download থেকে Claude Code install করে নিন।',
          code: {
            snippet: `# 1. Project folder বানান আর তার ভেতরে ঢুকুন
mkdir my-design-project
cd my-design-project

# 2. Git initialise করুন (.git folder তৈরি হয়)
git init

# 3. github.com/new-এ গিয়ে একটা খালি repo বানান, তারপর নিচে তার URL paste করুন
git remote add origin https://github.com/your-username/my-design-project.git

# 4. Claude Code চালু করুন (দরকার হলে claude.ai/download থেকে install করুন)
claude`,
            language: 'bash',
          },
          demo: {
            title: 'git : init-and-connect',
            steps: [
              { type: 'cmd', text: 'git init' },
              { type: 'out', text: 'Initialized empty Git repository in ./my-design-project/.git/' },
              { type: 'cmd', text: 'git remote add origin https://github.com/you/my-design-project.git', delay: 300 },
              { type: 'success', text: 'Remote connect হয়েছে। Commit-গুলো এখানেই push হবে।' },
              { type: 'cmd', text: 'claude', delay: 300 },
              { type: 'success', text: 'Claude Code ready। Git চালু হয়ে গেছে।' },
            ],
          },
        },
        {
          title: 'Commit কী',
          description:
            'Commit হলো নাম দেওয়া একটা save point। Claude কোনো file edit করে change commit করলে, সেই save point আপনার project history-তে স্থায়ীভাবে থেকে যায়। Google Docs-এর version history-র কথা ভাবুন, পার্থক্য শুধু এটুকু যে এটা স্থায়ী, আর যেকোনো point-এ ফিরে গিয়ে দেখা যায়। আগে কোনো commit করে থাকলে, দেখতে git log --oneline চালান। একদম নতুন project-এ এটা এখনো কিছু দেখাবে না, এটাই স্বাভাবিক।',
          code: {
            snippet: `# আপনার commit history দেখুন (প্রতিটা commit এক line-এ)
# একদম নতুন project-এ এটা কিছুই দেখাবে না, এটা স্বাভাবিক
git log --oneline`,
            language: 'bash',
          },
          demo: {
            title: 'git : what-is-a-commit',
            steps: [
              { type: 'cmd', text: 'git log --oneline' },
              { type: 'out', text: 'a3f92c1  Add mobile nav hover states' },
              { type: 'out', text: 'b19e44d  Fix checkout button spacing' },
              { type: 'out', text: 'c880f2a  Initial design system setup' },
              { type: 'success', text: 'প্রতিটা line একটা commit। Short ID + message।' },
            ],
          },
        },
        {
          title: 'একটা commit করুন',
          description:
            'Claude আপনার file edit করার পর, change-গুলো history-তে save করতে commit করুন। তিনটা command: কী বদলেছে দেখুন, যে file save করতে চান সেগুলো stage করুন, message দিয়ে commit করুন।',
          code: {
            snippet: `# Claude কী বদলেছে দেখুন
git status

# বদলানো সব file stage করুন
git add .

# Message দিয়ে commit করুন
git commit -m "Update button component spacing"`,
            language: 'bash',
          },
          demo: {
            title: 'git : making-a-commit',
            steps: [
              { type: 'cmd', text: 'git status' },
              { type: 'out', text: 'Modified: src/components/Button.tsx' },
              { type: 'out', text: 'Modified: src/styles/tokens.css' },
              { type: 'cmd', text: 'git add .' },
              { type: 'cmd', text: 'git commit -m "Update button component spacing"' },
              { type: 'success', text: 'Commit হয়ে গেছে। Change-গুলো history-তে save হয়েছে।' },
            ],
          },
        },
        {
          title: 'Push আর pull',
          description:
            'আপনার local commit-গুলো push না করা পর্যন্ত শুধু আপনার কম্পিউটারেই থাকে। নতুন project প্রথমবার push করার সময় git push -u origin main ব্যবহার করুন। -u আপনার local branch-কে GitHub-এর সঙ্গে link করে দেয়, তাই এই project-এ পরের সব push শুধু git push দিয়েই চলবে। Pull GitHub থেকে commit নিয়ে আসে। একা কাজ করলে: প্রতিটা session-এর পর push করুন, আর নতুন session শুরুর সময় pull করুন।',
          code: {
            snippet: `# নতুন project-এ প্রথম push (-u দিয়ে branch-কে GitHub-এর সঙ্গে link করুন)
git push -u origin main

# একই project-এ পরের সব push
git push

# GitHub থেকে সর্বশেষ commit নিয়ে আসুন
git pull`,
            language: 'bash',
          },
          demo: {
            title: 'git : push-and-pull',
            steps: [
              { type: 'cmd', text: 'git push -u origin main' },
              { type: 'out', text: 'Writing objects: 100% (5/5)' },
              { type: 'success', text: 'Push হয়েছে। Branch GitHub-এর সঙ্গে link হয়ে গেছে।' },
              { type: 'cmd', text: 'git pull', delay: 300 },
              { type: 'success', text: 'Already up to date.' },
            ],
          },
        },
        {
          title: 'একটা commit undo করুন',
          description:
            'Claude-এর করা কোনো change ফিরিয়ে নিতে চাইলে, git revert একটা নতুন commit বানায় যা আগের একটা commit-কে undo করে। এটা history মোছে না। উপরে একটা undo যোগ করে। GitHub-এ আগেই push হয়ে গেছে এমন কিছুর জন্য git reset-এর চেয়ে এটা নিরাপদ। --no-edit flag commit message editor বাদ দেয় (নইলে Git vim খুলে বসে, যেখান থেকে বের হতে :wq লিখতে হয়)।',
          code: {
            snippet: `# সাম্প্রতিক commit দেখুন আর কোনটা undo করবেন খুঁজে নিন
git log --oneline

# ওই commit undo করুন (ID-টা নিজেরটা দিয়ে বদলে নিন, --no-edit editor বাদ দেয়)
git revert a3f92c1 --no-edit

# Undo-টা GitHub-এ push করুন
git push`,
            language: 'bash',
          },
          demo: {
            title: 'git : undo-a-commit',
            steps: [
              { type: 'cmd', text: 'git log --oneline' },
              { type: 'out', text: 'a3f92c1  Add mobile nav hover states  ← এটা undo করতে চাই' },
              { type: 'out', text: 'b19e44d  Fix checkout button spacing' },
              { type: 'cmd', text: 'git revert a3f92c1 --no-edit', delay: 300 },
              { type: 'out', text: 'Revert "Add mobile nav hover states"', delay: 200 },
              { type: 'success', text: 'Revert হয়েছে। File আগের অবস্থায় ফিরেছে। History যেমন ছিল তেমনই আছে।' },
            ],
          },
        },
        {
          title: 'Pull request কী',
          description:
            'Branch হলো আপনার project-এর একটা আলাদা copy, যেখানে change হলেও main version-এ কোনো প্রভাব পড়ে না। Claude Code-এর সঙ্গে নতুন কোনো feature নিয়ে কাজ করলে Claude একটা branch বানায়। কাজ ready হলে আপনি একটা pull request খোলেন: branch-এর change-গুলো main version-এ merge করার একটা proposal। একজন developer সেটা review করে merge করেন। "Claude এটা বানিয়েছে" থেকে "এটা এখন product-এ আছে" পর্যন্ত change এভাবেই পৌঁছায়। gh pr create command-এর জন্য GitHub CLI লাগবে (cli.github.com থেকে install করুন)।',
          code: {
            snippet: `# নতুন feature-এর জন্য একটা branch বানান
git checkout -b feature/new-checkout-flow

# ... Claude Code এখানে কাজ করে change commit করে ...

# একটা pull request খুলুন (GitHub CLI লাগবে: cli.github.com)
gh pr create --title "New checkout flow" --body "Built with Claude Code"`,
            language: 'bash',
          },
          demo: {
            title: 'git : pull-request-flow',
            steps: [
              { type: 'cmd', text: 'git checkout -b feature/new-checkout-flow' },
              { type: 'out', text: 'Switched to new branch "feature/new-checkout-flow"' },
              { type: 'out', text: 'Claude Code working on this branch...' },
              { type: 'success', text: 'Changes committed to branch.' },
              { type: 'cmd', text: 'gh pr create --title "New checkout flow" --body "Built with Claude Code"' },
              { type: 'success', text: 'PR তৈরি হয়েছে। Review-এর জন্য link-টা আপনার dev-কে পাঠান।' },
            ],
          },
        },
      ],
      nextLink: {
        label: 'Claude Code দিয়ে আপনার প্রথম flow বানান',
        href: '/for-designers/build-your-first-flow',
      },
    },
  },
};
