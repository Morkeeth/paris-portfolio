export default function Pane({
  path,
  children,
  className = '',
}: {
  path: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="border border-[#1a1a1a] rounded-lg overflow-hidden bg-[#111]">
      <div className="flex items-center px-4 py-2.5 bg-[#0c0c0c] border-b border-[#1a1a1a]">
        <div className="flex gap-1.5 mr-3">
          <div className="w-2 h-2 rounded-full bg-[#333]" />
          <div className="w-2 h-2 rounded-full bg-[#333]" />
          <div className="w-2 h-2 rounded-full bg-[#333]" />
        </div>
        <span className="text-[#444] text-xs">{path}</span>
      </div>
      <div className={`p-6 ${className}`}>
        {children}
      </div>
    </div>
  );
}
