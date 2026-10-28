import { VietnamMap } from "./VietnamMap";

/** Small framed satellite map of Vietnam, laid over the corner of a product photo. */
export function VietnamInset({ className = "" }: { className?: string }) {
  return (
    <span
      className={`frame absolute right-2.5 top-2.5 block w-[24%] bg-night/85 p-1 shadow-[0_6px_24px_rgb(0_0_0_/_0.55)] ${className}`}
    >
      <span className="relative block aspect-[600/860] overflow-hidden bg-black">
        <VietnamMap label={false} className="absolute inset-0 h-full w-full" />
      </span>
      <span className="eyebrow eyebrow-gold block pt-1 text-center !text-[0.45rem] !tracking-[0.25em]">
        Vietnam
      </span>
    </span>
  );
}
