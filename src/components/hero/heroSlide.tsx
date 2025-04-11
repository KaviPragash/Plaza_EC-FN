import Image from "next/image";

type HeroSlideProps = {
  image: string;
};

export default function HeroSlide({ image }: HeroSlideProps) {
  return (
    <div className="relative w-full h-[450px] flex-shrink-0">
      <Image
        src={image}
        alt=""
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
