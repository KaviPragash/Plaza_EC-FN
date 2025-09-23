interface PromotionalCardProps {
  image: string;
  theme: 'blackfriday' | 'backtoschool' | 'endofseason';
}

const themeBackgrounds: Record<string, string> = {
  blackfriday: 'bg-yellow-50',
  backtoschool: 'bg-slate-50',
  endofseason: 'bg-orange-50'
};

export default function PromotionalCard({ image, theme }: PromotionalCardProps) {
  return (
    <div
      className={`rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100 p-4 ${themeBackgrounds[theme]}`}
    >
      <div className="w-full h-48 md:h-56 flex items-center justify-center">
        <img
          src={image}
          alt={`Promotional banner for ${theme}`}
          className="max-h-full max-w-full object-contain"
        />
      </div>
    </div>
  );
}
