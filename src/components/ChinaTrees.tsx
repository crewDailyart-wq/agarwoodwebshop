import Image from "next/image";
import hillside from "@/assets/china-hillside.jpg";
import tree from "@/assets/china-tree.jpg";
import resin from "@/assets/china-resin.jpg";

// In the order the story is told: the land, the tree, and the resin inside it.
const photos = [
  {
    src: hillside,
    alt: "A green hillside covered in trees under a cloudy sky, on our supplier's land in Guangdong",
    caption: "A hillside in Guangdong",
  },
  {
    src: tree,
    alt: "The pale trunk and leaves of an Aquilaria tree growing in the forest",
    caption: "An Aquilaria tree and its leaves",
  },
  {
    src: resin,
    alt: "A cut in a tree trunk showing the dark, resin-laden wood inside the pale wood",
    caption: "The dark resin-laden wood inside the trunk",
  },
];

/** From our supplier: where the Chinese agarwood grows, and why it is rare. */
export function ChinaTrees() {
  return (
    <section aria-labelledby="china-trees-heading" className="border-t border-gold-line pt-10">
      <p className="eyebrow eyebrow-gold mb-3">From our supplier in Guangdong, China</p>
      <h2 id="china-trees-heading" className="display text-2xl sm:text-3xl">
        Where the agarwood grows
      </h2>

      <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
        {photos.map((p) => (
          <figure key={p.caption}>
            <div className="frame relative aspect-[4/5] overflow-hidden bg-plum">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 1024px) 18vw, 30vw"
                className="object-cover"
              />
            </div>
            <figcaption className="eyebrow mt-2 text-center !text-[0.55rem] !leading-relaxed !text-ivory-faint">
              {p.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-7 space-y-5 text-ivory-soft">
        <p>
          China is a vast and diverse country, and in the southern region grow two species of
          Aquilaria trees which produce agarwood: Aquilaria Sinensis and Aquilaria Yunnanensis. The
          kinam/qinan agarwood we offer comes from cultivated Aquilaria Sinensis.
        </p>
        <p>
          The trees are hard to grow, the agarwood takes a long time to form, and it is difficult
          human labour to extract the agarwood from the tree. It is also possible that a large tree
          produces only a small amount of agarwood.
        </p>
        <p>
          In the pictures you can see such trees from our supplier in the Guangdong region of China.
        </p>
      </div>
    </section>
  );
}
