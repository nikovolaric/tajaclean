import Spinner from "@/components/Spinner";

function Loading() {
  return (
    <div className="fixed top-0 left-0 z-[999] flex h-dvh w-dvw justify-center bg-[#f6f4f2] pt-80">
      <Spinner />
    </div>
  );
}

export default Loading;
