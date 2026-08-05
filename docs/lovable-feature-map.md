# Lovable Full Page Checkout Feature Map

Use `Example Pages/Full Page Checkout/Configurable Production Preview` as the starter page for Lovable-generated checkout prototypes.

The story includes a settings button in the top-right corner. Opening it shows a right drawer with production checkout settings that can be toggled live. These settings are the promptable feature names Lovable should preserve instead of creating alternate UI patterns.

## Preview Link Inputs

| Prompt intent | Setting |
| --- | --- |
| Change the plan | `previewPlan` |
| Change currency | `previewCurrency` |
| Change monthly/yearly billing | `previewFrequency` |
| Add/remove addon item from generated preview | `includeAddon` |
| Add/remove one-time charge from generated preview | `includeCharge` |

## Cart Settings

| Prompt intent | Setting |
| --- | --- |
| Show item descriptions | `showDescriptions` |
| Let customers edit plan quantity | `allowPlanQuantity` |
| Let customers edit addon quantity | `allowAddonQuantity` |
| Let customers remove addons | `allowAddonRemove` |
| Show recommended addons | `showRecommendedAddons` |
| Hide zero-value line items | `hideZeroValueLineItems` |

## Coupon Settings

| Prompt intent | Setting |
| --- | --- |
| Enable/disable coupons | `allowCoupons` |
| Support multiple coupons | `allowMultipleCoupons` |
| Keep coupon field open | `keepCouponBoxOpen` |
| Show collapsed, expanded, invalid, or applied coupon state | `couponState` |

## Customer Settings

| Prompt intent | Setting |
| --- | --- |
| Show login panel | `showLogin` |
| Allow guest checkout | `allowGuestCheckout` |
| Collect shipping address | `collectShippingAddress` |
| Show tax information | `showTaxInformation` |
| Collect PO number | `collectPoNumber` |
| Use browser locale | `useBrowserLocale` |
| Let customer change locale | `allowLocaleChange` |
| Show legal information and consent | `showLegalInformation` |

## Payment Settings

| Prompt intent | Setting |
| --- | --- |
| Enable offline payment methods | `allowOfflinePaymentMethods` |
| Skip payment details collection | `skipPaymentDetails` |
| Show future charges | `showFutureCharges` |
| Show summary loading state | `loadingSummary` |

## Lovable Prompt Pattern

Ask Lovable to modify the config, then keep the DLS components intact:

```text
Use the Checkout React DLS full-page checkout starter.
Set allowCoupons=true, couponState=error, showFutureCharges=true, collectShippingAddress=false, and skipPaymentDetails=false.
Do not replace DLS components with raw cards, custom inputs, or default Radix/shadcn components.
```

When a requested checkout behavior is not represented by a setting above, add it to the starter config and drawer first, then update the page composition with existing DLS components.
