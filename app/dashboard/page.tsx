import Offer from "@/components/offer/Offer";

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Page(): JSX.Element {
  return (
    <div className="container flex-1">
      <Offer />
    </div>
  );
}
