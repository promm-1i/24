export function Gallery() {
  const placeholders = Array.from({ length: 8 });

  return (
    <section id="gallery" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="text-center text-2xl font-bold text-zinc-900 sm:text-3xl">
        현장 사진
      </h2>
      <p className="mt-2 text-center text-zinc-500">
        실제 이사 현장 사진은 등록 후 이곳에 노출됩니다 (관리자 등록 예정)
      </p>
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {placeholders.map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-200"
          />
        ))}
      </div>
    </section>
  );
}
