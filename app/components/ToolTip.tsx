import { twMerge } from "tailwind-merge"

interface ToolTipProps {
  className?: string;
  tips: string[]; 
}

const ToolTip: React.FC<ToolTipProps> = ({ className, tips }) => {
  return (
    <div className={twMerge(`
    absolute left-1/2 transform -translate-x-[100px] -top-[100%]
    flex flex-col items-start
    py-1 px-2
    bg-black/80 text-white rounded-lg
    `, className)}>
        {tips.map((tip, index) => (
            <p
            className="
            text-nowrap"
            key={index}
            >
                {tip}
            </p>
        ))}
    </div>
  );
};

export default ToolTip;
