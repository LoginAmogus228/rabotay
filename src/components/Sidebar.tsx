export default function Sidebar() {
  const servers = [
    { name: 'Badge Farm', emoji: '🏆', active: true },
    { name: 'Discord HQ', emoji: '🎮', active: false },
    { name: 'Bot Dev', emoji: '🤖', active: false },
    { name: 'Nitro Gang', emoji: '💎', active: false },
    { name: 'Partners', emoji: '🌟', active: false },
  ];

  return (
    <div className="w-[72px] bg-[#1e1f22] flex flex-col items-center py-3 gap-2 flex-shrink-0 overflow-y-auto">
      {/* Home / DMs */}
      <div className="w-12 h-12 bg-[#5865f2] rounded-2xl hover:rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer group relative">
        <svg width="28" height="20" viewBox="0 0 28 20" fill="white">
          <path d="M23.0212 1.67671C21.3107 0.879656 19.5079 0.318797 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.9708 1.4184C15.003 1.12145 12.9974 1.12145 11.0292 1.4184C10.8251 0.934541 10.5765 0.461742 10.3416 0C8.49019 0.321601 6.68494 0.884411 4.97457 1.68377C1.32052 7.04553 0.342456 12.2718 0.831486 17.4258C2.81393 18.9018 5.05188 19.9999 7.42496 20.6249C7.95696 19.9009 8.43015 19.1341 8.83928 18.3331C8.07643 18.0463 7.33992 17.6951 6.64066 17.2849C6.82776 17.1485 7.01044 17.0072 7.18682 16.8659C11.5913 18.9253 16.4583 18.9253 20.8132 16.8659C20.992 17.0121 21.1747 17.1534 21.3594 17.2849C20.6577 17.6976 19.9187 18.0513 19.1534 18.338C19.5625 19.1391 20.0381 19.9058 20.5677 20.6298C22.9432 20.0074 25.1835 18.9092 27.1685 17.4307C27.7439 11.4168 26.1849 6.24144 23.0212 1.67671Z"/>
        </svg>
        <div className="absolute left-0 w-1 bg-white rounded-r-full h-0 group-hover:h-5 transition-all" />
      </div>

      <div className="w-8 h-0.5 bg-[#35363c] rounded-full mx-auto" />

      {/* Servers */}
      {servers.map((server, i) => (
        <div key={i} className="relative group">
          <div
            className={`w-12 h-12 ${server.active ? 'bg-[#5865f2] rounded-xl' : 'bg-[#313338] rounded-2xl hover:rounded-xl hover:bg-[#5865f2]'} transition-all duration-200 flex items-center justify-center cursor-pointer text-xl`}
          >
            {server.emoji}
          </div>
          <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 bg-white rounded-r-full ${server.active ? 'h-10' : 'h-0 group-hover:h-5'} transition-all`} />
          <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-[#111214] text-white text-sm px-3 py-1.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
            {server.name}
          </div>
        </div>
      ))}

      {/* Add server */}
      <div className="w-12 h-12 bg-[#313338] rounded-2xl hover:rounded-xl hover:bg-[#23a559] transition-all duration-200 flex items-center justify-center cursor-pointer text-[#23a559] hover:text-white text-2xl">
        +
      </div>
    </div>
  );
}
