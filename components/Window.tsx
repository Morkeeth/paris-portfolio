export default function Window({
  title,
  children,
  className = '',
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="border border-[#222] rounded-xl overflow-hidden bg-[#141414]">
      <div className="flex items-center px-4 py-3 bg-[#1a1a1a] border-b border-[#222]">
        <div className="flex gap-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <span className="text-[#666] text-xs flex-1 text-center -ml-12">{title}</span>
      </div>
      <div className={`p-6 ${className}`}>
        {children}
      </div>
    </div>
  );
}
