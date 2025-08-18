import {
  getTopProductsByMonth,
  getTotalOrdersByMonth,
} from "@/lib/orderActions";

async function HomeAnalytics() {
  const month = `(${new Date().toLocaleDateString("sl-SI", {
    month: "long",
  })})`;

  const data = await getTopProductsByMonth();
  const totalOrders = await getTotalOrdersByMonth();

  if (data) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-xl font-semibold">Osnovna analitika</p>
        <div className="grid grid-cols-3 gap-5">
          <div className="flex flex-col gap-2 rounded-xl bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
            <p className="text-secondary text-sm font-medium">
              Mesečna prodaja {month}
            </p>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-semibold">
                {new Intl.NumberFormat("sl-SI", {
                  style: "currency",
                  currency: "EUR",
                }).format(
                  data.reduce(
                    (c: number, a: { total_price: number }) =>
                      c + a.total_price,
                    0,
                  ),
                )}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-xl bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
            <p className="text-secondary text-sm font-medium">
              Število naročil {month}
            </p>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-semibold">{totalOrders as number}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-xl bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
            <p className="text-secondary text-sm font-medium">
              Najbolj prodajan izdelek
            </p>
            <div>
              <p className="font-semibold">{data[0].product_name ?? "-"}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeAnalytics;
