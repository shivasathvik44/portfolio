type SectionNumberProps = {
  number: string;
  className?: string;
};

const SectionNumber = ({ number, className = "" }: SectionNumberProps) => (
  <span
    aria-hidden="true"
    className={`pointer-events-none select-none hidden md:block font-heading text-[clamp(8rem,20vw,18rem)] font-extrabold leading-none text-foreground/[0.03] tracking-tighter ${className}`}
  >
    {number}
  </span>
);

export default SectionNumber;
