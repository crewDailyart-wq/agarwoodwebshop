import { ChinaMap } from "./ChinaMap";

/** Small framed satellite map of China, laid over the corner of a product photo. */
export function ChinaInset({ className = "" }: { className?: string }) {
  return (
    <span
      className={`frame absolute right-2.5 top-2.5 block w-[34%] bg-night/85 p-1 shadow-[0_6px_24px_rgb(0_0_0_/_0.55)] ${className}`}
    >
      <span className="relative block aspect-[700/560] overflow-hidden bg-black">
        <ChinaMap className="absolute inset-0 h-full w-full" />
      </span>
      <span className="eyebrow eyebrow-gold block pt-1 text-center !text-[0.45rem] !tracking-[0.25em]">
        China
      </span>
    </span>
  );
}
