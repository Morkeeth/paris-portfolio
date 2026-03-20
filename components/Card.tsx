export default function Card({
  label,
  children,
  className = '',
}: {
  label?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="border border-[#1a1a1a] rounded-lg bg-[#0f0f0f] p-5 hover:border-[#222] transition-colors">
      <div className={className}>
        {children}
      </div>
      {label && (
        <p className="text-[#333] text-[10px] mt-4 text-right">{label}</p>
      )}
    </div>
  );
}
