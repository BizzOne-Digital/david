import { cn } from "@/lib/utils";

/** Shared public form field styling — white fill, black text */
export const formFieldLight =
  "form-field-light scheme-light appearance-none";

export const formInputClass = cn(
  formFieldLight,
  "w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-black placeholder:text-neutral-500 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange/30"
);

export const formInputClassWithIcon = cn(
  formFieldLight,
  "w-full rounded-lg border border-neutral-300 bg-white py-3 pl-10 pr-4 text-sm text-black placeholder:text-neutral-500 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange/30"
);

export const formLabelClass = "mb-1.5 block text-sm font-medium text-white";

export const formErrorClass = "mt-1 text-xs text-brand-orange";
