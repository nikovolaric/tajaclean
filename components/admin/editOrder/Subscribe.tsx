function Subscribe({ subscribe }: { subscribe: boolean }) {
  if (!subscribe) return <></>;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-semibold">Naročanje na novičke</p>
      <div className="relative flex items-center gap-6 self-start rounded-xl bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
        <p className="text-sm font-medium">Želim se naročiti</p>
      </div>
    </div>
  );
}

export default Subscribe;
