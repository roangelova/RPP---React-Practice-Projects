import Link from "next/link";
import Image from "next/image";
// auto serves corrctly-sized images on demand; prevents layout shifts cause it requires that we specify height and width (by using aspect-rattio); auto lazy-loading when images enter the viewport; 
//we can also import the image first (just like in 'regular' React) and provide it to Next.js, so it can be analyzed; this way, we dont have to provide width and height

function Logo() {
  return (
    <Link href="/" className="z-10 flex items-center gap-4">
      <Image src="/logo.png" height="60" width="60" quality={100} alt="The Wild Oasis logo" />
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
