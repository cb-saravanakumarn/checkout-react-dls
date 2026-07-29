# Checkout React DLS Lovable Rules

Always use the exported checkout React DLS components when generating full-page checkout screens.

Do not create a marketing page, hero section, pricing page, or decorative landing page. The first screen should be the usable checkout UI.

Use:

- `CheckoutPage` for the shell.
- `CheckoutHeader` for the page heading.
- `CheckoutSection` for checkout form groups.
- `CheckoutField`, `CheckoutInput`, `CheckoutSelect`, `CheckoutCheckbox`, and `CheckoutRadio` for fields.
- `ProductList` and `ProductCard` for cart products.
- `OrderSummary` for the summary panel.
- `PaymentMethodList` and `PaymentMethodRow` for payment choices.
- `SubmitSection` for checkout submit CTAs.

Place components like this:

- Put customer, billing, shipping, tax, cart, payment, gift, and notes content in `CheckoutSection`.
- Put related form controls inside `CheckoutFormGrid`.
- Put plan, addon, and charge rows inside `ProductList`.
- For the production cart starter page, use `ProductList` directly as the main content and `OrderSummary` in the aside.
- Put the desktop summary in the `CheckoutPage` `aside` prop.
- Put mobile-only fixed submit UI in the `CheckoutPage` `mobileSubmit` prop.
- Put coupon, tax, discount, consent, agreement, future-charge, and submit elements inside or immediately below `OrderSummary`.
- Use `CheckoutNotification` for checkout alerts above the page content.
- Use `CheckoutModal` or `PaymentConsentModal` only for static modal previews.

Do not add real checkout functionality, payment SDKs, API calls, store logic, validation logic, or merchant theme customization controls.

Use the default checkout visual system. Do not invent new colors, shadows, large rounded cards, gradient backgrounds, or marketing-style illustrations.

Do not create raw HTML replacements for DLS components. If a needed checkout pattern does not exist, add a small placeholder using the closest DLS layout and mark it as a component gap.

Use these stories as canonical examples:

- `Checkout DLS/Cart Page/Exact Production Checkout Page`
- `Checkout DLS/Cart Page/Production Cart Default`
- `Checkout DLS/Cart Page/Production Cart With Coupon Error`
- `Checkout DLS/Full Page Checkout/Desktop Default`
- `Checkout DLS/Full Page Checkout/Mobile Default`
- `Checkout DLS/Order Summary/Default`
- `Checkout DLS/Product Card/Plan Card`
- `Checkout DLS/Payment Methods/Card Selected`
