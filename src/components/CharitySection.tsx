import { ArrowIcon } from "@/components/icons";

/**
 * Homepage section: ALUWWAH sponsors the Muslim charity OneUmmah (100% donation policy).
 * Deliberately white and blue, so it reads as a distinct, separate act of giving
 * against the green-and-gold shop.
 */
export function CharitySection() {
  return (
    <section
      aria-labelledby="charity-heading"
      className="relative border-y-4 border-[#0b3d91] bg-white text-[#16294d]"
    >
      <div className="mx-auto max-w-[1100px] px-5 py-16 sm:px-8">
        <header className="text-center">
          <p className="eyebrow !text-[#2f6fd6]">Giving in charity</p>
          <h2
            id="charity-heading"
            className="display mt-3 text-balance !bg-none !text-[#0b3d91] ![-webkit-text-fill-color:#0b3d91] text-[2.1rem] sm:text-[2.7rem]"
          >
            We sponsor OneUmmah
          </h2>
          <div aria-hidden className="mx-auto mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#9dbbee]" />
            <span className="h-1.5 w-1.5 rotate-45 bg-[#2f6fd6]" />
            <span className="h-px w-12 bg-[#9dbbee]" />
          </div>
        </header>

        <div className="mt-10 grid items-stretch gap-8 md:grid-cols-[1.1fr_1fr] md:gap-12">
          <div className="flex flex-col justify-center space-y-4 text-[1.05rem] leading-relaxed">
            <p>
              ALUWWAH proudly sponsors <strong className="font-semibold text-[#0b3d91]">OneUmmah</strong>,
              an international Muslim humanitarian aid and development charity, registered in the UK
              (charity no. 1168565).
            </p>
            <p>
              OneUmmah works under a 100% donation policy: what is given for a cause goes to that
              cause, and the charity&rsquo;s running costs are funded separately.
            </p>
            <div>
              <a
                href="https://oneummah.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex min-h-11 items-center gap-3 bg-[#0b3d91] px-7 font-[family-name:var(--font-caps)] text-[0.72rem] uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#2f6fd6]"
              >
                Visit OneUmmah <ArrowIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <aside
            aria-label="OneUmmah 100% donation policy"
            className="relative border border-[#b9cdf0] bg-[#eef4fd] px-6 py-9 text-center sm:px-9"
          >
            <span aria-hidden className="absolute inset-2 border border-[#d3e1f7]" />
            <div className="relative">
              <p className="display !bg-none !text-[#0b3d91] ![-webkit-text-fill-color:#0b3d91] text-[3.8rem] leading-none sm:text-[4.6rem]">
                100%
              </p>
              <p className="eyebrow mt-3 !text-[0.62rem] !text-[#2f6fd6]">Donation policy</p>
              <p className="mx-auto mt-5 max-w-sm text-[1.05rem] italic leading-relaxed">
                Every penny OneUmmah receives goes to the cause it was given for, with nothing taken
                for administration or advertising.
              </p>
              <p className="mx-auto mt-4 max-w-sm text-[0.78rem] leading-relaxed text-[#5b6b8a]">
                Fees charged by online payment providers are deducted before a donation reaches the
                charity.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
